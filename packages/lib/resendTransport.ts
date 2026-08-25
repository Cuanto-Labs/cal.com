/**
 * Nodemailer custom transport that sends through the Resend HTTP API
 * (POST https://api.resend.com/emails) instead of Resend's SMTP endpoint.
 *
 * SMTP on 465 is unreliable from serverless runtimes — a blocked or slow
 * outbound connection surfaces as a swallowed send with no trace in Resend's
 * log. The HTTP API returns a status code we can put in the logs instead.
 *
 * Shaped as a nodemailer transport so every existing call site
 * (createTransport(serverConfig.transport)) keeps working untouched.
 */

type MailAddress = string | { name?: string; address: string };
type MailAddressInput = MailAddress | MailAddress[] | undefined;

type MailAttachment = {
  filename?: string;
  content?: string | Buffer;
  contentType?: string;
};

type MailData = {
  from?: MailAddressInput;
  to?: MailAddressInput;
  cc?: MailAddressInput;
  bcc?: MailAddressInput;
  replyTo?: MailAddressInput;
  subject?: string;
  html?: string;
  text?: string;
  headers?: Record<string, string>;
  attachments?: MailAttachment[];
  icalEvent?: { filename?: string; content?: string | Buffer; method?: string };
};

type MailMessage = { data: MailData; message?: { messageId?: () => string } };
type SendCallback = (err: Error | null, info?: { messageId: string; accepted: string[] }) => void;

const RESEND_ENDPOINT = "https://api.resend.com/emails";

function formatAddress(address: MailAddress): string {
  if (typeof address === "string") return address;
  return address.name ? `${address.name} <${address.address}>` : address.address;
}

/**
 * getReplyToHeader joins addresses with ", ", so a single string may hold
 * several. Splitting naively on "," would also cut a display name in half
 * ("Doe, John <j@x.com>"), so only bare lists get split; anything using the
 * "Name <addr>" form is matched per address instead.
 */
function splitAddresses(entry: string): string[] {
  if (!entry.includes("<")) return entry.split(",");
  const matches = entry.match(/[^<>]*<[^>]+>|[^,<>]+/g);
  if (!matches) return [entry];
  // consecutive matches keep the ", " that separated them
  return matches.map((match) => match.replace(/^\s*,\s*/, ""));
}

function toAddressList(input: MailAddressInput): string[] {
  if (!input) return [];
  const list = Array.isArray(input) ? input : [input];
  return list
    .map(formatAddress)
    .flatMap(splitAddresses)
    .map((entry) => entry.trim())
    .filter(Boolean);
}

function toBase64(content: string | Buffer): string {
  return Buffer.isBuffer(content) ? content.toString("base64") : Buffer.from(content, "utf8").toString("base64");
}

function buildAttachments(data: MailData) {
  const attachments: { filename: string; content: string; content_type?: string }[] = [];

  // icalEvent is nodemailer-specific: Resend has no equivalent field, so it
  // rides along as a text/calendar attachment carrying the same METHOD.
  if (data.icalEvent?.content) {
    attachments.push({
      filename: data.icalEvent.filename || "event.ics",
      content: toBase64(data.icalEvent.content),
      content_type: `text/calendar; charset=utf-8; method=${data.icalEvent.method || "REQUEST"}`,
    });
  }

  for (const attachment of data.attachments || []) {
    if (!attachment.content) continue;
    attachments.push({
      filename: attachment.filename || "attachment",
      content: toBase64(attachment.content),
      ...(attachment.contentType ? { content_type: attachment.contentType } : {}),
    });
  }

  return attachments;
}

export function createResendTransport(apiKey: string) {
  return {
    name: "resend-api",
    version: "1.0.0",
    send(mail: MailMessage, callback: SendCallback) {
      const data = mail.data || {};
      const to = toAddressList(data.to);
      const from = toAddressList(data.from)[0];

      if (!from || to.length === 0) {
        callback(new Error("resend-api: message is missing a from or to address"));
        return;
      }

      const attachments = buildAttachments(data);
      const cc = toAddressList(data.cc);
      const bcc = toAddressList(data.bcc);
      const replyTo = toAddressList(data.replyTo);

      const body = {
        from,
        to,
        subject: data.subject || "",
        ...(data.html ? { html: data.html } : {}),
        ...(data.text ? { text: data.text } : {}),
        ...(cc.length ? { cc } : {}),
        ...(bcc.length ? { bcc } : {}),
        ...(replyTo.length ? { reply_to: replyTo } : {}),
        ...(data.headers && Object.keys(data.headers).length ? { headers: data.headers } : {}),
        ...(attachments.length ? { attachments } : {}),
      };

      fetch(RESEND_ENDPOINT, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      })
        .then(async (response) => {
          const payload = await response.text();
          if (!response.ok) {
            throw new Error(`resend-api: ${response.status} ${response.statusText} — ${payload}`);
          }
          let id = "";
          try {
            id = (JSON.parse(payload) as { id?: string }).id || "";
          } catch {
            // a 2xx with an unparseable body still means Resend accepted it
          }
          callback(null, { messageId: id, accepted: to });
        })
        .catch((err) => callback(err instanceof Error ? err : new Error(String(err))));
    },
  };
}

export type ResendTransport = ReturnType<typeof createResendTransport>;

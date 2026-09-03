import { SUPPORT_MAIL_ADDRESS } from "@calcom/lib/constants";

export type Tier = {
  name: string;
  price: string;
  unit: string;
  sub?: string;
  desc: string;
  features: string[];
  cta: string;
  href: string;
  highlighted: boolean;
};

export const salesMailto = `mailto:${SUPPORT_MAIL_ADDRESS}?subject=${encodeURIComponent("MeetSynq for my team")}`;
export const whiteLabelMailto = `mailto:${SUPPORT_MAIL_ADDRESS}?subject=${encodeURIComponent(
  "White-label MeetSynq deployment"
)}`;

export const tiers: Tier[] = [
  {
    name: "Starter",
    price: "$29",
    unit: "per user / month",
    desc: "For one person who needs booking links that just work.",
    features: [
      "Unlimited meeting types",
      "Google, Outlook, and Apple Calendar sync",
      "Custom intake questions",
      "Google Meet and Zoom links, automatically",
      "Paid bookings through Stripe",
    ],
    cta: "Start free trial",
    href: "/signup",
    highlighted: false,
  },
  {
    name: "Team",
    price: "$79",
    unit: "per user / month",
    desc: "For teams that share availability and route bookings between people.",
    features: [
      "Everything in Starter",
      "Round-robin and collective scheduling",
      "Shared team availability",
      "Booking insights",
      "Priority support",
    ],
    cta: "Start free trial",
    href: "/signup",
    highlighted: true,
  },
  {
    name: "Agency",
    price: "$299",
    unit: "per month",
    sub: "5 users included, then $99 per 5",
    desc: "For agencies running scheduling for several clients from one account.",
    features: [
      "Everything in Team",
      "5 users included",
      "Grows in blocks of 5 users",
      "One workspace per client",
      "Guided onboarding",
    ],
    cta: "Talk to us",
    href: salesMailto,
    highlighted: false,
  },
];

export const enterprise = {
  name: "Enterprise white-label",
  desc: "A dedicated MeetSynq deployment on your domain, carrying your name, logo, colors, and sender address. Nothing in the product points back to us.",
  bullets: [
    "Your own domain and SSL",
    "Logo, favicon, and email branding",
    "Custom sender name and address",
    "Cuanto Labs handles deployment and upkeep",
  ],
};

vi.mock("@calcom/lib/next-seo.config", () => ({
  default: {
    headSeo: {
      siteName: "MeetSynq",
    },
    defaultNextSeo: {
      title: "MeetSynq",
      description: "Scheduling infrastructure for everyone.",
    },
  },
  seoConfig: {
    headSeo: {
      siteName: "MeetSynq",
    },
  },
  buildSeoMeta: vi.fn().mockReturnValue({}),
}));

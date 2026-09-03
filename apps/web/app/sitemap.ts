import type { MetadataRoute } from "next";

import { WEBAPP_URL } from "@calcom/lib/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: WEBAPP_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${WEBAPP_URL}/white-label`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${WEBAPP_URL}/pricing`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}

import { Bricolage_Grotesque, JetBrains_Mono } from "next/font/google";

export const displayFont = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: "variable",
  variable: "--font-ms-display",
  display: "swap",
});

export const monoFont = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-ms-mono",
  display: "swap",
});

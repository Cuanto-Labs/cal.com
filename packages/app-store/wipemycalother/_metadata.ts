import type { AppMeta } from "@calcom/types/App";

export const metadata = {
  name: "WipeMyCal",
  description:
    "Wipe My Cal is a MeetSynq exclusive app that redefines what it looks like to reschedule multiple meetings at the same time. Simply install the app, and select 'Wipe' for whatever date you need to mass reschedule. Handle emergencies, unexpected sick days and last minute events with the simple click of a button.",
  installed: true,
  category: "automation",
  categories: ["automation"],
  // If using static next public folder, can then be referenced from the base URL (/).
  logo: "icon-dark.svg",
  publisher: "MeetSynq",
  slug: "wipe-my-cal",
  title: "Wipe my cal",
  type: "wipemycal_other",
  url: "https://meet.cuantolabs.com",
  variant: "other",
  email: "support@cuantolabs.com",
  dirName: "wipemycalother",
  isOAuth: false,
} as AppMeta;

export default metadata;

## App Contribution Guidelines

#### `DESCRIPTION.md`

1. images - include atleast 4 images (do we have a recommended size here?). Can show app in use and/or installation steps
2. add only file name for images, path not required. i.e. `1.jpeg`, not `/app-store/zohocalendar/1.jpeg`
3. description should include what the integration with Cal allows the user to do e.g. `Allows you to sync Cal bookings with your Zoho Calendar`

#### `README.md`

1. Include installation instructions and links to the app's website.

2. For url use `<baseUrl>/api/integrations`, rather than `<MeetSynq>/api/integrations`

#### `config.json`

1. set `"logo": "icon.svg"` and save icon in `/static`. Don't use paths here.
2. description here should not exceed 10 words (this is arbitrary, but should not be long otherwise it's truncated in the app store)

#### Others

1. Add API documentation links in comments for files `api`, `lib` and `types`
2. Use [`AppDeclarativeHandler`](../types/AppHandler.d.ts) across all apps. Whatever isn't supported in it, support that.
3. README should be added in the respective app and can be linked in main README
4. Also, no env variables should be added by an app. They should be added in `zod.ts` (see `packages/app-store/jitsivideo/zod.ts`) and then they would be automatically available to be modified by the MeetSynq app admin. In local development you can open /settings/admin with the admin credentials (see [seed.ts](packages/prisma/seed.ts))

# Contributing to MeetSynq

Thanks for helping improve MeetSynq. This guide covers how we work: house rules for PRs, naming conventions, and how to build, test, and lint the project.

## House Rules (for PRs)

### 👥 Prevent Work Duplication

Before starting work, check whether it's already in progress elsewhere to avoid duplicate effort.

### 👀 Think Like a Reviewer

Put yourself in the reviewer's shoes. What would you want to know if reading this for the first time? Are there key decisions, goals, or constraints that need clarification? Does the PR assume knowledge that isn't obvious?

### 📚 Treat It Like Documentation

Every PR contributes to the long-term understanding of the codebase. Write clearly enough that someone — possibly you — can revisit it months later and still understand what happened and why.

### ✅ Summarize Your PR at the Top

Even if the code changes are minor or self-explanatory, a short written summary helps reviewers quickly understand the intent.

### 🧪 Mention What Was Tested (and How)

Explain how you validated your changes. It doesn't need to be exhaustive — just enough to give reviewers confidence that things were tested and work as expected.

> Example:
> "Tested locally with mock data and confirmed the flow works on staging."

### 🧠 Assume Future-You Won't Remember

Write with the future in mind. If there are trade-offs, edge cases, or temporary workarounds, document them clearly so they don't get lost or misinterpreted later.

## File Naming Conventions

To ensure consistency and make files easy to fuzzy-find, we follow the naming conventions below for **services**, **repositories**, and other class-based files.

### Repository Files

- Repository class files must include the `Repository` suffix.
- If the repository is backed by a specific technology (e.g. Prisma), prefix the filename and class name with it.
- File name must match the exported class exactly (PascalCase).

**Pattern:**

`Prisma<Entity>Repository.ts`

**Examples:**

```ts
// File: PrismaAppRepository.ts
export class PrismaAppRepository { ... }

// File: PrismaMembershipRepository.ts
export class PrismaMembershipRepository { ... }
```

This avoids ambiguous filenames like app.ts and improves discoverability in editors.

### Service Files

- Service class files must include the Service suffix.
- File name should be in PascalCase, matching the exported class.
- Keep naming specific — avoid generic names like AppService.ts.

**Pattern:**

`<Entity>Service.ts`

**Examples:**

```ts
// File: MembershipService.ts
export class MembershipService { ... }

// File: HashedLinkService.ts
export class HashedLinkService { ... }
```

**Note:**

- New files must avoid dot-suffixes like .service.ts or .repository.ts; these will be migrated from the existing codebase progressively.
- We still reserve suffixes such as .test.ts, .spec.ts, and .types.ts for their respective use cases.

## Developing

See [README](./README.md#getting-started) for setup instructions.

## Building

You can build the project with:

```bash
yarn build
```

Please ensure that you can make a full production build before pushing code.

## Testing

### Running Tests

```bash
TZ=UTC yarn test
```

See [README](./README.md#development) for E2E test setup.

#### Resolving Issues

##### E2E Test Browsers Not Installed

Run `npx playwright install` to download test browsers and resolve the error below when running `yarn test-e2e`:

```
Executable doesn't exist at /Users/alice/Library/Caches/ms-playwright/chromium-1048/chrome-mac/Chromium.app/Contents/MacOS/Chromium
```

## Linting

To check the formatting of your code:

```sh
yarn lint
```

If you get errors, be sure to fix them before committing.

## Making a Pull Request

### Keep PRs Small and Focused

Large PRs are difficult to review and more prone to errors. We strongly encourage smaller, self-contained PRs:

- **Size limits**: Keep PRs under 500 lines of code changed and under 10 code files modified (excludes documentation, lock files, and auto-generated files)
- **Single responsibility**: Each PR should address one concern (one feature, one bug fix, or one refactor)
- **Split large changes**: If your task requires extensive changes, break it into multiple PRs that can be reviewed and merged independently

**How to split large changes:**
- Separate database/schema changes from application logic
- Split frontend and backend changes when possible
- Do preparatory refactoring in a separate PR before adding new features
- Create PRs in dependency order (infrastructure first, then features)

### PR Checklist

- Fill out the PR template accordingly.
- Review the [App Contribution Guidelines](./packages/app-store/CONTRIBUTING.md) when building integrations.
- Create PRs in draft mode by default.
- Keep your branch up to date with the base branch before requesting review.

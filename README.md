# CardStudio

CardStudio is an offline-first, multilingual card and invitation designer built with React, TypeScript, Vite and Capacitor.

## Development

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
```

## Android

```bash
npm install
npx cap add android
npm run android:sync
```

The GitHub Actions workflow `.github/workflows/android.yml` builds a debug APK on pushes to `main`. Download the generated APK from the workflow run's Artifacts section. The debug APK is intended for installation and testing, not for Play Store publication.

Application ID: `com.cardstudio.invitation`

## Floot + GitHub development

Floot is used as a companion prototyping environment; this repository remains the source of truth for the installable Android app and GitHub Pages release. Floot does not currently sync directly with GitHub. See [FLOOT_GITHUB_WORKFLOW.md](./FLOOT_GITHUB_WORKFLOW.md) for the reviewed feature-handoff process and platform limits.

## Current foundation

- Responsive design workspace
- Seven-language UI foundation (Persian, Arabic, English, Turkish, Russian, French and German)
- Starter editable canvas with text and background controls
- Local browser persistence for drafts
- Export current design as PNG

This is the initial foundation. Advanced template packs, bulk generation, RSVP links, animation export and monetization will be added in subsequent milestones.

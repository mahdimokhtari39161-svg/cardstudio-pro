# Floot + GitHub workflow for CardStudio Pro

This repository is the release source for the existing React/TypeScript/Capacitor application. The Floot project named **CardStudio Pro** is a separate Floot-native implementation used for prototyping and exploring features.

## What each platform does

- **Floot:** prototype and review new screens or workflows in its live preview.
- **GitHub:** keep the canonical application source, review changes, preserve history, and run release automation.
- **GitHub Actions:** run the web build, create an installable Android debug APK, and deploy the web build to GitHub Pages.

## Important integration limit

Floot does not currently provide direct Git repository sync, and it cannot import this existing Vite/Capacitor repository as-is. A Floot project is rebuilt as a Floot-native app; it is not a direct mirror of this repository.

Floot's ZIP download and Folder Sync are paid-plan features. Folder Sync syncs the Floot project's own files to a local folder; it is not an importer for an unrelated GitHub codebase.

For this project, use a **reviewed feature handoff**, not whole-project mirroring:

1. Prototype a feature in Floot and review it in the preview.
2. Agree which behavior or screen should be carried over.
3. Implement that feature in this repository's existing React/TypeScript structure. Do not overwrite this repository with a complete Floot export.
4. Make the change on a feature branch and open a pull request.
5. Confirm the web build passes. After merging to `main`, GitHub Actions builds the Android APK and deploys the web app.

## Existing GitHub workflows

- `.github/workflows/build.yml` — TypeScript check and production web build.
- `.github/workflows/android.yml` — Android debug APK build; the APK is downloadable from the workflow run's Artifacts.
- `.github/workflows/pages.yml` — GitHub Pages deployment.

## Data and secrets

Floot's database, uploaded assets, and user data are separate from this repository. They are not synchronized automatically. Plan and test any data migration explicitly. Never commit API keys, session tokens, passwords, or other secrets to GitHub.

## Source of truth

For the installable Android app and GitHub Pages release, this repository's `main` branch is the source of truth. Floot is a companion prototyping environment until a specific feature is deliberately ported and reviewed here.

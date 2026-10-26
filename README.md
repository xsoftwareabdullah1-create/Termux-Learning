# Termux Learn

A mobile-first Termux learning app, from first terminal commands to advanced shell and development workflows. Includes a simulated practice terminal; commands are taught and checked as exercises, not executed on your Android device.

## Learning path

18 guided modules, covering:
1. First steps and Android/Termux system information
2. Directory navigation
3. Creating and managing files
4. Safe deletion and cleanup
5. Termux packages and repositories
6. Text editing, streams and redirection
7. Search, grep, find and pipes
8. Permissions and Android shared storage
9. Processes, jobs, memory and disk
10. Networking and downloads
11. Archives and checksums
12. Git and GitHub basics
13. Python development and virtual environments
14. Node.js and web development
15. SSH and authorized remote access
16. Advanced shell variables, scripts and debugging
17. Security and troubleshooting
18. Help and command reference

## App features

- Firebase email/password and Google sign-in (requires Firebase and OAuth setup)
- Beginner, intermediate and advanced command exercises with hints
- Simulated terminal with shortcut-key strip and run control
- Local lesson completion tracking
- Android APK and iOS IPA build profiles through Expo EAS

## Run locally

```bash
npm install
npx expo start
```

## Build

See [FIREBASE_GOOGLE_SETUP.md](FIREBASE_GOOGLE_SETUP.md). Configure an EAS project, GitHub Actions secrets and Apple signing before triggering the workflow.

## Safety

The practice terminal is a simulator. It does not run arbitrary shell commands on your phone. Review real commands before using them in Termux, especially file deletion, permissions, networking and scripts.

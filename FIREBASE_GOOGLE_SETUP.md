# Firebase + Google sign-in setup

1. Create a Firebase project and add Android app package com.xsoftwareabdullah1.termuxlearn.
2. In Firebase Authentication, enable Email/Password and Google providers.
3. Add iOS app with bundle identifier com.xsoftwareabdullah1.termuxlearn if building iOS.
4. Create Android, iOS and Web OAuth client IDs in Google Cloud Console. Match package/bundle IDs and Android SHA fingerprints.
5. Copy .env.example to .env locally and fill all Firebase values and Google client IDs.
6. In GitHub Settings > Secrets and variables > Actions, add EXPO_TOKEN and the eight EXPO_PUBLIC_* values listed in .env.example. EAS receives these during the workflow build.
7. EAS iOS device builds require Apple signing credentials and provisioning. Configure these through EAS before running the iOS workflow.
8. Open Actions > Build Termux Learn > Run workflow, then select android, ios or all. Download APK/IPA from the run's Artifacts section.

Never commit real .env files, service-account JSON, private keys or Apple certificates.

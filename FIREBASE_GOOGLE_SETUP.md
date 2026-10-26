# Firebase + Google sign-in setup

1. Create a Firebase project and add Android app package com.xsoftwareabdullah1.termuxlearn.
2. In Firebase Authentication, enable Email/Password and Google providers.
3. Add iOS app with bundle identifier com.xsoftwareabdullah1.termuxlearn if building iOS.
4. Create OAuth client IDs in Google Cloud Console for Android, iOS and Web. Configure package/bundle IDs and Android SHA fingerprints.
5. Copy .env.example to .env locally and fill Firebase values and Google client IDs.
6. Add EXPO_TOKEN under GitHub repository Settings > Secrets and variables > Actions. Create it from your Expo account.
7. EAS iOS device builds need valid Apple signing credentials and provisioning. EAS can manage credentials after Apple account setup.

Never commit real .env files, service-account JSON, private keys or Apple certificates.

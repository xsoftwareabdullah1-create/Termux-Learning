import AsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp, getApp, getApps } from 'firebase/app';
import * as FirebaseAuth from 'firebase/auth';

const config = {
 apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
 authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
 projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
 appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
 messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
};
export const firebaseConfigured = Boolean(config.apiKey && config.projectId && config.appId);
const app = getApps().length ? getApp() : initializeApp(config);

// Firebase's React Native runtime entry exports getReactNativePersistence, but
// some Firebase 10.x TypeScript declarations resolve the web entry instead.
const getNativePersistence = (FirebaseAuth as unknown as {
 getReactNativePersistence: (storage: typeof AsyncStorage) => FirebaseAuth.Persistence;
}).getReactNativePersistence;

export const auth = (() => {
 try {
  if (typeof getNativePersistence === 'function') {
   return FirebaseAuth.initializeAuth(app, {
    persistence: getNativePersistence(AsyncStorage)
   });
  }
  return FirebaseAuth.getAuth(app);
 } catch {
  return FirebaseAuth.getAuth(app);
 }
})();

// Import the Firebase SDK
import { initializeApp, getApps, getApp } from "firebase/app"; // Include getApp for accessing existing app

// Removed: import { getReactNativePersistence } from "firebase/auth/react-native";
// The function is now imported directly from "firebase/auth" below.

import {
  getAuth,
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth"; // For authentication with persistence
import { getFirestore } from "firebase/firestore"; // For Firestore database
import { getStorage } from "firebase/storage"; // For file storage
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAWSlC2nvbrqUj7TJ65jVvDpY1NfNbrZGA",
  authDomain: "moodlight-93c43.firebaseapp.com",
  projectId: "moodlight-93c43",
  storageBucket: "moodlight-93c43.appspot.com",
  messagingSenderId: "448286038729",
  appId: "1:448286038729:web:5a88650e8f9d28d2f54b18",
  measurementId: "G-G15L82WYPB",
};

// Initialize Firebase App (ensure only one app instance exists)
const firebaseApp = !getApps().length
  ? initializeApp(firebaseConfig)
  : getApp();

// Initialize Firebase Auth with React Native AsyncStorage for persistence
// Note: initializeAuth requires getReactNativePersistence to be imported correctly.
const auth = initializeAuth(firebaseApp, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

// Initialize Firestore and Storage
const db = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);

// Export Firebase services for use across the app
export { auth, db, storage };
export default firebaseApp;

// Import the Firebase SDK
import { initializeApp, getApps } from "firebase/app";
import {
  getAuth,
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth"; // For authentication with persistence
import { getFirestore } from "firebase/firestore"; // For Firestore database
import { getStorage } from "firebase/storage"; // For file storage (optional)
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAWSlC2nvbrqUj7TJ65jVvDpY1NfNbrZGA",
  authDomain: "moodlight-93c43.firebaseapp.com",
  projectId: "moodlight-93c43",
  storageBucket: "moodlight-93c43.appspot.com", // Fixed: ".appspot.com" for storage
  messagingSenderId: "448286038729",
  appId: "1:448286038729:web:5a88650e8f9d28d2f54b18",
  measurementId: "G-G15L82WYPB",
};

// Initialize Firebase App only if no app has been initialized yet
const firebaseApp = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];

// Initialize Firebase Auth with AsyncStorage for persistence
const auth = initializeAuth(firebaseApp, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

// Export Firebase services for use in the app
export { auth };
export const db = getFirestore(firebaseApp);
export const storage = getStorage(firebaseApp);

export default firebaseApp;

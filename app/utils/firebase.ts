import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBCZ48KAopxXVVkL1bxultN_ANdkL-tFwg",
  authDomain: "racing-sim-bacc4.firebaseapp.com",
  projectId: "racing-sim-bacc4",
  storageBucket: "racing-sim-bacc4.appspot.com",
  messagingSenderId: "262081156612",
  appId: "1:262081156612:web:3d8a0cdcb9a4ce654d4751",
  measurementId: "G-ZCLRDX99ET",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage();

export { app, storage };

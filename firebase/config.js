import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB0xYxsCkR6oywAlnB2fjU6YKVCQCpiiIM",
  authDomain: "advanced-internship-f8f27.firebaseapp.com",
  projectId: "advanced-internship-f8f27",
  storageBucket: "advanced-internship-f8f27.firebasestorage.app",
  messagingSenderId: "152432726032",
  appId: "1:152432726032:web:650b7cc57d0d638379ba95"
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
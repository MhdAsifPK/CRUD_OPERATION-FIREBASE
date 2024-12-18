import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDRllThb_kolSxtO35z8nOjEOXLfp7WuOg",
  authDomain: "crud-bbeba.firebaseapp.com",
  projectId: "crud-bbeba",
  storageBucket: "crud-bbeba.firebasestorage.app",
  messagingSenderId: "894645844794",
  appId: "1:894645844794:web:bf2e5509be776e72686e03"
};

// Initialize Firebase
 const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
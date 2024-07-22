// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "joule-estate.firebaseapp.com",
  projectId: "joule-estate",
  storageBucket: "joule-estate.appspot.com",
  messagingSenderId: "708873924416",
  appId: "1:708873924416:web:840e47f39b579268c794a5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export { app };

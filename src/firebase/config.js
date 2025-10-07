// Firebase Configuration
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCKw-Du3Asp8VvB1IOf2fJt16E7_6ugDXU",
  authDomain: "finnovate-91997.firebaseapp.com",
  projectId: "finnovate-91997",
  storageBucket: "finnovate-91997.firebasestorage.app",
  messagingSenderId: "411757501753",
  appId: "1:411757501753:web:114491eae29d0d61bedce8",
  measurementId: "G-FTB8Y8XK7X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export default app;

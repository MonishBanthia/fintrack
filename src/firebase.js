// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore, doc , setDoc} from 'firebase/firestore';


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBdSaDeZ1vKBJDpz9d_FqJpovsXekims6Q",
  authDomain: "fintrack-27281.firebaseapp.com",
  projectId: "fintrack-27281",
  storageBucket: "fintrack-27281.appspot.com",
  messagingSenderId: "554306439032",
  appId: "1:554306439032:web:9fa371bdadc30228126a8d",
  measurementId: "G-401ZTVZBT3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export {db , auth , provider , doc , setDoc};



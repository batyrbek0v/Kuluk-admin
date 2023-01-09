import * as firebase from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth'


const firebaseConfig = {
  apiKey: "AIzaSyD88Q0-culp2Xy32xBEEk8vqn9KYIHTkF8",
  authDomain: "helloit-21f0c.firebaseapp.com",
  databaseURL: "https://helloit-21f0c-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "helloit-21f0c",
  storageBucket: "helloit-21f0c.appspot.com",
  messagingSenderId: "782883681069",
  appId: "1:782883681069:web:c629688247e117348b59a4"
};

export const app = firebase.initializeApp(firebaseConfig);

export const auth = getAuth(app)


const provider = new GoogleAuthProvider()

export const handleGoogleSignin = () => signInWithPopup(auth, provider)




export const handleSignOut = () => signOut(auth)
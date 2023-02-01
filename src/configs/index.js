import * as firebase from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut

} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyBWEY12MfWiL2NyAA3wcNKJUg1Wxy41euM",
  authDomain: "kulukkg-edd00.firebaseapp.com",
  projectId: "kulukkg-edd00",
  storageBucket: "kulukkg-edd00.appspot.com",
  messagingSenderId: "474329697446",
  appId: "1:474329697446:web:ecbc14abc3144397a13867",
  measurementId: "G-MDQQFPGC74"
};

export const app = firebase.initializeApp(firebaseConfig);

export const db = getFirestore(app)

export const auth = getAuth(app)

const provider = new GoogleAuthProvider()

export const handleGoogleSignin = () => signInWithPopup(auth, provider)

export const handleSignOut = () => signOut(auth)
import { initializeApp } from 'firebase/app'
import { 
  getAuth, 
  signInWithRedirect, 
  signInWithPopup,
  GoogleAuthProvider
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  getDoc,
  setDoc
} from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA3kA9S5mYSxlLeL_GTT6KU3OaaPCkwxdo",
  authDomain: "crown-db-c18e0.firebaseapp.com",
  projectId: "crown-db-c18e0",
  storageBucket: "crown-db-c18e0.appspot.com",
  messagingSenderId: "299960524834",
  appId: "1:299960524834:web:71e0782cc7ca1471a9aa7b"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account"
});

export const auth = getAuth();
export const SignInWithGooglePopup = () => signInWithPopup(auth,provider);

export const db = getFirestore();


export const createUserDocumentFromAuth = async(userAuth) => {
  const userDocRef = doc(db, 'users', userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);
  
  if(!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {displayName,email,createdAt});
    } catch(error) {
      console.log('error creating the user', error.masage);
    }
  }

  return userDocRef;
};
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyA_t6kGnb_0eZKsm7Mj9bHbvBbspwSgJ24",
  authDomain: "crwn-db-rs.firebaseapp.com",
  databaseURL: "https://crwn-db-rs.firebaseio.com",
  projectId: "crwn-db-rs",
  storageBucket: "crwn-db-rs.appspot.com",
  messagingSenderId: "951789437269",
  appId: "1:951789437269:web:691c4e81c1c7c5f6baafdc",
  measurementId: "G-LGR3PX9EBX"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const  { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;

}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ propmt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;

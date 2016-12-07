import firebase from 'firebase/app';
import originalFirebaseAuth from 'firebase/auth';
import originalFirebaseDb from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyDUk0biJfP51LXP7SeW0S5w2K-VuUVO-Jc",
  authDomain: "recoreco-84b21.firebaseapp.com",
  databaseURL: "https://recoreco-84b21.firebaseio.com",
  storageBucket: "recoreco-84b21.appspot.com",
  messagingSenderId: "916806038967"
};

export const firebaseApp = firebase.initializeApp(firebaseConfig);
export const firebaseAuth = firebaseApp.auth();
export const firebaseDb = firebaseApp.database();

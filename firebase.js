import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.FIRESTORE_APIKEY,
  authDomain: process.env.FIRESTORE_AUTHDOMAIN,
  projectId: process.env.FIRESTORE_PROJECTID,
  storageBucket: process.env.FIRESTORE_STORAGEBUCKET,
  messagingSenderId: process.env.FIRESTORE_MESSAGINGSENDERID,
  appId: process.env.FIRESTORE_APPID,
  measurementId: process.env.FIRESTORE_MEASUREMENTID
};

const app = firebase.initializeApp(firebaseConfig) ;
const db = app.firestore();

export default db;

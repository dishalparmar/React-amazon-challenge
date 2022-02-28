// First do global install of Firebase  "npm install -g firebase-tools"
// Second do                            "npm install firebase"


import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
// firebase config goes here...
};

// initialize the firebase app with firebase config
const firebaseApp = firebase.initializeApp(firebaseConfig);

// initialize the database with firestore(), which is the real time db in firebase
const db = firebaseApp.firestore();

// set up the auth(), which give us the variable we need for sign in, sign out etc.
const auth = firebase.auth();

export { db, auth };















import * as firebase from 'firebase';
require("firebase/firestore");


// Initialize Firebase and Firestore
//--------
const config = {
  apiKey: "AIzaSyCbOU5mVfOGvEf3XXIDr74CQgyKNcicjwY",
  authDomain: "climbsize.firebaseapp.com",
  databaseURL: "https://climbsize.firebaseio.com",
  projectId: "climbsize",
  storageBucket: "climbsize.appspot.com",
  messagingSenderId: "804095109535"
};
firebase.initializeApp(config);


export const db = firebase.firestore()
export const userDb = db.collection('users');
export const auth = firebase.auth()
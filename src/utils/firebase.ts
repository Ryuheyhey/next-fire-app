import "firebase/auth";
// import "firebase/firestore";

import firebase from "firebase/app";

const config = {
  apiKey: "AIzaSyCy9LvWp_2ZydaTvRq9a2Fnwdskh_Pz1TE",
  authDomain: "next-fire-app.firebaseapp.com",
  databaseURL: "https://next-fire-app-default-rtdb.firebaseio.com",
  projectId: "next-fire-app",
  storageBucket: "next-fire-app.appspot.com",
  messagingSenderId: "954590079442",
  appId: "1:954590079442:web:385b08c3ccabfdf7f5400b",
  measurementId: "G-PQ6NF2NL4W"
};
// initializeを複数回走らせない
if (firebase.apps.length === 0) {
  firebase.initializeApp(config);
}
const auth = firebase.auth();
export { auth };
// const db = firebase.firestore();
// export { db };

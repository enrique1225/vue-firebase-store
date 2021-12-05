/**
 * Firebase Login
 * Vuely comes with built in firebase login feature
 * You Need To Add Your Firsebase App Account Details Here
 */
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/firestore";
// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDFl05J5o53cGUPQ5CeMUB96ua5h8F2pM4",
    authDomain: "togo-development-61497.firebaseapp.com",
    databaseURL: "https://togo-development-61497.firebaseio.com",
    projectId: "togo-development-61497",
    storageBucket: "togo-development-61497.appspot.com",
    messagingSenderId: "303834330782",
    appId: "1:303834330782:android:2413016ee07aed291b6d8f",
    measurementId: "G-MSKWMMQPRN",
};

const fb = firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
const facebookAuthProvider = new firebase.auth.FacebookAuthProvider();
const githubAuthProvider = new firebase.auth.GithubAuthProvider();
const twitterAuthProvider = new firebase.auth.TwitterAuthProvider();
const database = firebase.database();

const db = fb.firestore();
const storesRef = db.collection("stores");
const usersRef = db.collection("users");
const ordersRef = db.collection("orders");
const appsRef = db.collection("app");

export {
    auth,
    googleAuthProvider,
    githubAuthProvider,
    facebookAuthProvider,
    twitterAuthProvider,
    database,
    db,
    storesRef,
    usersRef,
    ordersRef,
    appsRef
};
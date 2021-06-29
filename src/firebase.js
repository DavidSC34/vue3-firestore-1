import firebase from "firebase/app";
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyDbGmnRmqVmVhUNtPiTSUipTxQ_Su20Ryk",
    authDomain: "firestore-auth-1-973e2.firebaseapp.com",
    projectId: "firestore-auth-1-973e2",
    storageBucket: "firestore-auth-1-973e2.appspot.com",
    messagingSenderId: "474603978116",
    appId: "1:474603978116:web:f98c2a988443e0153231d1"
};
// Initialize Firebase
if (!firebase.apps.length) {

    firebase.initializeApp(firebaseConfig);
}
const db = firebase.firestore();
const auth = firebase.auth();
const marcaTiempo = firebase.firestore.FieldValue.serverTimestamp;

//Par aleer el usuario para
firebase.getCurrenUser = () => {
    return new Promise((resolve, reject) => {

        const unsuscribe = firebase.auth().onAuthStateChanged(user => {
            unsuscribe(); //-->para que no ejecute continuamente, se quite el observable
            resolve(user);
        }, reject)
    })
}

export { db, auth, marcaTiempo, firebase }
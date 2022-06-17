import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyDSO9wYL9h6x9Dnat3JQmAbv5wN6v4n1Y8",
    authDomain: "challenge-55f9f.firebaseapp.com",
    projectId: "challenge-55f9f",
    storageBucket: "challenge-55f9f.appspot.com",
    messagingSenderId: "1045638885731",
    appId: "1:1045638885731:web:970c5e4060953cb9292356",
    measurementId: "G-L1NMLSK30F"
};

const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore();

const auth = getAuth();

export { db, auth }
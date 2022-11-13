// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBD-9Y9J5bflvyRla1A1NaepNxn_WusQLo",
    authDomain: "crackers-app-72d0d.firebaseapp.com",
    databaseURL: "https://crackers-app-72d0d-default-rtdb.firebaseio.com",
    projectId: "crackers-app-72d0d",
    storageBucket: "crackers-app-72d0d.appspot.com",
    messagingSenderId: "375394106015",
    appId: "1:375394106015:web:9706aa939d54b10c0b00aa",
    measurementId: "G-NSPY0RFEFH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Database instance
export const db = getFirestore(app);

// Initialize Cloud Storage and get a reference to the service
export const storage = getStorage(app);


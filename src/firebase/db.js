import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "",
    authDomain: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: ""
};

export const db = firebase.initializeApp(firebaseConfig).firestore();

import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCEL7yQZXBmlWHX4uLlTe7qszuXVP4zeeY",
    authDomain: "profit-tracking-420d7.firebaseapp.com",
    projectId: "profit-tracking-420d7",
    storageBucket: "profit-tracking-420d7.appspot.com",
    messagingSenderId: "222693334788",
    appId: "1:222693334788:web:d875cba6ebf5ca1c59ba51"
};

export const db = firebase.initializeApp(firebaseConfig).firestore();
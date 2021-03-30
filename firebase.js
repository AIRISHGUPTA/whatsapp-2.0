import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyA-1lBgvdh99jxLvebzpHcT_IsiHuosmnA",
    authDomain: "whatsapp2-87840.firebaseapp.com",
    projectId: "whatsapp2-87840",
    storageBucket: "whatsapp2-87840.appspot.com",
    messagingSenderId: "524810184896",
    appId: "1:524810184896:web:59d0a1f0e82e6c78d62525",
    measurementId: "G-506GYY71Q1"
};

const app = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

const db = app.firestore();
const auth = app.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, provider };
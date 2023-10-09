import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
//import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBM9EJysyXQ2kKjbWs9nZvHd3ifyssKPqM",
  authDomain: "divulgacampo.firebaseapp.com",
  projectId: "divulgacampo",
  storageBucket: "divulgacampo.appspot.com",
  messagingSenderId: "469345470501",
  appId: "1:469345470501:web:55b5d5d64a51441456d7cc",
  measurementId: "G-WHZ8SZ8M5N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
//const analytics = getAnalytics(app);

export {db}
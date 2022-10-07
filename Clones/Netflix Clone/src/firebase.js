import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDV2B0Y4443wHonrnqSaeYA7Xbe75WFPS0",
  authDomain: "netflix-clone-4e3ca.firebaseapp.com",
  projectId: "netflix-clone-4e3ca",
  storageBucket: "netflix-clone-4e3ca.appspot.com",
  messagingSenderId: "776008682525",
  appId: "1:776008682525:web:7ca095c2b125457d33caf4",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();

export { auth };
export default db;

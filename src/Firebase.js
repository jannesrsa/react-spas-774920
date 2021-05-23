import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDXULn4-VpyDcCQCcGcbsQhlMvGuFXRwoE",
  authDomain: "react-spas-1bf52.firebaseapp.com",
  databaseURL: "https://react-spas-1bf52-default-rtdb.firebaseio.com",
  projectId: "react-spas-1bf52",
  storageBucket: "react-spas-1bf52.appspot.com",
  messagingSenderId: "860379140963",
  appId: "1:860379140963:web:005c4afd2f07bda0a03956",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = new firebase.auth();

export default firebase;

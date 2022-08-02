import Firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
// import { seedDatabase } from "../seed";
const config = {
  apiKey: "AIzaSyAJrlsGjljp_fwu9F9o8sVAdRPMgnaOAMM",
  authDomain: "instagram-cl-64bb5.firebaseapp.com",
  projectId: "instagram-cl-64bb5",
  storageBucket: "instagram-cl-64bb5.appspot.com",
  messagingSenderId: "1013417605061",
  appId: "1:1013417605061:web:1b251130e7bc1258447dac",
};
const firebase = Firebase.initializeApp(config);
const { FieldValue } = Firebase.firestore;
// seedDatabase(firebase);
export { firebase, FieldValue };

import firebase from 'firebase'
import 'firebase/auth'
import 'firebase/firebase-firestore'

var firebaseConfig = {
  apiKey: "AIzaSyCimZxo5Lc_f7z009p9K8iRH9BxvBxg6uo",
  authDomain: "online-gupshap.firebaseapp.com",
  databaseURL: "https://online-gupshap.firebaseio.com",
  projectId: "online-gupshap",
  storageBucket: "",
  messagingSenderId: "894167302173",
  appId: "1:894167302173:web:49ee65a6e973ae798b06f4",
  measurementId: "G-WCPQHJZKNV"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
 export default firebase
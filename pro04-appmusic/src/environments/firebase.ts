import * as firebase from 'firebase';


const firebaseConfig = {
    apiKey: "AIzaSyBcXpVHOEIM16fOWKTDwbadJeM9chSI2a8",
    authDomain: "app-music-76220.firebaseapp.com",
    databaseURL: "https://app-music-76220.firebaseio.com",
    projectId: "app-music-76220",
    storageBucket: "app-music-76220.appspot.com",
    messagingSenderId: "318744822664",
    appId: "1:318744822664:web:59f8a813b024db24"
}

firebase.initializeApp(firebaseConfig);

export default firebase;
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyASVadz8YSp9wbMki2XsqlGtwSwjs4IxF0",
    authDomain: "web-hdc-alc.firebaseapp.com",
    databaseURL: "https://web-hdc-alc.firebaseio.com",
    projectId: "web-hdc-alc",
    storageBucket: "web-hdc-alc.appspot.com",
    messagingSenderId: "272531950210",
    appId: "1:272531950210:web:20f6ca2cc27e1a7f4dc29b",
    measurementId: "G-BEBLPPQ9SC"
  };

  firebase.initializeApp(firebaseConfig);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  export const createChaqueta = async (userAuth, formData) => {
    if (!userAuth) return;

    const chaquetaRef = firestore.collection('chaquetas');
    const snapShot = await chaquetaRef.get();

    if (snapShot) {
        try {
            await chaquetaRef.add(formData);
        } catch (error) {
            console.log(error);
        }
    }
  };

  export const getChaquetas = async (userAuth) => {
    if (!userAuth) return;

    const chaquetaRef = firestore.collection('chaquetas');
    const snapShot = await chaquetaRef
        .orderBy('talla', 'asc')
        .get();
    return snapShot.docs.map(doc => doc.data());
  };

  //export default firebase;
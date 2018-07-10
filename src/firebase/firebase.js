/**
 * Intialize firebase API and authorization object
 */

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';


/**
 * Define firebase auth variables from env file to separate sensitive information from app
 */

let apiKey = process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain = process.env.REACT_APP_FIREBASE_AUTHDOMAIN,
    databaseURL = process.env.REACT_APP_FIREBASE_DATABASEURL,
    projectId = process.env.REACT_APP_FIREBASE_PROJECTID,
    storageBucket = process.env.REACT_APP_FIREBASE_STORAGEBUCKET,
    messagingSenderId = process.env.REACT_APP_FIREBASE_MESSAGINGSENDERID;

/**
 * Setup firebase config
 */
 const config = {
    apiKey: apiKey,
    authDomain: authDomain,
    databaseURL: databaseURL,
    projectId: projectId,
    storageBucket: storageBucket,
    messagingSenderId: messagingSenderId
};


/**
 * Init firebase
 * @link https://www.npmjs.com/package/firebase
 */
if (!firebase.apps.length) {
    firebase.initializeApp(config);
}


/**
 * Initialize firebase auth and db objects
 */

const db = firebase.database();
const auth = firebase.auth();

// expose auth object
export {
    db,
    auth,
};
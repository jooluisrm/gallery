import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: process.env.NEXT_APP_FIREBASE_APIKEY,
    authDomain: process.env.NEXT_APP_FIREBASE_AUTHDOMAIN,
    projectId: process.env.NEXT_APP_FIREBASE_PROJECTID,
    storageBucket: process.env.NEXT_APP_FIREBASE_STORAGEBUCKET,
    messagingSenderId: process.env.NEXT_APP_FIREBASE_MESSEAGINGSENDERID,
    appId: process.env.NEXT_APP_FIREBASE_APPID
};

const firebaseApp = initializeApp(firebaseConfig);

export const storage = getStorage(firebaseApp);
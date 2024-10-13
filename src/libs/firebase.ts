import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: process.env.NEXT_APP_FIREBASE_APIKEY,
    authDomain: process.env.NEXT_APP_FIREBASE_AUTHDOMAIN,
    projectId: process.env.NEXT_APP_FIREBASE_PROJECTID,
    storageBucket: "d5reactgallery-2575f.appspot.com",
    messagingSenderId: process.env.NEXT_APP_FIREBASE_MESSEAGINGSENDERID,
    appId: process.env.NEXT_APP_FIREBASE_APPID
};

console.log("API Key: ", process.env.NEXT_APP_FIREBASE_APIKEY);
console.log("Storage Bucket: ", process.env.NEXT_APP_FIREBASE_STORAGEBUCKET);


const firebaseApp = initializeApp(firebaseConfig);

export const storage = getStorage(firebaseApp);
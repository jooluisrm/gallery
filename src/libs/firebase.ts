import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyAV7q5Zkt-zBArcUl9Y0S3p0_4gwoV_VRY",
    authDomain: "d5reactgallery-2575f.firebaseapp.com",
    projectId: "d5reactgallery-2575f",
    storageBucket: "d5reactgallery-2575f.appspot.com",
    messagingSenderId: "623758959056",
    appId: "1:623758959056:web:3e8a67735cc35e56d659d5"
};

const firebaseApp = initializeApp(firebaseConfig);

export const storage = getStorage(firebaseApp);
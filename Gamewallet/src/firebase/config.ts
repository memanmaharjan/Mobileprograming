import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyA-ABYv-zyk6SePE9n_UXV-ALzLQCzx01Y",
    authDomain: "mobile-app-5b414.firebaseapp.com",
    projectId: "mobile-app-5b414",
    storageBucket: "mobile-app-5b414.firebasestorage.app",
    messagingSenderId: "589117044624",
    appId: "1:589117044624:web:4c6084ab35d030dc29a515",
    measurementId: "G-LHT73970E6"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

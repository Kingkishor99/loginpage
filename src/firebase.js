import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { useEffect, useState } from "react";

const firebaseConfig = {
    apiKey: "AIzaSyAmgb5a7SITnNHzJhuWaxxlGsbxEc6FSKc",
    authDomain: "login-page-ffcb5.firebaseapp.com",
    projectId: "login-page-ffcb5",
    storageBucket: "login-page-ffcb5.appspot.com",
    messagingSenderId: "426938815785",
    appId: "1:426938815785:web:40619319c28bea51e91338"
};


export const fire = initializeApp(firebaseConfig);
const auth = getAuth();

export const signup = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password)

}

export const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password)

}
export const logout = () => {
    return signOut(auth)
}

export function useAuth() {
    const [currentUser, setCurrentUser] = useState();

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, user => setCurrentUser(user));
        return unsub;
    }, [])

    return currentUser;
}




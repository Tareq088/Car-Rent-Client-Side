import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { auth } from './../firebase/firebase.init';

const AuthProvider = ({children}) => {
    const[loading, setLoading] = useState(true);
    const[user, setUser] = useState(null);
            // google provider
    const googleProvider = new GoogleAuthProvider();
                                // create user
    const signUpUser = (email, password) =>{
        setLoading(true);
        return createUserWithEmailAndPassword(auth,email,password);
    }
                    // log in  user using mail, password
    const logInUser = (email, password) =>{
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }
                        // google sign in
    const googleSignInUser = () =>{
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    }
                    //update user
    const updateUserProfile = (profile) =>{
        setLoading(true);
        return updateProfile(auth.currentUser, profile);
    }
                        // log out user
    const logOutUer = () =>{
        setLoading(true);
        return signOut(auth);
    }
                        //forget password
    const resetPassword =(email) =>{
        return sendPasswordResetEmail(auth, email);
    }
                    // on auth state change
    useEffect(()=>{
        const unSubscribe = onAuthStateChanged(auth, currentUser=>{
            setUser(currentUser);
            console.log(currentUser);
            setLoading(false);
        });
        return () =>{unSubscribe()}
    } ,[]);
    

    const authInfo ={
        loading, setLoading, signUpUser, logInUser,googleSignInUser, updateUserProfile, resetPassword, user, setUser, logOutUer
    }
    return <AuthContext value={authInfo}>
        {children}
    </AuthContext>
};

export default AuthProvider;
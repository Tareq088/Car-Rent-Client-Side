import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './../firebase/firebase.init';

const AuthProvider = ({children}) => {
    const[loading, setLoading] = useState(true);
    const[user, setUser] = useState(null);
                                // create user
    const signUpUser = (email, password) =>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth,email,password)
    }
                    // log in  user
    const logInUser = (email, password) =>{
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
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
        loading, setLoading, signUpUser, logInUser, 
    }
    return <AuthContext value={authInfo}>
        {children}
    </AuthContext>
};

export default AuthProvider;
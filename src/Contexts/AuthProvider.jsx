import React from 'react';
import { AuthContext } from './AuthContext';

const AuthProvider = ({children}) => {
    const app = 10;

    const authInfo ={
        app
    }
    return <AuthContext value={authInfo}>
        {children}
    </AuthContext>
};

export default AuthProvider;
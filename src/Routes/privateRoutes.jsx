import React, { use } from 'react';
import Loading from '../Pages/Loading/Loading';
import { AuthContext } from '../Contexts/AuthContext';
import { useLocation } from 'react-router';

const PrivateRoutes = ({children}) => {
    const {loading, user} = use(AuthContext);
    const location = useLocation();
    if(loading){
        return <Loading></Loading>
    }
    if(user && user?.email){
        return children
    }
  
    return <Navigate state={location.pathname}  to="/login"></Navigate>
};

export default PrivateRoutes;
import axios from 'axios';
import React, { use } from 'react';
import { AuthContext } from '../Contexts/AuthContext';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';

const axiosInstance = axios.create({
    baseURL:"https://car-rent-server-lovat.vercel.app"
})

const useAxiosSecure = () => {
    const{user, logOutUer} = use(AuthContext);
    const navigate = useNavigate();
                    // request interceptor
    axiosInstance.interceptors.request.use(config=>{
        config.headers.authorization = `Bearer ${user.accessToken}`
        return config
    })
                        // response interceptor
    axiosInstance.interceptors.response.use(response=>{
        return response
    }, error=>{
        if(error.status === 401 || error.status === 403){
             logOutUer()
                    .then(()=>{
                        toast.error(`Logged Out for ${error.status} code`)
                        navigate("/login");
                    })
                    .catch(error =>{
                        console.log(error.message)
                    })

        }
        console.log("error in interceptor", error)
        return Promise.reject(error)
    })
    return axiosInstance;
};

export default useAxiosSecure;
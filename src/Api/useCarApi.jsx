import React from 'react';
import useAxiosSecure from '../Hook/useAxiosSecure';

const useCarApi = () => {
    const axiosSecure = useAxiosSecure();
    const carPromise = (email,sortOrder) =>{
        return axiosSecure.get(`/cars?email=${email}&sort=${sortOrder}`).then(data=>data.data)
    }
    return {carPromise}
};

export default useCarApi;
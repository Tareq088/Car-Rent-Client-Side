import React from 'react';
import useAxiosSecure from '../Hook/useAxiosSecure';

const useDetailApi = () => {
     const axiosSecure = useAxiosSecure();
    const detailPromise = (id) =>{
        return axiosSecure.get(`/carDetail/${id}`).then(res=>res.data)
    }
    return {detailPromise}
};

export default useDetailApi;
import React from 'react';
import useAxiosSecure from '../Hook/useAxiosSecure';

const useBookingApi = () => {
    const axiosSecure = useAxiosSecure();
    const bookingPromise = (email) =>{
        return axiosSecure.get(`/bookings?email=kichu`).then(res=>res.data)
    }
    return {bookingPromise}
};

export default useBookingApi;
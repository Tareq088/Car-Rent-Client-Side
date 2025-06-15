import React, { Suspense, use } from 'react';
import { AuthContext } from '../../Contexts/AuthContext';
import MyBookingsList from './MyBookingsList';
import Loading from '../Loading/Loading';


const MyBookings = () => {
    const{user} = use(AuthContext);
    // console.log("user",user);
    const bookingsPromise = fetch(`http://localhost:3000/bookings?email=${user.email}`).then(res=>res.json())
    // console.log(bookingsPromise);

    return (
        <div>
            <Suspense fallback={<Loading></Loading>}>
                <MyBookingsList bookingsPromise={bookingsPromise}></MyBookingsList>
            </Suspense>
        </div>
    );
};

export default MyBookings;
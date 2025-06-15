import React, { Suspense, use, useEffect, useState } from 'react';
import { AuthContext } from '../../Contexts/AuthContext';
import MyBookingsList from './MyBookingsList';
import Loading from '../Loading/Loading';


const MyBookings = () => {
    const{user} = use(AuthContext);
    // console.log("user",user);
                    // jehetu cancel, modify button e click korle data auto change hbe tai useEffect() diye korte hbe
    // const bookingsPromise = fetch(`http://localhost:3000/bookings?email=${user.email}`).then(res=>res.json())
    // console.log(bookingsPromise);
    const [bookingsData,setBookingsData] = useState([]);
    const [count, setCount] = useState(0)
    useEffect (()=>{
        fetch(`http://localhost:3000/bookings?email=${user.email}`)
        .then(res=>res.json())
        .then(data=>{
            setBookingsData(data)
        })
    },[user.email, count])

    return (
        <div>
            <Suspense fallback={<Loading></Loading>}>
                {/* <MyBookingsList bookingsPromise={bookingsPromise}></MyBookingsList> */}
                <MyBookingsList 
                count={count}
                setCount = {setCount}
                bookingsData={bookingsData}></MyBookingsList>
            </Suspense>
        </div>
    );
};

export default MyBookings;
import React, { Suspense, use, useEffect, useState } from 'react';
import { AuthContext } from '../../Contexts/AuthContext';
import MyBookingsList from './MyBookingsList';
import Loading from '../Loading/Loading';
        // ager
// import {bookingPromise} from "../../Api/bookingApi"
                //new
import useBookingApi from './../../Api/useBookingApi';


const MyBookings = () => {
    const{user} = use(AuthContext);
    const {bookingPromise} = useBookingApi()
    // console.log("user",user);
                    // jehetu cancel, modify button e click korle data auto change hbe tai useEffect() diye korte hbe
    // const bookingsPromise = fetch(`https://car-rent-server-lovat.vercel.app/bookings?email=${user.email}`).then(res=>res.json())
    // console.log(bookingsPromise);
    const [bookingsData,setBookingsData] = useState([]);
    const [count, setCount] = useState(0);
 
    useEffect (()=>{
        // fetch(`https://car-rent-server-lovat.vercel.app/bookings?email=${user.email}`,
        //             {headers:{authorization: `Bearer ${user.accessToken}`}})
        // .then(res=>res.json())
                                                    // ager
                                    // bookingPromise(user?.email, user?.accessToken)
                                    //new
        bookingPromise(user?.email)
        .then(data=>{
            setBookingsData(data)
        })
    },[user.email, count])

    return (
        <div className='max-w-11/12 mx-auto'>
            <h2 className="font-bold text-center text-2xl text-amber-800 my-5">My Bookings</h2>
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
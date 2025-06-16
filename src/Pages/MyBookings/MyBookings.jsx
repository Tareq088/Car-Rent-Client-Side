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
    const [count, setCount] = useState(0);
    const[status,setStatus] = useState("Confirm")
    useEffect (()=>{
        fetch(`http://localhost:3000/bookings?email=${user.email}`)
        .then(res=>res.json())
        .then(data=>{
            setBookingsData(data)
        })
    },[user.email, count,status])

    return (
        <div className='max-w-11/12 mx-auto'>
            <h2 className="font-bold text-center text-2xl text-amber-800 my-5">My Bookings</h2>
            <Suspense fallback={<Loading></Loading>}>
                {/* <MyBookingsList bookingsPromise={bookingsPromise}></MyBookingsList> */}
                <MyBookingsList 
                count={count}
                setCount = {setCount}
                setStatus = {setStatus}
                bookingsData={bookingsData}></MyBookingsList>
            </Suspense>
        </div>
    );
};

export default MyBookings;
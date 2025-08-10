import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Loading from '../../Pages/Loading/Loading';
import RecentCarCard from './RecentCarCard';

const RecentListing = () => {
    const[recentCars, setRecentCars] = useState([]);
    const[loading, setLoading] = useState(true);
    useEffect(()=>{
        axios.get("https://car-rent-server-lovat.vercel.app/recent-cars")
        .then(res=>{
            // console.log(res.data);
            setRecentCars(res.data);
        })
        setLoading(false)
    },[]);
    // console.log(recentCars);

    if(loading){
        return <Loading></Loading>
    }
    return (
        <div className='bg-base-200'>
            <div className='max-w-11/12 mx-auto p-5'>
                <h2 className="font-bold text-center text-2xl text-amber-800 mb-5">Recent Listing</h2>
                <div className='grid grid-cols-1 sm:grid-cols-4 gap-10'>
                {
                    recentCars.map(recentCar => 
                                            <RecentCarCard 
                                            key={recentCar._id}
                                            recentCar={recentCar}></RecentCarCard>)
                }
                </div>
            </div>
        </div>
    );
};

export default RecentListing;
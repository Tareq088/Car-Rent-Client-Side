import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Loading from '../../Pages/Loading/Loading';

const RecentListing = () => {
    const[recentCars, setRecentCars] = useState([]);
    const[loading, setLoading] = useState(true);
    useEffect(()=>{
        axios.get("http://localhost:3000/recent-cars")
        .then(res=>{
            // console.log(res.data);
            setRecentCars(res.data);
        })
        setLoading(false)
    },[]);
    console.log(recentCars);

    if(loading){
        return <Loading></Loading>
    }

    return (
        <div>
            {
                recentCars.map
            }
        </div>
    );
};

export default RecentListing;
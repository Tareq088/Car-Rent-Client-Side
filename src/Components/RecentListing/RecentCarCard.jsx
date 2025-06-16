import React, { useEffect, useState } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaCar, FaMoneyBillWave } from "react-icons/fa6";
import { TiTick } from "react-icons/ti";
import { AiTwotoneDatabase } from "react-icons/ai";
import { format, parse } from "date-fns";

const RecentCarCard = ({ recentCar }) => {
//   console.log(recentCar);
  const {Daily_Rent,User_name,availability,booking_Count,contact_info,description,email,features,model_no,photo,
    registration_no,location,_id,add_Time} = recentCar || {};
    const[days,setDays] = useState(null);

    useEffect(()=>{
        const creationTimeString = add_Time;
        const todayTimeString = format(new Date(), "EEEE, MMMM dd, yyyy, kk:mm:ss");
        const formatString = "EEEE, MMMM dd, yyyy, kk:mm:ss";
        const creationTime = parse(creationTimeString, formatString, new Date());
        const todayTime = parse(todayTimeString, formatString, new Date());
        console.log(creationTime, todayTime);
        const diffTime = todayTime-creationTime;
        const diffDays = Math.ceil(diffTime/(1000*60*60*24));
        console.log("diffDay", diffDays);
        setDays(diffDays)
    },[recentCar,add_Time])
  return (
    <div>
      <div className="card bg-blue-100 shadow-md ">
        <figure>
          <img
            src={photo}
            className="rounded-2xl w-full h-40 object-center object-cover"
            alt="Car Photo"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">
            <FaCar style={{ color: "brown" }}></FaCar>
            {model_no}
          </h2>
          <p className="flex gap-2 items-center">
            <FaMoneyBillWave style={{ color: "green" }}></FaMoneyBillWave>Rental
            Price: Tk. {Daily_Rent}/day{" "}
          </p>
          <p className="flex gap-2 items-center">
            <TiTick size={15} style={{ color: "green" }}></TiTick>Available:{" "}
            {availability}{" "}
          </p>
          <p className="flex gap-2 items-center">
            <FaCar size={12} style={{ color: "red" }}></FaCar>Booking Count:{" "}
            {booking_Count}
          </p>
          <p className="flex gap-2 items-center">
            <AiTwotoneDatabase size={12}></AiTwotoneDatabase>Data Posted:{" "}
            {days} days ago
          </p>
    
        </div>
      </div>
    </div>
  );
};

export default RecentCarCard;

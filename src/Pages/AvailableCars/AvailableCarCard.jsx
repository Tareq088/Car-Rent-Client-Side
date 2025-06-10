import React from "react";
import { FaCar,FaMoneyBillWave,FaMapMarkerAlt } from "react-icons/fa";
import { TiTick } from "react-icons/ti";
import { Link } from "react-router";

const AvailableCarCard = ({ car }) => {
  // console.log(car);
  const {Daily_Rent,User_name,availability,booking_Count,contact_info,description,email,features,model_no,photo,registration_no,location, _id
  } = car || {};
  return (
    <div>
      <div className="card bg-blue-100 shadow-md ">
        <figure>
          <img
            src={photo}
            className="rounded-2xl w-full h-40"
            alt="Car Photo"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title"><FaCar style={{color:"brown"}}></FaCar>{model_no}</h2>
          <p className="flex gap-2 items-center"><FaMoneyBillWave style={{color:"green"}}></FaMoneyBillWave>Rental Price: Tk. {Daily_Rent}/day </p>
          <p className="flex gap-2 items-center"><FaMapMarkerAlt style={{color:"blue"}}></FaMapMarkerAlt>Location: {location} </p>
          <p className="flex gap-2 items-center"><TiTick size={15} style={{color:"green"}}></TiTick>Available: {availability} </p>
          <p className="flex gap-2 items-center"><FaCar size={12} style={{color:"red"}}></FaCar>Booking Count: {booking_Count}</p>
          <div className="card-actions justify-end">
            <Link to={`/carDetail/${_id}`} className="btn btn-primary">Book Now</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AvailableCarCard;

import React from "react";
import { FaCar, FaMapMarkerAlt, FaMoneyBillWave } from "react-icons/fa";
import { TiTick } from "react-icons/ti";
import { Link } from "react-router";

const AvailableCarList = ({ car,index }) => {
  // console.log(car);
  const {
    Daily_Rent,
    User_name,
    availability,
    booking_Count,
    contact_info,
    description,
    email,
    features,
    model_no,
    photo,
    registration_no,
    location,
    _id,
  } = car || {};
  return (
        <>
                {/* rows */}
            <tr>
                <th>
                {index+1}
                </th>
                <td>
                    <div className="">
                        <img
                            src={photo}
                            alt="car photo"
                            className="h-25 w-40 rounded-xl"
                        />
                    </div>
                </td>
                <td> 
                  <p className="flex gap-2 items-center"><FaCar style={{color:"brown"}}></FaCar>{model_no}</p>
                  <p>{registration_no}</p>
                </td>
                <td> 
                   <p className="flex gap-2 items-center"><FaMoneyBillWave style={{color:"green"}}></FaMoneyBillWave>Rental Price: Tk. {Daily_Rent}/day </p>
                </td>
                <td> 
                   <p className="flex gap-2 items-center"><FaMapMarkerAlt style={{color:"blue"}}></FaMapMarkerAlt>Location: {location} </p>
                </td>
                <td> 
                   <p className="flex gap-2 items-center"><TiTick size={15} style={{color:"green"}}></TiTick>Available: {availability} </p>
                </td>
                <td> 
                   <p className="flex gap-2 items-center">Booking Count: {booking_Count}</p>
                </td>
                
                <th className="">
                    <Link to={`/carDetail/${_id}`} className="btn btn-primary font-bold">Book Now</Link>
                </th>
            </tr>
        </>
  );
};

export default AvailableCarList;

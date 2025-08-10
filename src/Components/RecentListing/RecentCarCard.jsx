import React, { useEffect, useState } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaCar, FaMoneyBillWave } from "react-icons/fa6";
import { TiTick } from "react-icons/ti";
import { AiTwotoneDatabase } from "react-icons/ai";
import { format, parse } from "date-fns";

const RecentCarCard = ({ recentCar }) => {
  const {
    Daily_Rent,
    availability,
    booking_Count,
    model_no,
    photo,
    add_Time,
  } = recentCar || {};

  const [days, setDays] = useState(null);

  useEffect(() => {
    const creationTimeString = add_Time;
    const todayTimeString = format(
      new Date(),
      "EEEE, MMMM dd, yyyy, kk:mm:ss"
    );
    const formatString = "EEEE, MMMM dd, yyyy, kk:mm:ss";
    const creationTime = parse(creationTimeString, formatString, new Date());
    const todayTime = parse(todayTimeString, formatString, new Date());
    const diffTime = todayTime - creationTime;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    setDays(diffDays);
  }, [recentCar, add_Time]);

  return (
    <div>
      <div className="card bg-base-100 shadow-md">
        <figure>
          <img
            src={photo}
            className="rounded-2xl w-full h-40 object-center object-cover"
            alt="Car"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title flex items-center gap-2">
            <FaCar className="text-primary" />
            {model_no}
          </h2>

          <p className="flex gap-2 items-center">
            <FaMoneyBillWave className="text-success" />
            Rental Price: <span className="font-semibold">Tk. {Daily_Rent}/day</span>
          </p>

          <p className="flex gap-2 items-center">
            <TiTick size={15} className="text-success" />
            Available: {availability}
          </p>

          <p className="flex gap-2 items-center">
            <FaCar size={12} className="text-error" />
            Booking Count: {booking_Count}
          </p>

          <p className="flex gap-2 items-center">
            <AiTwotoneDatabase size={12} className="text-accent" />
            Data Posted: {days} days ago
          </p>
        </div>
      </div>
    </div>
  );
};

export default RecentCarCard;

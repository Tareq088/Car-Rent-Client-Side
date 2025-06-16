import React from "react";
import { FaCar } from "react-icons/fa";
import { GiTakeMyMoney } from "react-icons/gi";
import { IoMdCall } from "react-icons/io";
import { TbBrandBooking } from "react-icons/tb";
import { Link } from "react-router";
import { motion } from 'motion/react';

const SpecialOffer = () => {
  return (
    <div className="bg-base-200">
      <div className="max-w-11/12 mx-auto pb-10">
        <h2 className="font-bold text-center text-2xl text-amber-800 py-10">
          Special Offers
        </h2>
        <div className="flex flex-col gap-10 sm:flex-row">
          <motion.div 
          whileHover={{scale:1.05, y:-5}} 
          transition={{type:"spring", stiffness: 300}}
          className="card p-5 bg-red-50 shadow-sm flex flex-1 flex-col items-center justify-center">
            <div className="flex flex-col items-center text-center space-y-3">
              <h2 className="font-bold text-lg">Early booking discounts</h2>
              <p className="">
                If anyone goes for early booking minimum 10 days ago, he/she can get 10% discount.
              </p>
              <Link to="/available-cars">
                <button className="btn btn-primary hover:text-white text-sm sm:text-base">
                  Book Now
                </button>
              </Link>
            </div>
          </motion.div>
          <motion.div  whileHover={{scale:1.05, y:-5}} 
          transition={{type:"spring", stiffness: 300}}  className="card p-5 bg-red-50 shadow-sm flex flex-1 flex-col items-center justify-center">
            
            <div className="flex flex-col items-center text-center space-y-3">
              <h2 className="font-bold text-lg">First-time user offers</h2>
              <p className="">
                If anyone goes for first time booking, Out company will give 30% discount.
              </p>
              <Link to="/available-cars">
                <button className="btn btn-primary hover:text-white text-sm sm:text-base">
                  Book Now
                </button>
              </Link>
            </div>
          </motion.div >
          <motion.div  whileHover={{scale:1.05, y:-5}} 
          transition={{type:"spring", stiffness: 300}}  className="card p-5 bg-red-50 shadow-sm flex flex-1 flex-col items-center justify-center">
            
            <div className="flex flex-col items-center text-center space-y-3">
              <h2 className="font-bold text-lg">Holiday specials</h2>
              <p className="">
               If anyone goes for early booking minimum 10 days ago and on Holidays, he/she can get 20% discount.
              </p>
              <Link to="/available-cars">
                <button className="btn btn-primary hover:text-white text-sm sm:text-base">
                  Book Now
                </button>
              </Link>
            </div>
          </motion.div >
          <motion.div  whileHover={{scale:1.05, y:-5}} 
          transition={{type:"spring", stiffness: 300}}  className="card p-5 bg-red-50 shadow-sm flex flex-1 flex-col items-center justify-center">
            
            <div className="flex flex-col items-center text-center space-y-3">
              <h2 className="font-bold text-lg">Seasonal discounts</h2>
              <p className="">
                 Seasonal discounts on working day. Offer is 13% discount.
              </p>
              <Link to="/available-cars">
                <button className="btn btn-primary hover:text-white text-sm sm:text-base">
                  Book Now
                </button>
              </Link>
            </div>
          </motion.div >
        </div>
      </div>
    </div>
  );
};

export default SpecialOffer;

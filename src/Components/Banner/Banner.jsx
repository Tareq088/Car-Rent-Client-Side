import React from "react";
import banner1Image from "../../assets/bg1.jpg";
import { Link } from "react-router";
import Button from "../../UI/Button";
import { TbHandFinger } from "react-icons/tb";

const Banner = () => {
  return (
    <div>
      <div
        className="hero min-h-[400px] w-full object-contain bg-cover bg-top-center"
        style={{backgroundImage: `linear-gradient(rgba(0,0,0,.3), rgba(0,0,0,0.5)), url(${banner1Image})`}}
      >
        <div className="hero-overlay"></div>
        <div className="hero-content text-neutral-content text-center">
          <div className="max-w-md">
            <h1 className="mb-5 text-2xl sm:text-3xl lg:text-5xl font-bold">Find Best Car For You</h1>
            <Link to="/available-cars">
                <button className="btn btn-success hover:text-white hover:bg-emerald-800 text-sm sm:text-base"> View Available Cars 
                <span>< TbHandFinger size={20}/></span></button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Banner;

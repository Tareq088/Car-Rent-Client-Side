import React from "react";
import { FaCar } from "react-icons/fa6";
import { Link } from "react-router";
import { GiTakeMyMoney } from "react-icons/gi";
import { TbBrandBooking } from "react-icons/tb";
import { IoMdCall } from "react-icons/io";

const ChooseUs = () => {
  return (
    <div className="max-w-11/12 mx-auto pb-10">
      {/* Headline now has better contrast in both modes */}
      <h2 className="font-bold text-center text-2xl text-red-800 dark:text-amber-400 my-10">
        Why Choose Us?
      </h2>

      <div className="flex flex-col gap-10 sm:flex-row flex-wrap">
        {/* Card Template */}
        <div className="card p-5 bg-red-50 dark:bg-gray-800 shadow-sm flex flex-1 flex-col items-center justify-center">
          <figure className="rounded-full bg-white dark:bg-gray-700 w-18 h-18 mb-5 flex items-center justify-center">
            <FaCar size={30} color="red" />
          </figure>
          <div className="flex flex-col items-center text-center space-y-3">
            {/* Headings now have consistent readable color */}
            <h2 className="font-bold text-lg text-gray-800 dark:text-white">
              Huge Variety Of Cars
            </h2>
            {/* Paragraphs with better readability */}
            <p className="text-gray-600 dark:text-gray-300">
              Sedans, SUVs, hatchbacks, convertibles, pickups, luxury cars,
              economy cars, electric and hybrid options, family-friendly
              vehicles, off-road capable models, fuel-efficient choices,
              automatic and manual transmission options.
            </p>
            <Link to="/available-cars">
              <button className="btn btn-primary hover:text-white text-sm sm:text-base">
                See Available Cars
              </button>
            </Link>
          </div>
        </div>

        <div className="card p-5 bg-red-50 dark:bg-gray-800 shadow-sm flex flex-1 flex-col items-center justify-center">
          <figure className="rounded-full bg-white dark:bg-gray-700 w-18 h-18 mb-5 flex items-center justify-center">
            <GiTakeMyMoney size={30} color="green" />
          </figure>
          <div className="flex flex-col items-center text-center space-y-3">
            <h2 className="font-bold text-lg text-gray-800 dark:text-white">
              Affordable Prices
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Affordable daily, weekly, and monthly rental rates, no hidden
              charges, wide range of vehicles for every budget, best value for
              money, discounts on long-term rentals, quality service at a low
              cost, reliable cars at competitive prices.
            </p>
            <Link to="/available-cars">
              <button className="btn btn-primary hover:text-white text-sm sm:text-base">
                Check Price
              </button>
            </Link>
          </div>
        </div>

        <div className="card p-5 bg-red-50 dark:bg-gray-800 shadow-sm flex flex-1 flex-col items-center justify-center">
          <figure className="rounded-full bg-white dark:bg-gray-700 w-18 h-18 mb-5 flex items-center justify-center">
            <TbBrandBooking size={30} color="blue" />
          </figure>
          <div className="flex flex-col items-center text-center space-y-3">
            <h2 className="font-bold text-lg text-gray-800 dark:text-white">
              Easy Booking Process
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Simple online reservation, user-friendly interface, quick booking
              confirmation, minimal paperwork, 24/7 booking access, flexible
              pick-up and drop-off options, instant availability check, secure
              payment system.
            </p>
            <Link to="/available-cars">
              <button className="btn btn-primary hover:text-white text-sm sm:text-base">
                Book Car
              </button>
            </Link>
          </div>
        </div>

        <div className="card p-5 bg-red-50 dark:bg-gray-800 shadow-sm flex flex-1 flex-col items-center justify-center">
          <figure className="rounded-full bg-white dark:bg-gray-700 w-18 h-18 mb-5 flex items-center justify-center">
            <IoMdCall size={30} />
          </figure>
          <div className="flex flex-col items-center text-center space-y-3">
            <h2 className="font-bold text-lg text-gray-800 dark:text-white">
              24/7 Customer Support
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              24/7 customer support, friendly and helpful staff, quick response
              time, support via phone, email, and chat, multilingual assistance,
              roadside assistance available, dedicated help for booking issues,
              customer satisfaction guaranteed.
            </p>
            <Link to="/available-cars">
              <button className="btn btn-primary hover:text-white text-sm sm:text-base">
                Contact Us
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChooseUs;

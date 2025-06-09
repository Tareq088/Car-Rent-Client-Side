import React from "react";
import { useLoaderData } from "react-router";
import AvailableCarCard from "./availableCarCard";

const AvailableCars = () => {
  const availableCars = useLoaderData();
  console.log(availableCars);
  return (
    <div>
      <div className="w-11/12 mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 my-10">
        {availableCars.map((car) => (
          <AvailableCarCard key={car._id} car={car}></AvailableCarCard>
        ))}
      </div>
    </div>
  );
};

export default AvailableCars;

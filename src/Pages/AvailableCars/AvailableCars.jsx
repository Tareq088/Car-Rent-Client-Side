import React, { useState } from "react";
import { useLoaderData } from "react-router";
import AvailableCarCard from "./availableCarCard";
import AvailableCarList from "./AvailableCarList";

const AvailableCars = () => {
  const availableCars = useLoaderData();
  const[gridView,setGridView] = useState(true)
  // console.log(availableCars);
  return (
    <div>
      <div className="flex justify-center">
        <div>fgffvgf</div>
        <div>gfgf</div>
        <div>
          <button className="btn btn-info"
            onClick={()=>{setGridView(!gridView)}}>
              { gridView ? "Toggle To List View":"Toggle to Grid View"}
            </button>
        </div>
      </div>
      <div className="w-11/12 mx-auto  my-10">
      {
        gridView &&
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
             {availableCars.map((car) => (
                <AvailableCarCard key={car._id} car={car}></AvailableCarCard>
              ))}
        </div>
      }
      {  gridView ||
        <div>
          <div className="overflow-x-auto">
            <table className="table">
                {/* head */}
                <thead>
                  <tr>
                    <th>
                      SL No.
                    </th>
                    <th>Image</th>
                    <th>Model</th>
                    <th>Rental Price</th>
                    <th>Location</th>
                    <th>Available</th>
                    <th>Booking Count</th>
                    <th>Comment</th>
                  </tr>
                </thead>
                          {/* rows */}
                   <tbody>
                     {availableCars.map((car,index) => (
                                                  <AvailableCarList key={car._id} car={car} index={index}></AvailableCarList>
                     ))
                    }
                   </tbody>
                
            </table>
          </div> 
        </div>
      }
        
      </div>
    </div>
  );
};

export default AvailableCars;

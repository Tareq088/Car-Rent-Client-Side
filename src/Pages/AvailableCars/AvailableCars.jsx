import React, { useEffect, useState } from "react";
import { useLoaderData } from "react-router";
import AvailableCarCard from "./availableCarCard";
import AvailableCarList from "./AvailableCarList";
import { FaSearch } from "react-icons/fa";

const AvailableCars = () => {
  const initialCars = useLoaderData();
  const [availableCars,setAvailableCars] = useState(initialCars);
  const[gridView,setGridView] = useState(true);
  const[searchText, setSearchText] = useState("")
  console.log(searchText);
  // console.log(availableCars);
  useEffect(()=>{
    fetch(`http://localhost:3000/available-cars?searchParams=${searchText}`)
    .then(res=>res.json())
    .then(searchData=>{
      console.log("searchText",searchData);
      setAvailableCars(searchData);
    })
  },[searchText])
  return (
    <div>
      <div className="flex justify-center">
        <div>
          <form className="flex">
            <input type="text" 
              name="search"
              value={searchText}
              onChange={(e)=>setSearchText(e.target.value)}
              className="input"/>
            <button type="submit" className="btn"><FaSearch></FaSearch> </button>
          </form>
        </div>
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
             {availableCars?.map((car) => (
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

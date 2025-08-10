import React, { useEffect, useState } from "react";
import { useLoaderData } from "react-router";
import AvailableCarCard from "./availableCarCard";
import AvailableCarList from "./AvailableCarList";
import { FaSearch } from "react-icons/fa";

const AvailableCars = () => {
  const initialCars = useLoaderData();
  const [availableCars,setAvailableCars] = useState(initialCars);
  const[gridView,setGridView] = useState(true);
  const[searchText, setSearchText] = useState("");
  const[sortOrder, setSortOrder] = useState("asc")

  useEffect(()=>{
    const params = new URLSearchParams();
    if(searchText || sortOrder) params.append("searchParams", searchText); params.append("sort", sortOrder);
    // console.log(params.toString())
    fetch(`https://car-rent-server-lovat.vercel.app/available-cars?${params.toString()}`)
    .then(res=>res.json())
    .then(searchData=>{
      // console.log("searchText",searchData);
      setAvailableCars(searchData);
    })
                    // single searchText
    // fetch(`https://car-rent-server-lovat.vercel.app/available-cars?searchParams=${searchText}`)
    // .then(res=>res.json())
    // .then(searchData=>{
    //   console.log("searchText",searchData);
    //   setAvailableCars(searchData);
    // })
  },[searchText,sortOrder])
  return (
    <div className="w-11/12 mx-auto  my-10">
      <h2 className="font-bold text-center text-2xl text-amber-800 my-5">Available Cars</h2>
      <div className="flex flex-col sm:flex-row items-center  justify-between mb-5 spacey-y-2">
                      {/* search input */}
        <div className="mb-2">
          <form className="flex">
            <input type="text" 
              name="search"
              value={searchText}
              onChange={(e)=>setSearchText(e.target.value)}
              placeholder="search by Brand or Location"
              className="input w-60 sm:w-80"/>
            <button type="submit" className="btn"><FaSearch></FaSearch> </button>
          </form>
        </div>
        <div className="flex gap-2 justify-center">
                                {/* sort selector */}
          <div>
              <select name='choose' 
                        value={sortOrder}
                        onChange={(e)=>setSortOrder(e.target.value)}
                        className="select select-bordered w-full"  >
                          {/* <option selected disabled={true}>select </option> */}
                          <option value="asc">Price: Low to High</option>
                          <option value="des">Price: High to Low</option>
                </select> 
          </div>
                      {/* list or grid view */}
          <div>
            <button className="btn btn-info"
              onClick={()=>{setGridView(!gridView)}}>
                { gridView ? "Toggle To List View":"Toggle to Grid View"}
              </button>
          </div>
        </div>
      </div>
      <div >
      {
        gridView &&
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
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

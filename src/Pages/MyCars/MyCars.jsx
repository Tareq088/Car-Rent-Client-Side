import React, { use, useEffect, useState } from "react";
import { AuthContext } from "../../Contexts/AuthContext";
import { Link } from "react-router";
import { GrUpdate } from "react-icons/gr";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import Swal from "sweetalert2";

const MyCars = () => {
  const { user } = use(AuthContext);
  const [emailData, setEmailData] = useState([]);
  // console.log(user.email);
  useEffect(()=>{
  fetch(`http://localhost:3000/cars?email=${user.email}`)
    .then((res) => res.json())
    .then((data) => {
      console.log("email data", data);
      setEmailData(data);
    });
  },[user.email])

    const handleDelete = (id) =>{
        console.log("deleted",id)
           Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
                })
                .then((result) => {
                  if(result.isConfirmed){
                                      // DELETE FRO DB
                    axios.delete(`http://localhost:3000/cars/${id}`)
                    .then(data=> {
                      console.log("data after delete",data.data);
                      Swal.fire({
                                    title: "Deleted!",
                                    text: "Roommate Data has been deleted.",
                                    icon: "success"
                                    });
                                // delete from U/I
                      const remainingData = emailData.filter(data =>data._id != id);
                      console.log("remaining data", remainingData)
                      setEmailData(remainingData);
                    })
                  }
                  
                })
        
    }
    //  const {Daily_Rent, User_name, availability, booking_Count, contact_info, description, email, 
    //                                           features, model_no, photo, registration_no,add_Time} =  carData || {};
  return (
    <div>
      <div className="overflow-x-auto max-w-11/12 mx-auto">
        <table className="table table-xs table-pin-rows table-pin-cols">
          <thead className="border-b-2">
            <tr className="font-bold text-xl border">
              <th>No.</th>
              <td>Car Image</td>
              <td>Car Model</td>
              <td>Daily Rental Price</td>
              <td>Booking Count</td>
              <td>Availability</td>
              <td>Date Added</td>
              <td>Comment</td>
            </tr>
          </thead>
          <tbody>
            {emailData?.map((listData, index) => (
              <tr key={listData._id} className="border">
                <th className="text-xs sm:text-base">{index + 1}.</th>
                <td className=""> <img className="h-25 w-40 rounded-xl" src={listData.photo} alt="car img" /> </td>
                <td className="text-xs sm:text-base">{listData.model_no}</td>
                <td className="text-xs sm:text-base">
                  TK:{listData.Daily_Rent}
                </td>
                <td className="text-xs sm:text-base">
                  {listData.booking_Count}
                </td>
                <td className="text-xs sm:text-base">
                  {listData.availability}
                </td>
                <td className="text-xs sm:text-base">
                  {listData.add_Time}
                </td>
                <td className="text-xs sm:text-base">
                  <div className="join join-vertical space-y-1">
                    <Link to={`/updateCareData/${listData._id}`}>
                      <button className="btn join-item text-green-700 btn-outline btn-success">
                        <GrUpdate size={20} />
                        UPDATE
                      </button>
                    </Link>

                    <button
                      onClick={() => {
                        handleDelete(listData._id);
                      }}
                      className="btn join-item text-red-600 btn-outline btn-error"
                    >
                      <MdDelete size={20} />
                      DELETE
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyCars;

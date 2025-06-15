import axios from "axios";
import React, { use, useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { FaRegCalendarAlt } from "react-icons/fa";
import { format } from "date-fns";
import MyBookingRow from "./MyBookingRow";

const MyBookingsList = ({ bookingsData,count, setCount }) => {
  // const bookingsData = use(bookingsPromise);
    // console.log("booking data", bookingsData);

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead className="bg-blue-100">
            <tr>
              <th>Sl.</th>
              <th>Car Image</th>
              <th>Car Model</th>
              <th>Booking Date</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Total Price</th>
              <th>Booking Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* rows */}
            {bookingsData.map((book, index) => (
              <MyBookingRow 
              book={book} 
              index={index} 
              key={index} 
              count={count}
              setCount = {setCount}
              ></MyBookingRow>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyBookingsList;

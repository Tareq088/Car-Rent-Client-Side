import axios from "axios";
import React, { use } from "react";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const MyBookingsList = ({ bookingsPromise }) => {
  const bookingData = use(bookingsPromise);
  console.log("booking data", bookingData);
//   Booking_Id, applicant, bookedTime,  end_Date, model_no, photo, start_Date, _id,totalCost = booking
const handleStatusChange =(e,book_id) =>{
    // console.log(e.target.value, book_id);
    axios.patch(`http://localhost:3000/bookings/${book_id}`, {status:e.target.value})
    .then(data=> {
        console.log(data.data)
        if(data.data.modifiedCount){
            toast.success("status is updated");
        }
    })
    .catch(error=>{
        console.log(error);
    })
}
const handleDelete = (book_id) =>{
          Swal.fire({
                  title: "Are you sure to cancel this booking?",
                  icon: "warning",
                  showCancelButton: true,
                  cancelButtonText:"No",
                  confirmButtonColor: "#3085d6",
                  cancelButtonColor: "#d33",
                  confirmButtonText: "Yes"
                  })
                  .then((result) => {
                    if(result.isConfirmed){
                      axios.patch(`http://localhost:3000/bookings/${book_id}`, {status:"Cancel"})
                      .then(data=> {
                        console.log(data.data);
                        if(data.data.modifiedCount){
                            toast.success("Booking is canceled");
                            console.log("data is canceled");
                        }
                      })
                    }
                  })
}
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead className="bg-blue-100">
            <tr>
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
            {bookingData.map((book, index) => (
              <tr key={book._id} className="hover:bg-amber-100 shadow-2xl">
                <td><img className="h-20 w-50" src={book?.photo} alt="" /></td>
                <td>{book?.model_no}</td>
                <td>{book?.bookedTime}</td>
                <td>{book?.start_Date.split("T")[0]} </td>
                <td>{book?.end_Date.split("T")[0]} </td>
                <td>{book?.totalCost} Taka </td>
                <td>
                    <select 
                    onChange={(e)=>handleStatusChange(e,book._id)}
                     name="status"  defaultValue={book.status} className="select">
                        {/* <option disabled={true}>{book.status}</option> */}
                        <option>Pending</option>
                        <option>Confirm</option>
                        <option>Cancel</option>
                    </select>
                </td>
                <td>
                    <button
                        onClick={() => {
                        handleDelete(book._id);
                        }}
                        className="btn join-item text-red-600 hover:text-white btn-outline btn-error"
                    >
                        <MdDelete size={20} />
                        cancel
                    </button>
                </td>
                {/* <td>{booking?.model_no} </td>
                <td className="btn btn-primary btn-outline">
                  <Link to={`/applications/${booking._id}`}>View Applications</Link>
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyBookingsList;

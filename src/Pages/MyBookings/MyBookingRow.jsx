import axios from "axios";
import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { FaRegCalendarAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const MyBookingRow = ({ book, index, count,setCount}) => {
// console.log("book", book);
//   const [startingDate, setStartingDate] = useState(null);
// console.log(format(startingDate,'dd-MM-yyyy'));
// console.log(typeof(format(startingDate,'dd-MM-yyyy')))
  const [errorMessage, setErrorMessage] = useState(" ");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [diffDays, setDiffDays] = useState(null);
  const [dayCostMessage, setDayCostMessage] = useState(false);
  const [totalCost, setTotalCost] = useState(null);

  //   Booking_Id, applicant, bookedTime,  end_Date, model_no, photo, start_Date, _id,totalCost, Daily_Rent = book
  //book_id=book._id= bookingsCollection er _id
  //Booking_Id= carsCollection er _id
  const handleStatusChange = (e, book_id) => {
    console.log(e.target.value, book_id);
    axios.patch(`https://car-rent-server-lovat.vercel.app/bookings/${book_id}`, {status: e.target.value})
      .then((data) => {
        // console.log(data.data);
        if (data.data.modifiedCount) {
          toast.success("status is updated");
          setCount(count+1);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
                        //modify dates
            //error message
  useEffect(()=>{
    // console.log(new Date(startDate));
    // console.log(new Date(endDate));
    // console.log(typeof(new Date(startDate)))
      if( startDate && endDate){
        const start = new Date(startDate);
        const end = new Date(endDate);
        const diffTime = end-start;
        const diffDays = Math.ceil(diffTime/(1000*60*60*24))+1;
              // error message ke initially empty kore na rakhle ager data dhore rakhe
        setErrorMessage(" ");
        setDayCostMessage(false);
        if(diffDays<0){
          // console.log(diffDays);
          setErrorMessage("Error: Start Date is after the End Date");
          return;
        }
        else{
         setDayCostMessage(true);
          // console.log(diffDays);
          setDiffDays(diffDays);
          setTotalCost(diffDays*book.Daily_Rent)
        }
      }
  },[startDate,endDate,book.Daily_Rent]);
                    // handle confirm button
  const handleConfirm = (e,book_id) => {
    e.preventDefault();
    const start_Date = format(new Date(startDate), "EEEE, MMMM dd, yyyy, kk:mm:ss");
    const end_Date = format(new Date(endDate), "EEEE, MMMM dd, yyyy, kk:mm:ss");
    const editedBookingInfo = {start_Date, end_Date, totalCost}
    axios.patch(`https://car-rent-server-lovat.vercel.app/bookings/${book_id}`,editedBookingInfo)
    .then(data=>{
        // console.log(data.data);
        if(data.data.modifiedCount){
            toast.success("Booking Info is changed");
            setCount(count+1);
            // console.log(setCount)
             document.getElementById(`my_modal_1${book_id}`).close();
        }
    })
  };
  const handleCancel = (book_id) => {
    Swal.fire({
      title: "Are you sure to cancel this booking?",
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: "No",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.patch(`https://car-rent-server-lovat.vercel.app/bookings/${book_id}`, {status: "Cancel"})
          .then((data) => {
            console.log(data.data);
            if (data.data.modifiedCount) {
              toast.success("Booking is canceled");
              setCount(count+1);
              // console.log("data is canceled");
            }
          });
      }
    });
  };
  return (
    <>
      <tr key={book._id} className="hover:bg-amber-100 shadow-2xl p-0 border">
        <td className="text-sm" >{index + 1}</td>
        <td>
          <img className="h-20 w-35 rounded-xl" src={book?.photo} alt="" />
        </td>
        <td className="text-sm ">{book?.model_no}</td>
        <td className="text-sm "> 
          {book?.bookedTime.split(" ")[0]} <br />
          {book?.bookedTime.split(" ")[1]} {" "}
          {book?.bookedTime.split(" ")[2]} 
          {book?.bookedTime.split(" ")[3]} <br />
          {book?.bookedTime.split(" ")[4]}</td>
        {/* <td className="text-sm border p-0">{book?.bookedTime}</td> */}
        <td className="text-xs">
          {book?.start_Date.split(" ")[0]} <br />
          {book?.start_Date.split(" ")[1]} {" "}
          {book?.start_Date.split(" ")[2]} 
          {book?.start_Date.split(" ")[3]} <br />
          {book?.start_Date.split(" ")[4]} </td>
        <td className="text-xs ">
          {book?.start_Date.split(" ")[0]} <br />
          {book?.end_Date.split(" ")[1]}  {" "}
          {book?.end_Date.split(" ")[2]}
          {book?.end_Date.split(" ")[3]} <br />
          {book?.end_Date.split(" ")[4]}</td>
        <td className="text-sm">{book?.totalCost} <br /> Taka </td>
        <td className="text-sm">
          <select
            onChange={(e) => handleStatusChange(e, book._id)}
            name="status"
            value={book.status}
            className="select"
          >
            {/* <option disabled={true}>{book.status}</option> */}
            <option>Pending</option>
            <option>Confirm</option>
            <option>Cancel</option>
          </select>
        </td>
        <td>
          <div className="flex justify-center items-center gap-3">
            <div>
              <div>
                <button
                  onClick={() =>document.getElementById(`my_modal_1${book._id}`).showModal()}
                  className="btn btn-outline btn-info flex gap-3 items-center justify-center py-7"
                >
                  <FaRegCalendarAlt />
                  <span className="my-3">
                    Modify <br /> Dates
                  </span>
                </button>
                {/* modal */}
                <dialog id={`my_modal_1${book._id}`} className="modal">
                  <div className="modal-box space-y-2">
                    <p className="font-semibold">
                      {format(new Date(), "EEEE, MMMM dd, yyyy, kk:mm:ss")}
                    </p>
                    <h3 className="font-bold text-lg">Modify Booking Dates</h3>

                    <p className="">
                      Price Per Day:{" "}
                      <span className="font-bold">{book.Daily_Rent} Taka.</span>
                    </p>
                    {/* <DatePicker selected={startingDate} onChange={(date) => setStartingDate(date)} className="input input-bordered w-full" placeholderText="pick a date" dateFormat="dd-MM-yyyy"/> */}
                        <br />
                    <div>
                      <form className="space-y-2" onSubmit={(e)=>handleConfirm(e,book._id)}>
                        {/* Date */}
                        <label className="label"> Start Date:</label>
                        <input
                          type="date"
                          value={startDate}
                          onChange={(e) => setStartDate(e.target.value)}
                          name="start_date"
                          className="input w-full"
                          placeholder="mm/dd/yyyy"
                          required
                        ></input>
                        {/* end date */}
                        <label className="label"> End Date:</label>
                        <input
                          type="date"
                          value={endDate}
                          onChange={(e) => setEndDate(e.target.value)}
                          name="end_date"
                          className="input w-full"
                          placeholder="mm/dd/yyyy"
                          required
                        ></input>
                        {dayCostMessage && (
                          <div>
                            <p>
                              Booking for:{" "}
                              <span className="font-bold text-green-600">
                                {diffDays}{" "}
                              </span>
                              {diffDays > 1 ? " days" : " day"}
                            </p>
                            <p className="">
                              Total Cost:{" "}
                              <span className="font-bold text-green-600">
                                {totalCost}
                              </span>{" "}
                              Taka.
                            </p>
                          </div>
                        )}
                        {/* if there is a button in form, it will close the modal */}
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={() =>document.getElementById(`my_modal_1${book._id}`).close()}
                            className="btn"
                          >
                            Close
                          </button> 
                          <button type="submit" className="btn btn-success">
                            Confirm 
                          </button>
                        </div>
                        <p className="text-red-600 font-bold">{errorMessage}</p>
                      </form>
                    </div>
                  </div>
                </dialog>
              </div>
            </div>
            <div>
              <button
                onClick={() => {handleCancel(book._id)}}
                className="btn join-item text-red-600 hover:text-white btn-outline btn-error py-7"
              >
                <MdDelete size={20} />
                cancel
              </button>
            </div>
          </div>
        </td>
      </tr>
    </>
  );
};

export default MyBookingRow;

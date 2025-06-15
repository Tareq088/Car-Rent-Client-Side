import React, { use, useEffect, useState } from 'react';
import { FaCar, FaMapMarkerAlt, FaMoneyBillWave } from 'react-icons/fa';
import { TiTick } from 'react-icons/ti';
import { Link, useLoaderData } from 'react-router';
import { MdOutlineFeaturedVideo, MdDescription } from "react-icons/md";
import Button from '../../UI/Button';
import { format } from 'date-fns';
import { AuthContext } from '../../Contexts/AuthContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const CarDetail = () => {
    const car = useLoaderData();
    const{user} = use(AuthContext);
    console.log(user)
    console.log("car",car);
    const {Daily_Rent,User_name,availability,booking_Count,contact_info,description,email,features,model_no,photo,registration_no,location, _id:Booking_Id} = car || {};
    const [errorMessage, setErrorMessage] = useState(" ");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const[diffDays, setDiffDays] = useState(null);
    const[dayCostMessage,setDayCostMessage] = useState(false)
    const[totalCost, setTotalCost] = useState(null)
                  // calculate days
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
            setTotalCost(diffDays*Daily_Rent)
          }
          
        }
    },[startDate,endDate,Daily_Rent]);
                              //handle Booking
    const handleConfirmBooking = (e) =>{
      e.preventDefault();
      const start_Date = new Date(startDate);
      const end_Date = new Date(endDate);
      // console.log(start_Date,end_Date, Booking_Id )
      const editedTime = format(new Date(), "EEEE, MMMM dd, yyyy, kk:mm:ss")
      // console.log(start_Date,end_Date, editedTime);
      const bookingInfo = {
        Booking_Id, applicant: user?.email,photo,model_no, start_Date, end_Date, bookedTime, totalCost
      }
      //Booking_Id = carsCollection er _id
      console.log(bookingInfo)
                                  // confirmation booking korle data gulo bookingDB te send korbo
      axios.post("http://localhost:3000/bookings",bookingInfo)
      .then(data =>{
        console.log("after booking",data.data);
        if(data.data.insertedId){
          toast.success("Booking is done.");
          document.getElementById(`my_modal_1`).close();
        }
      })
    }
    //  console.log(startDate,endDate)
    return (
        <div className='bg-blue-50 '>
            <div className="flex flex-col gap-10 sm:flex-row items-center justify-around  w-11/12 mx-auto shadow-md py-10">
                    <figure className='  flex-1'>
                      <img
                        src={photo}
                        className="rounded-2xl w-full"
                        alt="Car Photo"
                      />
                    </figure>
                    <div className="card-body flex-1  ">
                      <h2 className="card-title font-bold text-3xl"><FaCar style={{color:"brown"}}></FaCar>{model_no}</h2>
                      <p className="flex gap-2 items-center">
                        <FaMoneyBillWave style={{color:"green"}}></FaMoneyBillWave>
                        <span className='font-bold text-base sm:text-lg'>Rental Price: Tk.</span> {Daily_Rent}/day 
                      </p>
                      <p className="flex gap-2 items-center text-base sm:text-lg">
                        <TiTick sm:size={25}  style={{color:"green"}}></TiTick>Available 
                      </p>
                      <div className="flex flex-col gap-2 ">
                            <span className='flex gap-2 items-center text-base sm:text-lg'>
                                <MdOutlineFeaturedVideo size={12} style={{color:"red"}}></MdOutlineFeaturedVideo>Features:
                            </span> 
                            {features.map((item,index) => <li key={index} className='ms-15'>{item}</li>)}
                      </div>
                      <div className="flex flex-col gap-2 ">
                            <span className='flex gap-2 items-center text-base sm:text-lg'>
                              <MdDescription size={12} style={{color:"red"}}></MdDescription> Description :
                            </span> 
                            {description.map((item,index) => <li key={index} className='ms-15'>{item}</li>)}
                      </div>
                      <div className="card-actions">
                                  {/* Open the modal using document.getElementById('ID').showModal() method */}
                        <button className="btn btn-success w-full font-bold text-lg" onClick={()=>document.getElementById('my_modal_1').showModal()}>Book Now</button>
                                                               {/* modal */}
                        <dialog id="my_modal_1" className="modal">
                           
                        <div className="modal-box space-y-2">
                          <p className='font-semibold'>{format(new Date(), "EEEE, MMMM dd, yyyy, kk:mm:ss")}</p>
                            <h3 className="font-bold text-lg">Booking Confirmation</h3>
                            <p className="">You are booking for: <span className='font-bold'>{model_no}</span></p>
                            <p className="">Price Per Day: <span className='font-bold'>{Daily_Rent} Taka.</span></p>
                            <p className="">Availability: <span className='font-bold text-green-700'>{availability}</span></p>
                            <div className="">
                              <form className='space-y-2' 
                                onSubmit={handleConfirmBooking}
                              >
                                        {/* Date */}
                                  <label className="label"> Start Date:</label>
                                  <input type='date' 
                                    value={startDate} 
                                    onChange={(e)=>setStartDate(e.target.value)} 
                                    name="start_date"  
                                    className="input w-full" 
                                    placeholder='mm/dd/yyyy' required>
                                  </input>
                                          {/* end date */}
                                  <label className="label"> End Date:</label>
                                  <input 
                                    type='date' 
                                    value={endDate} 
                                    onChange={(e)=>setEndDate(e.target.value)} 
                                    name="end_date"  className="input w-full" 
                                    placeholder='mm/dd/yyyy' required>
                                  </input>
                                  {
                                    dayCostMessage  && 
                                    <div>
                                      <p >Booking for: <span className='font-bold text-green-600'>{diffDays} </span> 
                                        { diffDays > 1 ? " days" : " day"}
                                      </p>
                                      <p className=''>Total Cost: <span className='font-bold text-green-600'>{totalCost}</span> Taka.</p>
                                    </div>
                                  }
                                        {/* if there is a button in form, it will close the modal */}
                                  <div className='flex gap-2'>
                                    <button type="button" onClick={()=>document.getElementById(`my_modal_1`).close()} className="btn">Close</button>
                                    {/* <Link to='/my-bookings' > */}
                                      <button type='submit' className="btn btn-success">Confirm Booking</button>
                                    {/* </Link> */}
                                  </div>
                                  <p className='text-red-600 font-bold'>{errorMessage}</p> 
                              </form>
                            </div>
                        </div>
                        </dialog>
                      </div>
                    </div>
                  </div>
        </div>
    );
};

export default CarDetail;
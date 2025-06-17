import React, { use, useEffect, useState } from 'react';
import { FaCar, FaMapMarkerAlt, FaMoneyBillWave } from 'react-icons/fa';
import { TiTick } from 'react-icons/ti';
import { Link, useLoaderData, useParams } from 'react-router';
import { MdOutlineFeaturedVideo, MdDescription } from "react-icons/md";
import Button from '../../UI/Button';
import { format } from 'date-fns';
import { AuthContext } from '../../Contexts/AuthContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import useDetailApi from '../../Api/useDetailApi';

const CarDetail = () => {
    // const car = useLoaderData();
    const {id} = useParams();
    const[car,setCar] = useState([]);
    const {user,setLoading} = use(AuthContext);
    const {detailPromise} = useDetailApi();
    
      useEffect(()=>{
        // fetch(`http://localhost:3000/carDetail/${id}`,
        //   {headers:{authorization: `Bearer ${user.accessToken}`}}
        // )
        // .then(res=>res.json())
        detailPromise(id)
        .then(data=>{
            setCar(data);
            console.log(data);
            setLoading(false)
        })
      },[id,setLoading])
    
    // console.log(user)
    // console.log("car",car);
    const {Daily_Rent,User_name,availability,booking_Count,contact_info,description,email,features,model_no,photo,registration_no,location, _id:Booking_Id} = car || {};
    const [errorMessage, setErrorMessage] = useState(" ");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const[diffDays, setDiffDays] = useState(null);
    const[dayCostMessage,setDayCostMessage] = useState(false)
    const[totalCost, setTotalCost] = useState(null);
        // initiaaly booking_count=0 set kora hoiche DB te
    const[bookingCount, setBookingCount] = useState(booking_Count);
    console.log(bookingCount, Booking_Id)
                  // calculate days
    useEffect(()=>{
        if( startDate && endDate){
          const start = new Date(startDate);
          const end = new Date(endDate);
          const diffTime = end-start;
          const diffDays = Math.ceil(diffTime/(1000*60*60*24))+1;
                    // error message ke initially empty kore na rakhle ager data dhore rakhe
          setErrorMessage(" ");
          setDayCostMessage(false);
          if(diffDays<0){
            setErrorMessage("Error: Start Date is after the End Date");
            return;
          }
          else{
            setDayCostMessage(true);
            setDiffDays(diffDays);
            setTotalCost(diffDays*Daily_Rent)
          }
        }
    },[startDate,endDate,Daily_Rent]);
                              //handle Booking
    const handleConfirmBooking = (e,Booking_Id) =>{
      e.preventDefault();
      const start_Date = format(new Date(startDate), "EEEE, MMMM dd, yyyy, kk:mm:ss");
      const end_Date = format(new Date(endDate), "EEEE, MMMM dd, yyyy, kk:mm:ss"); 
      const bookedTime = format(new Date(), "EEEE, MMMM dd, yyyy, kk:mm:ss");
                              // initially status ta confirm kore dilam
      const bookingInfo = {
        Booking_Id, applicant: user?.email,photo,model_no, start_Date, end_Date, bookedTime, totalCost,status:"Confirm"
      }
      //Booking_Id = carsCollection er _id
                                  // confirmation booking korle data gulo bookingDB te send korbo
      axios.post("http://localhost:3000/bookings",bookingInfo)
      .then(data =>{
        // console.log("after booking",data.data);
        if(data.data.insertedId){
          toast.success("Booking is done.");
          document.getElementById(`my_modal_1`).close();
        }
      })
                          //  carsCollection er car_id booking_count o  1 barabo
                          //  carsCollection er _id = Booking_Id
      axios.patch(`http://localhost:3000/available-cars/${Booking_Id}/increment`)
      .then(data=>{
        console.log(data.data);
        if(data.data.modifiedCount){
            setBookingCount(prev => prev+1);
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
                            {features?.map((item,index) => <li key={index} className='ms-15'>{item}</li>)}
                      </div>
                      <div className="flex flex-col gap-2 ">
                            <span className='flex gap-2 items-center text-base sm:text-lg'>
                              <MdDescription size={12} style={{color:"red"}}></MdDescription> Description :
                            </span> 
                            {description?.map((item,index) => <li key={index} className='ms-15'>{item}</li>)}
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
                            <div>
                              <form className='space-y-2' 
                                onSubmit={(e)=>{handleConfirmBooking(e, Booking_Id)}}
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
                                 
                                      <button type='submit' className="btn btn-success">Confirm Booking</button>
              
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
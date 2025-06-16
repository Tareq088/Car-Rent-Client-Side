import React, { use, useEffect, useState } from "react";
import { AuthContext } from "../../Contexts/AuthContext";
import { Link, useNavigate, useNavigation } from "react-router";
import { GrUpdate } from "react-icons/gr";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import Loading from "../Loading/Loading";

const MyCars = () => {
  const { user} = use(AuthContext);
  const [emailData, setEmailData] = useState([]);
  const[count,setCount] = useState(0);
  const[sortOrder, setSortOrder] = useState("asc")
  // console.log(user.email);
  
    useEffect(()=>{
      fetch(`http://localhost:3000/cars?email=${user.email}&sort=${sortOrder}`)
        .then((res) => res.json())
        .then((data) => {
          console.log("data", data);
          setEmailData(data);
        });
      },[user.email, count,sortOrder])

    // console.log("emailed data",emailData)
    const handleDelete = (id) =>{
        // console.log("deleted",id)
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
    const handleUpdateCar = (e,id)=>{
      e.preventDefault();
      console.log("id :", id);
      const form = e.target;
      const formData = new FormData(form);
      const updatedCarData = Object.fromEntries(formData.entries());
      console.log(updatedCarData);
                                          //features in array
      updatedCarData.features = updatedCarData.features.split(",").map(req=> req.trim(" "));
                                        // description in array
      updatedCarData.description = updatedCarData.description.split(",").map(req=> req.trim(" "));
        const {Daily_Rent, availability, description,location,
                                                  features, model_no, photo, registration_no} =  updatedCarData || {};
      axios.patch(`http://localhost:3000/cars/${id}`, updatedCarData)
      .then(data=>{
        // console.log("updated data",data.data);
        if(data.data.modifiedCount){  
                        toast.success("Car data are updated successfully")  ;   
                        setCount(count+1);
                        document.getElementById(`my_modal_1${id}`).close();
                      }                        
      }) 
    }

  return (
    <>
      <h2 className="font-bold text-center text-2xl text-amber-800 my-5">My Cars</h2>
           {/* sort selector */}
          <div className="text-center">
              <select name='choose' 
                        Value={sortOrder}
                        onChange={(e)=>setSortOrder(e.target.value)}
                        className="select select-bordered"  >
                          {/* <option selected disabled={true}>select </option> */}
                          <option value="asc" selected>Price: Low to High</option>
                          <option value="des">Price: High to Low</option>
                </select> 
          </div>
      {
        
        emailData?.length == 0 ?
          <div className="flex flex-col items-center justify-center space-y-3 my-10">
              <h2 className="font-bold">Yet No car is added. Add Now! </h2>
              <Link to="/add-car" className="btn btn-success">Add A Car</Link>
          </div>
        :
          <div className="overflow-x-auto max-w-11/12 mx-auto my-5">
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
                            // rows start
                  <tr key={listData._id} className="border hover:bg-amber-100">
                    <th className="text-xs sm:text-base">{index + 1}.</th>
                    <td> <img className="h-25 w-40 rounded-xl" src={listData.photo} alt="car_img"/> </td>
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
                        {/* Open the modal using document.getElementById('ID').showModal() method */}
                            <button 
                              className="btn btn-success w-full font-bold join-item text-green-700 hover:text-white btn-outline" 
                              onClick={()=>document.getElementById(`my_modal_1${listData._id}`).showModal()}> 
                              <GrUpdate size={20}/>
                              UPDATE 
                            </button>
                                                              {/* modal */}
                            <dialog id={`my_modal_1${listData._id}`} className="modal">
                              <div className="modal-box space-y-2">
                                  <div>
                                    <form  className='space-y-2' 
                                              onSubmit={(e)=>{handleUpdateCar(e,listData._id)}}
                                              >
                                        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs sm:w-sm md:w-md border p-4">
                                          <legend className="fieldset-legend text-red-700 font-bold text-lg md:text-2xl">Update Car Info</legend>
                                                  {/* title */}
                                          <label className="label">Car Model</label>
                                          <input type="text" name='model_no' className="input w-full" placeholder="Model No" required/>
                                                  {/* rent */}
                                          <label className="label">Daily Rental Price</label>
                                          <div className='flex'>
                                              <input type="number" name='Daily_Rent' className="input w-full" placeholder="Rent Price" required/>
                                              <input type="text" name='rent_Unit' value="Taka" className="input w-[30%]" placeholder="Taka" readOnly/>
                                          </div>
                                                      {/* availability */}
                                          <label className="label">Availability</label>
                                          <select name='availability' defaultValue="availability" className="select w-full"  required>
                                              <option disabled={true}>select availability</option>
                                              <option>Yes</option>
                                              <option>No</option>
                                          </select> 
                                                      {/* Registration Number */}
                                          <label className="label">Registration Number</label>
                                          <input type="text" name='registration_no' className="input w-full" placeholder="Dhaka-Metro-Kha-15-1229" required/>
                                                      {/* Features */}
                                          <label className="label">Features</label>
                                          <textarea name="features" cols={5} rows={10} className="input w-full"  placeholder='Enter the features' required></textarea>
                                                      {/* Description */}
                                          <label className="label"> Description </label>
                                          <textarea name="description" cols={5} rows={10} className="input w-full"  placeholder='Write the description' required></textarea>
                                                  
                                                      {/* Image URL */}
                                          <label className="label"> Image URL </label>
                                          <input type='url' name="photo"  className="input w-full" placeholder='https://example.com' required></input>
                                                      {/* Location */}
                                          <label className="label"> Location </label>
                                          <input type='text' name="location"  className="input w-full" placeholder='Location' required></input>
                                        </fieldset>   
                                        <div className="flex justify-between">
                                          <button type="button" 
                                          onClick={()=>document.getElementById(`my_modal_1${listData._id}`).close()} 
                                          className="btn btn-soft">Close</button>
                                          
                                          <button type="submit" 
                                          className="btn btn-success">Save Changes</button>
                                        </div>        
                                    </form>
                                                  {/* if there is a button in form, it will close the modal */}
                                      {/* <form method="dialog" >
                                          <button className="btn">Close</button>
                                      </form> */}
                                  </div>
                              </div>
                            </dialog>
                        <button
                          onClick={() => {
                            handleDelete(listData._id);
                          }}
                          className="btn join-item text-red-600 hover:text-white btn-outline btn-error"
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
      }; 
    </>
  );
};

export default MyCars;

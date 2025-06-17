import React, { use } from 'react';
import { AuthContext } from '../../Contexts/AuthContext';
import Button from '../../UI/Button';
import { format } from 'date-fns';
import axios from 'axios';
import { toast } from 'react-toastify';

const AddCar = () => {
    const{user}= use(AuthContext);
    // console.log(user.accessToken)
    const handleAddCar = (e) =>{
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const  carData = Object.fromEntries(formData.entries());
                            //features in array
         carData.features = carData.features.split(",").map(req=> req.trim(" "));
                            // description in array
         carData.description = carData.description.split(",").map(req=> req.trim(" "));
         carData.add_Time= format(new Date(), "EEEE, MMMM dd, yyyy, kk:mm:ss");
        console.log( carData);
        const {Daily_Rent, User_name, availability, booking_Count, contact_info, description, email, 
                                                            features, model_no, photo, registration_no} =  carData || {};

        axios.post("http://localhost:3000/cars",carData)
        .then(data=>{
            console.log(data.data);
            if(data.data.insertedId){
                toast.success("car data is added to DB successfully")
            }
        })
    }
    return (
        <div>
            <div className='w-11/12 mx-auto flex justify-center'>
            <p className='font-semibold'>{format(new Date(), "EEEE, MMMM dd, yyyy, kk:mm:ss")}</p>
                <form onSubmit={handleAddCar}>
                <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs sm:w-sm md:w-md border p-4">
                    <legend className="fieldset-legend text-red-700 font-bold text-lg md:text-2xl">Add Car Info</legend>
                            {/* title */}
                    <label className="label">Car Model</label>
                    <input type="text" name='model_no' className="input w-full" placeholder="Model No"/>
                            {/* rent */}
                    <label className="label">Daily Rental Price</label>
                    <div className='flex'>
                        <input type="number" name='Daily_Rent' className="input w-full" placeholder="Rent Price"/>
                        <input type="text" name='rent_Unit' value="Taka" className="input w-[30%]" placeholder="Taka" readOnly/>
                    </div>
                                {/* availability */}
                    <label className="label">Availability</label>
                    <select name='availability' defaultValue="availability" className="select w-full"  >
                        <option disabled={true}>select availability</option>
                        <option>Yes</option>
                        <option>No</option>
                    </select> 
                                {/* Registration Number */}
                    <label className="label">Registration Number</label>
                    <input type="text" name='registration_no' className="input w-full" placeholder="Dhaka-Metro-Kha-15-1229"/>
                                {/* Features */}
                    <label className="label">Features</label>
                    <textarea name="features" cols={5} rows={10} className="input w-full"  placeholder='Enter the features'></textarea>
                                {/* Description */}
                    <label className="label"> Description </label>
                    <textarea name="description" cols={5} rows={10} className="input w-full"  placeholder='Write the description'></textarea>
                                {/* Booking count */}
                    <label className="label"> Booking count </label>
                    <input type='number' defaultValue="0" name="booking_Count" className="input w-full" placeholder='Booking Count(Default Count = 0)'></input>
                                {/* Image URL */}
                    <label className="label"> Image URL </label>
                    <input type='url' name="photo"  className="input w-full" placeholder='https://example.com'></input>
                                {/* Location */}
                    <label className="label"> Location </label>
                    <input type='text' name="location"  className="input w-full" placeholder='Location'></input>
                             
                                        {/* contact info */}
                    <label className="label">Contact Info</label>
                    <input type="tel" name='contact_info' className="input w-full" placeholder="Contact Information" />
                                    
                                        {/* email */}
                    <label className="label">Email</label>
                    <input type="email" name='email' value={user?.email} className="input w-full" placeholder="Email" readOnly/>
                                    {/* user name */}
                    <label className="label">User Name</label>
                    <input type="text" name='User_name' value={user?.displayName} className="input w-full" placeholder="User Name" readOnly />
            
                    <div className='text-center'>
                        <Button type="submit" label="Add Car" size={60}></Button>
                    </div>
                    
                </fieldset>
                </form>
            </div>
        </div>
    );
};

export default AddCar;
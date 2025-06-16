import React, { useState } from 'react';
import { FaRegCheckCircle } from 'react-icons/fa';
import bookingImage from "../../assets/booking.jpg";
import { AnimatePresence, motion } from "motion/react"
import { Link } from 'react-router';

const ExtraSection = () => {
    const [textType, setTextType] = useState("one");
    const[activeRent,setActiveRent] = useState(true);
    const[activeFind,setActiveFind] = useState(false);
    const content = {
        one: (
            <div>
                <ol className='space-y-2'>
                    <li className='flex gap-1 items-center'> <FaRegCheckCircle color='green'> </FaRegCheckCircle> <span className='text-xs sm:text-sm '>Go to Available Cars</span></li>
                    <li className='flex gap-1 items-center'> <FaRegCheckCircle color='green'> </FaRegCheckCircle> <span className='text-xs sm:text-sm '>Search by Brand Name or Location</span></li>
                    <li className='flex gap-1 items-center'> <FaRegCheckCircle color='green'> </FaRegCheckCircle> <span className='text-xs sm:text-sm '>Choose Your Car and Book Now With Your expected Journey Dates</span></li>
                    <li className='flex gap-1 items-center'> <FaRegCheckCircle color='green'> </FaRegCheckCircle> <span className='text-xs sm:text-sm '>You can change your Journey time from My Bookings Tab</span></li>
                    <li className='flex gap-1 items-center'> <FaRegCheckCircle color='green'> </FaRegCheckCircle> <span className='text-xs sm:text-sm '>Thats All!</span></li>
                </ol>
                <Link to='/available-cars'> 
                    <button className='btn btn-outline btn-primary mt-5 '>Get Started</button>
                </Link>
            </div>
        ),
        two: (
            <div>
                <ol className='space-y-2'>
                    <li className='flex gap-1 items-center'> <FaRegCheckCircle color='green'> </FaRegCheckCircle> <span className='text-xs sm:text-sm '>Go to Add Car Tab</span></li>
                    <li className='flex gap-1 items-center'> <FaRegCheckCircle color='green'> </FaRegCheckCircle> <span className='text-xs sm:text-sm '>Fill The Car Details</span></li>
                    <li className='flex gap-1 items-center'> <FaRegCheckCircle color='green'> </FaRegCheckCircle> <span className='text-xs sm:text-sm '>You Can Update or Delete Your Car.</span></li>
                    <li className='flex gap-1 items-center'> <FaRegCheckCircle color='green'> </FaRegCheckCircle> <span className='text-xs sm:text-sm '>That is it! Ready to move in?</span></li>
                </ol>
                <Link to='/add-car'> 
                    <button className='btn btn-outline btn-primary mt-5'>Get Started</button>
                </Link>
            </div>
        ),
    };
    return (
        <div>
            <div className='w-11/12 mx-auto h-full'>
                <div className='flex  flex-col sm:flex-row-reverse py-5'>
                    <div className='w-full text-center'>
                        <h2 className='font-bold text-center text-2xl text-amber-800 mb-5"'>How It Works</h2>
                        <div className="p-6 space-y-4">
                            <div className="space-x-4 flex">
                                <button 
                                // className={({isActive})=> isActive ? 'underline text-green-600' : ''}
                                    onClick={() => {setTextType("one");
                                                    setActiveRent(true);
                                                    setActiveFind(false);
                                                    }
                                            }
                                    className={`px-4 py-2 bg-gray-500 text-xs sm:text-base text-white rounded cursor-pointer ${activeRent && "bg-green-500" }`}
                                >
                                Rent A Car
                                </button>
                                <button 
                                // className={({isActive})=> isActive ? 'underline text-red-600' : ''}
                                onClick={() => {setTextType("two");
                                                setActiveFind(true);
                                                setActiveRent(false);
                                                }
                                        }
                                className={`px-4 py-2 bg-gray-500 text-xs sm:text-base text-white rounded cursor-pointer ${activeFind && "bg-green-500" }`}
                                >
                                Add A Car
                                </button>
                            </div>

                            <div className="mt-6 ">
                                <AnimatePresence mode="wait">
                                <motion.div
                                    key={textType}
                                    initial={{ x: 300, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    exit={{ x: -300, opacity: 0 }}
                                    transition={{ duration: 0.5 }}
                                    className="text-xl"
                                >
                                    {content[textType]}
                                </motion.div>
                                </AnimatePresence>
                            </div>
                        </div>

                    </div>
                    <div className='w-full'>
                        <img className='w-full' src={bookingImage} alt="" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ExtraSection;
import React, { use } from 'react';
import { Link, NavLink, useNavigate } from 'react-router';
import carLogo from "../../assets/car logo.jpg"
import { AuthContext } from '../../Contexts/AuthContext';
import Swal from 'sweetalert2';
import { Tooltip } from 'react-tooltip';
import { FaUserCircle } from 'react-icons/fa';

const Navbar = () => {
    const {user, logOutUer} = use(AuthContext);
    const navigate = useNavigate();
    const navList = <>
                <li className='text-lg'><NavLink to='/home' className={({isActive})=> isActive ? 'underline text-green-600' : ''}>Home</NavLink></li>
                <li className='text-lg'><NavLink to='/available-cars' className={({isActive})=> isActive ? 'underline text-green-600' : ''}>Available Cars</NavLink></li>
                {
                    user &&
                    <>
                        <li className='text-lg'><NavLink to='/add-car' className={({isActive})=> isActive ? 'underline text-green-600' : ''}>Add Car</NavLink></li>
                        <li className='text-lg'><NavLink to='/my-cars' className={({isActive})=> isActive ? 'underline text-green-600' : ''}>My Cars</NavLink></li>
                        <li className='text-lg'><NavLink to='/my-bookings' className={({isActive})=> isActive ? 'underline text-green-600' : ''}>My Bookings</NavLink></li>
                    </>
                }
            </>
    const handleLogOut = () =>{
        logOutUer()
        .then(()=>{
            Swal.fire({icon:"success", title:"Logged Out"});
            navigate("/login");
        })
        .catch(error =>{
            Swal.fire({icon:"error", title:`${error.message}`});
        })
    }
    return (
    <div className='bg-base-200 sticky z-10 top-0'>
            <div className="navbar justify-center items-center w-full sm:w-11/12 mx-auto pr-4 sm:px-0 py-0">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 px-2 shadow">
                           {navList}
                        </ul>
                    </div >
                    <div className='flex gap-2 items-center'>
                    <img className='hidden sm:block sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full' src={carLogo}></img>
                    <div className="text-xs md:text-base lg:text-xl text-red-800">
                        <Link to='/' >Find Car</Link>
                       
                    </div>
                   
                    </div>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {navList}
                    </ul>
                </div>
                <div className="navbar-end h-10">
                    <div className="flex items-center gap-1">
                        {
                            user?
                            <div>
                                <a data-tooltip-id="my-tooltip" data-tooltip-content={`user: ${user?.email}(${user?.displayName})`} className='w-8 p-0.5 rounded-full'>
                                    <img className='rounded-full w-12' src={user?.photoURL}></img>
                                </a>
                                <Tooltip id="my-tooltip" />
                            </div>
                            :
                            <div className='cursor-pointer' onClick={()=>navigate('/auth/login')}>
                                <FaUserCircle  size={35}></FaUserCircle>
                            </div>
                        } 
                   
                        
                            {
                                user?
                                <button onClick={handleLogOut} className="btn btn-outline mr-1 text-xs md:text-base p-1 sm:p-2 text-blue-600 hover:text-red-600">Log Out</button>
                                :
                                <Link to='/login' className="btn btn-outline mr-1 text-xs md:text-base p-1 sm:p-2 text-blue-600 hover:text-red-600">Log In</Link>
                            }
                  
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
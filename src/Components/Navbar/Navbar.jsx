import React, { use } from 'react';
import { Link, NavLink } from 'react-router';
import carLogo from "../../assets/car logo.jpg"
import { AuthContext } from '../../Contexts/AuthContext';

const Navbar = () => {
    const {} = use(AuthContext);
    const navList = <>
                <li className='text-lg'><NavLink to='/' className={({isActive})=> isActive ? 'underline text-green-600' : ''}>Home</NavLink></li>
                <li className='text-lg'><NavLink to='/find_roommate' className={({isActive})=> isActive ? 'underline text-green-600' : ''}>Available Cars</NavLink></li>
            </>
    return (
    <div className='bg-base-200'>
            <div className="navbar w-full sm:w-11/12 mx-auto pr-4 sm:px-0">
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
                <div className="navbar-end">
                    <div className="flex items-center gap-0.5">
                        <div className='flex'>
                            <Link to='/login' className="btn btn-outline mr-1 text-xs md:text-base p-1 sm:p-2 text-blue-600 hover:text-red-600">Log In</Link>
                        
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
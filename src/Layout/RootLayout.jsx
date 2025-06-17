import React from 'react';
import Navbar from '../Components/Navbar/Navbar';
import { Outlet } from 'react-router';
import Footer from './../Components/Footer/Footer';
import Home from '../Pages/Home/Home';

const RootLayout = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Home></Home>
            <Outlet></Outlet>
            <Footer></Footer>
            
        </div>
    );
};

export default RootLayout;
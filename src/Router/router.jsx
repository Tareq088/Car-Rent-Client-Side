import { createBrowserRouter } from "react-router";
import RootLayout from "../Layout/RootLayout";
import Home from './../Pages/Home/Home';
import LogIn from "../Pages/LogIn/logIn";
import SignUp from "../Pages/Register/signUp";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import AddCar from "../Pages/AddCar/AddCar";
import PrivateRoutes from './../Routes/PrivateRoutes';
import MyBookings from './../Pages/MyBookings/MyBookings';
import MyCars from './../Pages/MyCars/MyCars';
import AvailableCars from "../Pages/AvailableCars/AvailableCars";
import Loading from "../Pages/Loading/Loading";
import CarDetail from './../Pages/CarDetails/CarDetail';
import Contact from "../Pages/Contact/Contact";

export const router = createBrowserRouter([
  {
    path: "/",
    element:<RootLayout></RootLayout>,
    children:[
        {
          index:true,
          path:"/",
          Component:Home ,
        },
        {
          path:"/available-cars",
          hydrateFallbackElement:<Loading></Loading>,
          loader:()=>fetch("https://car-rent-server-lovat.vercel.app/available-cars"),
          Component:AvailableCars
        },
        {
          path:"/contact",
          Component:Contact,
        },
        {
          path:"/carDetail/:id",
          hydrateFallbackElement:<Loading></Loading>,
          // loader: ({params})=>fetch(`https://car-rent-server-lovat.vercel.app/carDetail/${params.id}`),
          element:<PrivateRoutes><CarDetail></CarDetail></PrivateRoutes>
        },
        {
          path:"/add-car",
          element:<PrivateRoutes><AddCar></AddCar></PrivateRoutes>
        },
        {
          path:"/my-cars",
          hydrateFallbackElement:<Loading></Loading>,
          element:<PrivateRoutes><MyCars></MyCars></PrivateRoutes>
        },
        {
          path:"/my-bookings",
          element:<PrivateRoutes><MyBookings></MyBookings></PrivateRoutes>
        },
        {
          path:'/login',
          Component:LogIn
        },
        {
          path:'/signup',
          Component: SignUp
        }
    ]
  },
  {
    path:"/*",
    Component: ErrorPage
  }
]);
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
import CarDetail from "../Pages/CarDetails/CarDetail";


export const router = createBrowserRouter([
  {
    path: "/",
    element:<RootLayout></RootLayout>,
    children:[
        {
          index:true,
          path:"/home",
          Component:Home,
        },
        {
          path:"/available-cars",
          hydrateFallbackElement:<Loading></Loading>,
          loader:()=>fetch("http://localhost:3000/available-cars"),
          Component:AvailableCars
        },
        {
          path:"/carDetail/:id",
          hydrateFallbackElement:<Loading></Loading>,
          loader: ({params})=>fetch(`http://localhost:3000/carDetail/${params.id}`),
          Component:CarDetail
        },
        {
          path:"/add-car",
          element:<PrivateRoutes><AddCar></AddCar></PrivateRoutes>
        },
        {
          path:"/my-cars",
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
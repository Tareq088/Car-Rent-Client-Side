import { createBrowserRouter } from "react-router";
import RootLayout from "../Layout/RootLayout";
import Home from './../Pages/Home/Home';
import LogIn from "../Pages/LogIn/logIn";
import SignUp from "../Pages/Register/signUp";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import AddCar from "../Pages/AddCar/AddCar";
import PrivateRoutes from './../Routes/PrivateRoutes';


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
          path:"/add-car",
          element:<PrivateRoutes><AddCar></AddCar></PrivateRoutes>
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
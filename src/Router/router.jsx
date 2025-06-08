import { createBrowserRouter } from "react-router";
import RootLayout from "../Layout/RootLayout";
import Home from './../Pages/Home/Home';
import LogIn from "../Pages/LogIn/logIn";
import SignUp from "../Pages/Register/signUp";


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
          path:'/login',
          Component:LogIn
        },
        {
          path:'/signup',
          Component: SignUp
        }
    ]
  },
]);
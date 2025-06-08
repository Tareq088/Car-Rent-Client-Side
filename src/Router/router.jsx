import { createBrowserRouter } from "react-router";
import RootLayout from "../Layout/RootLayout";
import home from './../Pages/Home/home';

export const router = createBrowserRouter([
  {
    path: "/",
    element:<RootLayout></RootLayout>,
    children:[
        {
            index:true,
            path:"/home",
            Component:home,
        }
    ]
  },
]);
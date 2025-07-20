import { createBrowserRouter } from "react-router";
import RootLayout from "../Layouts/RootLayout/RootLayout";
import HomePage from "../Pages/Home/HomePage";
import AddEventFormPage from "../Pages/EventForm/AddEventFormPage";


export const router = createBrowserRouter([
  {
    path:'/',
    Component:RootLayout,
    children:[
      {
         index:true,
         Component: HomePage
      }
    ]
  },
    {
        path:"/addEventForm",
        Component: AddEventFormPage
    }
])
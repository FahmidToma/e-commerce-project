import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home";
import Menu from "../Pages/Menu/Menu/Menu";
import Order from "../Pages/Order/Order/Order";
import ContactUs from "../Pages/Contact/ContactUs/ContactUs";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUp/SignUp";
import PrivateRoute from "./PrivateRoute";
import Cart from "../Pages/Dashboard/Cart/Cart";
import Dashboard from "../Layout/Dashboard";
import AllUsers from "../Pages/Dashboard/AllUsers/AllUsers";
import AddItems from "../Pages/Dashboard/AddItems/AddItems";
import AdminRoute from "./AdminRoute";
import ManageItems from "../Pages/Dashboard/ManageItems/ManageItems";
import UpdateItem from "../Pages/Dashboard/UpdateItem/UpdateItem";
import Payment from "../Pages/Dashboard/Payment/Payment";
import PaymentHistory from "../Pages/Dashboard/PaymentHistory/PaymentHistory";
import UserHome from "../Pages/Dashboard/UserHome/UserHome";
import AdminHome from "../Pages/Dashboard/AdminHome/AdminHome";
import Review from "../Pages/Dashboard/Review/Review";
import ForgetPassword from "../Pages/ForgetPassword/ForgetPassword";
import Reservation from "../Pages/Dashboard/Reservation/Reservation";
import MyBookings from "../Pages/Dashboard/MyBookings/MyBookings";
import ManageBookings from "../Pages/Dashboard/ManageBookings/ManageBookings";
import NotFound from "@/Pages/NotFound/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "menu",
        element: <Menu></Menu>,
      },
      {
        path: "shop/:category",
        element: <Order></Order>,
      },
      {
        path: "contact",
        element: <ContactUs></ContactUs>,
      },
      {
        path: "login",
        element: <Login></Login>,
      },
      {
        path: "forgetPassword",
        element: <ForgetPassword></ForgetPassword>,
      },
      {
        path: "signup",
        element: <SignUp></SignUp>,
      },
      {
        path: "*",
        element: <NotFound></NotFound>,
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <Dashboard></Dashboard>
      </PrivateRoute>
    ),
    children: [
      //user routes
      {
        path: "userHome",
        element: (
          <PrivateRoute>
            <UserHome></UserHome>
          </PrivateRoute>
        ),
      },
      {
        path: "cart",
        element: (
          <PrivateRoute>
            <Cart></Cart>
          </PrivateRoute>
        ),
      },
      {
        path: "payment",
        element: (
          <PrivateRoute>
            <Payment></Payment>
          </PrivateRoute>
        ),
      },
      {
        path: "paymentHistory",
        element: (
          <PrivateRoute>
            <PaymentHistory></PaymentHistory>
          </PrivateRoute>
        ),
      },
      {
        path: "addReview",
        element: (
          <PrivateRoute>
            <Review></Review>
          </PrivateRoute>
        ),
      },

      {
        path: "reservation",
        element: (
          <PrivateRoute>
            <Reservation></Reservation>
          </PrivateRoute>
        ),
      },
      {
        path: "bookings",
        element: (
          <PrivateRoute>
            <MyBookings></MyBookings>
          </PrivateRoute>
        ),
      },
      //admin routes
      {
        path: "adminHome",
        element: (
          <AdminRoute>
            <AdminHome></AdminHome>
          </AdminRoute>
        ),
      },
      {
        path: "addItems",
        element: (
          <AdminRoute>
            <AddItems></AddItems>
          </AdminRoute>
        ),
      },
      {
        path: "allUsers",
        element: (
          <AdminRoute>
            <AllUsers></AllUsers>
          </AdminRoute>
        ),
      },
      {
        path: "manageItems",
        element: (
          <AdminRoute>
            <ManageItems></ManageItems>
          </AdminRoute>
        ),
      },
      {
        path: "updateItem/:id",
        element: (
          <AdminRoute>
            <UpdateItem></UpdateItem>
          </AdminRoute>
        ),
        loader: ({ params }) =>
          fetch(
            `https://e-commerce-project-server-demz.onrender.com/menu/${params.id}`
          ),
      },
      {
        path: "manageBookings",
        element: (
          <AdminRoute>
            <ManageBookings></ManageBookings>
          </AdminRoute>
        ),
      },
      {
        path: "*",
        element: <NotFound></NotFound>,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound></NotFound>,
  },
]);

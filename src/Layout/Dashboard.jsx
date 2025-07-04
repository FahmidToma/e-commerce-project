import { BiSolidContact } from "react-icons/bi";
import { FaCalendarAlt, FaHome, FaUser } from "react-icons/fa";
import { FaBagShopping, FaListUl } from "react-icons/fa6";
import { IoMdAddCircle, IoMdHome } from "react-icons/io";
import { IoCart, IoMenu } from "react-icons/io5";
import { MdLibraryBooks, MdPayment, MdRateReview } from "react-icons/md";
import { NavLink, Outlet } from "react-router-dom";
import useCart from "../hooks/useCart";
import useAdmin from "../hooks/useAdmin";
import { RiAdminLine } from "react-icons/ri";
import useRole from "../hooks/useRole";
//import { SkeletonCard } from "@/Components/ui/skeleton/skeletonCard";
import { FadeLoader } from "react-spinners";

const Dashboard = () => {
  const [cart] = useCart();
  const [isAdmin, isAdminLoading] = useAdmin();
  const { role, toggoleRole } = useRole();

  if (isAdminLoading)
    return (
      <div className="flex justify-center items-center h-full">
        <FadeLoader color="#ff8c42" aria-label="Loading Spinner"></FadeLoader>
      </div>
    );

  return (
    <div className="flex flex-col md:flex-row overflow-hidden md:min-h-screen">
      <div className="w-full h-1/2 md:w-[280px] md:h-auto flex-shrink-0  bg-orange-400 ">
        <ul className="dashboardMenu p-2 flex flex-row md:flex-col">
          <div>
            {isAdmin && (
              <button
                onClick={toggoleRole}
                className="text-white btn rounded-none bg-orange-300 border-none "
              >
                Switch to {role === "admin" ? "user" : "Admin"} View
              </button>
            )}
            {role === "admin" && isAdmin ? (
              <>
                <li className="flex  p-2">
                  <RiAdminLine className="text-2xl mr-1"></RiAdminLine>
                  <NavLink
                    to="/dashboard/adminHome"
                    className={({ isActive }) =>
                      isActive ? "text-black" : "text-white"
                    }
                  >
                    ADMIN HOME
                  </NavLink>
                </li>

                <li className="flex text-white p-2">
                  <IoMdAddCircle className="text-2xl  mr-1"></IoMdAddCircle>
                  <NavLink
                    to="/dashboard/addItems"
                    className={({ isActive }) =>
                      isActive ? "text-black" : "text-white"
                    }
                  >
                    ADD ITEMS
                  </NavLink>
                </li>
                <li className="flex text-white p-2">
                  <FaListUl className="text-2xl  mr-1"></FaListUl>
                  <NavLink
                    to="/dashboard/manageItems"
                    className={({ isActive }) =>
                      isActive ? "text-black" : "text-white"
                    }
                  >
                    MANAGE ITEMS
                  </NavLink>
                </li>
                <li className="flex text-white p-2">
                  <MdLibraryBooks className="text-2xl  mr-1"></MdLibraryBooks>
                  <NavLink
                    to="/dashboard/manageBookings"
                    className={({ isActive }) =>
                      isActive ? "text-black" : "text-white"
                    }
                  >
                    MANAGE BOOKING
                  </NavLink>
                </li>
                <li className="flex text-white p-2">
                  <FaUser className="text-2xl  mr-1"></FaUser>
                  <NavLink
                    to="/dashboard/allUsers"
                    className={({ isActive }) =>
                      isActive ? "text-black" : "text-white"
                    }
                  >
                    ALL USERS
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li className="flex text-white p-2">
                  <FaHome className="text-2xl  mr-1"></FaHome>
                  <NavLink
                    to="/dashboard/userHome"
                    className={({ isActive }) =>
                      isActive ? "text-black" : "text-white"
                    }
                  >
                    User Home
                  </NavLink>
                </li>
                <li className="flex text-white p-2">
                  <FaCalendarAlt className="text-2xl  mr-1"></FaCalendarAlt>
                  <NavLink
                    to="/dashboard/reservation"
                    className={({ isActive }) =>
                      isActive ? "text-black" : "text-white"
                    }
                  >
                    Reservation
                  </NavLink>
                </li>
                <li className="flex text-white p-2">
                  <MdPayment className="text-2xl  mr-1"></MdPayment>
                  <NavLink
                    to="/dashboard/paymentHistory"
                    className={({ isActive }) =>
                      isActive ? "text-black" : "text-white"
                    }
                  >
                    Payment History
                  </NavLink>
                </li>
                <li className="flex text-white p-2">
                  <IoCart className="text-2xl  mr-1"></IoCart>
                  <NavLink
                    to="/dashboard/cart"
                    className={({ isActive }) =>
                      isActive ? "text-black" : "text-white"
                    }
                  >
                    My Cart({cart.length})
                  </NavLink>
                </li>
                <li className="flex text-white p-2">
                  <MdRateReview className="text-2xl  mr-1"></MdRateReview>
                  <NavLink
                    to="/dashboard/addReview"
                    className={({ isActive }) =>
                      isActive ? "text-black" : "text-white"
                    }
                  >
                    Add Review
                  </NavLink>
                </li>
                <li className="flex text-white p-2">
                  <MdRateReview className="text-2xl  mr-1"></MdRateReview>
                  <NavLink
                    to="/dashboard/bookings"
                    className={({ isActive }) =>
                      isActive ? "text-black" : "text-white"
                    }
                  >
                    My Bookings
                  </NavLink>
                </li>
              </>
            )}
          </div>

          <div>
            <li className="flex text-white p-2">
              <IoMdHome className="text-2xl  mr-1"></IoMdHome>
              <NavLink to="/">Home</NavLink>
            </li>
            <li className="flex text-white p-2">
              <IoMenu className="text-2xl  mr-1"></IoMenu>
              <NavLink to="/menu">Menu</NavLink>
            </li>
            <li className="flex text-white p-2">
              <FaBagShopping className="text-2xl  mr-1"></FaBagShopping>
              <NavLink to="/shop/pasta">Shop</NavLink>
            </li>
            <li className="flex text-white p-2">
              <BiSolidContact className="text-2xl  mr-1"></BiSolidContact>
              <NavLink to="/contact">Contact</NavLink>
            </li>
          </div>
        </ul>
      </div>
      <div className="w-full ">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Dashboard;

import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../../provider/AuthProvider";
import { IoCart } from "react-icons/io5";
import useCart from "../../../hooks/useCart";
import useAdmin from "../../../hooks/useAdmin";

const NavBar = () => {
  const { user, signOutUser } = useContext(AuthContext);
  const [cart] = useCart();
  const [isAdmin] = useAdmin();
  const handleLogout = () => {
    signOutUser()
      .then(() => {})
      .catch(error => console.log(error));
  };

  const dashboardPath = isAdmin
    ? "/dashboard/adminHome"
    : "/dashboard/userHome";

  const NavLinks = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/contact">Contact Us</NavLink>
      </li>
      <li>
        <NavLink to="/menu">Our Menu</NavLink>
      </li>
      <li>
        <NavLink to="/shop/Pasta">Our Shop</NavLink>
      </li>
      {user && (
        <li>
          <NavLink to={dashboardPath}>Dashboard</NavLink>
        </li>
      )}
      <li>
        <NavLink to="/dashboard/cart" className=" flex gap-0">
          <IoCart className="h-5 w-5"></IoCart>
          <span className="bg-pink-500 text-white px-1 w-4 block">
            {cart.length}
          </span>
        </NavLink>
      </li>
      {user ? (
        <li>
          <span
            onClick={handleLogout}
            className="cursor-pointer hover:text-red-500"
          >
            Logout
          </span>
        </li>
      ) : (
        <>
          <li>
            <NavLink to="/login" className="hover:text-green-400">
              Login
            </NavLink>
            <NavLink to="/signup" className="hover:text-green-400">
              /Sign up
            </NavLink>
          </li>
        </>
      )}
    </>
  );

  return (
    <div className="navbar bg-purple-500 bg-opacity-15 max-w-screen-xl fixed z-10 ">
      <div className="navbar-start ">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            {NavLinks}
          </ul>
        </div>
        <a className="btn btn-ghost text-xl text-white">Bristo Restaurant</a>
      </div>
      <div className="navbar-end hidden lg:flex ">
        <ul className="menu menu-horizontal p-0 overflow-hidden flex-nowrap text-white">
          {NavLinks}
        </ul>
      </div>
    </div>
  );
};

export default NavBar;

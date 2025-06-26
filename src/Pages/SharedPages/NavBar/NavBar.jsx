import { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../provider/AuthProvider";
import { IoCart, IoMenu } from "react-icons/io5";
import useCart from "../../../hooks/useCart";
import useAdmin from "../../../hooks/useAdmin";
import { RxCross1 } from "react-icons/rx";
import { Transition } from "@headlessui/react";
import Swal from "sweetalert2";

const NavBar = () => {
  const { user, signOutUser } = useContext(AuthContext);
  const [cart] = useCart();
  const [isAdmin] = useAdmin();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const handleLogout = () => {
    signOutUser()
      .then(() => {})
      .catch(error => console.log(error));
  };

  const handleCartIcon = () => {
    console.log(user);
    if (!user) {
      Swal.fire({
        title: "You are not logged in!",
        text: "Would you like to log in to proceed?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, log in!",
      }).then(result => {
        if (result.isConfirmed) {
          navigate("/login");
        }
      });
    }
  };

  const dashboardPath = isAdmin
    ? "/dashboard/adminHome"
    : "/dashboard/userHome";

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Our Menu", path: "/menu" },
    { name: "Our Shop", path: "/shop/pizza" },
    { name: "Contact", path: "/contact" },
  ];

  const authLinks = [
    { name: "Login", path: "/login" },
    { name: "Sign up", path: "/signup" },
  ];

  return (
    <header className="bg-black shadow-md bg-opacity-25 fixed z-10 max-w-screen-xl w-full px-2 ">
      <div className="flex h-16 items-center justify-between px-2">
        {/*logo */}
        <div className="px-1">
          <NavLink
            to="/"
            className="text-2xl text-white flex-shrink-0 whitespace-nowrap"
          >
            Al Dente
          </NavLink>
        </div>
        {/*desktop view */}
        <nav className="hidden md:flex items-center  space-x-2">
          {navLinks.map(item => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-2 px-3 pt-y whitespace-nowrap text-sm font-medium ${
                  isActive
                    ? "text-orange-500 border-b-2 border-orange-500"
                    : "text-white hover:text-orange-400"
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
          {user && (
            <NavLink
              to={dashboardPath}
              className={({ isActive }) =>
                `flex items-center gap-2 px-3 pt-y whitespace-nowrap text-sm font-medium ${
                  isActive
                    ? "text-orange-500 border-b-2 border-orange-500"
                    : "text-white hover:text-orange-400"
                }`
              }
            >
              Dashboard
            </NavLink>
          )}
          <NavLink
            to="/dashboard/cart"
            className={({ isActive }) =>
              `flex items-center gap-0 px-3 pt-y whitespace-nowrap text-sm font-medium ${
                isActive
                  ? "text-orange-500 border-b-2 border-orange-500"
                  : "text-white hover:text-orange-400"
              }`
            }
            onClick={handleCartIcon}
          >
            <IoCart className="h-5 w-5"></IoCart>
            <div className="bg-pink-500 text-white px-1 w-4 block">
              {cart.length}
            </div>
          </NavLink>
          {user ? (
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-3 pt-y whitespace-nowrap text-sm font-medium text-white hover:text-orange-400"
            >
              Logout
            </button>
          ) : (
            <>
              {authLinks.map(item => (
                <NavLink
                  key={item.name}
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-3 pt-y whitespace-nowrap text-sm font-medium ${
                      isActive
                        ? "text-orange-500 border-b-2 border-orange-500"
                        : "text-white hover:text-orange-400"
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              ))}
            </>
          )}
        </nav>

        {/*mobile menu*/}
        <div className="flex md:hidden">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md p-2 text-white hover:bg-gray-100 hover:text-gray-900"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <RxCross1></RxCross1> : <IoMenu></IoMenu>}
          </button>
        </div>
      </div>

      <Transition
        show={mobileMenuOpen}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <div className="md:hidden w-full bg-white shadow-md">
          <div className="space-y-1 px-2 pt-2 pb-3">
            {navLinks.map(item => (
              <NavLink
                key={item.name}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-md text-base font-medium ${
                    isActive
                      ? "bg-orange-50 text-orange-600"
                      : "text-gray-700 hover:bg-gray-100"
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}
            {user && (
              <NavLink
                to={dashboardPath}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-md text-base font-medium ${
                    isActive
                      ? "bg-orange-50 text-orange-600"
                      : "text-gray-700 hover:bg-gray-100"
                  }`
                }
                onClick={() => setMobileMenuOpen(false)}
              >
                Dashboard
              </NavLink>
            )}
            <NavLink
              to="/dashboard/cart"
              className={({ isActive }) =>
                `flex items-center gap-0 px-3 py-2 rounded-md text-base font-medium ${
                  isActive
                    ? "bg-orange-50 text-orange-600"
                    : "text-gray-700 hover:bg-gray-100"
                }`
              }
              onClick={() => setMobileMenuOpen(false)}
            >
              <IoCart className="h-5 w-5"></IoCart>
              <div className="bg-pink-500 text-white px-1 w-4 block">
                {cart.length}
              </div>
            </NavLink>
            {user ? (
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-3 pt-y  text-sm font-medium text-white hover:text-orange-400"
              >
                Logout
              </button>
            ) : (
              <>
                {authLinks.map(item => (
                  <NavLink
                    key={item.name}
                    to={item.path}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-3 py-2 rounded-md text-base font-medium ${
                        isActive
                          ? "bg-orange-50 text-orange-600"
                          : "text-gray-700 hover:bg-gray-100"
                      }`
                    }
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </NavLink>
                ))}
              </>
            )}
          </div>
        </div>
      </Transition>
    </header>
  );
};

export default NavBar;

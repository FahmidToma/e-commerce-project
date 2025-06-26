import { Outlet, useLocation } from "react-router-dom";
import Footer from "../Pages/SharedPages/Footer/Footer";
import NavBar from "../Pages/SharedPages/NavBar/NavBar";

const Main = () => {
  const location = useLocation();
  const noHeadFoot =
    location.pathname.includes("login") ||
    location.pathname.includes("signup") ||
    location.pathname.includes("forgetPassword");

  return (
    <div className="overflow-x-hidden">
      {noHeadFoot || <NavBar></NavBar>}
      <Outlet></Outlet>
      {noHeadFoot || <Footer></Footer>}
    </div>
  );
};

export default Main;

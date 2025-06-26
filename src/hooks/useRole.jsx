import { useEffect, useState } from "react";
import useAdmin from "./useAdmin";
import { useNavigate } from "react-router-dom";

const useRole = () => {
  const [role, setRole] = useState("admin");
  const [isAdmin] = useAdmin();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAdmin) {
      setRole("admin");
    }
  }, [isAdmin]);

  const toggoleRole = () => {
    const newRole = role === "admin" ? "user" : "admin";
    setRole(newRole);
    navigate(
      newRole === "admin" ? "/dashboard/adminHome" : "/dashboard/userHome"
    );
  };

  return { role, toggoleRole };
};

export default useRole;

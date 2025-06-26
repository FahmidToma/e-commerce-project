import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";
import { useEffect } from "react";

const axiosSecure = axios.create({
  baseURL: "https://e-commerce-project-server-demz.onrender.com",
});

const useAxiosSecure = () => {
  const navigate = useNavigate();
  const { signOutUser } = useAuth();

  useEffect(() => {
    const requestInterceptor = axiosSecure.interceptors.request.use(
      function (config) {
        const token = localStorage.getItem("access-token");
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${token}`;
        return config;
      },
      function (error) {
        return Promise.reject(error);
      }
    );

    const responseInterceptor = axiosSecure.interceptors.response.use(
      function (response) {
        return response;
      },
      async error => {
        const status = error?.response?.status;
        if (status === 401 || status === 403) {
          localStorage.removeItem("access-token");
          await signOutUser();
          navigate("/login");
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosSecure.interceptors.request.eject(requestInterceptor);
      axiosSecure.interceptors.response.eject(responseInterceptor);
    };
  }, [signOutUser, navigate]);

  return axiosSecure;
};

export default useAxiosSecure;

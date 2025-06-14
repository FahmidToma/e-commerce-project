import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "https://e-commerce-project-server-demz.onrender.com",
});

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;

import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaShoppingCart, FaStar } from "react-icons/fa";
import { SlCalender } from "react-icons/sl";
import { MdPayment } from "react-icons/md";
import useCart from "../../../hooks/useCart";

const UserHome = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [cart] = useCart();

  const { data: reviews = [] } = useQuery({
    queryKey: ["reviews", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/reviews/${user.email}`);
      console.log(res);
      return res.data;
    },
  });
  console.log(reviews);

  const { data: bookings = [] } = useQuery({
    queryKey: ["reservation", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/reservation/${user.email}`);
      console.log(res);
      return res.data;
    },
  });

  const { data: payments = [] } = useQuery({
    queryKey: ["payments", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments/${user.email}`);
      console.log(res);
      return res.data;
    },
  });

  return (
    <div className="bg-gray-200 min-h-screen">
      <h1 className="text-3xl font-semibold p-7 text-black">
        Hi, Welcome Back!
      </h1>

      <div className=" h-[300px] mx-4 flex flex-col md:flex-row">
        <div className="text-black flex items-center justify-center bg-pink-200 w-full">
          <h1
            className="text-2xl font-medium p-5 m-5 rounded-full bg-gray-200 text-center
          "
          >
            {user.displayName}
          </h1>
        </div>
        <div className="bg-yellow-200 w-full flex flex-col items-center justify-center">
          <h1
            className="text-2xl font-medium p-7 text-black 
          "
          >
            Your Activities
          </h1>
          <div className="font-medium  flex flex-col items-start mb-3">
            <p className=" text-blue-500 flex items-center gap-1">
              <FaShoppingCart></FaShoppingCart>Orders: {cart.length}
            </p>
            <p className=" text-green-600 flex items-center gap-1">
              <FaStar></FaStar>Reviews: {reviews.length}
            </p>
            <p className=" text-yellow-500 flex items-center gap-1">
              <SlCalender></SlCalender>Bookings: {bookings.length}
            </p>
            <p className=" text-orange-400 flex items-center gap-1">
              <MdPayment></MdPayment>Payments: {payments.length}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserHome;

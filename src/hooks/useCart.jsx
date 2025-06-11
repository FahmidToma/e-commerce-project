import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useCart = () => {
  const axiosSecure = useAxiosSecure();
  const { user, loading } = useAuth();
  console.log("user", user, "is here");
  const { refetch, data: cart = [] } = useQuery({
    queryKey: ["cart", user?.email],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      // console.log(`Fetching cart for ${user.email}`);
      const res = await axiosSecure.get(`/carts?email=${user.email}`);
      //console.log("API response ", res.data);
      return res.data;
    },
  });
  return [cart, refetch];
};

export default useCart;

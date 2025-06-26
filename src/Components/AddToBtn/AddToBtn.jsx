import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useCart from "../../hooks/useCart";

const AddToBtn = ({ btntext, item }) => {
  const { _id, name, img, price } = item;
  const { user } = useAuth();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const [, refetch] = useCart();

  const handleAddToCart = food => {
    if (user && user.email) {
      //send to database
      console.log(user.email, food);
      const cartItem = {
        foodId: _id,
        email: user.email,
        name,
        image: img,
        price,
      };
      axiosSecure.post("carts", cartItem).then(res => {
        if (res.data.insertedId) {
          Swal.fire({
            position: "top-center",
            icon: "success",
            title: "Item added to the cart!",
            showConfirmButton: false,
            timer: 1500,
          });
          //to get count of the cart
          refetch();
        }
      });
    } else {
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

  return (
    <div className="flex flex-col items-center my-7">
      <button
        onClick={() => handleAddToCart(item)}
        className="btn border border-b-2 border-x-0 border-t-0 bg-slate-300 border-black text-yellow-600"
      >
        {btntext}
      </button>
    </div>
  );
};

export default AddToBtn;

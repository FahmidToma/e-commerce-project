import { RiDeleteBin6Fill } from "react-icons/ri";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import useCart from "../../../hooks/useCart";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";

const Cart = () => {
  const [cart, refetch] = useCart();
  console.log(cart);
  const totalPrice = cart.reduce((total, item) => total + item.price, 0);
  const axiosSecure = useAxiosSecure();

  const handleDelete = id => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(result => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/carts/${id}`).then(res => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };

  return (
    <div className="bg-gray-200 min-h-screen p-2 text-black">
      <SectionTitle
        heading={"WANNA ADD MORE?"}
        subheading={"My Cart"}
      ></SectionTitle>

      {cart.length == 0 ? (
        <h1 className="text-3xl font-medium text-center text-red-500 mt-3">
          No items in the cart
        </h1>
      ) : (
        <>
          <div className="flex justify-evenly bg-gray-300 py-1 mx-4 border-gray-400 rounded-t-lg">
            <h1 className="font-semibold text-xl md:text-2xl">
              Total Order: {cart.length}
            </h1>
            <h1 className="font-medium text-xl md:text-2xl">
              Total Price: $ {totalPrice}
            </h1>
          </div>
          <div className="overflow-x-auto p-10">
            <table className="table">
              {/* head */}
              <thead>
                <tr className="text-black text-xl">
                  <th>#</th>
                  <th></th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item, index) => (
                  <tr key={item._id}>
                    <td>{index + 1}</td>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle h-12 w-12">
                            <img
                              src={item.image}
                              alt="Avatar Tailwind CSS Component"
                            />
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="font-medium text-xl">{item.name}</td>
                    <td>$ {item.price}</td>
                    <th>
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="btn btn-ghost btn-xs"
                      >
                        <RiDeleteBin6Fill className="text-red-600 text-2xl"></RiDeleteBin6Fill>
                      </button>
                    </th>
                  </tr>
                ))}
              </tbody>
              {/* foot */}
            </table>
          </div>
          <div className="w-full flex justify-center">
            <Link to="/dashboard/payment">
              <button className="btn mt-1 bg-orange-400 text-black border-none px-6">
                Checkout
              </button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;

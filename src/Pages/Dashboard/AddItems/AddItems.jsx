import { useForm } from "react-hook-form";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import { FaUtensils } from "react-icons/fa";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const image_hosting_key = import.meta.env.VITE_image_hosting_key;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
const AddItems = () => {
  const { register, handleSubmit, reset } = useForm();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const onSubmit = async data => {
    console.log(data);
    const imageFile = { image: data.image[0] };
    const res = await axiosPublic.post(image_hosting_api, imageFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    if (res.data.success) {
      const menuItem = {
        name: data.name,
        category: data.category,
        price: parseFloat(data.price),
        recipe: data.recipe,
        image: res.data.data.display_url,
      };

      const menuRes = await axiosSecure.post("/menu", menuItem);
      console.log(menuRes.data);
      if (menuRes.data.insertedId) {
        reset();
        console.log("menu item is inserted successfully!");
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: `${data.name}added to the menu!`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
    console.log(res.data);
  };

  return (
    <div className="bg-gray-200 min-h-screen p-2 text-black">
      <SectionTitle
        heading={"ADD AN ITEM"}
        subheading={"What's new?"}
      ></SectionTitle>
      <div className=" p-5 max-w-[750px] ">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control">
            <label className="text-black p-2 font-medium">Recipe Name*</label>
            <input
              type="text"
              placeholder="Name of the recipe"
              className="input w-full mb-2 text-white"
              {...register("name", { required: true })}
            />
          </div>

          <div className="flex gap-3 justify-around ">
            <div className="w-full form-control">
              <label className="text-black  font-medium">Category*</label>
              <select
                defaultValue="default"
                {...register("category", { required: true })}
                className="select w-full my-2 text-white"
              >
                <option disabled={true} value="default">
                  Pick a category
                </option>
                <option>Salad</option>
                <option>Pizza</option>
                <option>Soup</option>
                <option>Dessert</option>
                <option>Drinks</option>
              </select>
            </div>
            <div className=" w-full form-control">
              <label className="text-black font-medium">Price*</label>
              <input
                type="number"
                placeholder="price"
                className="input my-2 w-full text-white"
                {...register("price", { required: true })}
              />
            </div>
          </div>
          <div className="form-control">
            <label className="text-black p-2 font-medium">
              Recipe Details*
            </label>
            <textarea
              className="textarea w-full mb-2 text-white"
              placeholder="Recipe Details"
              {...register("recipe", { required: true })}
            ></textarea>
          </div>
          <div className="mb-2 w-1/3 form-control">
            <input
              type="file"
              className="file-input file-input-sm text-white"
              {...register("image", { required: true })}
            />
          </div>
          <button className="btn px-6 border-none rounded-none bg-gradient-to-r">
            Add Item <FaUtensils></FaUtensils>
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddItems;

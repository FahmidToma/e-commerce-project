import { useForm } from "react-hook-form";
import { useLoaderData } from "react-router-dom";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";

const image_hosting_key = import.meta.env.VITE_image_hosting_key;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const UpdateItem = () => {
  const { name, category, recipe, price, _id } = useLoaderData();
  console.log(name, category, recipe, price);

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

      const menuRes = await axiosSecure.patch(`/menu/${_id}`, menuItem);
      console.log(menuRes.data);
      if (menuRes.data.modifiedCount > 0) {
        //update er por notun value diye updateItem form fill up kora
        //if you want you can make it blank
        reset({
          name: " ",
          category: "",
          price: " ",
          recipe: " ",
          image: null,
        });

        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${data.name} is updated to the menu`,
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
        heading={"UPDATE ITEM"}
        subheading={"as you like"}
      ></SectionTitle>

      <div className=" p-5 max-w-[750px] ">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control">
            <label className="text-black p-2 font-medium">Recipe Name*</label>
            <input
              type="text"
              defaultValue={name}
              className="input w-full mb-2 text-white"
              {...register("name", { required: true })}
            />
          </div>

          <div className="flex gap-3 justify-around ">
            <div className="w-full form-control">
              <label className="text-black  font-medium">Category*</label>
              <select
                defaultValue={category}
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
                defaultValue={price}
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
              defaultValue={recipe}
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
            UPDATE MENU ITEM
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateItem;

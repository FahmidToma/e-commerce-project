import { Controller, useForm } from "react-hook-form";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import { Rating } from "@smastrom/react-rating";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";

const Review = () => {
  const { user } = useAuth();
  const { register, handleSubmit, control, reset } = useForm({
    defaultValues: {
      name: "",
      comment: "",
      rating: 0,
    },
  });
  const axiosSecure = useAxiosSecure();

  const onSubmit = async data => {
    console.log(data);
    const review = {
      name: data.name,
      rating: data.rating,
      comment: data.comment,
      email: user.email,
    };
    const reviewRes = await axiosSecure.post("/reviews", review);
    reset();
    console.log(reviewRes);
  };

  return (
    <div>
      <SectionTitle
        heading={"REVIEW US"}
        subheading={"How's the experience?"}
      ></SectionTitle>
      <div className="bg-slate-500 p-5 mx-3 max-w-[750px] ">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h1 className="text-2xl text-black font-medium">Rate Us!</h1>
          <div className="form-control my-3 ">
            <Controller
              name="rating"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Rating
                  style={{ maxWidth: 150 }}
                  value={field.value}
                  onChange={field.onChange}
                ></Rating>
              )}
            />
          </div>
          <div className="form-control">
            <input
              type="text"
              placeholder="Your Name"
              className="input w-full mb-2"
              {...register("name", { required: true })}
            />
          </div>

          <div className="form-control">
            <textarea
              className="textarea w-full mb-2"
              placeholder="Your comment"
              {...register("comment", { required: true })}
            ></textarea>
          </div>

          <button className="btn px-6 border-none rounded-none bg-gradient-to-r">
            Add Review
          </button>
        </form>
      </div>
    </div>
  );
};

export default Review;

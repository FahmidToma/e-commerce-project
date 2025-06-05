import { useForm } from "react-hook-form";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

const ContactForm = () => {
  const axiosPublic = useAxiosPublic();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async data => {
    console.log(data);
    const contactRes = await axiosPublic.post("/contact", data);
    console.log(contactRes);
    reset();
  };

  return (
    <div className="bg-slate-500 p-4 flex justify-center mb-10">
      <div className="bg-slate-500 p-5 w-3/4 ">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <div className=" flex gap-3 justify-around form-control">
              <div className="form-control ">
                <label className="text-white p-2 font-medium">Name</label>
                <input
                  type="text"
                  placeholder="your Name"
                  className="input w-full mb-2 bg-black "
                  {...register("name", { required: true })}
                />
              </div>
              <div className=" form-control">
                <label className="text-white font-medium">Email</label>
                <input
                  type="email"
                  placeholder="your mail"
                  className="input my-2 w-full bg-black "
                  {...register("email", { required: true })}
                />
              </div>
            </div>
          </div>
          <div className="form-control">
            <label className="text-white p-2 font-medium">Phone Number</label>
            <input
              type="text"
              placeholder="Your Number"
              className="input w-full mb-2 bg-black "
              {...register("number", {
                required: true,
                pattern: {
                  value: /^[0-9]{11}$/,
                  message: "Invalid phone number",
                },
              })}
            />
            {errors.number && (
              <p className="text-red-500 text-sm">{errors.number.message}</p>
            )}
          </div>
          <div className="form-control">
            <label className="text-white p-2 font-medium">Message</label>
            <textarea
              className="textarea w-full mb-2 bg-black "
              placeholder="Type your message here..."
              rows="6"
              cols="50"
              {...register("message", { required: true })}
            ></textarea>
          </div>
          <button className="btn bg-yellow-600 text-white px-6 border-none rounded-none bg-gradient-to-r">
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;

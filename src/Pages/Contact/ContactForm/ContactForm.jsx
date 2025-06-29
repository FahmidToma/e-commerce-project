import { useForm } from "react-hook-form";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import Swal from "sweetalert2";

const ContactForm = () => {
  const axiosPublic = useAxiosPublic();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async data => {
    const contactRes = await axiosPublic.post("/contact", data);
    console.log(contactRes);
    if (contactRes.data.insertedId) {
      Swal.fire({
        position: "top-center",
        icon: "success",
        title: "Message is sent",
        showConfirmButton: false,
        timer: 1500,
      });
    }
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
                  className="input w-full mb-2  "
                  {...register("name", {
                    required: { value: true, message: "Fill your name" },
                  })}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm">{errors.name.message}</p>
                )}
              </div>
              <div className=" form-control">
                <label className="text-white font-medium">Email</label>
                <input
                  type="email"
                  placeholder="your mail"
                  className="input my-2 w-full "
                  {...register("email", { required: true })}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}
              </div>
            </div>
          </div>
          <div className="form-control">
            <label className="text-white p-2 font-medium">Phone Number</label>
            <input
              type="text"
              placeholder="Your Number"
              className="input w-full mb-2 "
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
              className="textarea w-full mb-2  "
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

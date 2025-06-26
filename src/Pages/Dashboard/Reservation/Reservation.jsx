import { useForm } from "react-hook-form";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";

const Reservation = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const today = new Date().toISOString().split("T")[0];

  const onSubmit = async data => {
    // sending it to the database
    const reservationData = {
      email: user.email,
      name: data.name,
      guests: data.guests,
      phone: data.phone,
      date: data.date,
      time: data.time,
      status: "pending",
    };
    const res = await axiosSecure.post("/reservation", reservationData);
    console.log(res);
    if (res.data.insertedId) {
      reset();

      Swal.fire({
        position: "top-center",
        icon: "success",
        title: "Request for reservation is sent",
        showConfirmButton: false,
        timer: 1500,
      });
    }
    reset();
  };

  return (
    <div>
      <SectionTitle
        heading={"Reservations"}
        subheading={"Book a table"}
      ></SectionTitle>
      <div className=" flex justify-center  mx-3 p-4">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4 grid grid-cols-1 md:grid-cols-2 gap-4 "
        >
          <div>
            <label className=" font-medium">Date</label>
            <input
              type="date"
              min={today}
              className="input input-bordered w-full"
              {...register("date", { required: "Date is required" })}
            />
            {errors.date && (
              <p className="text-red-500 text-sm">{errors.date.message}</p>
            )}
          </div>
          <div>
            <label className="font-medium">Time</label>
            <input
              type="time"
              min="10:00"
              max="22:00"
              className="input input-bordered w-full"
              {...register("time", { required: "Time is required" })}
            />
            {errors.time && (
              <p className="text-red-500 text-sm">{errors.time.message}</p>
            )}
          </div>

          <div>
            <label className="font-medium ">Number of Guests</label>
            <input
              type="number"
              {...register("guests", {
                required: "Number of guests is required",
                min: { value: 1, message: "At least 1 guest required" },
              })}
              className="input input-bordered w-full"
            />
            {errors.guests && (
              <p className="text-red-500 text-sm">{errors.guests.message}</p>
            )}
          </div>

          <div>
            <label className="font-medium ">Name</label>
            <input
              type="text"
              {...register("name", { required: "Name is required" })}
              className="input input-bordered w-full"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="font-medium ">Phone</label>
            <input
              type="tel"
              {...register("phone", {
                required: "Phone number is required",
                pattern: {
                  value: /^\d{11}$/,
                  message: "Phone number must be 11 digits",
                },
              })}
              className="input input-bordered w-full"
            />
            {errors.phone && (
              <p className="text-red-500 text-sm">{errors.phone.message}</p>
            )}
          </div>

          <div>
            <label className="font-medium ">Email</label>
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email address",
                },
              })}
              className="input input-bordered w-full"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          <div className="md:col-span-2">
            <button
              type="submit"
              className="btn bg-orange-400  text-white rounded w-full mt-4"
            >
              Book a table
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Reservation;

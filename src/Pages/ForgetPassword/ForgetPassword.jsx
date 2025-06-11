import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
//import { useNavigate } from "react-router-dom";

const ForgetPassword = () => {
  const { resetPassword } = useAuth();
  // const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = data => {
    resetPassword(data.email)
      .then(() => {
        alert("reset password email is sent. check your inbox!");
        //navigate("/login");
      })
      .catch(error => {
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  };

  return (
    <div className="bg-base-100  flex justify-center items-center">
      <div className="bg-slate-200 w-auto md:w-1/2 m-10 min-h-full p-7 md:p-10 ">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h1 className="text-xl md:text-2xl text-black my-3 font-medium">
            Forget your password?
          </h1>
          <input
            type="email"
            placeholder="Enter your email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Invalid email address",
              },
            })}
            className="input w-full mb-3 rounded-none"
          />
          {errors.email && <p className="text-red-500">{errors.message}</p>}
          <button className="btn bg-blue-600 border-none rounded-none text-white">
            Send Reset Link
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgetPassword;

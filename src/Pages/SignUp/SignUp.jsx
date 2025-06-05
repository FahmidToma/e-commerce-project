import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../provider/AuthProvider";
import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import SocialLogin from "../../Components/SocialLogin/SocialLogin";

const SignUp = () => {
  const { createUser, emailVerification, updateUserProfile } =
    useContext(AuthContext);
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = data => {
    console.log(data.email, data.password);
    createUser(data.email, data.password).then(result => {
      console.log(result.user);
      emailVerification().then(() => {
        console.log("successfully sent email");
        alert("verification email sent. Please check your inbox");
      });
      updateUserProfile(data.name)
        .then(() => {
          //create user info in database
          const userInfo = {
            name: data.name,
            email: data.email,
          };
          useAxiosPublic.post("/users", userInfo).then(res => {
            if (res.data.insertedId) {
              console.log("user info saved in the database successfully!");
              console.log("Updated successfully");
              reset();
              navigate("/");
            }
          });
        })
        .catch(error => console.log(error));
    });
  };
  console.log(watch("name"), watch("email"), watch("password"));

  return (
    <>
      <Helmet>
        <title>Bistro Boss | Sign Up</title>
      </Helmet>
      <div className="text-center">
        <div className="hero bg-slate-600 min-h-screen">
          <div className="hero-content flex max-w-6xl bg-slate-500">
            <div className="card  w-full max-w-sm shrink-0 ">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="card-body text-white"
              >
                <div className="form-control">
                  <h1 className="text-center font-bold text-3xl">Sign Up</h1>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Name</span>
                    </label>
                    <input
                      type="text"
                      placeholder="name"
                      {...register("name", { required: true })}
                      className="input input-bordered"
                    />
                    {errors.name && (
                      <span className="text-red-700 text-left my-1">
                        This field is required
                      </span>
                    )}
                  </div>
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    type="email"
                    placeholder="email"
                    {...register("email", { required: true })}
                    className="input input-bordered"
                  />
                  {errors.email && (
                    <span className="text-red-700 text-left my-1">
                      This field is required
                    </span>
                  )}
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <input
                    type="password"
                    placeholder="password"
                    {...register("password", {
                      required: "This field is required",
                      maxLength: {
                        value: 13,
                        message: "Password can't excced 20 characters",
                      },
                      minLength: {
                        value: 8,
                        message: "Password must be at least 8 characters",
                      },
                      pattern: {
                        value:
                          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_()])[A-Za-z\d@$!%*?&_()]{8,}$/,
                        message:
                          "Password must be at least 8 characters, include uppercase, lowercase, number, and a special character",
                      },
                    })}
                    className="input input-bordered"
                  />
                  {errors.password && (
                    <p className="text-red-600 text-left">
                      {errors.password.message}
                    </p>
                  )}
                </div>
                <div className="form-control mt-5">
                  <input
                    type="submit"
                    className="btn bg-yellow-700 text-white border-none rounded-none"
                    value="Sign Up"
                  />
                </div>
              </form>
              <p>
                <small>Already have an account?</small>
                <Link to="/login"> Log in</Link>
              </p>
              <p className="my-3">Or sign up with</p>
              <SocialLogin></SocialLogin>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;

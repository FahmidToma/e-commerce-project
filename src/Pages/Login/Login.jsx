//import { useState, useEffect } from "react";
import Swal from "sweetalert2";

//import {
//  loadCaptchaEnginge,
//  LoadCanvasTemplate,
//  //LoadCanvasTemplateNoReload,
//  validateCaptcha,
//} from "react-simple-captcha";
//import { useContext } from "react";
//import { AuthContext } from "../../provider/AuthProvider";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SocialLogin from "../../Components/SocialLogin/SocialLogin";
import useAuth from "../../hooks/useAuth";

const Login = () => {
  const { signInUser } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleLogin = e => {
    e.preventDefault();
    const email = e.target.email.value;
    const pass = e.target.password.value;

    signInUser(email, pass)
      .then(result => {
        if (!result.user.emailVerified) {
          alert("Your email is not verified! Please verify it at first");
        } else {
          Swal.fire({
            title: "User logged in successfully!",
            showClass: {
              popup: `
                  animate__animated
                  animate__fadeInUp
                  animate__faster
                `,
            },
            hideClass: {
              popup: `
                  animate__animated
                  animate__fadeOutDown
                  animate__faster
                `,
            },
          });
          navigate(from, { replace: true });
        }
      })
      .catch(error => {
        console.log(error);
        Swal.fire({
          title: "Wrong user email or password.Try again",
          showClass: {
            popup: `
                  animate__animated
                  animate__fadeInUp
                  animate__faster
                `,
          },
          hideClass: {
            popup: `
                  animate__animated
                  animate__fadeOutDown
                  animate__faster
                `,
          },
        });
      });
  };

  return (
    <div className="text-center">
      <div className="hero bg-slate-600 min-h-screen">
        <div className="hero-content flex max-w-7xl bg-slate-500">
          <div className="card  w-full max-w-sm shrink-0 ">
            <form onSubmit={handleLogin} className="card-body">
              <div className="form-control">
                <h1 className="text-center font-semibold text-white text-3xl">
                  Login
                </h1>
                <label className="label ">
                  <span className="label-text ">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="email"
                  name="email"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text ">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="password"
                  name="password"
                  className="input input-bordered"
                  required
                />
                <label className="label">
                  <Link to="/forgetPassword" className="link-hover text-sm">
                    Forget password?
                  </Link>
                </label>
              </div>
              <div className="form-control mt-3">
                <button className="btn btn-sm bg-yellow-700 text-white border-none rounded-none">
                  Sign in
                </button>
              </div>
            </form>
            <p>
              <small>New here?</small>
              <Link to="/signup" className="hover:underline">
                Create new account
              </Link>
            </p>
            <SocialLogin></SocialLogin>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

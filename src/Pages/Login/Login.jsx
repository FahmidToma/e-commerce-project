import { useState, useEffect } from "react";
import Swal from "sweetalert2";

import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  //LoadCanvasTemplateNoReload,
  validateCaptcha,
} from "react-simple-captcha";
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
  const [disabled, setDisabled] = useState(true);

  //for captcha generation
  useEffect(() => {
    loadCaptchaEnginge(6);
  }, []);

  const handleLogin = e => {
    e.preventDefault();
    //const form=e.target;
    const email = e.target.email.value;
    const pass = e.target.password.value;
    console.log(email, pass);
    signInUser(email, pass)
      .then(result => {
        console.log(result.user);
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

  const handleCaptcha = e => {
    const user_captcha_value = e.current.value;
    if (validateCaptcha(user_captcha_value)) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
    console.log(user_captcha_value);
  };

  return (
    <div className="text-center">
      <div className="hero bg-slate-600 min-h-screen">
        <div className="hero-content flex max-w-7xl bg-slate-500">
          <div className="card  w-full max-w-sm shrink-0 ">
            <form onSubmit={handleLogin} className="card-body text-white">
              <div className="form-control">
                <h1 className="text-center font-semibold text-3xl">Login</h1>
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

                <label className="label">
                  <LoadCanvasTemplate />
                </label>
                <input
                  type="text"
                  onBlur={handleCaptcha}
                  placeholder="type captcha"
                  id="user_captcha_value"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control mt-3">
                <button
                  disabled={disabled}
                  className="btn btn-sm bg-yellow-700 text-white border-none rounded-none"
                >
                  Sign in
                </button>
              </div>
            </form>
            <p>
              <small>New here?</small>
              <Link to="/signup">Create new account</Link>
            </p>
            <SocialLogin></SocialLogin>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

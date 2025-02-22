import "./SigninPage.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useToast } from "../../../context/ToastContext";
import { signin } from "../../../services/auth.connect";
import logoImage from "../../../assets/logo.png";
import frame from "../../../assets/signupsignin.png";

function SigninPage() {
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [signinDetails, setsigninDetails] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setsigninDetails((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    setErrors("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await signin(signinDetails);
      const data = await res.json();

      if (res.status === 200) {
        showToast(data.message, "success");
        setsigninDetails({
          email: "",
          password: "",
        });
        setErrors("");
        navigate("/login");
      } else if (res.status === 400) {
        setErrors(data.message || {});
      } else {
        showToast(data.message || "Something went wrong", "error");
      }
    } catch (err) {
      console.error(err);
      showToast("Server error", "error");
    }
  };

  return (
    <div className="signinPage">
      <div className="signinLogo">
        <div className="signin-logo-img">
          <img src={logoImage} alt="spark" />
        </div>
        <div className="signin-logo-heading-name">
          <span>SPARK</span>
        </div>
      </div>

      <div className="signin-form-container">
        <form onSubmit={handleSubmit} className="signin-form">
          <div className="signin-form-heading">
            <p>Sign in to your Spark</p>
          </div>

          <div className="signin-inputBoxes-container">
            <div className="signin-inputBoxes">
              <div className="input-box">
                <label htmlFor="fName">Email</label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  value={signinDetails.email}
                  onChange={handleChange}
                  className={errors ? "error-input-box" : ""}
                />
              </div>

              <div className="input-box">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={signinDetails.password}
                  onChange={handleChange}
                  className={errors ? "error-input-box" : ""}
                />
              </div>

              <div className="signin-errorField">
                <p>{errors}</p>
              </div>
            </div>

            <div
              className={`signin-Button-container sign-in ${
                signinDetails.email.trim() !== "" &&
                signinDetails.password.trim() !== "" &&
                errors === ""
                  ? "sign-in-active"
                  : ""
              }`}
            >
              <button type="submit">Sign in</button>
            </div>

            <div className="redirect-pages-signin">
              <div className="forgot-password-login">
                <NavLink>Forgot Password</NavLink>
              </div>

              <div className="redirect-to-signup-container">
                <p>
                  Don`t have an account?{" "}
                  <NavLink className="redirect-to-signup" to="/signup">
                    Sign up
                  </NavLink>
                </p>
              </div>
            </div>
          </div>

          <div className="signin-disclaimer">
            <p>
              This site is protected by reCAPTCHA and the{" "}
              <a href="">Google Privacy Policy</a> and{" "}
              <a href="">Terms of Service</a> apply.
            </p>
          </div>
        </form>
      </div>

      <div className="signin-image">
        <img src={frame} alt="" />
      </div>
    </div>
  );
}

export default SigninPage;

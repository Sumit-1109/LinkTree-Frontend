import "./SignupPage.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useToast } from "../../../context/ToastContext";
import { signup } from "../../../services/auth.connect";
import logoImage from "../../../assets/logo.png";
import googleLogo from "../../../assets/google.png";
import frame from "../../../assets/signupsignin.png";
import { setUserId } from "../../../redux/authSlice";
import { useDispatch } from "react-redux";

function SignupPage() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const dispatch = useDispatch();

  const [signupDetails, setSignupDetails] = useState({
    fName: "",
    lName: "",
    email: "",
    password: "",
    confirmPassword: "",
    tAndC: false,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSignupDetails((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[name];
      if (name === "tAndC") delete newErrors.tAndC;
      return newErrors;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await signup(signupDetails);
      const data = await res.json();

      if (res.status === 201) {
        dispatch(setUserId(data.userId));
        showToast(data.message, "success");
        setSignupDetails({
          fName: "",
          lName: "",
          email: "",
          password: "",
          confirmPassword: "",
          tAndC: false,
        });
        setErrors({});
        navigate("/userinfo");
      } else if (res.status === 400 && data.errors) {
        setErrors(data.errors || {});
      } else {
        showToast(data.error || "Something went wrong", "error");
      }
    } catch (err) {
      console.error(err);
      showToast("Server error", "error");
    }
  };

  return (
    <div className="signupPage">
      <div className="signUpLogo">
        <div className="signup-logo-img">
          <img src={logoImage} alt="spark" />
        </div>
        <div className="signup-logo-heading-name">
          <span>SPARK</span>
        </div>
      </div>

      <div className="signup-form-container">
        <form onSubmit={handleSubmit} className="signup-form">
          <div className="signup-form-heading">
            <p>Sign up to your Spark</p>
          </div>

          <div className="signup-inputBoxes-container">
            <div className="signup-subheading">
              <p className="form-subheading">Create an account</p>
              <NavLink className="redirect-signin" to="/signin">
                Sign in instead
              </NavLink>
            </div>

            <div className="signup-inputBoxes">
              <div className="input-box">
                <label htmlFor="fName">First Name</label>
                <input
                  type="text"
                  id="fName"
                  name="fName"
                  value={signupDetails.fName}
                  onChange={handleChange}
                  className={errors.fName ? "error-input-box" : ""}
                />
                <div className="signup-errorField">
                  <p>{errors.fName}</p>
                </div>
              </div>

              <div className="input-box">
                <label htmlFor="lName">Last Name</label>
                <input
                  type="text"
                  id="lName"
                  name="lName"
                  value={signupDetails.lName}
                  onChange={handleChange}
                  className={errors.lName ? "error-input-box" : ""}
                />
                <div className="signup-errorField">
                  <p>{errors.lName}</p>
                </div>
              </div>

              <div className="input-box">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={signupDetails.email}
                  onChange={handleChange}
                  className={errors.email ? "error-input-box" : ""}
                />
                <div className="signup-errorField">
                  <p>{errors.email}</p>
                </div>
              </div>

              <div className="input-box">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={signupDetails.password}
                  onChange={handleChange}
                  className={errors.password ? "error-input-box" : ""}
                />
                <div className="signup-errorField">
                  <p>{errors.password}</p>
                </div>
              </div>

              <div className="input-box">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={signupDetails.confirmPassword}
                  onChange={handleChange}
                  className={errors.confirmPassword ? "error-input-box" : ""}
                />
                <div className="signup-errorField">
                  <p>{errors.confirmPassword}</p>
                </div>
              </div>

              <div className="input-box">
                <div className="signup-tandc">
                  <input
                    className="tandc-checkbox"
                    type="checkbox"
                    id="tAndC"
                    name="tAndC"
                    checked={signupDetails.tAndC}
                    onChange={handleChange}
                  />
                  <label htmlFor="tAndC">
                    By creating an account, I agree to our{" "}
                    <a href="">Terms of Use</a> and{" "}
                    <a href="">Privacy Policy</a>
                  </label>
                </div>
                <div className="signup-errorField">
                  <p>{errors.tAndC}</p>
                </div>
              </div>
            </div>

            <div className="signup-Page-Buttons">
              <div className={`signup-Button-container create-account ${signupDetails.tAndC && Object.keys(errors).length === 0 ? "create-account-active" : ""}`}>
                <button type="submit" disabled={!signupDetails.tAndC}>Create an account</button>
              </div>

              <div className="signup-or-separator">
                <div className="separator-line"></div>
                <span>OR</span>
                <div className="separator-line"></div>
              </div>

              <div className="signup-Button-container continue-google">
                <button>
                  <img src={googleLogo} alt="Google" /> Continue with Google
                </button>
              </div>
            </div>
          </div>

          <div className="signup-disclaimer">
            <p>
              This site is protected by reCAPTCHA and the{" "}
              <a href="">Google Privacy Policy</a> and{" "}
              <a href="">Terms of Service</a> apply.
            </p>
          </div>
        </form>
      </div>

      <div className="signup-image">
        <img src={frame} alt="" />
      </div>
    </div>
  );
}

export default SignupPage;

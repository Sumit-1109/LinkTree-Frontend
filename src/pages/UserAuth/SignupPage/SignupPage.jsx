import "./SignupPage.css";
import { NavLink, useNavigate } from "react-router-dom";

import logoImage from "../../assets/logo.png";
import googleLogo from '../../assets/google.png';
import { useState } from "react";

function SignupPage({show}) {

    const navigate = useNavigate();

    const [signupDetails, setSignupDetails] = useState({
        fName: "",
        lName: "",
        email: "",
        password: "",
        confirmPassword: "",
        tandcCheckBox: false
    });

    const [errors, setErrors] = useState({});
    const [isError, setIsError] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setSignupDetails((prev) => ({
          ...prev,
          [name]: type === "checkbox" ? checked : value
        }));
        setErrors((prev) => ({ ...prev, [name]: "" }));
      };

      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const res = await signup(signupDetails);
          const data = await res.json();
          if (res.status === 201) {
            showToast(data.message, "success");
            setSignupDetails({
              firstName: "",
              lastName: "",
              email: "",
              password: "",
              confirmPassword: "",
              tandcCheckBox: false,
            });
            navigate("/login");
          } else if (res.status === 400) {
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
        <form action="submit" className="signup-form">
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
                <input type="text" id="fName" name="fName" />
                <div className="signup-errorField">
                  <p></p>
                </div>
              </div>

              <div className="input-box">
                <label htmlFor="lName">Last Name</label>
                <input type="text" id="lName" name="lName" />
                <div className="signup-errorField">
                  <p></p>
                </div>
              </div>

              <div className="input-box">
                <label htmlFor="email">Email</label>
                <input type="text" id="email" name="email" />
                <div className="signup-errorField">
                  <p></p>
                </div>
              </div>

              <div className="input-box">
                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" />
                <div className="signup-errorField">
                  <p></p>
                </div>
              </div>

              <div className="input-box">
                <label htmlFor="cPassword">Confirm Password</label>
                <input type="password" id="cPassword" name="cPassword" />
                <div className="signup-errorField">
                  <p></p>
                </div>
              </div>

              <div className="input-box">
                <div className="signup-tandc">
                  <input className="tandc-checkbox" type="checkbox" id="terms" name="terms" required />
                  <label htmlFor="terms">
                    By creating an account, I agree to our{" "}
                    <a href="">Terms of use</a> and{" "}
                    <a href="">Privacy Policy</a>
                  </label>
                </div>
                <div className="signup-errorField">
                  <p></p>
                </div>
              </div>
            </div>

            <div className="signup-Page-Buttons">
            <div className="signup-Button-container create-account create-account-active">
              <button>Create an account</button>
            </div>

            <div className="signup-or-separator">
              <div className="separator-line"></div>

              <span>OR</span>

              <div className="separator-line"></div>
            </div>

            <div className="signup-Button-container continue-google">
              <button><img src={googleLogo} alt="" /> Continue with Google</button>
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
    </div>
  );
}

export default SignupPage;

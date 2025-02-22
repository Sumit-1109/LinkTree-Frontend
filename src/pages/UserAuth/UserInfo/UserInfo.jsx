import { useState } from "react";
import "./UserInfo.css";
import { useNavigate } from "react-router-dom";
import { userinfo } from "../../../services/auth.connect";
import { useToast } from "../../../context/ToastContext";
import { useSelector } from "react-redux";
import logoImage from "../../../assets/logo.png";
import frame from "../../../assets/signupsignin.png";

const categories = [
    { label: "🏢 Business", value: "Business" },
    { label: "🎨 Creative", value: "Creative" },
    { label: "📚 Education", value: "Education" },
    { label: "🎶 Entertainment", value: "Entertainment" },
    { label: "👗 Fashion & Beauty", value: "Fashion & Beauty" },
    { label: "🍕 Food & Beverage", value: "Food & Beverage" },
    { label: "⚖️ Government & Politics", value: "Government & Politics" },
    { label: "🍎 Health & Wellness", value: "Health & Wellness" },
    { label: "💗 Non-Profit", value: "Non-Profit" },
    { label: "💗 Other", value: "Other" },
    { label: "🖥 Tech", value: "Tech" },
    { label: "✈️ Travel & Tourism", value: "Travel & Tourism" },
  ];
  

function UserInfo() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const userId = useSelector((state) => state.auth.userId);

  const [userInfoDetails, setUserInfoDetails] = useState({
    userId: userId,
    username: "",
    category: null,
  });
  const [errors, setErrors] = useState({ username: "", category: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfoDetails((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleCategorySelect = (category) => {
    setUserInfoDetails((prev) => ({
      ...prev,
      category: category.value,
    }));

    setErrors((prev) => ({
      ...prev,
      category: "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await userinfo(userInfoDetails);
      const data = await res.json();

      if (res.status === 200) {
        showToast(data.message, "success");
        navigate("/signin");
      } else if (res.status === 400) {
        setErrors(data.errors || {});
      } else {
        showToast(data.error || "Something went wrong", "error");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="user-info-Page">
      <div className="user-info-logo">
        <div className="user-info-logo-img">
          <img src={logoImage} alt="spark" />
        </div>
        <div className="user-info-logo-heading-name">
          <span>SPARK</span>
        </div>
      </div>

      <div className="user-info-form-container">
        <div className="user-info-form-heading-container">
          <div className="user-info-heading">
            <p>Tell us about yourself</p>
          </div>

          <div className="user-info-subheading">
            <p>For a personalized Spark experience</p>
          </div>
        </div>

        <form className="user-info-form" onSubmit={handleSubmit}>
          <div className="username-inputBox-container">
            <input
                name="username"
                id="username"
              type="text"
              className="username-inputBox"
              placeholder="Tell us your username"
              value={userInfoDetails.username}
              onChange={handleChange}
            />

                <div className="user-info-errorField">
                  <p>{errors.username}</p>
                </div>
          </div>

          <div className="user-info-category-selection">
            <div className="user-info-category-heading">
              <p>Select one category that best describes your Linktree:</p>
            </div>

            <div className="user-info-category-options">
              {categories.map((category) => (
                <button
                  type="button"
                  key={category.value}
                  className={`category-button ${
                    userInfoDetails.category === category.value ? "selected" : ""
                  }`}
                  onClick={() => handleCategorySelect(category)}
                >
                  {category.label}
                </button>
              ))}
            </div>

                <div className="user-info-errorField">
                  <p>{errors.category}</p>
                </div>
          </div>

          <div className="user-info-submit-button-container">
            <button type="submit" className="user-info-submit-button">Continue</button>
          </div>
        </form>
      </div>

      <div className="user-info-image">
        <img src={frame} alt="" />
      </div>
    </div>
  );
}

export default UserInfo;

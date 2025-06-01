import { useEffect, useState } from "react";
import "./LoginPopup.css";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import { useAuth } from "../../context/AuthContext";
import { HandleLogin } from "../../services/auth";
import { useNavigate } from "react-router-dom";
const LoginPopup = ({ onClose, onSignUpClick }) => {
  const [fadeIn, setFadeIn] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    acceptedTerms: false,
  });
  const navigate = useNavigate();
  
  const { user, setUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  useEffect(() => {
    setTimeout(() => setFadeIn(true), 10);
  }, []);

  const closePopup = () => {
    setFadeIn(false);
    setTimeout(() => onClose(), 300);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const response = await HandleLogin(formData);
    setIsLoading(false);
    if (response?.success && response.userData) {
      toast.success(`LoggedIn successfully as ${response.userData.name}`);
      setUser(response.userData);
      closePopup();
    } else if (response?.error?.msg === "No user exists create an account") {
      toast.error(
        "No account exists with this email, Please use a different one or Create an account"
      );
    } else if (response?.error?.msg === "Incorrect password") {
      toast.error("Please check your password and try again");
    } else {
      toast.error(
        "An unknown network error occured, Please try again in sometime"
      );
      closePopup();
    }
  };

  return (
    <div className="popup-overlay">
      <div className={`popup-box ${fadeIn ? "fade-in" : "fade-out"}`}>
        <button className="close-btn" onClick={closePopup}>
          ×
        </button>
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <input
            style={{ marginTop: "50px" }}
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />

<div className="terms-checkbox" style={{ margin: "15px 0" }}>
  <input
    type="checkbox"
    id="terms"
    name="acceptedTerms"
    checked={formData.acceptedTerms}
    onChange={(e) =>
      setFormData({ ...formData, acceptedTerms: e.target.checked })
    }
    required
  />
  <label htmlFor="terms" style={{ marginLeft: "8px", fontSize: "14px" }}>
    I accept the{" "}
    <a 
      className="terms-conditions" 
      href="/legal-easier/Terms&Conditions" 
      onClick={(e) => {
        e.preventDefault();
        navigate('/legal-easier/Terms&Conditions');
      }}
    >
      Terms and Conditions
    </a>{" "}
    and{" "}
    <a 
      className="terms-conditions" 
      href="/legal-easier/Privacy-Policy"
      onClick={(e) => {
        e.preventDefault();
        navigate('/legal-easier/Privacy-Policy');
      }}
    >
      Privacy Policy
    </a>
    .
  </label>
</div>  
          <button type="submit" className="submit-btn" disabled={isLoading}>
            {isLoading ? <ClipLoader size={20} color="#333" /> : "Submit"}
          </button>

          <p>
            Don't have an account ?{" "}
            <a
              className="redirect"
              href=""
              onClick={(e) => {
                e.preventDefault();
                onSignUpClick();
              }}
            >
              Create one
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPopup;

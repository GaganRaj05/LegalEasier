import React, { useState, useEffect } from "react";
import "./SignUpPopup.css";
import { ClipLoader } from "react-spinners";
import { getOtp, validateOTP, signUp } from "../../services/auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


const SignUpPopup = ({ onClose, onLoginClick }) => {
  const [fadeIn, setFadeIn] = useState(false);
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    username: "",
    password: "",
    confirmPassword: "",
    acceptedTerms: false
  });
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => setFadeIn(true), 10);
  }, []);

  const closePopup = () => {
    setFadeIn(false);
    setTimeout(() => onClose(), 300);
  };

  const handleSendOTP = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const response = await getOtp(email);
    setIsLoading(false);
    console.log(response);
    if (response?.success) {
      toast.success("An otp has been successfully to your email id");
    } else if (
      response?.error?.msg === "Account exists, please use a different email "
    ) {
      toast.error("Account exists, Please login");
      return;
    } else {
      toast.error("An unknown network error has occured");
      return;
    }
    setStep(2);
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    const data = {
      email,
      otp,
    };
    setIsLoading(true);
    const response = await validateOTP(data);
    setIsLoading(false);
    if (response?.success) {
      toast.success("Email verified successfully");
    } else if (response?.error?.msg === "Incorrect otp entered") {
      toast.error("Incorrect otp entered");
      return;
    } else {
      toast.error(
        "An unknown network error has occured, Please try again in some time"
      );
      return;
    }

    setStep(3);
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    const data = {
      email,
      user_name: formData.username,
      password: formData.password,
      address: formData.address,
      name: formData.name,
      acceptedTerms:formData.acceptedTerms
    };
    setIsLoading(true);
    const response = await signUp(data);
    setIsLoading(false);
    if (response?.success) {
      toast.success("Account created successfully, Please login");
      onClose();
    } else if (
      response?.error?.msg === "Username taken please enter a new one"
    ) {
      toast.error("Username taken, Please enter a new one");
    } else if (response?.error) {
      toast.error(
        "An unknown network error has occured, Please try again later"
      );
      return;
    }
  };

  return (
    <div className="signup-popup-overlay">
      <div className={`signup-popup-box ${fadeIn ? "fade-in" : "fade-out"}`}>
        <button className="close-btn" onClick={closePopup}>
          ×
        </button>
        <h2>Sign Up</h2>

        {step === 1 && (
          <form onSubmit={handleSendOTP}>
            <input
              type="email"
              placeholder="Enter Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
</div>              <button type="submit" className="submit-btn" disabled={isLoading}>
              {isLoading ? <ClipLoader size={20} color="#333" /> : "Send OTP"}
            </button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleVerifyOTP}>
            <input
              type="text"
              placeholder="Enter OTP"
              required
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <button type="submit" className="submit-btn" disabled={isLoading}>
              {isLoading ? <ClipLoader size={20} color="#333" /> : "Verify OTP"}
            </button>
          </form>
        )}

        {step === 3 && (
          <form onSubmit={handleSubmitForm}>
            <input
              type="text"
              placeholder="Full Name"
              required
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Address"
              required
              value={formData.address}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Username"
              required
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
            />
            <input
              type="password"
              placeholder="Password"
              required
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
            <input
              type="password"
              placeholder="Confirm Password"
              required
              value={formData.confirmPassword}
              onChange={(e) =>
                setFormData({ ...formData, confirmPassword: e.target.value })
              }
            />
            <button type="submit" className="submit-btn" disabled={isLoading}>
              {isLoading ? <ClipLoader size={20} color="#333" /> : "Sign up"}
            </button>
          </form>
        )}
        <p style={{ marginTop: "10px" }}>
          Already have an Account?{" "}
          <a
            className="redirect"
            href=""
            onClick={(e) => {
              e.preventDefault();
              onLoginClick();
            }}
          >
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignUpPopup;

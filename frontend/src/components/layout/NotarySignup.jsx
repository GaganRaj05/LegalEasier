import { useState } from "react";
import "./NotarySignup.css";
import { FaFlagUsa } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import {
  validateEmail,
  validatePhone,
  sendOtpToEmail,
  sendOtpToPhone,
  notarySignup,
  notaryDetails,
} from "../../services/notary";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";

const US_STATES = [
  "Alabama",
  "Alaska",
  "Arizona",
  "Arkansas",
  "California",
  "Colorado",
  "Connecticut",
  "Delaware",
  "Florida",
  "Georgia",
  "Hawaii",
  "Idaho",
  "Illinois",
  "Indiana",
  "Iowa",
  "Kansas",
  "Kentucky",
  "Louisiana",
  "Maine",
  "Maryland",
  "Massachusetts",
  "Michigan",
  "Minnesota",
  "Mississippi",
  "Missouri",
  "Montana",
  "Nebraska",
  "Nevada",
  "New Hampshire",
  "New Jersey",
  "New Mexico",
  "New York",
  "North Carolina",
  "North Dakota",
  "Ohio",
  "Oklahoma",
  "Oregon",
  "Pennsylvania",
  "Rhode Island",
  "South Carolina",
  "South Dakota",
  "Tennessee",
  "Texas",
  "Utah",
  "Vermont",
  "Virginia",
  "Washington",
  "West Virginia",
  "Wisconsin",
  "Wyoming",
];

const servicesList = [
  "Affidavit",
  "Acknowledgment",
  "Oaths",
  "Witnessing Signatures",
];

const NotarySignup = ({ onClose }) => {
  const [step, setStep] = useState(1);
  const [showPopup, setShowPopup] = useState(true);
  const [isClosing, setIsClosing] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    emailOtp: "",
    phone: "",
    phoneOtp: "",
    name: "",
    preferred_method: [],
    license_number: "",
    state: "",
    expiration_date: "",
    services_offered: [],
    other_service: "",
    showOther: false,
    business_name: "",
    business_address: "",
    website_url: "",
    years_in_business: "",
    acceptedTerms: false
  });

  const togglePreferred = (method) => {
    setFormData((prev) => {
      const updated = [...prev.preferred_method];
      if (updated.includes(method)) {
        return {
          ...prev,
          preferred_method: updated.filter((m) => m !== method),
        };
      } else {
        updated.push(method);
        return { ...prev, preferred_method: updated };
      }
    });
  };

  const toggleService = (service) => {
    setFormData((prev) => {
      const updated = [...prev.services_offered];
      if (updated.includes(service)) {
        return {
          ...prev,
          services_offered: updated.filter((s) => s !== service),
        };
      } else {
        updated.push(service);
        return { ...prev, services_offered: updated };
      }
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => setShowPopup(false), 400);
    onClose();
  };

  if (!showPopup) return null;

  const handleSendingEmail = async () => {
    if (!formData.email) {
      toast.error("Please enter your email address");
      return;
    }
if (!formData.acceptedTerms) {
    toast.error("You must accept the Terms and Conditions");
      return;
    }
    setLoading(true);
    const response = await sendOtpToEmail(formData.email);
    setLoading(false);

    if (response?.success) {
      toast.success("An OTP has been sent to your email successfully");
      setStep(2);
    } else if (response?.error?.msg === "To many requests, please try again") {
      toast.error("OTP requests exceeded, please try again later");
    } else if (
      response?.error?.msg === "Some error occured please try again later"
    ) {
      toast.error(response.error.msg);
    } else if (response?.error?.msg === "Email exists, please login") {
      toast.error("Email already exists, please login");
    } else {
      toast.error(
        "An unknown network error has occurred, please try again later"
      );
    }
  };

  const handleVerifyEmail = async () => {
    if (!formData.emailOtp) {
      toast.error("Please enter the OTP");
      return;
    }

    

    setLoading(true);
    const response = await validateEmail({
      email: formData.email,
      otp: formData.emailOtp,
    });
    setLoading(false);

    if (response?.success) {
      toast.success("Email verified successfully");
      setStep(5);
    } else {
      toast.error(response?.error?.msg || "Invalid OTP, please try again");
    }
  };

  const handleSendingPhone = async () => {
  if (!formData.phone) {
    toast.error("Please enter your phone number");
    return;
  }

  const formattedPhone = `1${formData.phone.replace(/\D/g, '').slice(0, 10)}`;
  
  setLoading(true);
  const response = await sendOtpToPhone(formattedPhone); 
  setLoading(false);

    if (response?.success) {
      toast.success("An OTP has been sent to your phone successfully");
      setStep(4);
    } else if (
      response?.error?.msg === "To many otp request, try again in few minutes"
    ) {
      toast.error("OTP requests exceeded, please try again later");
    } else if (
      response?.error?.message ===
      "Twilio rejected this number. Please enter a valid U.S. mobile number."
    ) {
      toast.error("Please enter a valid U.S. mobile number");
    } else if (
      response?.error?.msg === "A user exits with this phone please login"
    ) {
      toast.error("Phone number already exists, please login");
    } else {
      toast.error("Failed to send OTP, please try again");
    }
  };

  const handleVerifyPhone = async () => {
    if (!formData.phoneOtp) {
      toast.error("Please enter the OTP");
      return;
    }
      const formattedPhone = `1${formData.phone.replace(/\D/g, '').slice(0, 10)}`;
    setLoading(true);
    const response = await validatePhone({
      phone: formattedPhone,
      otp: formData.phoneOtp,
    });
    setLoading(false);

    if (response?.success) {
      toast.success("Phone verified successfully");
      setStep(5);
    } else {
      toast.error(response?.error?.msg || "Invalid OTP, please try again");
    }
  };

  const handleSubmit = async () => {
    if (
      !formData.name ||
      !formData.license_number ||
      !formData.state ||
      !formData.expiration_date ||
      formData.services_offered.length === 0 ||
      !formData.business_address ||
      !formData.years_in_business
    ) {
      toast.error("Please fill all required fields");
      return;
    }

    if (formData.preferred_method.length === 0) {
      toast.error("Please select at least one preferred contact method");
      return;
    }

    setLoading(true);
    const response = await notarySignup(formData);
    setLoading(false);

    if (response?.success) {
      toast.success("Account created successfully!");
      await notaryDetails(formData);
      handleClose();
    } 
    else if(response?.error?.msg === "License number already exists") {
      toast.error("License number exists please use a different one");
      return;
    }
    else {
      toast.error(
        response?.error?.msg || "Failed to create account, please try again"
      );
    }
  };

  return (
    <div className={`popup ${isClosing ? "fade-out" : "fade-in"}`}>
      <div className="form-container">
        <button className="close-btn" onClick={handleClose}>
          ×
        </button>
        <h2>Notary Signup</h2>

        {step === 1 && (
          <>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email address"
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
</div>            <button
              type="submit"
              className="notary-sg-btn"
              disabled={loading}
              onClick={handleSendingEmail}
            >
              {loading ? <ClipLoader size={20} color="#333" /> : "Send OTP"}
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <label>Enter Email OTP:</label>
            <input
              type="text"
              name="emailOtp"
              value={formData.emailOtp}
              onChange={handleChange}
              placeholder="Enter 6-digit OTP"
              required
            />

<div className="notary-note" >
  <h3 style={{color:'#0c6bb1',fontWeight:"600"}}>Note:</h3>
<p className="otp-info">
  A 6-digit OTP has been sent to your email.
  <br />
  <em>(If you don't see it in your inbox, please check your spam or junk folder.)</em>
</p>
</div>

            <button
              type="notary-sg-btn"
              onClick={handleVerifyEmail}
              className="submit-btn"
              disabled={loading}
            >

              {loading ? <ClipLoader size={20} color="#333" /> : "Verify"}
            </button>
          </>
        )}

{/* {step === 3 && (
  <>
    <label>Phone Number:</label>
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        padding: '8px 12px',
        border: '1px solid #ccc',
        borderRight: 'none',
        borderRadius: '4px 0 0 4px',
        background: 'white',
        marginBottom:'10px',
        border:'0'
      }}>
        <FaFlagUsa style={{ marginRight: '8px',height:'40px', color: '#3c78d8',backgroundColor:'white' }} />
        <span style={{backgroundColor:'white'}}>+1</span>
      </div>
      <input
        type="tel"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        placeholder="Enter your phone number"
        required
        style={{
          flex: 1,
          borderTopLeftRadius: 0,
          borderBottomLeftRadius: 0
        }}
      />
    </div>
    <button
      className="notary-sg-btn"
      onClick={handleSendingPhone}
      disabled={loading}
    >
      {loading ? <ClipLoader size={20} color="#333" /> : "Submit"}
    </button>
  </>
)}
        {step === 4 && (
          <>
            <label>Enter Phone OTP:</label>
            <input
              type="text"
              name="phoneOtp"
              value={formData.phoneOtp}
              onChange={handleChange}
              placeholder="Enter 6-digit OTP"
              required
            />
            <button
              className="notary-sg-btn"
              onClick={handleVerifyPhone}
              disabled={loading}
            >
              {loading ? <ClipLoader size={20} color="#333" /> : "Verify"}{" "}
            </button>
          </>
        )} */}

        {step === 5 && (
          <>
            <label>
              Name:<span style={{ color: "red" }}>*</span>
            </label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your full name"
              required
            />
                <label>Phone Number:</label>
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        padding: '8px 12px',
        borderRadius: '4px 0 0 4px',
        background: 'white',
        marginBottom:'10px',
        border:'0'
      }}>
        <FaFlagUsa style={{ marginRight: '8px',height:'40px', color: '#3c78d8',backgroundColor:'white' }} />
        <span style={{backgroundColor:'white'}}>+1</span>
      </div>
      <input
        type="tel"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        placeholder="Enter your phone number"
        required
        style={{
          flex: 1,
          borderTopLeftRadius: 0,
          borderBottomLeftRadius: 0
        }}
      />
    </div>
   

            <label>Preferred Contact Method:</label>
            <div className="prf-c">
              <input
                className="mr"
                type="checkbox"
                onChange={() => togglePreferred("email")}
                checked={formData.preferred_method.includes("email")}
              />{" "}
              Email
              <input
                className="mr"
                type="checkbox"
                onChange={() => togglePreferred("phone")}
                checked={formData.preferred_method.includes("phone")}
              />{" "}
              Phone
            </div>

            <label>
              License Number:<span style={{ color: "red" }}>*</span>
            </label>
            <input
              name="license_number"
              value={formData.license_number}
              onChange={handleChange}
              placeholder="Your notary license number"
              required
            />

            <label>
              State:<span style={{ color: "red" }}>*</span>
            </label>
            <select
              className="drp-dwn"
              name="state"
              value={formData.state}
              onChange={handleChange}
              required
            >
              <option value="">Select a State</option>
              {US_STATES.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>

            <label>
              Expiration Date: <span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="date"
              name="expiration_date"
              value={formData.expiration_date}
              onChange={handleChange}
              required
            />

            <label>Services Offered:</label>
            <div className="services-offered">
              {servicesList.map((service) => (
                <div key={service}>
                  <input
                    type="checkbox"
                    checked={formData.services_offered.includes(service)}
                    onChange={() => toggleService(service)}
                  />{" "}
                  {service}
                </div>
              ))}
              <div>
                <button
                  className="notary-sg-btn"
                  type="button"
                  onClick={() =>
                    setFormData((p) => ({ ...p, showOther: !p.showOther }))
                  }
                >
                  + Other
                </button>
              </div>
              {formData.showOther && (
                <textarea
                  className="others"
                  name="other_service"
                  placeholder="Describe other service"
                  value={formData.other_service}
                  onChange={handleChange}
                />
              )}
            </div>

            <label>Business Name (optional): </label>
            <input
              name="business_name"
              value={formData.business_name}
              onChange={handleChange}
              placeholder="Your business name"
            />

            <label>
              Business Address: <span style={{ color: "red" }}>*</span>
            </label>
            <input
              name="business_address"
              value={formData.business_address}
              onChange={handleChange}
              placeholder="Your business address"
              required
            />

            <label>Website URL:</label>
            <input
              type="url"
              name="website_url"
              value={formData.website_url}
              onChange={handleChange}
              placeholder="https://example.com"
            />

            <label>
              Years in Business: <span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="number"
              name="years_in_business"
              value={formData.years_in_business}
              onChange={handleChange}
              placeholder="Number of years"
              required
            />

            <button
              className="notary-sg-btn"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? <ClipLoader size={20} color="#333" /> : "Submit"}{" "}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default NotarySignup;

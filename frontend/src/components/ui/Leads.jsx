import { useState, useEffect, forwardRef } from "react";
import "./Leads.css";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import {toast} from "react-toastify";
import { sendInfo } from "../../services/leads";
import { ClipLoader } from "react-spinners";

const Leads = forwardRef(({ onClose,onSubmission }, ref) => {
  const [isVisible, setIsVisible] = useState(false);
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name:'',
    email:'',
    phone:'',
    query:'',
    lead_source:''
  })

  useEffect(() => {
    setIsVisible(true);

    const timer = setTimeout(() => {
      if (!isVisible) {
        setIsVisible(true);
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const closePopup = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]:e.target.value});
    if (errors[e.target.name]) {
      setErrors({...errors, [e.target.name]: ''});
    }
  }

  const validateStep = () => {
    const newErrors = {};
    
    if (step === 2 && !formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (step === 3) {
      if (!formData.email.trim()) {
        newErrors.email = 'Email is required';
      } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
        newErrors.email = 'Email is invalid';
      }
    }
    
    if (step === 4 && !formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }
    
    if (step === 5 && !formData.lead_source) {
      newErrors.lead_source = 'Please select an option';
    }
    
    if (step === 6 && !formData.query.trim()) {
      newErrors.query = 'Please describe your legal issue';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  const handleNext = (e) => {
    e.preventDefault();
    if (validateStep()) {
      setStep(step + 1);
    }
  }

  const sendLeadInfo = async(e) => {
    e.preventDefault();
    if (validateStep()) {
      setIsLoading(true);
      const response = await sendInfo(formData);
      setIsLoading(false);
      if(response?.success) {
        localStorage.setItem('convo_id', response.convo_id);
        toast.success('Form submitted successfully');
      }
      else if(response?.error ) {
        toast.error("An unknown network error has occured please try again in some time");
      }
      onSubmission();
    }
  }

  return (
    <>
      <div
        className={`leads-overlay ${isVisible ? "visible" : ""}`}
        onClick={closePopup}
      />

      <div className={`leads-popup ${isVisible ? "visible" : ""}`}>
        <button className="leads-close-btn" onClick={closePopup}>
          &times;
        </button>
        <div className="ai-greet">
          <div className="animation-robot">
            <DotLottieReact
              src="https://lottie.host/80351646-58bd-4a4d-a055-c8ca6e71887d/9SnQ20ewAS.lottie"
              loop
              autoplay
            />
          </div>
          <div className="ai-greet-content">
            {step === 1 && <>
              <h1 className="ai-greet-head">Hi! I'm Lawdog, your friendly legal assistant</h1>
              <p>
                I'm here to help you navigate issues like divorce, eviction, estate planning, and more. How can I assist you today?
              </p>
              <button className="ai-greet-next" onClick={(e)=>{e.preventDefault();setStep(2);}}>Next</button>
            </>}
            
            {step === 2 && <>
              <h1 className="ai-greet-head">Let's get to know you a bit!...</h1>
              <label htmlFor="name">Enter your name</label>
              <input 
                id="name" 
                name="name" 
                type="text" 
                value={formData.name} 
                onChange={handleChange} 
                required
                className={errors.name ? 'error-input' : ''}
              />
              {errors.name && <div className="error-message">{errors.name}</div>}
              <button className="ai-greet-next" onClick={handleNext}>Next</button>
            </>}  
            
            {step === 3 && <>
              <h1 className="ai-greet-head">Let's get to know you a bit!...</h1>
              <label htmlFor="email">Enter your email</label>
              <input 
                id="email" 
                name="email" 
                type="email" 
                value={formData.email} 
                onChange={handleChange}  
                required
                className={errors.email ? 'error-input' : ''}
              />
              {errors.email && <div className="error-message">{errors.email}</div>}
              <button className="ai-greet-next" onClick={handleNext}>Next</button>
            </>}  

            {step === 4 && <>
              <h1 className="ai-greet-head">Let's get to know you a bit!...</h1>
              <label htmlFor="phone">Enter your mobile number</label>
              <input 
                id="phone" 
                name="phone" 
                type="text" 
                value={formData.phone} 
                onChange={handleChange}  
                required
                className={errors.phone ? 'error-input' : ''}
              />
              {errors.phone && <div className="error-message">{errors.phone}</div>}
              <button className="ai-greet-next" onClick={handleNext}>Next</button>
            </>}
            
            {step === 5 && <>
              <h1 className="ai-greet-head">Let's get to know you a bit!...</h1>
              <label>Where did you hear about us?</label>
              <ul className="lead-source-options">
                  <li>
                      <input 
                          type="radio" 
                          id="youtube" 
                          name="lead_source" 
                          value="YouTube" 
                          checked={formData.lead_source === "YouTube"} 
                          onChange={handleChange} 
                          required
                      />
                      <label htmlFor="youtube">YouTube</label>
                  </li>
                  <li>
                      <input 
                          type="radio" 
                          id="instagram" 
                          name="lead_source" 
                          value="Instagram" 
                          checked={formData.lead_source === "Instagram"} 
                          onChange={handleChange} 
                          required
                      />
                      <label htmlFor="instagram">Instagram</label>
                  </li>
                  <li>
                      <input 
                          type="radio" 
                          id="linkedin" 
                          name="lead_source" 
                          value="LinkedIn" 
                          checked={formData.lead_source === "LinkedIn"} 
                          onChange={handleChange} 
                          required
                      />
                      <label htmlFor="linkedin">LinkedIn</label>
                  </li>
                  <li>
                      <input 
                          type="radio" 
                          id="other" 
                          name="lead_source" 
                          value="Other" 
                          checked={formData.lead_source === "Other"} 
                          onChange={handleChange} 
                          required
                      />
                      <label htmlFor="other">Other</label>
                  </li>
              </ul>
              {errors.lead_source && <div className="error-message">{errors.lead_source}</div>}
              <button className="ai-greet-next" onClick={handleNext}>Next</button>
            </>}  
            
            {step === 6 && <>
              <h1 className="ai-greet-head">Let's get to know you a bit!...</h1>
              <label htmlFor="query">What legal issue are you facing?</label>
              <input 
                id="query" 
                name="query" 
                type="text" 
                value={formData.query} 
                onChange={handleChange} 
                required
                className={errors.query ? 'error-input' : ''}
              />
              {errors.query && <div className="error-message">{errors.query}</div>}
              <button 
                className="ai-greet-next" 
                onClick={sendLeadInfo} 
                disabled={isLoading}
              >
                {isLoading ? <ClipLoader size={20} color="#333" /> : "Submit"}
              </button>
            </>}  
          </div>
        </div>
      </div>
    </>
  );
});

export default Leads;
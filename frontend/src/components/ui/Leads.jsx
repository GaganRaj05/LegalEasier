import { useState, useEffect, forwardRef } from "react";
import "./Leads.css";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import {toast} from "react-toastify";


const Leads = forwardRef(({ onClose }, ref) => {
  const [isVisible, setIsVisible] = useState(false);
  const [step, setStep] = useState(1);
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
    setFormData({...formData, [e.target.name]:e.target.value})
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
              {step === 2 && 
              
              <>
                <h1 className="ai-greet-head">Let's get to know you a bit!...</h1>
                <label htmlFor="name">Enter your name</label>
                <input id="name" name="name" type="text" value={formData.name} onChange={handleChange} required/>
                <button className="ai-greet-next" onClick={(e)=>{e.preventDefault();setStep(3);}}>Next</button>
              </>}  
              {step === 3 && 
              
              <>
                <h1 className="ai-greet-head">Let's get to know you a bit!...</h1>
                <label htmlFor="email">Enter your email</label>
                <input id="email" name="email" type="email" value={formData.email} onChange={handleChange}  required/>
                <button className="ai-greet-next" onClick={(e)=>{e.preventDefault();setStep(4);}}>Next</button>
              </>}  

              {step === 4 && <>
                                <h1 className="ai-greet-head">Let's get to know you a bit!...</h1>

                                <label htmlFor="phone">Enter your mobile number</label>
                <input id="phone" name="phone" type="text" value={formData.phone} onChange={handleChange}  required/>
                <button className="ai-greet-next" onClick={(e)=>{e.preventDefault();setStep(5);}}>Next</button>

              </>}
              {step === 5 && 
              
              <>
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
                <button className="ai-greet-next" onClick={(e)=>{e.preventDefault();setStep(6);}}>Next</button>
              </>}  
                {step === 6 && 
              
              <>
                <h1 className="ai-greet-head">Let's get to know you a bit!...</h1>
                <label htmlFor="query">What legal issue are you facing?</label>
                <input id="query" name="query" type="text" value={formData.query} onChange={handleChange} required/>
                <button className="ai-greet-next" onClick={(e)=>{e.preventDefault(); toast.success("Form Submitted Successfully!"); closePopup();}}>Submit</button>
              </>}  

          </div>
        </div>
      </div>
    </>
  );
});

export default Leads;
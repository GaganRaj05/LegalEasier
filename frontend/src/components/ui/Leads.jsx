import { useState, useEffect, forwardRef } from "react";
import "./Leads.css";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import {toast} from "react-toastify";

const Leads = forwardRef(({ onClose }, ref) => {
  const [isVisible, setIsVisible] = useState(false);

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
              src="https://lottie.host/1bf8ab4d-326c-4792-b0e3-9404a35b289f/fjMVJGTc6l.lottie"
              loop
              autoplay
            />
          </div>
          <div className="ai-greet-content">
            <h1 className="ai-greet-head">Hi! I'm Lawgic, your friendly legal assistant</h1>
            <p>
               I'm here to help you navigate issues like divorce, eviction, estate planning, and more. How can I assist you today?
            </p>
            <button className="ai-greet-next" onClick={()=>toast.error('Feature yet to be added')}>Next</button>
          </div>
        </div>
      </div>
    </>
  );
});

export default Leads;

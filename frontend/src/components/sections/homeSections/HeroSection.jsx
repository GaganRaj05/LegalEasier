import "./HeroSection.css";
import Button from "../../ui/Buttons";
import ContactFormPopup from "../../layout/ContactForm";
import { useAuth } from "../../../context/AuthContext";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoginPopup from "../../layout/Login";
import SignUpPopup from "../../layout/SignUp";
import Leads from "../../ui/Leads";
import ChatContainer from "../../ui/ChatContainer";
const HeroSection = () => {
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isChatOpen, setIsChatOpen] = useState(false);

  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isBotOpen, setIsBotOpen] = useState(false);


  const handleClick = (e, btnType) => {
    if (btnType === "Get Help Now") {
      console.log(btnType)
      if (!user) {
        setIsChatOpen(true)
        return;
      }
      navigate('/schedule')
    } else if (btnType === "Notary"){
      navigate("/legal-easier/notary-service");
    }
  };

  return (
    <>
        <section className="hero-section">
      <div className="hero-info-container">
        <h1 className="hero-head">
          Legal Forms Done Right.
          <span>No Lawyer Needed.</span>
        </h1>
        <p className="hero-info">
          Fast, affordable legal document preparation for everyday legal
          matters. Save time and money with our professional services.
        </p>
        <Button
          classname="primary-btn hr"
          onClick={(e) => handleClick(e, "Get Help Now")}
        >
          Get Help Now
        </Button>
        <Button classname="secondary-btn" onClick={(e)=>handleClick(e,"Notary")}>See How It Works</Button>
      </div>
      <div className="fall-container">
        <img
          src="/Group-2.svg"
          alt="Falling Ball"
          className="falling-image curved-fall"
        />
      </div>
    </section>

      {isLoginOpen && (
        <LoginPopup
          onSignUpClick={(e) => {
            setIsLoginOpen(false);
            setIsSignUpOpen(true);
          }}
          onClose={(e) => setIsLoginOpen(false)}
        />
      )}
      {isSignUpOpen && (
        <SignUpPopup
          onLoginClick={(e) => {
            setIsSignUpOpen(false);
            setIsLoginOpen(true);
          }}
          onClose={(e) => setIsSignUpOpen(false)}
        />
      )}
      {isContactFormOpen && (
        <ContactFormPopup onClose={() => setIsContactFormOpen(false)} />
      )}
        {isBotOpen && <Leads onClose={()=>{setIsBotOpen(false)}} />}
      {isChatOpen && <ChatContainer onClose={()=>setIsChatOpen(false)}/>}
    </>
  );
};

export default HeroSection;

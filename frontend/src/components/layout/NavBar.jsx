import "./NavBar.css";
import Button from "../ui/Buttons";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import LoginPopup from "./Login";
import {useAuth} from "../../context/AuthContext";
import SignUpPopup from "./SignUp";
import ContactFormPopup from "./ContactForm";
import { toast } from "react-toastify";
const NavBar = () => {
  const navigate = useNavigate();
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const {user} = useAuth();
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);
  const handleClick = (e, pageType) => {
    if (pageType === "services") {
      navigate("/legal-easier/services");
    } else if (pageType === "Home") {
      navigate("/");
    } else if (pageType === "Notary") {
      navigate("/legal-easier/notary-service");
    }
    else if(pageType === "Login") {
      if(!user) {
          setIsLoginOpen(true);
          return;
      }
      setIsContactFormOpen(true)
    }
    else {
      toast.error("Feature yet to be added")
    }
  };

  
  return (
    <div className="navbar-container">
      <nav className="navbar">
        <ul className="nav-groups">
          <li>
            <img
              className="logo"
              src="https://www.sispnhost.com/apps-for-steps/wp-content/uploads/2025/05/legal_easier_logo.svg"
              alt="Legal Easier Logo"
            />
          </li>
        </ul>
        <ul className="nav-groups nl">
          <li onClick={(e) => handleClick(e, "Home")}>Home</li>
          <li onClick={(e)=>handleClick(e,"About")}>About</li>
          <li onClick={(e) => handleClick(e, "services")}>Services</li>
          <li onClick={(e) => handleClick(e, "Notary")}>How it Works</li>
          <li onClick={(e)=>handleClick(e,"About")}>Pricing</li>
        </ul>
        <ul className="nav-groups">
          <li>
            <Button classname="primary-btn" onClick={(e)=>handleClick(e,'Login')}>Get Help Now</Button>
          </li>
        </ul>
      </nav>
      {isLoginOpen && <LoginPopup onSignUpClick={(e)=> { setIsLoginOpen(false); setIsSignUpOpen(true);}} onClose={(e)=>setIsLoginOpen(false)}/>}
      {isSignUpOpen && <SignUpPopup onLoginClick = {(e)=>{setIsSignUpOpen(false);setIsLoginOpen(true)}} onClose={(e)=>setIsSignUpOpen(false)}/>}
        {isContactFormOpen && <ContactFormPopup onClose={()=>setIsContactFormOpen(false)}/>}
    </div>
  );
};

export default NavBar;

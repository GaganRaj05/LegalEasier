import "./NavBar.css";
import Button from "../ui/Buttons";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import LoginPopup from "./Login";
import { useAuth } from "../../context/AuthContext";
import SignUpPopup from "./SignUp";
import ContactFormPopup from "./ContactForm";
import { toast } from "react-toastify";
import { FaBars, FaTimes } from "react-icons/fa";
import Leads from "../ui/Leads";
import ChatContainer from "../ui/ChatContainer";
const NavBar = () => {
  const navigate = useNavigate();
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const { user } = useAuth();
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleClick = (e, pageType) => {
    if (pageType === "services") {
      navigate("/legal-easier/services");
    } else if (pageType === "Home") {
      navigate("/");
    } else if (pageType === "Notary") {
      navigate("/legal-easier/notary-service");
    }
    else if(pageType === "Contact") {
      navigate('/legal-easier/contact-us')
    }
    else if(pageType === "Blog" ) {
      navigate('/legal-easier/blog-page');
    }
    else if(pageType === 'Get Help') {
      setIsChatOpen(true);
    }
    else if (pageType === "Login") {
      if (!user) {
        setIsLoginOpen(true);
        return;
      }
      navigate('/schedule')
    } else {
      toast.error("Feature yet to be added");
    }
    setIsMobileMenuOpen(false); 
  };

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobileView(window.innerWidth <= 1030);
    };
    
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return (
    <div className="navbar-container">
      <nav className="navbar">
        <ul className="nav-groups logo-group">
          <li>
            <img
              className="logo"
              src="https://www.sispnhost.com/apps-for-steps/wp-content/uploads/2025/05/legal_easier_logo.svg"
              alt="Legal Easier Logo"
            />
          </li>
        </ul>

        <ul className={`nav-groups nl ${isMobileView ? "mobile-hidden" : ""}`}>
          <li onClick={(e) => handleClick(e, "Home")}>Home</li>
          <li onClick={(e) => handleClick(e, "services")}>Services</li>
          <li onClick={(e) => handleClick(e, "Notary")}>Notary Referral</li>
          <li onClick={(e) => handleClick(e, "Blog")}>Blog</li>
          <li onClick={(e) => handleClick(e, "Contact")}>Contact Us</li>
        </ul>

        <ul className={`nav-groups ${isMobileView ? "mobile-hidden" : ""}`}>
          <li>
            <Button classname="primary-btn" onClick={(e) => handleClick(e, "Get Help")}>
              Get Help Now
            </Button>
          </li>
        </ul>

        {isMobileView && (
          <button
            className="mobile-menu-btn"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        )}
      </nav>

      {isMobileView && isMobileMenuOpen && (
        <div className="mobile-menu">
          <ul>
          <li onClick={(e) => handleClick(e, "Home")}>Home</li>
          <li onClick={(e) => handleClick(e, "services")}>Services</li>
          <li onClick={(e) => handleClick(e, "Notary")}>Notary Referral</li>
          <li onClick={(e) => handleClick(e, "Blog")}>Blog</li>
          <li onClick={(e) => handleClick(e, "Contact")}>Contact Us</li>
            <li>
              <Button classname="primary-btn" onClick={(e) => handleClick(e, "Get Help")}>
                Get Help Now
              </Button>
            </li>
          </ul>
        </div>
      )}

      {isLoginOpen && (
        <LoginPopup
          onSignUpClick={() => {
            setIsLoginOpen(false);
            setIsSignUpOpen(true);
          }}
          onClose={() => setIsLoginOpen(false)}
        />
      )}
      {isSignUpOpen && (
        <SignUpPopup
          onLoginClick={() => {
            setIsSignUpOpen(false);
            setIsLoginOpen(true);
          }}
          onClose={() => setIsSignUpOpen(false)}
        />
      )}
      {isContactFormOpen && (
        <ContactFormPopup onClose={() => setIsContactFormOpen(false)} />
      )}
      {isChatOpen && <ChatContainer onClose={()=>setIsChatOpen(false)}/>}
    </div>
  );
};

export default NavBar;
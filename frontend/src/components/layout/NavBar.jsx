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

const NavBar = () => {
  const navigate = useNavigate();
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const { user } = useAuth();
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);

  const handleClick = (e, pageType) => {
    if (pageType === "services") {
      navigate("/legal-easier/services");
    } else if (pageType === "Home") {
      navigate("/");
    } else if (pageType === "Notary") {
      navigate("/legal-easier/notary-service");
    } else if (pageType === "Login") {
      if (!user) {
        setIsLoginOpen(true);
        return;
      }
      setIsContactFormOpen(true);
    } else {
      toast.error("Feature yet to be added");
    }
    setIsMobileMenuOpen(false); // Close mobile menu after click
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

        {/* Desktop Navigation */}
        <ul className={`nav-groups nl ${isMobileView ? "mobile-hidden" : ""}`}>
          <li onClick={(e) => handleClick(e, "Home")}>Home</li>
          <li onClick={(e) => handleClick(e, "About")}>About</li>
          <li onClick={(e) => handleClick(e, "services")}>Services</li>
          <li onClick={(e) => handleClick(e, "Notary")}>How it Works</li>
          <li onClick={(e) => handleClick(e, "About")}>Pricing</li>
        </ul>

        {/* Desktop Button */}
        <ul className={`nav-groups ${isMobileView ? "mobile-hidden" : ""}`}>
          <li>
            <Button classname="primary-btn" onClick={(e) => handleClick(e, "Login")}>
              Get Help Now
            </Button>
          </li>
        </ul>

        {/* Mobile Menu Button */}
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
            <li onClick={(e) => handleClick(e, "About")}>About</li>
            <li onClick={(e) => handleClick(e, "services")}>Services</li>
            <li onClick={(e) => handleClick(e, "Notary")}>How it Works</li>
            <li onClick={(e) => handleClick(e, "About")}>Pricing</li>
            <li>
              <Button classname="primary-btn" onClick={(e) => handleClick(e, "Login")}>
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
    </div>
  );
};

export default NavBar;
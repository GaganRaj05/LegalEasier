import "./Footer.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaInstagram, FaYoutube, FaFacebook } from "react-icons/fa"; 

const Footer = ()=> {
    const navigate = useNavigate();
    return (
        <div className="footer">
            <div className="footer-links">
                <div className="footer-groups footer-info">
                    <img className="logo-footer" src="https://www.sispnhost.com/apps-for-steps/wp-content/uploads/2025/05/legaleasier-3-copy-2.png" alt="" />
                    <p className="footer-text">
                        Fast and affordable legal document preparation services for everyday legal matters.
                    </p>
                    <p className="footer-text">
                        Not a law firm. We do not provide legal advice.
                    </p>
                                        <div className="social-icons">
                        <a href="https://www.instagram.com/legal.easier/" target="_blank" rel="noopener noreferrer">
                            <FaInstagram className="social-icon" />
                        </a>
                        <a href="https://youtube.com/@legaleasier?si=rnyAkpRwAzCNqUnf" target="_blank" rel="noopener noreferrer">
                            <FaYoutube className="social-icon" />
                        </a>
                        <a href="https://www.facebook.com/profile.php?id=61576842895837" target="_blank" rel="noopener noreferrer">
                            <FaFacebook className="social-icon" />
                        </a>
                    </div>

                </div>  
                <div className="footer-groups links">
                    <h3>Quick Links</h3>
                    <p className="footer-text" onClick={()=>navigate('/')}>Home</p>
                    <p className="footer-text" onClick={()=>toast.error('Feature yet to be added')}>About</p>
                    <p className="footer-text" onClick={()=>navigate('/legal-easier/services')}>Services</p>
                    <p className="footer-text" onClick={()=>navigate('/legal-easier/notary-service')}>How it Works</p>
                    <p className="footer-text" onClick={()=>navigate('/legal-easier/services')}>Pricing</p>
                </div>
                <div className="footer-groups">
                    <h3>Services</h3>
                    <p className="footer-text" onClick={()=>navigate('/legal-easier/services')}>Eviction Assistance</p>
                    <p className="footer-text" onClick={()=>navigate('/legal-easier/services')}>Small Claims</p>
                    <p className="footer-text" onClick={()=>navigate('/legal-easier/services')}>
                        Uncontested Divorce
                    </p>
                    <p className="footer-text" onClick={()=>navigate('/legal-easier/services')}>
                        Name Changes
                    </p>
                    <p className="footer-text" onClick={()=>navigate('/legal-easier/services')}>
                        Wills & Advance Directives
                    </p>
                </div>

                <div className="footer-groups ">
                    <h3>Contact Us</h3>
                    <p className="footer-text">
                        <a href="mailto:contact@legaleasier.org">Email:contact@legaleasier.org</a>
                        </p>
                    <p className="footer-text">
                        <a href="tel:+1 407-891-5333">Phone: 407-891-5333</a></p>
                    <p className="footer-text">Hours: Monday-Friday, 9am-5pm</p>
                    <p className="footer-text"></p>
                </div>
            </div>
            <div className="footer-terms">
                <p className="terms-text">© 2025 LegalEasier. All rights reserved.
                </p>
                 <p className="terms-text mr" onClick={()=>navigate('/legal-easier/Terms&Conditions')}>Terms of Service</p>
                 <p className="terms-text" onClick={()=>navigate('/legal-easier/Privacy-Policy')}>Privacy Policy</p>
                <p className="terms-text" onClick={()=>navigate('/legal-easier/HelpAndFaq')}>
                    Help and FAQ
                </p>
            </div>
            
        </div>
    )
}

export default Footer;
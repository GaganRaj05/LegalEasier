import "./Footer.css";

const Footer = ()=> {
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
                </div>  
                <div className="footer-groups links">
                    <h3>Quick Links</h3>
                    <p className="footer-text">Home</p>
                    <p className="footer-text">About</p>
                    <p className="footer-text">Services</p>
                    <p className="footer-text">How it Works</p>
                    <p className="footer-text">Pricing</p>
                </div>
                <div className="footer-groups">
                    <h3>Services</h3>
                    <p className="footer-text">Eviction Assistance</p>
                    <p className="footer-text">Small Claims</p>
                    <p className="footer-text">
                        Uncontested Divorce
                    </p>
                    <p className="footer-text">
                        Name Changes
                    </p>
                    <p className="footer-text">
                        Wills & Advance Directives
                    </p>
                </div>

                <div className="footer-groups ">
                    <h3>Contact Us</h3>
                    <p className="footer-text">Email:info#legaleasier.org</p>
                    <p className="footer-text">Phone: (800) 55-1212</p>
                    <p className="footer-text">Hours: Monday-Friday, 9am-5pm</p>
                    <p className="footer-text"></p>
                </div>
            </div>
            <div className="footer-terms">
                <p className="terms-text">© 2025 LegalEasier. All rights reserved.
                </p>
                 <p className="terms-text mr">Terms of Service</p>
                 <p className="terms-text">Privacy Policy</p>
                <p className="terms-text">
                    Legal Disclaimer
                </p>
            </div>
        </div>
    )
}

export default Footer;
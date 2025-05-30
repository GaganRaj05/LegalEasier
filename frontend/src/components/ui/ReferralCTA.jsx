import { useState } from "react";
import "./ReferralCTA.css";
import {toast} from 'react-toastify';
import NotarySignup from "../layout/NotarySignup";


const ReferralCTA = () => {
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  return (
    <section className="referral-cta">
      <div className="cta-overlay">
        <h2 className="cta-heading">Ready to Get Started?</h2>
        <p className="cta-subtext">
          Sign up today to join our Notary Referral Program and start earning 20% commissions while
          supporting your clients with quality legal document services they can trust.
        </p>
        <button className="cta-button" onClick={(e)=>{e.preventDefault();setIsSignupOpen(true)}}>Sign Up</button>
      </div>
    {isSignupOpen &&       <NotarySignup onClose={()=>setIsSignupOpen(false)}/>}
    </section>
  );
};

export default ReferralCTA;

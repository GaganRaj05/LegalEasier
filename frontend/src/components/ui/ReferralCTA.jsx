import "./ReferralCTA.css";
import {toast} from 'react-toastify';
const ReferralCTA = () => {
  return (
    <section className="referral-cta">
      <div className="cta-overlay">
        <h2 className="cta-heading">Ready to Get Started?</h2>
        <p className="cta-subtext">
          Sign up today to join our Notary Referral Program and start earning 20% commissions while
          supporting your clients with quality legal document services they can trust.
        </p>
        <button className="cta-button" onClick={()=>toast.error('feature yet to added')}>Sign Up</button>
      </div>
    </section>
  );
};

export default ReferralCTA;

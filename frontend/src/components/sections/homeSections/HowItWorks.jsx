import "./HowItWorks.css";
import Button from "../../ui/Buttons";
import {toast} from 'react-toastify';
import { useNavigate } from "react-router-dom";
const HowItWorks = () => {
  const navigate = useNavigate();
  return (
    <div className="how-it-works">
      <div className="hw-section-head">
        <h2>How It Works?</h2>
        <span className="process-text">
          Our simple 3-step process makes getting your legal documents quick and
          hassle-free.
        </span>
      </div>
      <div className="info-cards-container">
        <div className="info-cards">
          <button>1</button>
          <p className="process-head">Tell Us What You Need</p>

          <p className="process-info">
            Complete our simple online intake form with your specific
            requirements.
          </p>
        </div>
        <div className="info-cards">
          <button>2</button>
          <p className="process-head">We Prepare Your Docs</p>
          <p className="process-info">
            Our specialists prepare your legal documents and deliver them as
            ready-to-sign PDFs.
          </p>
        </div>
        <div className="info-cards">
            <button>3</button>
            <p className="process-head">You File or Submit</p>
            <p className="process-info">You remain in control of your legal process with our guidance on next steps.</p>
        </div>
      </div>
      <div className="hw-btn">
        <Button classname="primary-btn hw" onClick={()=>navigate('/schedule')}>
            Get Your Documents Now
        </Button>
        </div> 
    </div>
  );
};
export default HowItWorks;

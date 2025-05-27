import "./HeroSection.css";
import Button from "../../ui/Buttons";
const HeroSection = () => {
  return (
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
        <Button classname="primary-btn hr">Get Help Now</Button>
        <Button classname="secondary-btn">See How It Works</Button>
      </div>
      <div className="fall-container">
        <img
          src="https://www.sispnhost.com/apps-for-steps/wp-content/uploads/2025/05/Group-2.svg"
          alt="Falling Ball"
className="falling-image curved-fall"          />
      </div>
    </section>
  );
};

export default HeroSection;

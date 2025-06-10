import "./SmallClaimsLandingPage.css";
import {useNavigate} from "react-router-dom";

const SmallClaimsLandingPage = () => {

  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    navigate('/schedule');
  } 

  return (
    <div className="small-claims-container">
      <section className="small-claims-hero">
        <h1>Small Claims Assistance</h1>
        <p>
          Are you overwhelmed by the paperwork? Unsure about what forms you need?
          We’re here to help!
        </p>
      </section>

      <section className="small-claims-section">
        <p>
          At <strong>LegalEasier</strong>, we offer affordable, expert assistance
          with every step of your small claims case—from filing the initial
          complaint to collecting your judgment.
        </p>
      </section>

      <section className="small-claims-section">
        <h2>Why Choose LegalEasier for Small Claims Assistance?</h2>
        <ul className="small-claims-ul">
          <li><strong>Expertly Drafted Complaints & Forms</strong>: No legal jargon, just correct forms ready to file.</li>
          <li><strong>Affordable Services</strong>: Competitive pricing with <em>no hidden fees</em>.</li>
          <li><strong>Fast, Simple Process</strong>: Guided assistance from start to finish.</li>
          <li><strong>Comprehensive Assistance</strong>: Help at every stage of your case.</li>
          <li><strong>No Lawyer? No Problem!</strong>: DIY-friendly support with expert guidance.</li>
        </ul>
      </section>

      <section className="small-claims-section">
        <h2>Our Step-by-Step Small Claims Assistance Process</h2>
        <ol className="small-claims-ol">
          <li><strong>Initial Consultation & Case Evaluation</strong>: Get a personalized plan and pricing.</li>
          <li><strong>Filing Your Complaint</strong>: We prepare and file your documents.</li>
          <li><strong>Serving the Defendant</strong>: Guidance on serving the complaint properly.</li>
          <li><strong>Pre-Trial Motions & Support</strong>: Help with drafting and filing necessary motions.</li>
          <li><strong>Trial Preparation & Representation</strong>: Assistance with strategy, exhibits, and confidence in court.</li>
          <li><strong>Judgment Collection</strong>: Help with garnishment, levy, or lien enforcement.</li>
        </ol>
      </section>

      <section className="small-claims-section">
        <h2>Our Pricing Tiers – Pay for Only What You Need</h2>
        <ul className="small-claims-ul">
          <li><strong>Basic Complaint Filing</strong>: $175</li>
          <li><strong>Pre-Trial & Motion Assistance</strong>: $275</li>
          <li><strong>Trial Preparation</strong>: $550</li>
          <li><strong>Full Trial Assistance</strong>: $750</li>
          <li><strong>Judgment Collection</strong>: $1,200</li>
          <li><strong>Final Judgment & Appeals</strong>: $1,500</li>
        </ul>
        <p>Need something in-between? We offer <strong>customized packages</strong> to meet your exact requirements.</p>
      </section>

      <section className="small-claims-section small-claims-cta">
        <h2>Get Started Today!</h2>
        <p>Fill out the form below to schedule your <strong>free consultation</strong>.</p>
        <button className="small-claims-button" onClick={(e)=>handleClick(e)}>Start Your Case – Free Consultation</button>
      </section>

      <section className="small-claims-section">
        <h2>Why Trust LegalEasier?</h2>
        <ul className="small-claims-ul">
          <li><strong>100% Satisfaction Guaranteed</strong>: We’ll work to make it right.</li>
          <li><strong>Proven Success</strong>: Hundreds of clients helped successfully.</li>
          <li><strong>Trusted Experts</strong>: Experienced in small claims and legal documents.</li>
        </ul>
      </section>

      <section className="small-claims-section">
        <h2>Frequently Asked Questions</h2>
        <div className="small-claims-faq-item">
          <h3>1. What is small claims court?</h3>
          <p>Small claims court handles disputes involving small amounts (usually under $8,000 in Florida).</p>
        </div>
        <div className="small-claims-faq-item">
          <h3>2. What forms do I need for small claims?</h3>
          <p>Common forms include the small claims complaint, proof of service, summons, and judgment forms.</p>
        </div>
        <div className="small-claims-faq-item">
          <h3>3. Can you help me collect a judgment?</h3>
          <p>Yes! We assist with enforcement actions such as garnishments, levies, and liens.</p>
        </div>
      </section>
    </div>
  );
};

export default SmallClaimsLandingPage;

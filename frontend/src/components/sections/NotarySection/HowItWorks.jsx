import "./HowItWorks.css";
import { FaRegImages, FaCog, FaMoneyBillWave } from "react-icons/fa";
import { TiTick } from "react-icons/ti";


const steps = [
  {
    number: "01",
    icon: <FaRegImages />,
    title: "Sign Up:",
    description:
      "Simply fill out the form below to get started with LegalEasier’s Notary Referral Program. Once you’re registered, you’ll receive your referral link and access to our full toolkit.",
  },
  {
    number: "02",
    icon: <FaCog />,
    title: "Refer Clients:",
    description:
      "Share your unique referral link with clients who need legal documents like Wills, Power of Attorney, or Trusts. You can even send them directly to our website or provide them with more information about the services we offer.",
  },
  {
    number: "03",
    icon: <FaMoneyBillWave />,
    title: "Get Paid:",
    description:
      "Earn a 20% commission for every client who completes a purchase through your referral link. Track your referrals and payouts easily through our dashboard.",
  },
  {
    number: "04",
    icon: <TiTick />,
    title: "Get Paid:",
    description:
      "As a notary partner, you’re never alone. Our team is available to support you, whether you need assistance with the referral process, questions from your clients, or just more information about how we work."
  },
  
];

const HowItWorksNotary = () => {
  return (
    <section className="hw-it-works">
      <h2 className="hw-title">How It Works:</h2>
      <div className="hw-container">
        <div className="hw-line"></div>
        {steps.map((step, index) => (
          <div className="hw-step" key={index}>
            <div className="hw-number-circle">{step.number}</div>
            <div className="hw-box">
              <div className="hw-icon">{step.icon}</div>
              <div>
                <h3 className="hw-step-title">{step.title}</h3>
                <p className="hw-description">{step.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorksNotary;

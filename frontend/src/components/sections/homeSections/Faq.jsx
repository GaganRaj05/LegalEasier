import { useState } from "react";
import "./Faq.css";
import Button from "../../ui/Buttons";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const Faq = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const navigate = useNavigate();
  const faqData = [
    {
      question: "Are you an attorney?",
      answer: "No, LegalEasier is not a law firm and we do not provide legal advice. We are a legal document preparation service that helps you prepare documents at your direction for self-representation."
    },
    {
      question: "How does your service work?",
      answer: "Our platform guides you through a simple questionnaire to generate customized legal documents. You can download, print, and file them yourself or with professional assistance."
    },
    {
      question: "Is my information secure?",
      answer: "Yes, we use industry-standard encryption to protect your data. We don't share your information with third parties without your consent."
    },
    {
      question: "What if I need legal advice?",
      answer: "While we can't provide legal advice, we can connect you with licensed attorneys in our network if you need professional guidance."
    }
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="faqs">
      <div className="faq-head">
        <h1>Frequently Asked Questions</h1>
        <p>Find answers to common questions about our services.</p>
      </div>
      <div className="faq-container">
        {faqData.map((item, index) => (
          <div 
            key={index} 
            className={`faq ${activeIndex === index ? 'active' : ''}`}
            onClick={() => toggleFAQ(index)}
          >
            <div className="faq-question">
              <p>{item.question}</p>
              <button className="faq-toggle">
                {activeIndex === index ? '↑' : '↓'}
              </button>
            </div>
            <div className="faq-answer">
              <p>{item.answer}</p>
            </div>
          </div>
        ))}
        <p>Don't see your question here? Contact us..</p>
      </div>
      <div className="getting-started">
        <div className="getting-started-img">
        </div>
        <div className="getting-started-info">
            <h1>Ready to Get Started?</h1>
            <p>Our document specialists are ready to help you with your legal document needs today.</p>
            <Button classname="primary-btn gs" onClick={()=>navigate('/schedule')}>
                {"Start Your Document Now ->"}
            </Button>
        </div>
      </div>
    </section>
  );
};

export default Faq;
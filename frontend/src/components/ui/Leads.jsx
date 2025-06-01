import { useState, useEffect, forwardRef } from 'react';
import './Leads.css'; 

const Leads = forwardRef(({ onClose }, ref) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Start showing immediately when opened via chat icon
    setIsVisible(true);
    
    // Auto-show after delay only if not already opened
    const timer = setTimeout(() => {
      if (!isVisible) {
        setIsVisible(true);
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const closePopup = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 300); // Match this with CSS transition duration
  };

  return (
    <>
      <div 
        className={`leads-overlay ${isVisible ? 'visible' : ''}`} 
        onClick={closePopup}
      />
      
      <div className={`leads-popup ${isVisible ? 'visible' : ''}`}>
        <button className="leads-close-btn" onClick={closePopup}>
          &times;
        </button>
        
        <div className="leads-content">
          <h2>How can we help you?</h2>
          <p>Our team is ready to answer your questions.</p>
          
          <form>
            <input type="text" placeholder="Your name" required />
            <input type="email" placeholder="Your email" required />
            <textarea placeholder="Your message" rows="4"></textarea>
            <button type="submit">Send Message</button>
          </form>
        </div>
      </div>
    </>
  );
});

export default Leads;
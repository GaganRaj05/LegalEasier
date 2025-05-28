import  { useState, useEffect } from "react";
import "./ContactFormPopup.css";
import { sendMail } from "../../services/auth";
import {toast} from "react-toastify";
import {ClipLoader} from "react-spinners"

const ContactFormPopup = ({ onClose }) => {
  const [fadeIn, setFadeIn] = useState(false);
  const [formData, setFormData] = useState({
    name:'',
    email:'',
    phone:'',
    message:''
  })
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setTimeout(() => setFadeIn(true), 10);
  }, []);

  const handleSubmit = async(e) => {
    e.preventDefault();
    setIsLoading(true);
    const response = await sendMail(formData);
    setIsLoading(false);
    if(response.error) {
      toast.error("An unknown network error occured please try again later");
      return;
    }
    toast.success("Your query has been sent, We will get back to you shortly");
    onClose();
  };
  const handleChange = (e)=> {
setFormData({
    ...formData,
    [e.target.name]: e.target.value 
  });  }

  return (
    <div className="contact-popup-overlay">
      <div className={`contact-popup-box ${fadeIn ? "contact-fade-in" : "contact-fade-out"}`}>
        <button className="contact-close-btn" onClick={onClose}>×</button>
        <h2>We're Here to Help</h2>
        <p className="contact-message">
          This website is not ready yet. In the meantime, tell us what legal issue you're facing — we’ll help you get it resolved.
        </p>
        <form onSubmit={handleSubmit} className="contact-form">
          <input type="text" name="name" value={formData.name} placeholder="Your Name" onChange={handleChange} required />
          <input type="email" name="email" value={formData.email} placeholder="Your Email" onChange={handleChange} required />
          <input type="tel" name="phone" value={formData.phone} placeholder="Your Phone" onChange={handleChange} required />
          <textarea name="message" value={formData.message} placeholder="Tell us about your issue..." onChange={handleChange} rows="4" required></textarea>
            <button type="submit" className="contact-submit-btn" disabled={isLoading}>{isLoading ? <ClipLoader size={20} color="#333"/> :"Submit"}</button>
        </form>
      </div>
    </div>
  );
};

export default ContactFormPopup;

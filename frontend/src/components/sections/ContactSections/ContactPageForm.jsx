import './ContactPageForm.css';
import { toast } from 'react-toastify';
import { ClipLoader } from 'react-spinners';
import { sendMail } from '../../../services/auth';
import { useState } from 'react';
const ContactPageForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone:"",
    message: ""
  })

  const [isLoading, setIsLoading] = useState(false);
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };
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


  }
  return (
    <div className="cf-container">
      <div className="cf-form-section">
        <h2>
          CONTACT US NOW FOR A FREE,<br />
          FRIENDLY EVALUATION OF YOUR CLAIM!
        </h2>

        <form className="cf-contact-form" onSubmit={handleSubmit}>
          <label>
            Name <span className="cf-required">*</span>
          </label>
          <div className="cf-name-inputs">
            <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" required />
          </div>

          <label>
            Email <span className="cf-required">*</span>
          </label>
          <input type="email" name='email' value={formData.email} onChange={handleChange} placeholder="Your email" required />

          <label>
            Phone <span className="cf-required">*</span>
          </label>
          <input type="text" name='phone' value={formData.phone} onChange={handleChange} placeholder="Your phone" required />

          <label>
            Comment or Message <span className="cf-required">*</span>
          </label>
          <textarea name='message'  onChange={handleChange} value={formData.message} rows="5" placeholder="Your message..." required></textarea>

          <button type="submit" disabled={isLoading}>{isLoading ? <ClipLoader size={20} color="#333" /> : "Submit"}</button>
        </form>
      </div>

      <div className="cf-map-section">
        <iframe
          title="Charlotte Map"
          src="https://www.google.com/maps?q=Charlotte,North+Carolina&output=embed"
          width="100%"
          height="100%"
          frameBorder="0"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default ContactPageForm;

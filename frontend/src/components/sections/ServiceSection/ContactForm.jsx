import { useState } from "react";
import "./ContactForm.css";
import { sendMail } from "../../../services/auth";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const response = await sendMail(formData);
    setIsLoading(false);
    if (response.error) {
      toast.error("An unknown network error occured please try again later");
      return;
    }
    toast.success("Your query has been sent, We will get back to you shortly");
  };

  return (
    <section className="contact-form">
      <div className="contact-form-info">
        <h1>CONTACT US NOW FOR A FREE, FRIENDLY EVALUATION OF YOUR CLAIM!</h1>
        <h2>
          <a href="mailto:contact@legaleasier.org">contact@legaleasier.org</a>
        </h2>
        <h2>
          <a href="tel:+1 407-891-5333">+1 407-891-5333</a>
        </h2>
        <h2>
          <a href="#">Charlotte, NC, USA</a>
        </h2>
      </div>
      <div className="contact-application">
        <form action="" method="POST" onSubmit={handleSubmit}>
          <label htmlFor="name">Name*</label>
          <input
            id="name"
            name="name"
            type="text"
            onChange={handleChange}
            value={formData.name}
            required
          />

          <label htmlFor="email">Email*</label>
          <input
            id="email"
            name="email"
            type="email"
            onChange={handleChange}
            value={formData.email}
            required
          />

          <label htmlFor="phone">Phone*</label>
          <input
            id="phone"
            name="phone"
            type="text"
            onChange={handleChange}
            value={formData.phone}
            required
          />
          <label htmlFor="message">Comment or Message</label>
          <textarea
            id="message"
            name="message"
            onChange={handleChange}
            value={formData.msg}
            required
          />
          <button
            type="submit"
            className="services-submit-btn"
            disabled={isLoading}
          >
            {isLoading ? <ClipLoader size={20} color="#333" /> : "Submit"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactForm;

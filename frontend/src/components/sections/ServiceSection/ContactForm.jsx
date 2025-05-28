import { useState } from "react";
import "./ContactForm.css";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    msg: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section className="contact-form">
      <div className="contact-form-info">
        <h1>CONTACT US NOW FOR A FREE, FRIENDLY EVALUATION OF YOUR CLAIM!</h1>
        <h2><a href="mailto:Info@legaleasier.com">Info@legaleasier.com</a></h2>
        <h2><a href="tel:14078915333">1 407-891-5333</a></h2>
        <h2><a href="#">Charlotte, NC, USA</a></h2>
      </div>
      <div className="contact-application">
        <form action="" method="POST">
          <label htmlFor="name">Name*</label>
          <input id="name" name="name" type="text" onChange={handleChange} value={formData.name} required />

          <label htmlFor="email">Email*</label>
          <input id="email" name="email" type="email" onChange={handleChange} value={formData.email} required />

          <label htmlFor="message">Comment or Message</label>
          <textarea id="message" name="msg" onChange={handleChange} value={formData.msg} required />
        </form>
      </div>
    </section>
  );
};

export default ContactForm;

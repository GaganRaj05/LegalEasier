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
                <h2>
                    <a href="">Info@legaleasier.com</a>
                </h2>
                <h2>
                    <a href="">
                        1 407-891-5333
                    </a>
                </h2>
                <h2>
                    <a href="">Charlotte, NC, USA</a>
                </h2>
            </div>
            <div className="contact-application">
                <form action="" method="POST">
                    <label htmlFor="name">Name*</label>
                    <input id="name" type="text"onChange={handleChange} value={formData.name} required />
                                        <label htmlFor="name">Email*</label>
                    <input id="email" type="text"onChange={handleChange} value={formData.email} required />
                    <label htmlFor="message">Comment or Message</label>
                    <textarea id="message" type="text"onChange={handleChange} value={formData.msg} required >

                    </textarea>

                </form>
            </div>
        </section>
    )
}
export default ContactForm;
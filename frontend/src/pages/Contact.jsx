import ContactPageSection from "../components/sections/ContactPageSections";
import NavBar from "../components/layout/NavBar";
import Footer from "../components/layout/Footer";
import SEO from "../components/layout/SEO";
const Contact = () => {
  return (
    <>
      <SEO
        title="Contact Us - Free Legal Document Consultation | LegalEasier"
        description="Get a free evaluation of your legal document needs. Contact LegalEasier for affordable document preparation services. Call 407-891-5333 or email us today."
        keywords="contact legal document service, free legal consultation, legal document help, legal forms contact, document preparation contact, legal services phone, legal document evaluation"
        image="https://media.istockphoto.com/id/1449334081/photo/statue-of-lady-justice-on-desk-of-a-judge-or-lawyer.jpg?s=612x612&w=0&k=20&c=139ZS1ycMRXBqnPEWV3l08zBLNe40WPiAudVnmeQrl8="
        url="https://www.legaleasier.org/legal-easier/contact-us"
      />

      <NavBar />
      <ContactPageSection />
      <Footer />
    </>
  );
};

export default Contact;

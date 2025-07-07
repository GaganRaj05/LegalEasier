import NavBar from "../components/layout/NavBar";
import Footer from "../components/layout/Footer";
import ReUsableBanner from "../components/ui/ReusableBanner";
import TermsInfo from "../components/sections/TermsInfo";
import SEO from "../components/layout/SEO";
const TermsAndConditions = () => {
  return (
    <>
      <SEO
        title="Terms and Conditions - LegalEasier Legal Document Services"
        description="Terms and conditions for LegalEasier legal document preparation services. Information about SMS marketing, privacy, and service usage terms."
        keywords="terms and conditions, legal document service terms, SMS marketing terms, privacy policy, service agreement, legal terms, document preparation terms"
        image="https://media.istockphoto.com/id/1449334081/photo/statue-of-lady-justice-on-desk-of-a-judge-or-lawyer.jpg?s=612x612&w=0&k=20&c=139ZS1ycMRXBqnPEWV3l08zBLNe40WPiAudVnmeQrl8="
        url="https://www.legaleasier.org/legal-easier/Terms&Conditions"
      />

      <NavBar />
      <ReUsableBanner bannerType="Terms and Conditions" />
      <TermsInfo />
      <Footer />
    </>
  );
};
export default TermsAndConditions;

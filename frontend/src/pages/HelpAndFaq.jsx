import NavBar from "../components/layout/NavBar";
import Footer from "../components/layout/Footer";
import ReUsableBanner from "../components/ui/ReusableBanner";
import HelpAndFaqInfo from "../components/sections/HelpAndFaqInfo";
import SEO from "../components/layout/SEO";
const HelpAndFaq = () => {
  return (
    <>
      <SEO
        title="Help & FAQ - SMS Marketing & Legal Document Services | LegalEasier"
        description="Get answers to common questions about LegalEasier's SMS marketing service and legal document preparation. Find help with subscriptions, opt-out, and privacy."
        keywords="help center, FAQ, SMS marketing help, legal document FAQ, subscription help, opt-out SMS, privacy questions, customer support, legal services help, document preparation questions"
        image="https://media.istockphoto.com/id/1449334081/photo/statue-of-lady-justice-on-desk-of-a-judge-or-lawyer.jpg?s=612x612&w=0&k=20&c=139ZS1ycMRXBqnPEWV3l08zBLNe40WPiAudVnmeQrl8="
        url="https://www.legaleasier.org/legal-easier/HelpAndFaq"
      />

      <NavBar />
      <ReUsableBanner bannerType="Help and FAQ" />
      <HelpAndFaqInfo />
      <Footer />
    </>
  );
};

export default HelpAndFaq;

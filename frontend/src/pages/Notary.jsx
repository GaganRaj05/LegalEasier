import NavBar from "../components/layout/NavBar";
import Footer from "../components/layout/Footer";
import NotarySection from "../components/sections/NotarySections";
import SEO from "../components/layout/SEO";
const Notary = () => {
  return (
    <>
      <SEO
        title="Notary Referral Program - Earn 20% Commission | LegalEasier"
        description="Join our notary referral program and earn 20% commission on every client referral. Partner with LegalEasier to offer legal document services and earn passive income."
        keywords="notary referral program, notary commission, notary partnership, legal document referrals, notary income, passive income for notaries, notary business opportunity, 20% commission, legal services affiliate"
        image="https://media.istockphoto.com/id/1449334081/photo/statue-of-lady-justice-on-desk-of-a-judge-or-lawyer.jpg?s=612x612&w=0&k=20&c=139ZS1ycMRXBqnPEWV3l08zBLNe40WPiAudVnmeQrl8="
        url="https://www.legaleasier.org/legal-easier/notary-service"
      />

      <NavBar />
      <NotarySection />
      <Footer />
    </>
  );
};
export default Notary;

import Footer from "../components/layout/Footer";
import NavBar from "../components/layout/NavBar";
import HomeSection from "../components/sections/HomeSection";
import SEO from "../components/layout/SEO";

const Home = () => {
  return (
    <>
      <SEO
        title="Legal Forms Done Right - No Lawyer Needed | LegalEasier"
        description="Fast, affordable legal document preparation for eviction, divorce, small claims, wills, and more. Professional legal forms without the lawyer fees. Get started today."
        keywords="legal forms, legal documents, eviction forms, divorce papers, small claims court, wills, power of attorney, legal document preparation, affordable legal services, no lawyer needed"
        image="https://media.istockphoto.com/id/1449334081/photo/statue-of-lady-justice-on-desk-of-a-judge-or-lawyer.jpg?s=612x612&w=0&k=20&c=139ZS1ycMRXBqnPEWV3l08zBLNe40WPiAudVnmeQrl8="
        url="https://www.legaleasier.org/"
      />
      <NavBar />
      <HomeSection />
      <Footer />
    </>
  );
};

export default Home;

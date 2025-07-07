import NavBar from "../components/layout/NavBar";
import Footer from "../components/layout/Footer";
import ServicesSection from "../components/sections/ServicesSection";
import SEO from "../components/layout/SEO";
const Services = () => {
    return (
        <>
          <SEO
            title="Legal Document Preparation Services | Legal Easier"
            description="Professional legal document preparation for wills, trusts, divorce, bankruptcy, eviction notices, and more. Court-ready documents starting at $50. No attorney needed."
            keywords="legal document preparation, will preparation, trust documents, divorce papers, bankruptcy forms, eviction notices, power of attorney, name change petition, legal forms, court documents, affordable legal services"
            image="https://media.istockphoto.com/id/1449334081/photo/statue-of-lady-justice-on-desk-of-a-judge-or-lawyer.jpg?s=612x612&w=0&k=20&c=139ZS1ycMRXBqnPEWV3l08zBLNe40WPiAudVnmeQrl8="
            url="https://www.legaleasier.org/legal-easier/services"
          />
          <NavBar/>
          <ServicesSection/>
          <Footer/>  
        </>
    )
}
export default Services;
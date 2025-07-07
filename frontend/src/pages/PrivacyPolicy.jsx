import NavBar from "../components/layout/NavBar";
import Footer from "../components/layout/Footer";
import ReUsableBanner from "../components/ui/ReusableBanner";
import PrivacyPolicyInfo from "../components/sections/PrivacyPolicyInfo";
import SEO from "../components/layout/SEO";
const PrivacyPolicy = () => {
    return (
        <>
             <SEO 
                title="Privacy Policy - Data Protection & SMS Marketing | LegalEasier"
                description="LegalEasier privacy policy explaining how we collect, use, and protect your personal information including SMS marketing data. Learn about your privacy rights."
                keywords="privacy policy, data protection, SMS marketing privacy, personal information, data collection, privacy rights, legal document service privacy, contact information protection"
                image="https://media.istockphoto.com/id/1449334081/photo/statue-of-lady-justice-on-desk-of-a-judge-or-lawyer.jpg?s=612x612&w=0&k=20&c=139ZS1ycMRXBqnPEWV3l08zBLNe40WPiAudVnmeQrl8="
                url="https://www.legaleasier.org/legal-easier/Privacy-Policy"
            />
            
            <NavBar/>
            <ReUsableBanner bannerType="Privacy Policy"/>
            <PrivacyPolicyInfo/>
            <Footer/>
        </>
    )
}
export default PrivacyPolicy;
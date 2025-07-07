import LandingPageSections from "../components/sections/LandingPageSections";
import NavBar from "../components/layout/NavBar";
import Footer from "../components/layout/Footer";
import SEO from "../components/layout/SEO";
const LandingPage = ()=> {
    return (
        <>
            <SEO
                title="Small Claims Court Assistance | Expert Legal Document Help | LegalEasier"
                description="Get expert small claims court assistance from LegalEasier. We help with complaint filing, court forms, trial preparation, and judgment collection. Affordable pricing starting at $175. Free consultation available. No lawyer required - DIY-friendly support with professional guidance."
                keywords="small claims court assistance,what is small claims?,small claims complaint filing,legal forms assistance, small claims court forms preparation,expert legal forms preparation, small claims court help Florida, judgment collection"
                image="https://media.istockphoto.com/id/1449334081/photo/statue-of-lady-justice-on-desk-of-a-judge-or-lawyer.jpg?s=612x612&w=0&k=20&c=139ZS1ycMRXBqnPEWV3l08zBLNe40WPiAudVnmeQrl8="
                url="https://www.legaleasier.org/landing-page/small-claims"
            />
            <NavBar/>
            <LandingPageSections/>
            <Footer/>
        </>
    )
}

export default LandingPage;
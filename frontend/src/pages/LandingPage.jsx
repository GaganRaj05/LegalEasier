import LandingPageSections from "../components/sections/LandingPageSections";
import NavBar from "../components/layout/NavBar";
import Footer from "../components/layout/Footer";

const LandingPage = ()=> {
    return (
        <>
            <NavBar/>
            <LandingPageSections/>
            <Footer/>
        </>
    )
}

export default LandingPage;
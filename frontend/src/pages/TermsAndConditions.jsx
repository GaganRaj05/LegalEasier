import NavBar from "../components/layout/NavBar";
import Footer from "../components/layout/Footer";
import ReUsableBanner from "../components/ui/ReusableBanner";
import TermsInfo from "../components/sections/TermsInfo";
const TermsAndConditions = () => {
    return (
        <>
            <NavBar/>
            <ReUsableBanner bannerType="Terms and Conditions"/>
            <TermsInfo/>
            <Footer/>

        </>
    )
}
export default TermsAndConditions;
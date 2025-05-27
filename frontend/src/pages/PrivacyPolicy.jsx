import NavBar from "../components/layout/NavBar";
import Footer from "../components/layout/Footer";
import ReUsableBanner from "../components/ui/ReusableBanner";
import PrivacyPolicyInfo from "../components/sections/PrivacyPolicyInfo";
const PrivacyPolicy = () => {
    return (
        <>
            <NavBar/>
            <ReUsableBanner bannerType="Privacy Policy"/>
            <PrivacyPolicyInfo/>
            <Footer/>
        </>
    )
}
export default PrivacyPolicy;
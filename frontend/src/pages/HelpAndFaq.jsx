import NavBar from "../components/layout/NavBar";
import Footer from "../components/layout/Footer";
import ReUsableBanner from "../components/ui/ReusableBanner";
import HelpAndFaqInfo from "../components/sections/HelpAndFaqInfo";
const HelpAndFaq = () => {
    return (
        <>
            <NavBar/>
            <ReUsableBanner bannerType="Help and FAQ"/>
            <HelpAndFaqInfo/>
            <Footer/>
        </>
    )
}

export default HelpAndFaq;
import HowItWorksNotary from "./NotarySection/HowItWorks";
import NotaryHeroSection from "./NotarySection/NotaryHeroSection";
import Faq from "./homeSections/Faq";
import NotaryInfo from "./NotarySection/NotaryInfo";
import ReferralBanner from "../ui/ReferralBanner";
import ReferralCTA from "../ui/ReferralCTA";
const NotarySection = () => {
    return (
        <>
            <NotaryHeroSection/>
            <NotaryInfo/>
            <ReferralBanner/>
            <HowItWorksNotary/>
            <ReferralCTA/>
            <Faq/>
        </>
    )
}
export default NotarySection;
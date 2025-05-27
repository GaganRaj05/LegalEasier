import HeroSection from "./homeSections/HeroSection";
import Services from "./homeSections/Services";
import HowItWorks from "./homeSections/HowItWorks";
import Reviews from "./homeSections/Reviews";
import Faq from "./homeSections/Faq";
const HomeSection = () => {
    return (
        <>
            <HeroSection/>
            <Services/>
            <HowItWorks/>   
            <Reviews/>
            <Faq></Faq>
        </>
    )
}
export default HomeSection;
import ContactPageForm from "./ContactSections/ContactPageForm";
import NavBar from "../layout/NavBar";
import Footer from "../layout/Footer";
import ContactHero from "./ContactSections/ContactPageHero";


const ContactPageSection = () => {
    return(
        <>
            <NavBar/>
                <ContactHero/>
                <ContactPageForm/>
            <Footer/>
        </>
    )
}
export default ContactPageSection;
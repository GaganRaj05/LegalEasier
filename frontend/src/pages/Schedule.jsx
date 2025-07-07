import NavBar from "../components/layout/NavBar";
import ScheduleForm from "../components/layout/ScheduleForm";
import Footer from "../components/layout/Footer";
import SEO from "../components/layout/SEO";
const Schedule = () => {
  return (
    <>
      <SEO
        title="Schedule a Meeting - Free Legal Document Consultation | LegalEasier"
        description="Book a free consultation with LegalEasier legal document specialists. Schedule your meeting to discuss wills, divorce papers, and other legal document needs."
        keywords="schedule legal consultation, book meeting, legal documents, free legal consultation, schedule appointment, legal document meeting, consultation booking, legal services appointment"
        image="https://media.istockphoto.com/id/1449334081/photo/statue-of-lady-justice-on-desk-of-a-judge-or-lawyer.jpg?s=612x612&w=0&k=20&c=139ZS1ycMRXBqnPEWV3l08zBLNe40WPiAudVnmeQrl8="
        url="https://www.legaleasier.org/schedule"
      />
      <NavBar />
      <ScheduleForm />
      <Footer />
    </>
  );
};

export default Schedule;

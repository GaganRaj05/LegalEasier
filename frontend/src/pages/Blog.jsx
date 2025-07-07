import BlogSections from "../components/sections/BlogSections";
import NavBar from "../components/layout/NavBar";
import Footer from "../components/layout/Footer";
import SEO from "../components/layout/SEO";

const Blog = () => {
  return (
    <>
      <SEO
        title="Blogs - Academia, Law Review & Legal Education | LegalEasier"
        description="Expert insights on legal academia, law review processes, legal education, and scholarly writing. Stay updated with the latest in legal scholarship and document preparation."
        keywords="legal blog, legal academia, law review, legal education, legal scholarship, legal writing, legal citation, law school, legal documents, legal research"
        image="https://media.istockphoto.com/id/1449334081/photo/statue-of-lady-justice-on-desk-of-a-judge-or-lawyer.jpg?s=612x612&w=0&k=20&c=139ZS1ycMRXBqnPEWV3l08zBLNe40WPiAudVnmeQrl8="
        url="https://www.legaleasier.org/legal-easier/blog-page"
      />

      <NavBar />
      <BlogSections />
      <Footer />
    </>
  );
};
export default Blog;

import { useState } from "react";
import "./BlogArchive.css";

const blogs = [
  {
    title: "Quality legal academia in times of social media",
    published: "May 27, 2025",
    author: "admin",
    category: "legal",
    description: `Being a legal scholar is first and foremost a literary enterprise of persuasion. We write to convince an audience that law is (or should be) understood in a particular way and should have specific effects. To do so, we subject ourselves to particular criteria in terms of style and the nature of our arguments. Such criteria distinguish our work from literature, history, or sociology (even though this distinction might be slowly fading). Yet, like writers, historians, and sociologists, we write to be read and in the hope that our opinion will not only be heard but also followed. We write to sway and, consequently, shape legal reality and academic discourses. To fulfil our calling, it is crucial that at one point or another we are able to reach our public and share our ideas with it. This is why we are intimately affected by the changes in communication technologies.89 Indeed, as legal scholars do not make or repair things, we need our texts to spread or we will be condemned to irrelevance. As argued in the first section of this article, for a long while our public was mainly local. Legal scholars had a practical monopoly over access to the textual sources of the law, and scholarly communication was primarily aimed at a territorially confined academic and professional field. Even though this time is coming to an end, our academic communication practices have not fully adapted to this change.90 Consequently, our cherished public does not have the patience to look for and read long pieces tucked away in non-searchable paper journals or behind paywalls. Be they scholars, lawyers, clerks, or activists, they will Google their legal questions and, if thorough, go through the first few pages of results. Readers also crave for engagement and participatory reading experiences that enable them to easily retrace (and check) the fundaments of the claims presented. Finally, to integrate and take part in the emerging transnational scholarly community, legal scholars need to connect more and more with their peers abroad through social media, such as Twitter, and engage with them in quotidian academic debates via blogs.

In French, there is a saying, which dovetails with President Trump's tweet used as frontispiece to this article: the missing are always wrong. One of the lessons of Trump's election is that the old media's monopoly on communication is long lost to the Internet, and that if we want to engage people and meet our public we need to do so on their turfs. In other words, write blogs, rank high on Google and be present and active on social media.`,
    img_url:
      "https://www.sispnhost.com/apps-for-steps/wp-content/uploads/2025/05/Lawyer.jpg",
  },

  {
    title:
      "When to Make a Training Plan for Your Next Law Review Board and What to Include",
    published: "May 27, 2025",
    author: "admin",
    category: "legal",
    description: `It may seem like only yesterday that you and fellow editors were competing in your law review's write-on, but, before you know it, you'll be passing the torch to the next executive editorial board. When it comes time for those new editors to take over, you'll want to make sure they have all the information they need to hit the ground running. Is your e-board ready to facilitate a smooth law review transition?

The best way to help new editors get on track fast is to have a law review training plan. Hopefully, your previous e-board left you with some foundational training materials and processes that you can work from (if not, it's up to your team to clear a training path for those to come. You know they'll thank you for it!). Regardless of whether your e-board is starting with existing training guides or from scratch, it's paramount that you begin preparing for your law review's next board transition sooner than later, so you can revise or create training materials as needed and determine future training tasks (e.g. any workshops you'll run for new editors and who will lead them).

You don't want to be the law review that waits till the last minute to make a board transition plan (or worse, the one that doesn't have one!). Scrambling to map out your editorial processes and throw together training workshops as new editors are being selected isn't a fun situation to be in, we assure you! Whereas, if you start planning for your next e-board early, it will be much easier to document everything new editors will need to know and prep useful training events.

In this blog post, we share steps you can take to start preparing for your law review's next board transition.`,
    img_url:
      "https://www.sispnhost.com/apps-for-steps/wp-content/uploads/2025/05/law.jpg",
  },
  {
    title: "New to Law Review? 5 Things you need to know",
    published: "May 27, 2025",
    author: "admin",
    category: "legal",
    description: `A question arose on how to cite to a blawg or blog in a footnote or bibliography.

From my quick scan of print citation guides, it would appear that the print guides have yet to catch up with the blog phenomena (although I stand to be corrected and please do correct me if you find print/published examples on this topic).

The page here on the online site for the Chicago Manual of Style has an example of citing to what they call a "weblog entry or comment" (scroll down the page).

In addition, although the new 6th edition of the "McGill Guide" (the Canadian Guide to Uniform Legal Citation) does not appear to discuss "blogs" specifically, one could likely adapt their rules and examples on citing to electronic sources under Rule 6.19.

Thus, I invite comments on the following "example" I have created using a recent post from SLAW (based on a liberal adaptation of both the Chicago and McGill Guide examples):`,
    img_url:
      "https://www.sispnhost.com/apps-for-steps/wp-content/uploads/2025/05/legal-1.jpg",
  },
  {
    title: "Legal Citation of Blawgs or Blogs",
    published: "May 27, 2025",
    author: "admin",
    category: "legal",
    description: `A question arose on how to cite to a blawg or blog in a footnote or bibliography.

From my quick scan of print citation guides, it would appear that the print guides have yet to catch up with the blog phenomena (although I stand to be corrected and please do correct me if you find print/published examples on this topic).

The page here on the online site for the Chicago Manual of Style has an example of citing to what they call a "weblog entry or comment" (scroll down the page).

In addition, although the new 6th edition of the "McGill Guide" (the Canadian Guide to Uniform Legal Citation) does not appear to discuss "blogs" specifically, one could likely adapt their rules and examples on citing to electronic sources under Rule 6.19.

Thus, I invite comments on the following "example" I have created using a recent post from SLAW (based on a liberal adaptation of both the Chicago and McGill Guide examples):`,
    img_url:
      "https://www.sispnhost.com/apps-for-steps/wp-content/uploads/2025/05/45-1.jpg",
  },
];

const BlogArchive = () => {
  const [selected, setSelected] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredBlogs = blogs.filter(blog =>
    blog.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const recentPosts = blogs.map((blog, idx) => (
    <div
      key={idx}
      className="sidebar-post"
      onClick={() => setSelected(idx)}
      style={{ cursor: "pointer", display: "flex", alignItems: "center", marginBottom: 16 }}
    >
      <div className="sidebar-thumb" style={{ width: 36, height: 36, background: "#eee", marginRight: 12, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <img src={blog.img_url} alt="" style={{ width: 28, height: 28, objectFit: "cover" }} />
      </div>
      <div>
        <div style={{ fontSize: 13, color: "#222", fontWeight: 500, lineHeight: "1.2" }}>{blog.title.length > 45 ? blog.title.slice(0, 45) + "..." : blog.title}</div>
        <div style={{ fontSize: 11, color: "#888" }}>{blog.published}</div>
      </div>
    </div>
  ));

  const cards = filteredBlogs.map((blog, idx) => (
    <div key={idx} className="blog-card" onClick={() => setSelected(blogs.indexOf(blog))} style={{ cursor: "pointer" }}>
      <div className="blog-card-img" style={{ background: "#f4f4f4", height: 120, display: "flex", alignItems: "center", justifyContent: "center" }}>
        {blog.img_url ? (
          <img src={blog.img_url} alt="" style={{ maxHeight: "100%", maxWidth: "100%" }} />
        ) : (
          <span style={{ color: "#aaa" }}>No Image</span>
        )}
      </div>
      <div className="blog-card-content" style={{ padding: 16 }}>
        <div style={{ fontSize: 13, color: "#888", marginBottom: 4 }}>{blog.published}</div>
        <div style={{ fontWeight: 600, fontSize: 16, marginBottom: 6 }}>
          {blog.title}
        </div>
        <div style={{ fontSize: 13, color: "#444" }}>
          {blog.description.slice(0, 100)}...
        </div>
      </div>
    </div>
  ));

  const detail = selected !== null && (
    <div className="blog-detail">
      <div style={{ marginBottom: 18 }}>
        <button onClick={() => setSelected(null)} style={{ background: "#eee", border: "none", borderRadius: 4, padding: "6px 12px", cursor: "pointer", marginBottom: 10 }}>← Back to Archive</button>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
        <h1 style={{ fontSize: 28, fontWeight: 700, margin: 0 }}>{blogs[selected].title}</h1>
        <span style={{ color: "#888", fontSize: 15 }}>{blogs[selected].published}</span>
        <span style={{ color: "#b44", fontSize: 15 }}>{blogs[selected].category}</span>
      </div>
      <div style={{ margin: "20px 0" }}>
        <img src={blogs[selected].img_url} alt="" style={{ maxWidth: 320, borderRadius: 8, float: "right", marginLeft: 24, marginBottom: 8 }} />
        <div style={{ fontSize: 17, color: "#333", whiteSpace: "pre-line" }}>{blogs[selected].description}</div>
      </div>
    </div>
  );

  return (
    <div className="blog-archive-container" style={{ display: "flex", justifyContent: "center", padding: 32, background: "#fafbfc" }}>
      <div className="sidebar" style={{ minWidth: 270, maxWidth: 300, background: "#fff", borderRadius: 10, boxShadow: "0 2px 8px #eee", marginRight: 32, padding: 24 }}>
        <div style={{ marginBottom: 22 }}>
          <input 
            type="text" 
            placeholder="Search here..." 
            style={{ width: "90%", padding: "8px 12px", borderRadius: 4, border: "1px solid #ddd" }} 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div style={{ marginBottom: 22 }}>
          <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 6 }}>Categories</div>
          <div style={{ color: "#2b6cb0", fontSize: 14, fontWeight: 500 }}>legal <span style={{ color: "#888" }}>{blogs.filter(b => b.category === "legal").length}</span></div>
        </div>
        <div style={{ marginBottom: 22 }}>
          <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 6 }}>Recent Posts</div>
          {recentPosts}
        </div>
        <div>
          <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 6 }}>Tags</div>
        </div>
      </div>
      <div className="main-content" style={{ flex: 1, maxWidth: 950 }}>
        {selected === null ? (
          <>
            <h2 style={{ fontSize: 28, marginBottom: 28 }}>
              Category: <span style={{ color: "#2b6cb0" }}>legal</span>
            </h2>
            <div className="blog-card-grid" style={{ display: "flex", flexWrap: "wrap", gap: 24 }}>
              {filteredBlogs.length > 0 ? (
                cards
              ) : (
                <div style={{ width: "100%", textAlign: "center", padding: "40px 0", color: "#888" }}>
                  No blogs found matching your search.
                </div>
              )}
            </div>
          </>
        ) : (
          detail
        )}
      </div>
    </div>
  );
};

export default BlogArchive;
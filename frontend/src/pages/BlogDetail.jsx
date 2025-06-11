import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchBlogs } from "../services/admin";
import "../components/sections/BlogSections/BlogArchive.css";

const BlogDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const load = async () => {
      const res = await fetchBlogs();
      if (res?.success) {
        const found = res.blogs.find((b) => b.slug === slug);
        if (found) setBlog(found);
        else navigate("/legal-easier/blog-page"); // fallback if slug invalid
      }
    };
    load();
  }, [slug]);

  const isVideo = (url) =>
    [".mp4", ".webm", ".ogg"].some((ext) => url?.toLowerCase().endsWith(ext));

  if (!blog) return <div style={{ padding: 50 }}>Loading...</div>;

  return (
    <div className="blog-archive-container" style={{ padding: 32, background: "#fafbfc" }}>
      <button onClick={() => navigate("/legal-easier/blog-page")} style={{ background: "#eee", border: "none", borderRadius: 4, padding: "6px 12px", cursor: "pointer", marginBottom: 20 }}>
        ← Back to Archive
      </button>
      <h1 style={{ fontSize: 28, fontWeight: 700 }}>{blog.title}</h1>
      <p style={{ color: "#888", fontSize: 15 }}>{blog.published}</p>
      <p style={{ color: "#b44", fontSize: 15 }}>{blog.category}</p>
      {blog.img_url && (
        isVideo(blog.img_url) ? (
          <video src={blog.img_url} style={{ maxWidth: "100%", borderRadius: 8 }} controls />
        ) : (
          <img src={blog.img_url} alt="" style={{ maxWidth: "100%", borderRadius: 8, marginBottom: 24 }} />
        )
      )}
      <p style={{ fontSize: 17, color: "#333", whiteSpace: "pre-line" }}>{blog.description}</p>
    </div>
  );
};

export default BlogDetail;

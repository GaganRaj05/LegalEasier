import { useState, useEffect } from "react";
import "./BlogArchive.css";
import { toast } from "react-toastify";
import { fetchBlogs } from "../../../services/admin";
const BlogArchive = () => {
  const [selected, setSelected] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchBlogs();
      if (response?.success) {
        setBlogs(response.blogs);
      } else {
        toast.error("Some error occurred while fetching blogs");
      }
    };
    fetchData();
  }, []);

  const isVideo = (url) => {
    const videoExtensions = [".mp4", ".webm", ".ogg"];
    return videoExtensions.some((ext) => url?.toLowerCase().endsWith(ext));
  };

  const legalBlogs = blogs.filter((blog) => blog.category === "legal");

  const filteredBlogs = legalBlogs.filter((blog) =>
    blog.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const recentPosts = legalBlogs.map((blog, idx) => (
    <div
      key={idx}
      className="sidebar-post"
      onClick={() => setSelected(blogs.findIndex(b => b._id === blog._id))}
      style={{
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        marginBottom: 16,
      }}
    >
      <div
        className="sidebar-thumb"
        style={{
          width: 36,
          height: 36,
          background: "#eee",
          marginRight: 12,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {isVideo(blog.img_url) ? (
          <video
            src={blog.img_url}
            style={{ width: 28, height: 28, objectFit: "cover" }}
            muted
            autoPlay
            loop
          />
        ) : (
          <img
            src={blog.img_url}
            alt=""
            style={{ width: 28, height: 28, objectFit: "cover" }}
          />
        )}
      </div>
      <div>
        <div
          style={{
            fontSize: 13,
            color: "#222",
            fontWeight: 500,
            lineHeight: "1.2",
          }}
        >
          {blog.title.length > 45
            ? blog.title.slice(0, 45) + "..."
            : blog.title}
        </div>
        <div style={{ fontSize: 11, color: "#888" }}>{blog.published}</div>
      </div>
    </div>
  ));

  const cards = filteredBlogs.map((blog, idx) => (
    <div
      key={idx}
      className="blog-card"
      onClick={() => setSelected(blogs.findIndex(b => b._id === blog._id))}
      style={{ cursor: "pointer" }}
    >
      <div
        className="blog-card-img"
        style={{
          background: "#f4f4f4",
          height: 120,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {blog.img_url ? (
          isVideo(blog.img_url) ? (
            <video
              src={blog.img_url}
              style={{ maxHeight: "100%", maxWidth: "100%" }}
              muted
              autoPlay
              loop
            />
          ) : (
            <img
              src={blog.img_url}
              alt=""
              style={{ maxHeight: "100%", maxWidth: "100%" }}
            />
          )
        ) : (
          <span style={{ color: "#aaa" }}>No Image</span>
        )}
      </div>
      <div className="blog-card-content" style={{ padding: 16 }}>
        <div style={{ fontSize: 13, color: "#888", marginBottom: 4 }}>
          {blog.published}
        </div>
        <div style={{ fontWeight: 600, fontSize: 16, marginBottom: 6 }}>
          {blog.title}
        </div>
        <div style={{ fontSize: 13, color: "#444" }}>
          {blog.description.slice(0, 100)}...
        </div>
      </div>
    </div>
  ));

  const detail = selected !== null && blogs[selected] && (
    <div className="blog-detail">
      <div style={{ marginBottom: 18 }}>
        <button
          onClick={() => setSelected(null)}
          style={{
            background: "#eee",
            border: "none",
            borderRadius: 4,
            padding: "6px 12px",
            cursor: "pointer",
            marginBottom: 10,
          }}
        >
          ← Back to Archive
        </button>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
        <h1 style={{ fontSize: 28, fontWeight: 700, margin: 0 }}>
          {blogs[selected].title}
        </h1>
        <span style={{ color: "#888", fontSize: 15 }}>
          {blogs[selected].published}
        </span>
        <span style={{ color: "#b44", fontSize: 15 }}>
          {blogs[selected].category}
        </span>
      </div>
      <div style={{ margin: "20px 0" }}>
        {isVideo(blogs[selected].img_url) ? (
          <video
            src={blogs[selected].img_url}
            style={{
              maxWidth: "500px",
              borderRadius: 8,
              marginLeft: 24,
              marginBottom: 108,
            }}
            controls
          />
        ) : (
          <img
            src={blogs[selected].img_url}
            alt=""
            style={{
              maxWidth: 320,
              borderRadius: 8,
              float: "right",
              marginLeft: 24,
              marginBottom: 8,
            }}
          />
        )}
        <div
          style={{ fontSize: 17, color: "#333", whiteSpace: "pre-line" }}
        >
          {blogs[selected].description}
        </div>
      </div>
    </div>
  );

  return (
    <div
      className="blog-archive-container"
      style={{
        display: "flex",
        justifyContent: "center",
        padding: 32,
        background: "#fafbfc",
      }}
    >
      <div
        className="sidebar"
        style={{
          minWidth: 270,
          maxWidth: 300,
          background: "#fff",
          borderRadius: 10,
          boxShadow: "0 2px 8px #eee",
          marginRight: 32,
          padding: 24,
        }}
      >
        <div style={{ marginBottom: 22 }}>
          <input
            type="text"
            placeholder="Search here..."
            style={{
              width: "90%",
              padding: "8px 12px",
              borderRadius: 4,
              border: "1px solid #ddd",
            }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div style={{ marginBottom: 22 }}>
          <div
            style={{ fontWeight: 600, fontSize: 15, marginBottom: 6 }}
          >
            Categories
          </div>
          <div
            style={{ color: "#2b6cb0", fontSize: 14, fontWeight: 500 }}
          >
            legal{" "}
            <span style={{ color: "#888" }}>
              {legalBlogs.length}
            </span>
          </div>
        </div>
        <div style={{ marginBottom: 22 }}>
          <div
            style={{ fontWeight: 600, fontSize: 15, marginBottom: 6 }}
          >
            Recent Posts
          </div>
          {recentPosts}
        </div>
        <div>
          <div
            style={{ fontWeight: 600, fontSize: 15, marginBottom: 6 }}
          >
            Tags
          </div>
        </div>
      </div>

      <div className="main-content" style={{ flex: 1, maxWidth: 950 }}>
        {selected === null ? (
          <>
            <h2 style={{ fontSize: 28, marginBottom: 28 }}>
              Category: <span style={{ color: "#2b6cb0" }}>legal</span>
            </h2>
            <div
              className="blog-card-grid"
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 24,
              }}
            >
              {filteredBlogs.length > 0 ? (
                cards
              ) : (
                <div
                  style={{
                    width: "100%",
                    textAlign: "center",
                    padding: "40px 0",
                    color: "#888",
                  }}
                >
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

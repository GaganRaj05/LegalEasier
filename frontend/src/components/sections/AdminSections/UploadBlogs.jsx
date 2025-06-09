import { useState } from 'react';
import "./UploadBlogs.css";
import { uploadBlog } from '../../../services/admin';
import { toast } from 'react-toastify';
import { ClipLoader } from "react-spinners";

const UploadBlogs = () => {
    const [blogForm, setBlogForm] = useState({
        title: '',
        published: false,
        author: '',
        category: '',
        description: '',
        img: null
    });
    const [isUploading, setIsUploading] = useState(false);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setBlogForm(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleMediaUpload = (e) => {
        setBlogForm(prev => ({
            ...prev,
            img: e.target.files[0]
        }));
    };

    const submitBlogForm = async (e) => {
        e.preventDefault();
        setIsUploading(true);

        try {
            const formPayload = new FormData();
            formPayload.append('title', blogForm.title);
            formPayload.append('published', blogForm.published);
            formPayload.append('author', blogForm.author);
            formPayload.append('category', blogForm.category);
            formPayload.append('description', blogForm.description);
            if (blogForm.img) {
                formPayload.append('img', blogForm.img);
            }

            const response = await uploadBlog(formPayload);
            if(response?.success) {
                toast.success("The blog has been uploaded successfully");
            }
            else {
                toast.error("An unknown network error has occured please try again later");
            }

        } catch (err) {
            console.log(err.message);
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className="blog-upload-container">
            <h1 className="blog-upload-heading">Upload New Blog</h1>
            

            <form onSubmit={submitBlogForm} className="blog-upload-form">
                <div className="blog-upload-field">
                    <label htmlFor="blogTitle" className="blog-upload-label">
                        Title*
                    </label>
                    <input
                        type="text"
                        id="blogTitle"
                        name="title"
                        value={blogForm.title}
                        onChange={handleInputChange}
                        required
                        className="blog-upload-input"
                    />
                </div>

                <div className="blog-upload-checkbox-container">
                    <input
                        type="date"
                        id="blogPublished"
                        name="published"
                        onChange={handleInputChange}
                        className="blog-upload-checkbox"
                    />
                    <label htmlFor="blogPublished" className="blog-upload-checkbox-label">
                        Publish Date
                    </label>
                </div>

                <div className="blog-upload-field">
                    <label htmlFor="blogAuthor" className="blog-upload-label">
                        Author*
                    </label>
                    <input
                        type="text"
                        id="blogAuthor"
                        name="author"
                        value={blogForm.author}
                        onChange={handleInputChange}
                        required
                        className="blog-upload-input"
                    />
                </div>

                <div className="blog-upload-field">
                    <label htmlFor="blogCategory" className="blog-upload-label">
                        Category*
                    </label>
                    <input
                        type="text"
                        id="blogCategory"
                        name="category"
                        value={blogForm.category}
                        onChange={handleInputChange}
                        required
                        className="blog-upload-input"
                    />
                </div>

                <div className="blog-upload-field">
                    <label htmlFor="blogDescription" className="blog-upload-label">
                        Description*
                    </label>
                    <textarea
                        id="blogDescription"
                        name="description"
                        value={blogForm.description}
                        onChange={handleInputChange}
                        required
                        rows={4}
                        className="blog-upload-textarea"
                    />
                </div>

                <div className="blog-upload-field">
                    <label htmlFor="blogMedia" className="blog-upload-label">
                        Image/Video*
                    </label>
                    <input
                        type="file"
                        id="blogMedia"
                        name="img"
                        onChange={handleMediaUpload}
                        required
                        accept="image/*, video/*"
                        className="blog-upload-file"
                    />
                    <p className="blog-upload-file-hint">
                        Upload an image or video for this blog post.
                    </p>
                </div>

                <div className="blog-upload-submit-container">
                    <button
                        type="submit"
                        disabled={isUploading}
                        className={`blog-upload-submit-btn ${isUploading ? 'blog-upload-submit-btn-disabled' : ''}`}
                    >
{isUploading ? <ClipLoader size={20} color="#333" /> : "Submit"}                    </button>
                </div>
            </form>
        </div>
    );
};

export default UploadBlogs;
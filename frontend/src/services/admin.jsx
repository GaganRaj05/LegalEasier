const backend_url = import.meta.env.VITE_BACKEND_URL;

const fetchBlogs = async() => {
    try {
        const response = await fetch(`${backend_url}/admin/get-blogs`, {
            method:'GET'
        });

        const data = await response.json();
        if(!response.ok) return {error:data};
        return data;
    }
    catch(err) {
        console.log(err.message);
        return {error:err.message};
    }
}

const uploadBlog = async (formData) => {
    try {
        const response = await fetch(`${backend_url}/admin/upload-blog`, {
            method: 'POST',
            body: formData,
        });

        const data = await response.json();
        if (!response.ok) return { error: data };
        return data;
    } catch (err) {
        console.log(err.message);
        return { error: err.message };
    }
};
export {uploadBlog, fetchBlogs};
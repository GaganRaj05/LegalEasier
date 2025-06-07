const backend_url = import.meta.env.VITE_BACKEND_URL;

const scheduleMetting = async (formData)=> {
    try {
        const response = await fetch(`${backend_url}/meetings/schedule-meeting`, {
            method:"POST",
            headers:{'Content-type':"application/json"},
            body:JSON.stringify(formData)
        });

        const data = await response.json();
        if(!response.ok) return {error:data};
        return data;

    } catch (err) {
        console.log(err.message);
        return {error:err};
    }
}

export default scheduleMetting;
const backend_url = import.meta.env.VITE_BACKEND_URL;

const sendInfo = async(formData) => {
    try {
        const response = await  fetch(`${backend_url}/leads/store-leads`, {
            method:'POST',
            headers:{"Content-type":"application/json"},
            body:JSON.stringify(formData)
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

const sendQuery = async(query) => {
    try {
        const response = await fetch(`${backend_url}/leads/get-response`, {
            method:'POST',
            body:JSON.stringify(query),
            headers:{'Content-type':"application/json"},
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

export {sendInfo, sendQuery};
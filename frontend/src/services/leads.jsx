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
        const convo_id = localStorage.getItem('convo_id');
        if(!convo_id) return {error:{sucess:false, msg:'Convo id not found'}};

        const form = {
            convo_id,
            message:query
        }
        const response = await fetch(`${backend_url}/leads/get-response`, {
            method:'POST',
            body:JSON.stringify(form),
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
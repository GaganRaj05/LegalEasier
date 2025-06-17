const Backend_url = import.meta.env.VITE_BACKEND_URL;

const initaliseConvo = async() => {
    try {
        const response = await fetch(`${Backend_url}/leads/start-intake`, {
            method:'GET',
            headers: {
                'Accept': 'application/json' 
            }
        });
        const data = await response.json();
        if(!response.ok) return {error:data};
        return data;

    }
    catch(err) {
        console.log("service",err.message);
        return {error:err.message};
    }
}

const intakeSubmit = async(formData) => {
    try {
        const response = await fetch(`${Backend_url}/leads/save-step`,{
            method:'POST',
            headers:{'Content-type':'application/json'},
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

const uploadDocument = async (formData) =>{
    try {   
        const response = await fetch(`${Backend_url}/leads/get-file-url`,{
            method:'POST',
            body:formData
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


export {initaliseConvo, intakeSubmit, uploadDocument};
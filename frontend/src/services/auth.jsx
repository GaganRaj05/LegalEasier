const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;


const HandleLogin = async(formData) => {
    try {
        const response = await fetch(`${BACKEND_URL}/auth/sign-in`, {
            method:'POST',
            body:JSON.stringify(formData),
            headers:{'Content-type':'application/json'},
            credentials:'include'
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

const getOtp = async(email) => {
    try {
        const response = await fetch(`${BACKEND_URL}/auth/get-otp?email=${email}`, {
            method:'GET'
        });
        const data = await response.json()
        if(!response.ok) return {error:data};
        return data;
    }   
    catch(err) {
        console.log(err.message);
        return {error:err.message};
    }
}

async function validateOTP(formData) {
    try {
        const response = await fetch(`${BACKEND_URL}/auth/validate-otp`,{
            method:'POST',
            body:JSON.stringify(formData),
            headers:{'Content-type':'application/json'}
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

const signUp = async (formData)=> {
    try {
        const response = await fetch(`${BACKEND_URL}/auth/sign-up`, {
            method:'POST',
            headers:{'Content-type':'application/json'},            
            body:JSON.stringify(formData),
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

const checkAuth = async ()=> {
    try{
        const response = await fetch(`${BACKEND_URL}/auth/check-auth`, {
            method:'GET',
            credentials:'include'
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


const sendMail = async(formData) => {
    try {
        const response = await fetch(`${BACKEND_URL}/contact/send-query`, {
            method:'POST',
            body:JSON.stringify(formData),
            headers:{'Content-type':'application/json'}
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
export {checkAuth, HandleLogin, validateOTP, getOtp, signUp, sendMail};
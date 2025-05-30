const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
const notarySignup = async (formData)=> {
    try {
        const response = await fetch(`${BACKEND_URL}/notary/sign-up`, {
            method:'POST',
            body:JSON.stringify(formData),
            headers:{"Content-type":'application/json'},
        });

        const data = await response.json();
        if(!response.ok) return {error:data};
        return data;

    } catch (err) {
        console.log(err.message);
        return {error:err.message};
    }
}

const sendOtpToPhone = async (phone)=> {
    try {
        const response = await fetch(`${BACKEND_URL}/notary/get-otp?phone=${phone}`, {
            method:'GET',
        });

        const data = await response.json();
        if(!response.ok) return {error:data};
        return data;

    } catch (err) {
        console.log(err.message);
        return {error:err.message};
    }
}

const sendOtpToEmail = async (email)=> {
    try {
        const response = await fetch(`${BACKEND_URL}/notary/get-email-otp?email=${email}`, {
            method:'GET',
        });

        const data = await response.json();
        if(!response.ok) return {error:data};
        return data;

    } catch (err) {
        console.log(err.message);
        return {error:err.message};
    }
}

const validateEmail = async (formData)=> {
    try {
        const response = await fetch(`${BACKEND_URL}/notary/validate-email`, {
            method:'POST',  
            headers:{'Content-type':'application/json'},
            body:JSON.stringify(formData)
        })

        const data = await response.json();
        if(!response.ok) return {error:data};
        return data;

    } catch (err) {
        console.log(err.message);
        return {error:err.message};
    }
}


const validatePhone = async(formData) => {
    try {
        const response = await fetch(`${BACKEND_URL}/notary/verify-otp`,{
            method:'POST',
            body:JSON.stringify(formData),
            headers:{"Content-type":"application/json"}
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

const notaryDetails = async(formData) => {
    try {
        const response = await fetch(`${BACKEND_URL}/notary/send-user-details`, {
            method:'POST',
            body:JSON.stringify(formData),
            headers:{'Content-type':'application/json'}
        });

        const data = await response.json();
        if(!response.ok) return {error:data};
        return data;
    } catch (error) {
        console.log(err.message);
        return {error:err.message};
    }
}

export {validateEmail, validatePhone, sendOtpToEmail,sendOtpToPhone,notarySignup, notaryDetails};

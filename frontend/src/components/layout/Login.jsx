import  { useEffect, useState } from 'react';
import './LoginPopup.css';
import { toast } from 'react-toastify';
import {ClipLoader} from "react-spinners"
import { useAuth } from '../../context/AuthContext';
import { HandleLogin } from '../../services/auth';

const LoginPopup = ({ onClose, onSignUpClick }) => {
  const [fadeIn, setFadeIn] = useState(false);
  const [formData, setFormData] = useState({
    email:"",
    password:''
  })
  const {user, setUser} = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const handleChange = (e) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value 
  });
};
  useEffect(() => {
    setTimeout(() => setFadeIn(true), 10);
  }, []);

  const closePopup = () => {
    setFadeIn(false);
    setTimeout(() => onClose(), 300); 
  };

  const handleLogin = async(e) => {
    e.preventDefault();
    setIsLoading(true)
    const response = await HandleLogin(formData);
    setIsLoading(false);
    if(response?.success && response.userData) {
      toast.success(`LoggedIn successfully as ${response.userData.name}`);
      setUser(response.userData);
      closePopup()
    }
    else if(response?.error?.msg === "No user exists create an account") {
      toast.error("No account exists with this email, Please use a different one or Create an account");
    }
    else if(response?.error?.msg === "Incorrect password") {
      toast.error("Please check your password and try again");

    }
    else {
      toast.error("An unknown network error occured, Please try again in sometime");
           closePopup();

    }
  };

  return (
    <div className="popup-overlay">
      <div className={`popup-box ${fadeIn ? 'fade-in' : 'fade-out'}`}>
        <button className="close-btn" onClick={closePopup}>×</button>
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <input style={{marginTop:"50px"}} type="email" name='email' placeholder="Email" value={formData.email} onChange={handleChange} required />
          <input type="password" name='password' placeholder="Password" value={formData.password} onChange={handleChange} required />
            <button type="submit" className="submit-btn" disabled={isLoading}>{isLoading ? <ClipLoader size={20} color="#333"/> :"Submit"}</button>
          <p>Don't have an account ? <a className='redirect' href="" onClick={(e)=>{e.preventDefault();onSignUpClick()}}>Create one</a></p>
        </form>
      </div>
    </div>
  );
};

export default LoginPopup;

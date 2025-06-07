import { useState } from "react";
import "./Schedule.css"
import { toast } from "react-toastify";
import scheduleMetting from "../../services/meetings";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";


const ScheduleForm = () => {
    const [formData, setFormData] = useState({
        name:'',
        email:'',
        phone:'',
        date:'',
        time:'',
        message:''
    })
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]:e.target.value});
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        setIsLoading(true);
        const response = await scheduleMetting(formData);
        setIsLoading(false);
        if(response?.success) {
            toast.success('Your meeting has been scheduled, we will get back to u soon');
            navigate('/');
        }
        else {
            toast.error("An unknown network error has occured, please try again later");
        }

    }
    const today = new Date().toISOString().split('T')[0];

    return (
        <section className="schedule">
            <h1>Schedule a meeting with us</h1>
            <div className="schedule-form-container">
                <form className="schedule-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input 
                            type="text" 
                            id="name" 
                            name="name" 
                            placeholder="Your name" 
                            onChange={handleChange}
                            required 
                        />
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input 
                            type="email" 
                            id="email" 
                            name="email" 
                            placeholder="Your email" 
                            onChange={handleChange}
                            required 
                        />
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="phone">Phone</label>
                        <input 
                            type="tel" 
                            id="phone" 
                            name="phone" 
                            placeholder="Your phone number" 
                            onChange={handleChange}
                        />
                    </div>
                    
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="date">Date</label>
                            <input 
                                type="date" 
                                id="date" 
                                name="date" 
                                min={today}
                                onChange={handleChange}
                                required 
                            />
                        </div>
                        
                        <div className="form-group">
                            <label htmlFor="time">Time</label>
                            <input 
                                type="time" 
                                id="time" 
                                name="time" 
                                onChange={handleChange}
                                required 
                            />
                        </div>
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="message">Message</label>
                        <textarea 
                            id="message" 
                            name="message" 
                            placeholder="Any additional information"
                            rows="4"
                            onChange={handleChange}
                        ></textarea>
                    </div>
                    
                    <button type="submit" className="submit-btn" disabled={isLoading}>{isLoading ? <ClipLoader size={20} color="#333" /> : "Submit"}</button>
                </form>
            </div>
        </section>
    );
}

export default ScheduleForm;
import { createContext, useContext, useEffect, useState } from "react";
const AuthContext = createContext();
import { checkAuth } from "../services/auth";
import {toast} from 'react-toastify';
export function AuthProvider({children}) {
    const [user, setUser] = useState(null);

useEffect(() => {
  const fetchUser = async () => {
    try {
      const response = await checkAuth();
        console.log(response)
      if (response?.success && response.userData) {
        toast.success(`Logged in successfully as: ${response.userData.name}`);
        setUser(response.userData);
      } else if (response?.error?.msg === "Session expired. Please log in again.") {
        toast.error("Your session has expired, kindly login again.");
        setUser(null);
      } else if (response?.error?.msg === "Not loggedIn") {
        setUser(null);
      } else {
        setUser(null);
      }
    } catch (err) {
      console.error("Auth check failed:", err);
      toast.error("Network error or server unavailable.");
      setUser(null);
    }
  };

  fetchUser();
}, []);

    useEffect(()=> {
        console.log("Current user: ", user);
    },[user])
    return (
        <AuthContext.Provider value={{user, setUser}}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext);
    return context;
}
import "./NavBar.css";
import Logo from "./logo.png";
import Button from "../ui/Buttons";
import { useNavigate } from "react-router-dom";
const NavBar = () => {
  const navigate = useNavigate()
  const handleClick = (e, pageType) => {
    if(pageType === "services") {
      navigate("/legal-easier/services")
    }
    else if(pageType === "Home") {
      navigate("/");
    }
    else if(pageType === "Notary") {
      navigate("/legal-easier/notary-service")
    }
  }
  return (
    <div className="navbar-container">
      <nav className="navbar">
        <ul className="nav-groups">
          <li>
            <img className="logo" src="https://www.sispnhost.com/apps-for-steps/wp-content/uploads/2025/05/legal_easier_logo.svg" alt="" />
          </li>
        </ul>
        <ul className="nav-groups">
          <li onClick={(e)=>handleClick(e,"Home")}>Home</li>
          <li>About</li>
          <li onClick={(e)=>handleClick(e,"services")}>Services</li>
          <li onClick={(e)=>handleClick(e,"Notary")}>How it Works</li>
          <li>Pricing</li>
        </ul>
        <ul className="nav-groups">
          <li>
            <Button classname="primary-btn">Get Help Now</Button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default NavBar;

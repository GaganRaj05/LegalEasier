import "./Services.css";
import Button from "../../ui/Buttons";
import Cards from "../../ui/Cards";
import { useNavigate } from "react-router-dom";

const Services = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/legal-easier/services");
  };
  return (
    <section className="services">
      <div className="services-img"></div>
      <div className="services-info">
        <h1>Our Services</h1>
        <p className="service-temp">
          We offer flat-rate document preparation services for a variety of
          everyday legal needs.
        </p>
        <div className="cards-container">
          <Cards classname="service-cards">
            <img
              src="https://www.sispnhost.com/apps-for-steps/wp-content/uploads/2025/05/mdi_newspaper-variant-multiple.png"
              alt=""
            />
            <p className="services-head">Eviction Assistance</p>
            <p className="service-info">
              Document preparation for landlords and tenants in eviction
              proceedings.
            </p>

            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handleClick();
              }}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              Learn more →
            </a>
          </Cards>
          <Cards classname="service-cards">
            <img
              src="https://www.sispnhost.com/apps-for-steps/wp-content/uploads/2025/05/mdi_newspaper-variant-multiple.png"
              alt=""
            />
            <p className="services-head">Small Claims</p>
            <p className="service-info">
              Forms and filings for small claims court proceedings.
            </p>

            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handleClick();
              }}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              Learn more →
            </a>
          </Cards>
          <Cards classname="service-cards">
            <img
              src="https://www.sispnhost.com/apps-for-steps/wp-content/uploads/2025/05/mdi_newspaper-variant-multiple.png"
              alt=""
            />
            <p className="services-head">Uncontested Divorce</p>
            <p className="service-info">
              Complete paperwork for simple, uncontested divorces.
            </p>

            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handleClick();
              }}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              Learn more →
            </a>
          </Cards>
          <Cards classname="service-cards">
            <img
              src="https://www.sispnhost.com/apps-for-steps/wp-content/uploads/2025/05/mdi_newspaper-variant-multiple.png"
              alt=""
            />
            <p className="services-head">Name Changes</p>
            <p className="service-info">
              Legal name change documents for adults and minors.
            </p>

            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handleClick();
              }}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              Learn more →
            </a>
          </Cards>
          <Cards classname="service-cards">
            <img
              src="https://www.sispnhost.com/apps-for-steps/wp-content/uploads/2025/05/mdi_newspaper-variant-multiple.png"
              alt=""
            />
            <p className="services-head">Wills & Directives</p>
            <p className="service-info">
              Basic will and advance medical directive preparation.
            </p>

            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handleClick();
              }}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              Learn more →
            </a>
          </Cards>
          <Cards classname="service-cards">
            <img
              src="https://www.sispnhost.com/apps-for-steps/wp-content/uploads/2025/05/mdi_newspaper-variant-multiple.png"
              alt=""
            />
            <p className="services-head">Powers of Attorney</p>
            <p className="service-info">
              Standard POA documents for various situations.
            </p>

            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handleClick();
              }}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              Learn more →
            </a>
          </Cards>
        </div>
        <div className="service-btn">
          <Button classname="primary-btn sw" onClick={()=>navigate('/legal-easier/services')}>View All Services</Button>
        </div>
      </div>
    </section>
  );
};
export default Services;

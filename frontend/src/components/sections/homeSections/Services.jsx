import "./Services.css";
import Button from "../../ui/Buttons";
import Cards from "../../ui/Cards";
const Services = () => {
  return (
    <section className="services">
      <div className="services-img">

      </div>
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

            <a href="">{"learn more ->"} </a>
          </Cards>
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

            <a href="">{"learn more ->"} </a>
          </Cards>
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

            <a href="">{"learn more ->"} </a>
          </Cards>
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

            <a href="">{"learn more ->"} </a>
          </Cards>
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

            <a href="">{"learn more ->"} </a>
          </Cards>
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

            <a href="">{"learn more ->"} </a>
          </Cards>
        </div>
        <div className="service-btn">
            <Button classname="primary-btn sw">
                View All Services
            </Button>
        </div>
      </div>
    </section>
  );
};
export default Services;

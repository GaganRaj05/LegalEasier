import "./AboutService.css";
import Cards from "../../ui/Cards"

const AboutService = () => {
    const services = [
        {
            name:"Will & Trusts",
            description:'Need a will or trust? We provide legally binding documents that ensure your assets are protected and your wishes are honored.'
        },
        {
            name:"Power of Attorney",
            description:'Whether it’s a simple, uncontested divorce or specific terms you need, we prepare all the necessary paperwork to ensure a smooth process.'
        },
        {
            name:"Divorce Papers",
            description:'Need a will or trust? We provide legally binding documents that ensure your assets are protected and your wishes are honored.'
        },
                {
            name:"Eviction Notices",
            description:'Facing a difficult tenant situation? We prepare legal eviction notices, ensuring compliance with state and local regulations.'
        },
        {
            name:"Name Change Petition",
            description:'If you need to change your name, we’ll prepare the petition and necessary forms to make the process straightforward.'
        },
    ]
    const legalDocuments = [
  { name: "Last Will and Testament", price: "$150 – $500" },
  { name: "Living Trust", price: "$250 – $1,500" },
  { name: "Durable Power of Attorney (Financial)", price: "$75 – $200" },
  { name: "Healthcare Power of Attorney", price: "$75 – $200" },
  { name: "Living Will / Advance Directive", price: "$50 – $150" },
  { name: "Revocation of Power of Attorney", price: "$50 – $100" },
  { name: "Deed (Quitclaim, Warranty, Lady Bird)", price: "$100 – $500" },
  { name: "Affidavit of Heirship", price: "$50 – $150" },
  { name: "Prenuptial Agreement", price: "$500 – $2,000" },
  { name: "Postnuptial Agreement", price: "$500 – $2,000" },
  { name: "Divorce Petition", price: "$300 – $1,500" },
  { name: "Divorce Settlement Agreement", price: "$500 – $2,500" },
  { name: "Child Custody Agreement", price: "$300 – $1,500" },
  { name: "Child Support Agreement", price: "$300 – $1,500" },
  { name: "Name Change Petition", price: "$150 – $500" },
  { name: "Eviction Notice", price: "$50 – $150" },
  { name: "Residential Lease Agreement", price: "$100 – $300" },
  { name: "Commercial Lease Agreement", price: "$300 – $1,000" },
  { name: "Non-Compete Agreement", price: "$200 – $1,000" },
  { name: "Independent Contractor Agreement", price: "$100 – $500" },
  { name: "Non-Disclosure Agreement (NDA)", price: "$100 – $500" },
  { name: "Severance Agreement", price: "$300 – $1,500" },
  { name: "Settlement Agreement", price: "$500 – $2,500" },
  { name: "Employment Contract", price: "$200 – $1,000" },
  { name: "Power of Attorney for Minor Child", price: "$75 – $200" },
  { name: "Living Will with Organ Donation", price: "$50 – $150" },
  { name: "Debt Settlement Agreement", price: "$300 – $1,500" },
  { name: "Guardianship Petition", price: "$200 – $1,000" },
  { name: "Health Care Proxy", price: "$200 – $1,000" }
];

    return (
        <section className="about-services">
            <div className="protection">
                <div className="about-image">
                    
                </div>
                <div className="service-about-info">
                   <h1>Legal Documentation Preparation</h1>
                   <p>
                        Our Legal Document Preparation service offers professional assistance in drafting, organizing, and completing legal documents without the high costs of hiring an attorney. We specialize in preparing accurate, court-ready paperwork for a variety of legal matters, including
                    </p> 
                </div>
            </div>
            <div className="service-cards-container">
                {services.map((data, index) => (
                                            <Cards classname="about-service-cards">
                        <h4>{data.name}</h4>
                        <p className="about-service-info">{data.description}</p>
                    </Cards>
                ))}
            </div>
            <div className="bankruptcy">
                <div className="bankruptcy-info">
                    <h1>Bankruptcy</h1>
                    <p>
                        Our Bankruptcy Assistance service provides individuals and small businesses with reliable, non-attorney support in preparing and organizing bankruptcy filings. We help you navigate the complex documentation required for:
                    </p>
                </div>
                <div className="bankruptcy-image">

                </div>  
            </div>
            <div className="debt-settlement">
                <div className="chapters">
                    <h1>Chapter 7 & 13 Bankruptcy Forms</h1>
                    <p>
                        Filing for bankruptcy? We handle the paperwork for Chapter 7 or Chapter 13 bankruptcy filings to help you get back on track.

                    </p>
                </div>
                <div className="debt-img">

                </div>
                <div className="chapters">
                    <h1>
                        Debt Settlement Documentation  
                    </h1>
                    <p>
                       Need assistance with settling debts? We prepare the documents to help negotiate favorable terms and bring you peace of mind. 
                    </p>
                </div>
            </div>
            <div className="documents">
                <div className="documents-info">
                    <h1>Document Review & Consultation</h1>
                    <p>
                       Need assistance with settling debts? We prepare the documents to help negotiate favorable terms and bring you peace of mind. 
                    </p>
                    <p>
                        Need assistance with settling debts? We prepare the documents to help negotiate favorable terms and bring you peace of mind.
                    </p>
                </div>
                
            </div>
            <div className="price-offers">
                <h1>30 Common Document with Price Range</h1>
                <div className="price-container">
                    {legalDocuments.map((data, index)=>(
                        <div key={index}>
                            <Cards classname="offers-card">
                                <h2>{data.name}</h2>
                                <h2>{data.price}</h2>
                            </Cards>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default AboutService;
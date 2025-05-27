import "./NotaryInfo.css";
import Cards from "../../ui/Cards";
const NotaryInfo = () => {
    const notaryInfo = [
        {
            benefit:"Earn Commission on Every Referral:",
            description:"For every client you refer to LegalEasier, you earn 20% of the service fee. No caps, no limits—just a straightforward, rewarding opportunity."
        },
        {
            benefit:"No Extra Work Required:",
            description:"We handle everything from the initial intake to the final document. All you need to do is refer clients Who need professional, affordable legal document services. You get paid, and your clients get the help they need."
        },
        {
            benefit:"Get Paid Fast, Directly:",
            description:"Payments are processed monthly and delivered directly to you—no waiting, no hassle. Watch your earnings grow as you help more clients access the services they need."
        },
        {
            benefit:"Backed by Professional Support:",
            description:"At LegalEasier, we understand the value of your time and the trust your clients place in you. That's why we provide full, round-the-clock support for both you and your clients. Whether it's a question about the document or how to refer, we're here to ensure you and your clients are fully supported."
        }
    ]
    return (
        <section className="notary-info"> 
        <div className="notary-info-container">
            <div className="notary-info-img">

            </div>
            <div className="notary-info-content">
                <p>
                    As a notary, you play an essential role in your community by offering trusted, professional services. But what if you could expand that role and start earning passive income—without any extra work on your part? With LegalEasier’s Notary Referral Program, you can earn 20% commission for every client you refer, all while providing them with top-quality legal document preparation services backed by a team of experts who handle everything for you. It’s the perfect way to enhance your service offerings and earn more, 365 days a year, with full support at every step. 
                </p>
            </div>
        </div>
        <div className="join-notary">
            <h1 className="notary-head">Why Join LegalEasier’s Notary Referral Program?</h1>
            <div className="notary-cards-container">
                {notaryInfo.map((data, index)=>(
                    <div key={index}>
                        <Cards classname="notary-cards">
                            <h1>{data.benefit}</h1>
                            <p>{data.description}</p>
                        </Cards>
                    </div>
                ))}

            </div>
        </div>
    </section>  
    )
}
export default NotaryInfo;
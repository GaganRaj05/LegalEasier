import "./ReusableBanner.css";
const ReUsableBanner = ({bannerType}) => {
    return (
        <section className="reusableBanner" >
            <h1>{bannerType}</h1>
        </section>
    )
}

export default ReUsableBanner;
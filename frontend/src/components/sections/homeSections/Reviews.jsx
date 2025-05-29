import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Reviews.css";
import Cards from "../../ui//Buttons";

const Reviews = () => {
  const userReviews = [
    {
      name: "Michael R",
      location: "Phoenix, AZ",
      review_message:
        "LegalEasier saved me so much time and money with my small claims case. The forms were perfect and I won the case",
    },
    {
      name: "Sarah K",
      location: "Austin, TX",
      review_message:
        "Incredibly easy to use platform. I prepared my rental agreement in minutes!",
    },
    {
      name: "David L",
      location: "Seattle, WA",
      review_message:
        "The document automation saved me hundreds in lawyer fees. Highly recommend!",
    },
    {
      name: "Jessica M",
      location: "Chicago, IL",
      review_message:
        "As a small business owner, this service has been invaluable for creating contracts.",
    },
    {
      name: "Robert T",
      location: "Denver, CO",
      review_message:
        "I was skeptical at first, but the forms were court-ready and saved me so much stress.",
    },
    {
      name: "Emily S",
      location: "Miami, FL",
      review_message:
        "The step-by-step guidance made complex legal forms simple to complete.",
    },
    {
      name: "James P",
      location: "Boston, MA",
      review_message:
        "Fast, affordable, and professional. Will use again for all my legal docs.",
    },
    {
      name: "Olivia W",
      location: "San Diego, CA",
      review_message:
        "Perfect solution for my LLC formation documents. Everything was accepted without issues.",
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <section className="Reviews">
      <div className="reviews-head">
        <h1>What our clients say about us?</h1>
        <p>
          Thousands of clients have successfully prepared their legal documents
          with our help.
        </p>
      </div>
      <div className="reviews-container">
        <Slider {...settings}>
          {userReviews.map((data, index) => (
            <div key={index} className="review-slide">
              <Cards classname="review-cards">
                <p>"{data.review_message}"</p>
                <div className="review-author">
                  <strong>{data.name}</strong>
                  <span>{data.location}</span>
                </div>
              </Cards>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default Reviews;
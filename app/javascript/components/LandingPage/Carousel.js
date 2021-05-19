import React from "react";
import Slider from "infinite-react-carousel";
import { Link } from "react-router-dom";

const Carousel = () => {
  const settings = {
    arrowsBlock: false,
    autoplay: true,
    autoplaySpeed: 6000,
    duration: 100,
  };

  return (
    <div className="carousel-container">
      <Slider {...settings} className="carousel">
        <div className="row m-0">
          <div className="col-7 m-0 d-flex flex-column align-items-start justify-content-center p-3">
            <h2>Browse Categories</h2>
            <p>Get your best deal today ... </p>
            <Link to="/categories" className="btn btn-primary btn-large">
              {" "}
              Shop Now
            </Link>
          </div>
          <div className="col-5 m-0 d-flex flex-column align-items-center justify-content-center">
            <img
              src="https://90shopping.co/wp-content/uploads/2021/02/girl-shopping-png-3.png"
              className="carousel-img"
            />
          </div>
        </div>
        <div className="row m-0">
          <div className="col-7 d-flex flex-column align-items-start justify-content-center p-3">
            <h2>Browse Categories</h2>
            <p>Get your best deal today ... </p>
            <Link to="/categories" className="btn btn-primary btn-large">
              {" "}
              Shop Now
            </Link>
          </div>
          <div className="col-5 d-flex flex-column align-items-center justify-content-center">
            <img
              src="https://img2.pngio.com/working-man-png-2-png-image-working-man-png-697_423.png"
              className="carousel-img"
            />
          </div>
        </div>
      </Slider>
    </div>
  );
};

export default Carousel;

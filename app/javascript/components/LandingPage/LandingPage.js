import React from "react";
import CategoryList from "../Category/CategoryList/CategoryList";
import Carousel from "./Carousel";
import "./LandingPage.css";

const LandingPage = () => {
  return (
    <div>
      <Carousel />
      <div className="featured-categories">
        <CategoryList title="Featured Categories" featured="3" />
      </div>
    </div>
  );
};

export default LandingPage;

import React from "react";
import CategoryList from "../Category/CategoryList/CategoryList";
import "./LandingPage.css";

const LandingPage = () => {
  return (
    <div>
      <div className="featured-categories">
        <CategoryList title="Featured Categories" featured="3" />
      </div>
    </div>
  );
};

export default LandingPage;

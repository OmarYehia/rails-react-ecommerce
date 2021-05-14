import React, { useEffect, useState } from "react";

const TestComponent = () => {
  const [category, setCategory] = useState(null);
  useEffect(() => {
    fetch("http://localhost:3000/api/v1/categories/1")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setCategory(data);
      });
  }, []);
  return (
    <div className="container mt-5">
      <h1 className="text-center">Test Component text</h1>
      {category && <img src={category.imageUrl} alt="" />}
    </div>
  );
};

export default TestComponent;

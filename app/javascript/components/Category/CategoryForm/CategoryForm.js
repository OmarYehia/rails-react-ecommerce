import React, { useState } from "react";
import "./CategoryForm.css";
import { Link } from "react-router-dom";

const CategoryForm = () => {
  const [name, setName] = useState("");
  const [imageError, setImageError] = useState("");
  const [nameError, setNameError] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [category, setCategory] = useState(null);

  const verifyImageType = (file) => {
    const imageType = file.type;
    if (
      imageType != "image/png" &&
      imageType != "image/jpg" &&
      imageType != "image/jpeg"
    ) {
      document.querySelector("#categoryImage").classList.add("is-invalid");
      setImageError("Please choose a .jpg, .jpeg or .png format only");
      return false;
    }
    document.querySelector("#categoryImage").classList.remove("is-invalid");
    setImageError("");
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    const imageFile = document.querySelector("#categoryImage");

    if (!imageFile.files[0]) {
      document.querySelector("#categoryImage").classList.add("is-invalid");
      setImageError("Please choose a .jpg, .jpeg or .png format only");
      return;
    }
    setIsPending(true);
    setIsAdded(false);

    if (verifyImageType(imageFile.files[0])) {
      formData.append("image", imageFile.files[0]);
      formData.append("name", name);

      fetch("/api/v1/categories", {
        method: "POST",
        body: formData,
      })
        .then((res) => {
          setIsPending(false);
          return res.json();
        })
        .then((data) => {
          if (!data.success) {
            if (data.errors.name) {
              document
                .querySelector("#categoryName")
                .classList.add("is-invalid");
              setNameError(data.errors.name);
            }
            if (data.errors.image) {
              document
                .querySelector("#categoryImage")
                .classList.add("is-invalid");
              setImageError(data.errors.image);
            }
          } else {
            setCategory(data.data.category);
            setIsAdded(true);
            console.log(category);
            console.log(data.data.category);
            document
              .querySelector("#categoryName")
              .classList.remove("is-invalid");
            document
              .querySelector("#categoryImage")
              .classList.remove("is-invalid");
            setNameError("");
            setImageError("");
          }
          console.log(data);
        });
    }
  };

  return (
    <div className="d-flex justify-content-center">
      <form className="border category-form shadow-sm" onSubmit={handleSubmit}>
        {isAdded && (
          <div className="alert alert-success mb-3 text-center" role="alert">
            Category {category.name} was added successfully.
            <Link
              to={`/categories/${category.id}/brands/new`}
              className="alert-link"
            >
              <br />
              Click here
            </Link>
            &nbsp;to add new brands to this category.
          </div>
        )}
        <h1>Create a Category</h1>
        <div className="mb-3">
          <label htmlFor="category-name" className="form-label">
            Category Name
          </label>
          <input
            type="text"
            className="form-control"
            id="categoryName"
            aria-describedby="categoryHelp"
            required
            onChange={(e) => setName(e.target.value)}
          />
          {nameError && (
            <div id="categoryHelp" className="form-text text-danger">
              {nameError}
            </div>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="categoryImage" className="form-label">
            Category Image
          </label>
          <input
            type="file"
            className="form-control"
            id="categoryImage"
            required
            aria-describedby="imageHelp"
          />
          {imageError && (
            <div id="imageHelp" className="form-text text-danger">
              {imageError}
            </div>
          )}
        </div>
        {!isPending && (
          <button
            type="submit"
            className="btn btn-outline-primary"
            id="submitBtn"
          >
            Add Category
          </button>
        )}
        {isPending && (
          <button
            type="submit"
            disabled
            className="btn btn-outline-primary"
            id="submitBtn"
          >
            Please wait...
          </button>
        )}
      </form>
    </div>
  );
};

export default CategoryForm;

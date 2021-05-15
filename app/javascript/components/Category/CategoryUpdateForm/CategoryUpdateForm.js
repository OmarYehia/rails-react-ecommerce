import React, { useEffect, useState } from "react";
import "./CategoryUpdateForm.css";
import { Link, useParams } from "react-router-dom";

const CategoryUpdateForm = () => {
  const { categoryId } = useParams();
  const [name, setName] = useState("");
  const [imageError, setImageError] = useState("");
  const [nameError, setNameError] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [category, setCategory] = useState(null);
  const [isCategoryFound, setIsCategoryFound] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/v1/categories/${categoryId}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setCategory(data.data.category);
        setName(data.data.category.name);
      })
      .catch((err) => {
        setIsCategoryFound(false);
        console.log(err);
      });
    setIsLoading(false);
  }, []);

  const verifyImageType = (file) => {
    if (file) {
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
    }
    document.querySelector("#categoryImage").classList.remove("is-invalid");
    setImageError("");
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    const imageFile = document.querySelector("#categoryImage");

    setIsPending(true);
    setIsAdded(false);

    if (verifyImageType(imageFile.files[0])) {
      if (imageFile.files[0]) {
        formData.append("image", imageFile.files[0]);
      }
      console.log(name);
      formData.append("name", name);
      console.log(formData);

      fetch(`/api/v1/categories/${categoryId}`, {
        method: "PUT",
        body: formData,
        headers: {
          "X-CSRF-TOKEN": document.querySelector('[name="csrf-token"]').content,
        },
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
      {isLoading && (
        <div
          className="spinner-border"
          style={{ width: "3rem", height: "3rem" }}
          role="status"
        >
          <span className="visually-hidden">Loading...</span>
        </div>
      )}
      {!isCategoryFound && (
        <div className="d-flex flex-column align-items-center">
          <h1>Sorry, no matching categories found!</h1>
        </div>
      )}
      {category && (
        <form
          className="border category-form shadow-sm"
          onSubmit={handleSubmit}
        >
          {isAdded && (
            <div className="alert alert-success mb-3 text-center" role="alert">
              Category {category.name} was updated successfully.
              <Link
                to={`/categories/${category.id}/brands/`}
                className="alert-link"
              >
                <br />
                Click here
              </Link>
              &nbsp;to browse this category.
            </div>
          )}
          <h1>Update Category</h1>
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
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
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
            <img src={category.imageUrl} id="current-image" />
            <input
              type="file"
              className="form-control"
              id="categoryImage"
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
              Update Category
            </button>
          )}
          {isPending && (
            <button
              type="submit"
              disabled
              className="btn btn-outline-primary"
              id="submitBtn"
            >
              <div
                className="spinner-border"
                style={{ width: "1rem", height: "1rem" }}
                role="status"
              >
                <span className="visually-hidden">Loading...</span>
              </div>
              &nbsp;&nbsp;Please wait...
            </button>
          )}
        </form>
      )}
    </div>
  );
};

export default CategoryUpdateForm;

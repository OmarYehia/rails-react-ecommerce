import React, { useState } from "react";
import { useParams } from "react-router";
import "./BrandCreateForm.css";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";

const BrandCreateForm = ({categoryId}) => {
  // const { categoryId } = useParams();
  const [name, setName] = useState("");
  const [imageError, setImageError] = useState("");
  const [nameError, setNameError] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [brand, setBrand] = useState(null);
  const [cookies, setCookies] = useCookies();
  const [authorizationError, setAuthorizationError] = useState(null);

  const verifyImageType = (file) => {
    const imageType = file.type;
    if (
      imageType != "image/png" &&
      imageType != "image/jpg" &&
      imageType != "image/jpeg"
    ) {
      document.querySelector("#brandImage").classList.add("is-invalid");
      setImageError("Please choose a .jpg, .jpeg or .png format only");
      return false;
    }
    document.querySelector("#brandImage").classList.remove("is-invalid");
    setImageError("");
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    const imageFile = document.querySelector("#brandImage");

    if (!imageFile.files[0]) {
      document.querySelector("#brandImage").classList.add("is-invalid");
      setImageError("Please choose a .jpg, .jpeg or .png format only");
      return;
    }
    setIsPending(true);
    setIsAdded(false);

    if (verifyImageType(imageFile.files[0])) {
      formData.append("image", imageFile.files[0]);
      formData.append("name", name);

      console.log(formData);
      fetch(`/api/v1/categories/${categoryId}/brands`, {
        method: "POST",
        body: formData,
        headers: {
          "X-CSRF-TOKEN": document.querySelector('[name="csrf-token"]').content,
          Authorization: `Bearer ${cookies.Authorization}`,
        },
      })
        .then((res) => {
          setIsPending(false);
          if (res.ok) {
            return res.json();
          } else {
            if (res.status === 401) {
              throw new Error("Unauthorized");
            }
          }
        })
        .then((data) => {
          if (!data.success) {
            if (data.errors.name) {
              document.querySelector("#brandName").classList.add("is-invalid");
              setNameError(data.errors.name);
            }
            if (data.errors.image) {
              document.querySelector("#brandImage").classList.add("is-invalid");
              setImageError(data.errors.image);
            }
          } else {
            setBrand(data.data.brand);
            setIsAdded(true);
            document.querySelector("#brandName").classList.remove("is-invalid");
            document
              .querySelector("#brandImage")
              .classList.remove("is-invalid");
            setNameError("");
            setImageError("");
            setAuthorizationError(false);
          }
          console.log(data);
        })
        .catch((err) => {
          console.log(err);
          setAuthorizationError(true);
        });
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center mt-5 flex-column">
      {authorizationError && (
        <div className="alert alert-danger mb-3 text-center" role="alert">
          You are not authorized to do this action!
          <br />
          Please contact an administrator if you believe this is a mistake.
        </div>
      )}
      <form className="border category-form shadow-sm" onSubmit={handleSubmit}>
        {isAdded && (
          <div className="alert alert-success mb-3 text-center" role="alert">
            Brand {brand.name} was added successfully to{" "}
            {brand.category.categoryName}.
            <Link to="#" className="alert-link">
              <br />
              Click here
            </Link>
            &nbsp;to add new products to this category.
          </div>
        )}
        <h1>Create a Brand</h1>
        <div className="mb-3">
          <label htmlFor="brandName" className="form-label">
            Brand Name
          </label>
          <input
            type="text"
            className="form-control"
            id="brandName"
            aria-describedby="brandHelp"
            required
            onChange={(e) => setName(e.target.value)}
          />
          {nameError && (
            <div id="brandHelp" className="form-text text-danger">
              {nameError}
            </div>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="brandImage" className="form-label">
            Brand Image
          </label>
          <input
            type="file"
            className="form-control"
            id="brandImage"
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
            Add Brand
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
    </div>
  );
};

export default BrandCreateForm;

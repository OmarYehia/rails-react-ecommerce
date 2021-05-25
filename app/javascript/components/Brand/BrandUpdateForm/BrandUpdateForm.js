import React, { useEffect, useState } from "react";
import "./BrandUpdateForm.css";
import { Link, useParams } from "react-router-dom";
import { useCookies } from "react-cookie";

const BrandUpdateForm = ({brandId}) => {
  // const { brandId } = useParams();
  const [name, setName] = useState("");
  const [imageError, setImageError] = useState("");
  const [nameError, setNameError] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [brand, setBrand] = useState(null);
  const [isBrandFound, setIsBrandFound] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [cookies, setCookies] = useCookies();
  const [authorizationError, setAuthorizationError] = useState(null);

  useEffect(() => {
    fetch(`/api/v1/brands/${brandId}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setBrand(data.data.brand);
        setName(data.data.brand.name);
      })
      .catch((err) => {
        setIsBrandFound(false);
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
        document.querySelector("#brandImage").classList.add("is-invalid");
        setImageError("Please choose a .jpg, .jpeg or .png format only");
        return false;
      }
    }
    document.querySelector("#brandImage").classList.remove("is-invalid");
    setImageError("");
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    const imageFile = document.querySelector("#brandImage");

    setIsPending(true);
    setIsAdded(false);

    if (verifyImageType(imageFile.files[0])) {
      if (imageFile.files[0]) {
        formData.append("image", imageFile.files[0]);
      }
      formData.append("name", name);

      fetch(`/api/v1/brands/${brandId}`, {
        method: "PUT",
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
            imageFile.value = null;
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
      {isLoading && (
        <div
          className="spinner-border"
          style={{ width: "3rem", height: "3rem" }}
          role="status"
        >
          <span className="visually-hidden">Loading...</span>
        </div>
      )}
      {!isBrandFound && (
        <div className="d-flex flex-column align-items-center">
          <h1>Sorry, no matching brands found!</h1>
        </div>
      )}
      {brand && (
        <form
          className="border category-form shadow-sm"
          onSubmit={handleSubmit}
        >
          {isAdded && (
            <div className="alert alert-success mb-3 text-center" role="alert">
              Brand '{brand.name}' was updated successfully.
              <Link
                to={`/categories/${brand.category.categoryId}/brands/`}
                className="alert-link"
              >
                <br />
                Click here
              </Link>
              &nbsp;to browse products in this brand.
            </div>
          )}
          <h1>Update Brand</h1>
          <div className="mb-3">
            <label htmlFor="brand-name" className="form-label">
              Brand Name
            </label>
            <input
              type="text"
              className="form-control"
              id="brandName"
              aria-describedby="brandHelp"
              required
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
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
            <img src={brand.imageUrl} id="current-image" />
            <input
              type="file"
              className="form-control"
              id="brandImage"
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
              Update Brand
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

export default BrandUpdateForm;

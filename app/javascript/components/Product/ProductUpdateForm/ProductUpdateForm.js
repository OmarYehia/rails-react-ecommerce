import React, { useEffect, useState } from "react";
import "./ProductUpdateForm.css";
import { Link, useParams } from "react-router-dom";
import { useCookies } from "react-cookie";

const ProductUpdateForm = () => {
  const { productId } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [titleError, setTitleError] = useState("");
  const [imageError, setImageError] = useState("");
  const [priceError, setPriceError] = useState("");
  const [quantityError, setQuantityError] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [product, setProduct] = useState(null);
  const [isProductFound, setIsProductFound] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [cookies, setCookies] = useCookies();
  const [authorizationError, setAuthorizationError] = useState(null);

  useEffect(() => {
    fetch(`/api/v1/brands/${brandId}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setProduct(data.data.product);
        setTitle(data.data.product.title);
      })
      .catch((err) => {
        setIsProductFound(false);
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
            if (data.errors.title) {
              document.querySelector("#brandName").classList.add("is-invalid");
              setTitleError(data.errors.title);
            }
            if (data.errors.description) {
                document.querySelector("#brandName").classList.add("is-invalid");
                setTitleError(data.errors.description);
            }
            if (data.errors.price) {
                document.querySelector("#brandName").classList.add("is-invalid");
                setTitleError(data.errors.price);
            }
            if (data.errors.quantity) {
                document.querySelector("#brandName").classList.add("is-invalid");
                setTitleError(data.errors.quantity);
            }
            if (data.errors.image) {
              document.querySelector("#brandImage").classList.add("is-invalid");
              setImageError(data.errors.image);
            }
          } else {
            imageFile.value = null;
            setProduct(data.data.product);
            setIsAdded(true);
            document.querySelector("#brandName").classList.remove("is-invalid");
            document
              .querySelector("#brandImage")
              .classList.remove("is-invalid");
            setTitleError("");
            setDescription("");
            setPriceError("");
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
      {!isProductFound && (
        <div className="d-flex flex-column align-items-center">
          <h1>Sorry, no matching products found!</h1>
        </div>
      )}
      {product && (
        <form
          className="border category-form shadow-sm"
          onSubmit={handleSubmit}
        >
          {isAdded && (
            <div className="alert alert-success mb-3 text-center" role="alert">
              Brand '{product.title}' was updated successfully.
              <Link
                to={`/categories/${brand.category.categoryId}/brands/products`}
                className="alert-link"
              >
                <br />
                Click here
              </Link>
              &nbsp;to browse products in this brand.
            </div>
          )}
          <h1>Update Product</h1>
          <div className="mb-3">
            <label htmlFor="brand-name" className="form-label">
              Product title
            </label>
            <input
              type="text"
              className="form-control"
              id="brandName"
              aria-describedby="brandHelp"
              required
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
            {titleError && (
              <div id="brandHelp" className="form-text text-danger">
                {titleError}
              </div>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="brand-name" className="form-label">
              Product Description
            </label>
            <textarea
              type="text"
              className="form-control"
              id="brandName"
              aria-describedby="brandHelp"
              required
              value={description}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
            {titleError && (
              <div id="brandHelp" className="form-text text-danger">
                {descriptionError}
              </div>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="brand-name" className="form-label">
              Product Price
            </label>
            <input
              type="text"
              className="form-control"
              id="brandName"
              aria-describedby="brandHelp"
              required
              value={price}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
            {titleError && (
              <div id="brandHelp" className="form-text text-danger">
                {priceError}
              </div>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="brand-name" className="form-label">
              Product Quantity
            </label>
            <input
              type="text"
              className="form-control"
              id="brandName"
              aria-describedby="brandHelp"
              required
              value={quantity}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
            {titleError && (
              <div id="brandHelp" className="form-text text-danger">
                {quantityError}
              </div>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="brandImage" className="form-label">
              Product Image
            </label>
            <img src={product.imageUrl} id="current-image" />
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

export default ProductUpdateForm;

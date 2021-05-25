import React, { useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";

const ProductCreateForm = ({brandId}) => {
  // const { brandId } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [imageError, setImageError] = useState("");
  const [titleError, setTitleError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [priceError, setPriceError] = useState("");
  const [quantityError, setQuantityError] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [product, setProduct] = useState(null);
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
      formData.append("title", title);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("quantity", quantity);

      console.log(formData);
      fetch(`/api/v1/brands/${brandId}/products`, {
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
            if (data.errors.title) {
              document.querySelector("#brandName").classList.add("is-invalid");
              setNameError(data.errors.title);
            }
            if (data.errors.description) {
                document.querySelector("#brandName").classList.add("is-invalid");
                setDescriptionError(data.errors.description);
            }
            if (data.errors.price) {
                document.querySelector("#brandName").classList.add("is-invalid");
                setPriceError(data.errors.price);
            }
            if (data.errors.quantity) {
                document.querySelector("#brandName").classList.add("is-invalid");
                setQuantityError(data.errors.quantity);
            }
            if (data.errors.image) {
              document.querySelector("#brandImage").classList.add("is-invalid");
              setImageError(data.errors.image);
            }
          } else {
            setProduct(data.data.product.title);
            setIsAdded(true);
            document.querySelector("#brandName").classList.remove("is-invalid");
            document
              .querySelector("#brandImage")
              .classList.remove("is-invalid");
              setTitleError("");
              setDescription("");
              setPriceError("");
              setQuantityError("");
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
            Product {product} was added successfully.
            <Link to="#" className="alert-link">
              <br />
              Click here
            </Link>
            &nbsp;to add new products to this category.
          </div>
        )}
        <h1>Create a Product</h1>
        <div className="mb-3">
          <label htmlFor="brandName" className="form-label">
            Product Title
          </label>
          <input
            type="text"
            className="form-control"
            id="brandName"
            aria-describedby="brandHelp"
            required
            onChange={(e) => setTitle(e.target.value)}
          />
          {titleError && (
            <div id="brandHelp" className="form-text text-danger">
              {titleError}
            </div>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="brandName" className="form-label">
            Product Description
          </label>
          <input
            type="text"
            className="form-control"
            id="brandName"
            aria-describedby="brandHelp"
            required
            onChange={(e) => setDescription(e.target.value)}
          />
          {descriptionError && (
            <div id="brandHelp" className="form-text text-danger">
              {descriptionError}
            </div>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="brandName" className="form-label">
            Product Price
          </label>
          <input
            type="text"
            className="form-control"
            id="brandName"
            aria-describedby="brandHelp"
            required
            onChange={(e) => setPrice(e.target.value)}
          />
          {priceError && (
            <div id="brandHelp" className="form-text text-danger">
              {priceError}
            </div>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="brandName" className="form-label">
            Product Quantity
          </label>
          <input
            type="text"
            className="form-control"
            id="brandName"
            aria-describedby="brandHelp"
            required
            onChange={(e) => setQuantity(e.target.value)}
          />
          {quantityError && (
            <div id="brandHelp" className="form-text text-danger">
              {quantityError}
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
            onSubmit={onSubmitHandler}
          >
            Add Product
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

export default ProductCreateForm;

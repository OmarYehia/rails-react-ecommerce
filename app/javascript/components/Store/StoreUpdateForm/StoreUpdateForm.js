import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import "../StoreForm/StoreForm.css";

const StoreUpdateForm = ({storeId}) => {
  // const { storeId } = useParams();
  const [name, setName] = useState("");
  const [owner, setOwner] = useState(null);
  const [summary, setSummary] = useState("");
  const [users, setUsers] = useState(null);
  const [nameError, setNameError] = useState("");
  const [summaryError, setSummaryError] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [store, setStore] = useState(null);
  const [isStoreFound, setIsStoreFound] = useState(true);
  const [cookies, setCookies] = useCookies();
  const [authorizationError, setAuthorizationError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("/api/v1/users", {
      headers: {
        Authorization: `Bearer ${cookies.Authorization}`,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setUsers(data.data);
      })
      .catch((err) => {
        console.log(err);
      });

    fetch(`/api/v1/stores/${storeId}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setStore(data.data.store);
        setName(data.data.store.name);
        setOwner(data.data.store.owner.ownerId);
        setSummary(data.data.store.summary);
      })
      .catch((err) => {
        setIsStoreFound(false);
        console.log(err);
      });
    setIsLoading(false);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsPending(true);
    setIsAdded(false);

    const storeInfo = {
      name,
      summary,
      sellerID: owner,
    };

    fetch(`/api/v1/stores/${storeId}`, {
      method: "PUT",
      headers: {
        "X-CSRF-TOKEN": document.querySelector('[name="csrf-token"]').content,
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookies.Authorization}`,
      },
      body: JSON.stringify(storeInfo),
    })
      .then((res) => {
        setIsPending(false);
        if (res.status === 401) {
          throw new Error("Unauthorized");
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        if (!data.success) {
          if (data.errors.name) {
            document.querySelector("#storeName").classList.add("is-invalid");
            setNameError(data.errors.name);
          }
          if (data.errors.summary) {
            document.querySelector("#storeSummary").classList.add("is-invalid");
            setSummaryError(data.errors.summary);
          }
        } else {
          setStore(data.data.store);
          setIsAdded(true);
          document.querySelector("#storeName").classList.remove("is-invalid");
          document
            .querySelector("#storeSummary")
            .classList.remove("is-invalid");
          setNameError("");
          setSummaryError("");
          setAuthorizationError(false);
        }
      })
      .catch((err) => {
        setIsPending(false);
        setAuthorizationError(true);
      });
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
      {!isStoreFound && (
        <div className="d-flex flex-column align-items-center">
          <h1>Sorry, no matching stores found!</h1>
        </div>
      )}
      {store && (
        <form className="border store-form shadow-sm" onSubmit={handleSubmit}>
          {isAdded && (
            <div className="alert alert-success mb-3 text-center" role="alert">
              Store {store.name} was updated successfully.
              {/* <Link
              to={`/categories/${category.id}/brands/new`}
              className="alert-link"
            >
              <br />
              Click here
            </Link>
            &nbsp;to add new brands to this category. */}
            </div>
          )}
          <h1>Update Store</h1>
          <div className="mb-3">
            <label htmlFor="store-name" className="form-label">
              Store Name
            </label>
            <input
              type="text"
              className="form-control"
              id="storeName"
              name="storeName"
              aria-describedby="storeNameHelp"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {nameError && (
              <div id="storeNameHelp" className="form-text text-danger">
                {nameError}
              </div>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="store-summary" className="form-label">
              Store Summary
            </label>
            <textarea
              type="text"
              className="form-control"
              id="storeSummary"
              name="storeSummary"
              aria-describedby="storeHelp"
              required
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
            ></textarea>
            {summaryError && (
              <div id="storeSummaryHelp" className="form-text text-danger">
                {summaryError}
              </div>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="storeOwner" className="form-label">
              Store Owner
            </label>
            {owner && (
              <select
                name="storeOwner"
                id="owner"
                className="form-select"
                value={owner}
                onChange={(e) => {
                  setOwner(e.target.value);
                }}
              >
                {users &&
                  users.map((user) => (
                    <option value={user.id} key={user.id}>
                      {user.username}
                    </option>
                  ))}
              </select>
            )}
          </div>
          {!isPending && (
            <button
              type="submit"
              className="btn btn-outline-primary"
              id="submitBtn"
            >
              Update Store
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

export default StoreUpdateForm;

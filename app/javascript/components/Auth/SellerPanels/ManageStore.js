import React, { useEffect, useState } from "react";

const ManageStore = ({ userId }) => {
  const [state, setState] = useState({
    store: null,
    loading: true,
  });

  useEffect(() => {
    fetch(`/api/v1/users/${userId}/store`)
      .then((res) => {
        setState({ loading: false });
        if (res.ok) {
          return res.json();
        } else {
          throw Error(res.status.toString);
        }
      })
      .then((data) => {
        setState({ store: data.data.store });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="store-content d-flex justify-content-center">
      {state.loading && (
        <div
          className="spinner-border"
          style={{ width: "4rem", height: "4rem" }}
          role="status"
        >
          <span className="visually-hidden">Loading...</span>
        </div>
      )}
      {!state.loading && state.store && (
        <div className="row col-12 d-flex justify-content-center">
          <div className="card col-12 store-info">
            <div className="card-header text-center">Store Information</div>
            <div className=" card-body">
              <h2 className="card-title mb-3">{state.store.name}</h2>
              <p className="card-text mb-1">
                <b>Summary:</b> {state.store.summary}
              </p>
              <p className="card-text mb-1">
                <b>Owner Email:</b> {state.store.owner.email}
              </p>
              <p className="card-text mb-1">
                <b>Created At:</b> {state.store.created_at}
              </p>
            </div>
          </div>

          <div className="col-12 p-1 mt-4 border rounded">
            <div className="d-flex align-items-center justify-content-between border-bottom p-2">
              <h1>Products</h1>
              <button className="btn btn-success btn-sm">Add Product</button>
            </div>
          </div>
        </div>
      )}
      {!state.loading && !state.store && (
        <div className="row col-12">
          <h2>
            You don't seem to own a store! Please contact an admin if you
            believe this is wrong.
          </h2>
        </div>
      )}
    </div>
  );
};

export default ManageStore;

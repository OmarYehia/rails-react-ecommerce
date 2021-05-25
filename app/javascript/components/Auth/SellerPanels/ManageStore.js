import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import ProductCreateForm from "../../Product/ProductCreateForm/ProductCreateForm";

const ManageStore = ({ userId }) => {
  const [store, setStore] = useState(null);
  const [loading, setLoading] = useState(true);
  const [update, setUpdate] = useState(false);
  const [updateId, setUpdateId] = useState(null);
  const [create, setCreate] = useState(false);
  const [deleteStore, setDeleteStore] = useState(false);
  const [deleteFailure, setDeleteFailure] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [cookies, setCookies] = useCookies();
  const [products, setProducts] = useState(null);

  useEffect(() => {
    fetch(`/api/v1/users/${userId}/store`)
      .then((res) => {
        setLoading(false);
        if (res.ok) {
          return res.json();
        } else {
          throw Error(res.status.toString);
        }
      })
      .then((data) => {
        setStore(data.data.store);

        fetch(`/api/v1/stores/${data.data.store.id}/products`)
          .then((res) => {
            if (res.ok) {
              return res.json();
            } else {
              throw Error(res.status.toString);
            }
          })
          .then((data) => {
            setProducts(data.data);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [deleteSuccess]);

  const deleteProduct = (productId) => {
    if (confirm("Are you sure about this?")) {
      fetch(`/api/v1/products/${productId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${cookies.Authorization}`,
        },
      })
        .then((response) => response.json())
        .then((result) => {
          if (!result.errors) {
            setDeleteSuccess(true);
            setDeleteFailure(false);
          } else {
            setDeleteSuccess(false);
            setDeleteFailure(true);
          }
        });
    }
  };

  return (
    <div className="store-content d-flex justify-content-center">
      {loading && (
        <div
          className="spinner-border"
          style={{ width: "4rem", height: "4rem" }}
          role="status"
        >
          <span className="visually-hidden">Loading...</span>
        </div>
      )}
      {!loading && store && (
        <div className="row col-12 d-flex justify-content-center">
          <div className="card col-12 store-info">
            <div className="card-header text-center">Store Information</div>
            <div className=" card-body">
              <h2 className="card-title mb-3">{store.name}</h2>
              <p className="card-text mb-1">
                <b>Summary:</b> {store.summary}
              </p>
              <p className="card-text mb-1">
                <b>Owner Email:</b> {store.owner.email}
              </p>
              <p className="card-text mb-1">
                <b>Created At:</b> {store.created_at}
              </p>
            </div>
          </div>

          <div className="col-12 p-1 mt-4 border rounded">
            <div className="d-flex align-items-center justify-content-between border-bottom p-2">
              <h1>Products</h1>
              <button
                className="btn btn-success btn-sm"
                onClick={() => setCreate(true)}
              >
                Add Product
              </button>
            </div>
            {create && (
              <div className="col-12">
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => setCreate(false)}
                >
                  Back to Products
                </button>
                <ProductCreateForm storeId={store.id} />
              </div>
            )}

            {!create && (
              <div className="col-12">
                {!products && (
                  <h4 className="text-center p-4">
                    You are currently selling no products...
                  </h4>
                )}
                {products && (
                  <table className="table table-hover table-striped">
                    <thead>
                      <tr>
                        <th scope="col">Product ID</th>
                        <th scope="col">Product Name</th>
                        <th scope="col">Product Image</th>
                        <th scope="col">Stock Quantity</th>
                        <th scope="col">Price</th>
                        <th scope="col">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map((product) => (
                        <tr key={product.id}>
                          <th scope="row">{product.id}</th>
                          <td>{product.title}</td>
                          <td>
                            {" "}
                            <img src={product.image} />{" "}
                          </td>
                          <td>{product.quantity}</td>
                          <td>{product.price}</td>
                          <td>
                            <button
                              className="btn btn-outline-primary me-2 btn-sm"
                              onClick={() => {
                                setUpdate(!update);
                                setUpdateId(product.id);
                              }}
                            >
                              Update
                            </button>
                            <button
                              className="btn btn-danger btn-sm"
                              onClick={() => deleteProduct(product.id)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            )}
          </div>
        </div>
      )}
      {!loading && !store && (
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

import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";

const ManageOrders = ({ userId }) => {
  const [orders, setOrders] = useState(null);
  const [store, setStore] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cookies, setCookies] = useCookies();
  const [approved, setApproved] = useState(null);
  const [declined, setDeclined] = useState(null);
  const [error, setError] = useState(null);

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

        fetch(`/api/v1/stores/${data.data.store.id}/orders`)
          .then((res) => {
            if (res.ok) {
              return res.json();
            } else {
              throw Error(res.status.toString);
            }
          })
          .then((data) => {
            setOrders(data.data);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => {
        console.log(err);
      });
  }, [approved, error]);

  const approveOrder = (id) => {
    fetch(`/api/v1/orders/${id}/approve`, {
      method: "POST",
      headers: {
        "X-CSRF-TOKEN": document.querySelector('[name="csrf-token"]').content,
        Authorization: `Bearer ${cookies.Authorization}`,
      },
    }).then((res) => {
      if (res.ok) {
        setApproved(true);
        setError(false);
        return res.json();
      } else {
        setError(true);
        setApproved(false);
      }
    });
  };

  const declineOrder = (id) => {
    fetch(`/api/v1/orders/${id}/decline`, {
      method: "POST",
      headers: {
        "X-CSRF-TOKEN": document.querySelector('[name="csrf-token"]').content,
        Authorization: `Bearer ${cookies.Authorization}`,
      },
    }).then((res) => {
      if (res.ok) {
        setDeclined(true);
        setError(false);
        return res.json();
      } else {
        setError(true);
        setDeclined(false);
      }
    });
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
          <div className="col-12 p-1 mt-4 border rounded">
            <div className="d-flex align-items-center justify-content-between border-bottom p-2">
              <h1>Orders</h1>
            </div>

            <div className="col-12">
              {!orders && (
                <h4 className="text-center p-4">
                  You currently have to pending orders to approve...
                </h4>
              )}
              {approved && (
                <div className="alert alert-success">
                  Order approved successfully
                </div>
              )}
              {declined && (
                <div className="alert alert-info">Order declined :(</div>
              )}
              {error && (
                <div className="alert alert-success">
                  Something went wrong. Try again later.
                </div>
              )}
              {orders && (
                <table className="table table-hover table-striped">
                  <thead>
                    <tr>
                      <th scope="col">Product Name</th>
                      <th scope="col">Ordered Quantity</th>
                      <th scope="col">Stock Quantity</th>
                      <th scope="col">Total Price for Request</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr key={order.id}>
                        <td>{order.product.productName}</td>
                        <td>{order.quantity}</td>
                        <td>{order.product.stockQuantity}</td>
                        <td>{order.price}</td>
                        <td>
                          {order.state === "pending" ? (
                            <div>
                              <button
                                className="btn btn-success btn-sm me-2"
                                onClick={() => approveOrder(order.id)}
                              >
                                Approve
                              </button>
                              <button
                                className="btn btn-danger btn-sm"
                                onClick={() => declineOrder(order.id)}
                              >
                                Decline
                              </button>
                            </div>
                          ) : (
                            order.state
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
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

export default ManageOrders;

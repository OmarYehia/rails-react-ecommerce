import React from "react";
import { Redirect, browserHistory, Link } from "react-router-dom";
import ProductForm from "../../Product/ProductCreateForm/ProductCreateForm"
import ProductUpdateForm from "../../Product/ProductUpdateForm/ProductUpdateForm"

import { Ring } from "react-awesome-spinners";
import { element } from "prop-types";
class ManageCategories extends React.Component {
  constructor() {
    super();
    this.state = {
      categories: null,
      loading: true,
      url: window.location.pathname,
      deleteSuccess: false,
      deleteFail: false,
      create: false,
      update: false,
      showBrands: false,
      updateID: null,
      brands: null,
      categoryId: null
    };
  }
  componentDidMount() {
      this.setState({loading: false})
  }
  deleteProduct = (productId) => {
    if (confirm("Are you sure about this?")) {
      fetch(`/api/v1/products/${productId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${this.props.getCookie("Authorization")}`,
        },
      })
        .then((response) => response.json())
        .then((result) => {
          if (!result.errors) {
            this.setState({ deleteSuccess: true, deleteFail: false });
            this.componentDidMount();
          } else {
            this.setState({ deleteFail: true, deleteSuccess: false });
          }
        });
    }
  };
  render() {
    return this.state.loading ? (
      <Ring />
    ) : (
      <div>
        {this.state.deleteSuccess ? (
          <center>
            <div className="alert alert-success">
              Product deleted successfully !
            </div>
          </center>
        ) : (
          ""
        )}
        {this.state.deleteFail ? (
          <center>
            <div className="alert alert-danger">
              Product was not deleted, Contact an admin for help.
            </div>
          </center>
        ) : (
          ""
        )}
        {!this.state.create && !this.state.update ? (
          <div>
            <table className="table table-hover">
              <thead>
                <tr>
                  <th scope="col">Product ID</th>
                  <th scope="col">Name</th>
                  <th scope="col">Description</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Price</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {this.props.products.map((element) => (
                  <tr key={element.id}>
                    <th scope="row">{element.id}</th>
                    <td>{element.title}</td>
                    <td>{element.description}</td>
                    <td>x{element.quantity}</td>
                    <td>{element.price} L.E</td>
                    <td>
                      {/* <Link to={`/categories/${element.id}/update`}> */}
                      <button
                        className="btn btn-warning"
                        onClick={() =>
                          this.setState({
                            update: !this.state.update,
                            updateID: element.id,
                          })
                        }
                      >
                        Update
                      </button>
                      {/* </Link> */}
                      <button
                        className="btn btn-danger"
                        onClick={() => this.deleteProduct(element.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button
              className="btn btn-primary"
              onClick={() => this.setState({ create: !this.state.create })}
            >
              Create New Product
            </button>
          </div>
        ) : (
          ""
        )}
        {this.state.create && (
          <div className="d-flex flex-column justify-content-center">
            <ProductForm getCookie={this.props.getCookie} brandId={this.props.brandId}/>
            <button
              className="btn btn-primary ms-auto mt-3 me-5"
              onClick={() => {
                this.setState({ create: !this.state.create });
                this.componentDidMount();
              }}
            >
              Back to Manage Brands
            </button>
          </div>
        )}
        {this.state.update && (
          <div className="d-flex flex-column justify-content-center">
            <ProductUpdateForm productId={this.state.updateID} />
            <button
              className="btn btn-primary ms-auto mt-3 me-5"
              onClick={() => {
                this.setState({ update: !this.state.update, updateID: null });
                this.componentDidMount();
              }}
            >
              Back to Manage Brands
            </button>
          </div>
        )}
        
      </div>
    );
  }
}

export default ManageCategories;

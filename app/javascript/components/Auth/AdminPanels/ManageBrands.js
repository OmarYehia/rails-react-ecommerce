import React from "react";
import { Redirect, browserHistory, Link } from "react-router-dom";
import BrandForm from "../../Brand/BrandCreateForm/BrandCreateForm";
import BrandUpdateForm from "../../Brand/BrandUpdateForm/BrandUpdateForm";
import ManageProducts from "./ManageProducts"

import { Ring } from "react-awesome-spinners";
class ManageBrands extends React.Component {
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
      showProducts:false,
      updateID: null,
      brandId:null,
      products:[]
    };
  }
  componentDidMount() {
    this.setState({ loading: false})
  }
  deleteBrand = (categoryId) => {
    if (confirm("Are you sure about this?")) {
      fetch(`/api/v1/brands/${categoryId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${this.props.getCookie("Authorization")}`,
        },
      })
        .then((response) => response.json())
        .then((result) => {
          if (!result.errors) {
            this.setState({ deleteSuccess: true, deleteFail: false });
            this.props.updateParent();
          } else {
            this.setState({ deleteFail: true, deleteSuccess: false });
          }
        });
    }
  };
  getProducts =(brandId) => {
    fetch(`/api/v1/brands/${brandId}/products`,{
      headers:{
        "Authorization" : `Bearer ${this.props.getCookie("Authorization")}`
      }
    })
    .then(response => response.json())
    .then(result => {
      this.setState({ products:result.data, showProducts: true, brandId:brandId })
    })
  }
  render() {
    return this.state.loading ? (
      <Ring />
    ) : (
      <div>
        {this.state.deleteSuccess ? (
          <center>
            <div className="alert alert-success">
              Brand deleted successfully !
            </div>
          </center>
        ) : (
          ""
        )}
        {this.state.deleteFail ? (
          <center>
            <div className="alert alert-danger">
              Brand was not deleted, Contact an admin for help.
            </div>
          </center>
        ) : (
          ""
        )}
        {!this.state.create && !this.state.update && !this.state.showProducts ? (
          <div>
            <table className="table table-hover">
              <thead>
                <tr>
                  <th scope="col">Brand ID</th>
                  <th scope="col">Name</th>
                  <th scope="col">Category Name</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {this.props.brands.map((element) => (
                  <tr key={element.id}>
                    <th scope="row">{element.id}</th>
                    <td>{element.name}</td>
                    <td>{element.category.categoryName}</td>
                    <td>
                      <button className="btn btn-success" onClick={()=>this.getProducts(element.id)}>Show Products</button>
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
                        onClick={() => this.deleteBrand(element.id)}
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
              Create New Brand
            </button>
          </div>
        ) : (
          ""
        )}
        {this.state.create && (
          <div className="d-flex flex-column justify-content-center">
            <BrandForm categoryId={this.props.categoryId}/>
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
            <BrandUpdateForm brandId={this.state.updateID} products={this.state.products}/>
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
        {this.state.showProducts && (
          <div className="d-flex flex-column justify-content-center">
            <ManageProducts brandId={this.state.brandId} getCookie={this.props.getCookie} products={this.state.products} />
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

export default ManageBrands;

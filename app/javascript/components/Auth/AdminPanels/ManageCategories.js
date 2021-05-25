import React from "react";
import { Redirect, browserHistory, Link } from "react-router-dom";
import CategoryForm from "../../Category/CategoryForm/CategoryForm";
import CategoryUpdateForm from "../../Category/CategoryUpdateForm/CategoryUpdateForm";

import { Ring } from "react-awesome-spinners";
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
      updateID: null,
    };
  }
  componentDidMount() {
    fetch("/api/v1/categories", {
      headers: {
        Authorization: `Bearer ${this.props.getCookie("Authorization")}`,
      },
    })
      .then((response) => response.json())
      .then((result) => {
        this.setState({ categories: result.data, loading: false });
      });
  }
  deleteCategory = (categoryId) => {
    if (confirm("Are you sure about this?")) {
      fetch(`/api/v1/categories/${categoryId}`, {
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
              Category deleted successfully !
            </div>
          </center>
        ) : (
          ""
        )}
        {this.state.deleteFail ? (
          <center>
            <div className="alert alert-danger">
              Category was not deleted, Contact an admin for help.
            </div>
          </center>
        ) : (
          ""
        )}
        {!this.state.create && !this.state.update ? (
          <div>
            <table className="table table-hover table-striped">
              <thead>
                <tr>
                  <th scope="col">Category ID</th>
                  <th scope="col">Name</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {this.state.categories.map((element) => (
                  <tr key={element.id}>
                    <th scope="row">{element.id}</th>
                    <td>{element.name}</td>
                    <td>
                      <button
                        className="btn btn-outline-primary me-2 btn-sm"
                        onClick={() =>
                          this.setState({
                            update: !this.state.update,
                            updateID: element.id,
                          })
                        }
                      >
                        Update
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => this.deleteCategory(element.id)}
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
              Create New Category
            </button>
          </div>
        ) : (
          ""
        )}
        {this.state.create && (
          <div className="d-flex flex-column justify-content-center">
            <CategoryForm />
            <button
              className="btn btn-primary ms-auto mt-3 me-5"
              onClick={() => {
                this.setState({ create: !this.state.create });
                this.componentDidMount();
              }}
            >
              Back to Manage Categories
            </button>
          </div>
        )}
        {this.state.update && (
          <div className="d-flex flex-column justify-content-center">
            <CategoryUpdateForm categoryId={this.state.updateID} />
            <button
              className="btn btn-primary ms-auto mt-3 me-5"
              onClick={() => {
                this.setState({ update: !this.state.update, updateID: null });
                this.componentDidMount();
              }}
            >
              Back to Manage Categories
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default ManageCategories;

import React from "react";
import { Redirect, browserHistory } from "react-router-dom";
import { withRouter } from "react-router";

class UpdateForm extends React.Component {
  constructor(props) {
    super();
    this.state = {
      username: "",
      email: "",
      errors: "",
      redirect: false,
    };
  }
  change = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  componentDidMount() {
    let id = this.props.id;
    console.log(id);
    fetch(`/api/v1/users/${id}`, {
      headers: {
        Authorization: `Bearer ${this.props.getCookie("Authorization")}`,
      },
    })
      .then((response) => response.json())
      .then((result) =>
        this.setState({
          email: result.data.user.email,
          username: result.data.user.username,
        })
      );
  }

  fetchData = (data) => data;

  update = () => {
    let user = {
      email: this.state.email,
      username: this.state.username,
    };
    fetch(`/api/v1/users/edit/${this.props.id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${this.props.getCookie("Authorization")}`,
      },
      body: JSON.stringify(user),
    })
      .then((response) => response.json())
      .then((result) => {
        if (!result.error) {
          componentDidMount();
        } else {
          console.log(result.error);
          this.setState({ errors: result.error });
        }
      });
  };
  render() {
    return (
      <div>
        {this.state.errors ? (
          <div
            className="alert alert-danger"
            style={{ padding: 10 }}
            role="alert"
          >
            {this.state.errors}
          </div>
        ) : (
          ""
        )}
        <div className="form-group" style={{ padding: 10 }}>
          <label htmlFor="exampleInputUsername">Username</label>
          <input
            type="text"
            className="form-control"
            id="exampleInputUsername"
            name="username"
            value={this.state.username}
            onChange={this.change}
          />
        </div>
        <div className="form-group" style={{ padding: 10 }}>
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            name="email"
            value={this.state.email}
            onChange={this.change}
          />
        </div>
        <button className="btn btn-primary" onClick={this.update}>
          Update Profile
        </button>
      </div>
    );
  }
}

export default withRouter(UpdateForm);

import React from "react";
import { Redirect, browserHistory } from "react-router-dom";

class LoginForm extends React.Component {
  constructor(props) {
    super();
    this.state = {
      password: "",
      email: "",
      errors: "",
      redirect: false,
    };
  }
  change = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };



  login = () => {
    let user = {
      email: this.state.email,
      password: this.state.password,
    };
    fetch("/api/v1/login", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((response) => response.json())
      .then((result) => {
        if (!result.error) {
          document.cookie = `Authorization=${result.token}`;
          this.props.setUser(result.data.user)
          this.setState({ redirect: "/" });
        } else {
          console.log(result.error);
          this.setState({ errors: result.error });
        }
      });
  };
  render() {
    if (this.state.redirect) return <Redirect to={this.state.redirect} />;
    else {
      return (
        <div>
          <h1>{this.state.errors}</h1>
          <span>Email: </span>
          <input type="email" name="email" onChange={this.change} />
          <span>Password: </span>
          <input type="password" name="password" onChange={this.change} />
          <button onClick={this.login}>Login</button>
        </div>
      );
    }
  }
}

export default LoginForm;

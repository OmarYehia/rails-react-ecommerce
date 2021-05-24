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
          {this.state.errors ? <div class="alert alert-danger" style={{padding: 10}}role="alert">{this.state.errors}</div> : ""}

          <div className="form-group" style={{ padding: 10 }}>
            <label for="exampleInputEmail1">Email address</label>
            <input type="email" className="form-control" id="exampleInputEmail1" name="email" aria-describedby="emailHelp" onChange={this.change} placeholder="Enter email" />
          </div>
          <div className="form-group" style={{ padding: 10 }}>
            <label for="exampleInputPassword">Password</label>
            <input type="password" className="form-control" id="exampleInputPassword" name="password" aria-describedby="emailHelp" onChange={this.change} placeholder="Password" />
          </div>
          <button type="submit" className="btn btn-primary" onClick={this.login}>Submit</button>

        </div >
      );
    }
  }
}

export default LoginForm;

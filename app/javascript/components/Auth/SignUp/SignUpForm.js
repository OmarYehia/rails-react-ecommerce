import React from "react";
import { Redirect, browserHistory } from 'react-router-dom'
import styles from "./SignUpForm.css";


class LoginForm extends React.Component {
    constructor(props) {
        super()
        this.state = {
            password: "",
            password_confirmation: "",
            email: "",
            username: "",
            errors: [],
            error: "",
            redirect: false
        }
    }
    change = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }
    signup = () => {
        let user = {
            username: this.state.username,
            email: this.state.email,
            password: this.state.password,
            password_confirmation: this.state.password_confirmation
        }
        fetch("/api/v1/users", {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(user)
        }).then(response => response.json())
            .then(result => {
                if (!result.error) {
                    console.log(result.token);
                    this.setState({ redirect: "/login" })
                }
                else {
                    console.log(result.error);
                    this.state.errors = [];
                    this.state.error = "";
                    if (result.status == 400) {
                        for (let key in result.error) {
                            let err = this.state.errors.concat(`${key}: ${result.error[key]}`)
                            this.setState({ errors: err })
                        }
                    }
                    else if (result.status == 500) {
                        this.setState({ error: result.error })
                    }
                }
            }
            )
    }
    render() {
        if (this.state.redirect)
            return <Redirect to={this.state.redirect}
            />
        else {
            return (
                <div>
                    <div>{this.state.errors.map(element =>
                        <div class="alert alert-danger" role="alert">
                            {element}
                        </div>
                    )}</div>

                    <h1>{this.state.error}</h1>
                    <div className="form-group" style={{padding: 10}}>
                        <label for="exampleInputUsername">Username</label>
                        <input type="text" className="form-control" id="exampleInputUsername" name="username" aria-describedby="emailHelp" onChange={this.change} placeholder="Enter username" />
                    </div>
                    <div className="form-group" style={{padding: 10}}>
                        <label for="exampleInputEmail1">Email address</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" name="email" aria-describedby="emailHelp" onChange={this.change} placeholder="Enter email" />
                    </div>
                    <div className="form-group" style={{padding: 10}}>
                        <label for="exampleInputPassword">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword" name="password" aria-describedby="emailHelp" onChange={this.change} placeholder="Password" />
                    </div>
                    <small id="passwordHelpBlock" class="form-text text-muted">
                        Your password must be 8-20 characters long.</small>
                    <div className="form-group" style={{padding: 10}}>
                        <label for="exampleInputPasswordConfirmation">Password Confirmation</label>
                        <input type="password" className="form-control" id="exampleInputPasswordConfirmation" name="password_confirmation" aria-describedby="emailHelp" onChange={this.change} placeholder="Password Confirmation" />
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={this.signup}>Submit</button>

                </div>
            )
        }
    }
}

export default LoginForm
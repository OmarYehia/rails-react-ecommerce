import React from "react";
import { Redirect, browserHistory } from 'react-router-dom'


class SellerForm extends React.Component {
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
    login = () => {
        let user = {
            username: this.state.username,
            email: this.state.email,
            password: this.state.password,
            password_confirmation: this.state.password_confirmation
        }
        fetch("/api/v1/users/sellers", {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(user)
        }).then(response => response.json())
            .then(result => {
                if (!result.error) {
                    console.log(result.token);
                    this.setState({ redirect: "/" })
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
            return <div>
                <div>{this.state.errors.map(element =>
                    <h2>{element}</h2>
                )}</div>
                <h1>{this.state.error}</h1>
                <lable>Username: </lable>
                <input type="text" name="username" placeholder="Username" onChange={this.change} />
                <lable>Email: </lable>
                <input type="email" name="email" placeholder="Example@example.com" onChange={this.change} />
                <lable>Password: </lable>
                <input type="password" name="password" placeholder="Password" onChange={this.change} />
                <lable>Password Confirmation: </lable>
                <input type="password" name="password_confirmation" placeholder="Password" onChange={this.change} />
                <button onClick={this.login} >Login</button>
            </div>
        }
    }
}

export default SellerForm
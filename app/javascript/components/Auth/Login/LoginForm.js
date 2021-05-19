import React from "react";
import { Redirect, browserHistory } from 'react-router-dom'


class LoginForm extends React.Component {
    constructor(props) {
        super()
        this.state = {
            password: "",
            email: "",
            errors: "",
            redirect: false
        }
    }
    change = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    getCookie = (cname) => {
        let name = cname + "=";
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }

    login = () => {
        let user = {
            email: this.state.email,
            password: this.state.password
        }
        fetch("/api/v1/login", {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(user)
        }).then(response => response.json())
            .then(result => {
                console.log(this.getCookie("Authorization"))
                if (!result.error) {
                    console.log(result.token);
                    document.cookie = `Authorization=${result.token}`
                    this.setState({ redirect: "/" })
                }
                else
                    console.log(result.error);
                this.setState({ errors: result.error })
            }
            )
    }
    render() {
        if (this.state.redirect)
            return <Redirect to={this.state.redirect} />
        else {
            return <div>
                <h1>{this.state.errors}</h1>
                <lable>Email: </lable>
                <input type="email" name="email" placeholder="Example@example.com" onChange={this.change} />
                <lable>Password: </lable>
                <input type="password" name="password" placeholder="Enter password" onChange={this.change} />
                <button onClick={this.login} >Login</button>
            </div>
        }
    }
}

export default LoginForm
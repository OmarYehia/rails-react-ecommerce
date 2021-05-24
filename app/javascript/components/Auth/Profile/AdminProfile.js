import React from "react";
import { Redirect, browserHistory, Link } from "react-router-dom";
import NotFound from "../../NotFound/NotFound"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

class AdminProfile extends React.Component {
    constructor(props) {
        super();
        const data = localStorage.getItem('user');
        const user = JSON.parse(data);
        this.state = {
            email: user ? user.email : null,
            username: user ? user.username : null,
            errors: "",
            redirect: false,
        };
    }

    componentDidMount() {

    }

    change = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };



    update = () => {
        let user = {
            email: this.state.email,
            username: this.state.username,
        };
        console.log(user);
        fetch(`/api/v1/users/edit/${this.props.user.id}`, {
            method: "PUT",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(user),
        })
            .then((response) => response.json())
            .then((result) => {
                if (!result.error) {
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
                    <ul className="nav justify-content-center">
                        <li className="nav-item">
                            <Link className="nav-link active" to={`profile/edit`}>Edit Profile</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="#">Add Seller</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="#">Add Store</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="#">View Stats</Link>
                        </li>
                    </ul>
                </div>

            );
        }
    }
}

export default AdminProfile;

import React from "react";
import { Redirect, browserHistory, Link } from "react-router-dom";
import NotFound from "../../NotFound/NotFound"

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
                    <h1>{this.state.errors}</h1>
                    <span>Username: </span>
                    <input type="text" name="username" value={this.state.username} onChange={this.change} />
                    <span>Email: </span>
                    <input type="email" name="email" value={this.state.email} onChange={this.change} />
                    <button onClick={this.update}>Update Profile</button>
                    <ul className="nav justify-content-center">
                        <li className="nav-item">
                            <Link className="nav-link active" to="#">Active</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="#">Link</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="#">Link</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link disabled" to="#" tabindex="-1" aria-disabled="true">Disabled</Link>
                        </li>
                    </ul>
                </div>

            );
        }
    }
}

export default AdminProfile;

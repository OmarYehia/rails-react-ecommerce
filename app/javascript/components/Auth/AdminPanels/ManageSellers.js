import React from "react";
import { Ring } from "react-awesome-spinners"
import { NavLink, Link } from "react-router-dom";
class ManageSellers extends React.Component {
    constructor() {
        super();
        this.state = {
            sellers: null,
            loading: true,
            url: window.location.pathname,
            deleteSuccess: false,
            deleteFail: false,
        }
    }
    componentDidMount() {
        fetch("/api/v1/users", {
            headers: {
                "Authorization": `Bearer ${this.props.getCookie("Authorization")}`
            }
        })
            .then(response => response.json())
            .then(result => {
                this.setState({ sellers: result.data, loading: false })
            })
    }
    deleteSeller = (categoryId) => {
        if (confirm("Are you sure about this?")) {
            fetch(`/api/v1/users/${categoryId}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${this.props.getCookie("Authorization")}`
                }
            })
                .then(response => response.json())
                .then(result => {
                    if (!result.error) {
                        this.setState({ deleteSuccess: true, deleteFail: false })
                        this.componentDidMount()
                    } else {
                        this.setState({ deleteFail: true, deleteSuccess: false })
                    }
                })
        }
    }
    render() {
        return (
            this.state.loading ? <Ring /> : <div>
                {this.state.deleteSuccess ? <center><div className="alert alert-success">Seller deleted successfully !</div></center> : ""}
                {this.state.deleteFail ? <center><div className="alert alert-danger">Seller was not deleted, Contact an admin for help.</div></center> : ""}
                <table class="table table-hover">
                    <thead>
                        <tr >
                            <th scope="col">Seller ID</th>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.sellers.map(element =>
                            <tr key={element.id}>
                                <th scope="row">{element.id}</th>
                                <td>{element.username}</td>
                                <td>{element.email}</td>
                                <td>
                                    <Link>
                                        <button className="btn btn-success">Show</button>
                                    </Link>
                                    <Link to={`/sellers/${element.id}/update`}>
                                        <button className="btn btn-warning">Update</button>
                                    </Link>
                                    <button className="btn btn-danger" onClick={() => this.deleteSeller(element.id)}>Delete</button>

                                </td>
                            </tr>
                        )}
                    </tbody>
                    <NavLink to='/sellers/new'>
                        <button className="btn btn-primary">Add New Seller</button>
                    </NavLink>
                </table>
            </div>
        )
    }
}

export default ManageSellers;
import React from "react";
import { Ring } from "react-awesome-spinners"
import { Redirect, browserHistory, Link } from "react-router-dom";

class ManageStores extends React.Component {
    constructor() {
        super();
        this.state = {
            stores: null,
            loading: true,
            url: window.location.pathname,
        }
    }
    componentDidMount() {
        fetch("/api/v1/stores", {
            headers: {
                "Authorization": `Bearer ${this.props.getCookie("Authorization")}`
            }
        })
            .then(response => response.json())
            .then(result => {
                this.setState({ stores: result.data, loading: false })
            })
    }
    deleteCategory = (categoryId) => {
        if (confirm("Are you sure about this?")) {
            fetch(`/api/v1/categories/${categoryId}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${this.props.getCookie("Authorization")}`
                }
            })
                .then(response => response.json())
                .then(result => this.setState({ deletedCategory: true }))
        }
    }
    render() {
        return (
            this.state.loading ? <Ring /> : <div>
                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Seller ID</th>
                            <th scope="col">Name</th>
                            <th scope="col">Description</th>
                            <th scope="col">Owner Name</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.stores.map(element =>
                            <tr key={element.id}>
                                <th scope="row">{element.id}</th>
                                <td>{element.name}</td>
                                <td>{element.summary}</td>
                                <td>{element.owner.username}</td>
                                <td>
                                    <button className="btn btn-success">Show</button>
                                    <Link to={'#'}>
                                        <button className="btn btn-warning">Update</button>
                                    </Link>
                                    <button className="btn btn-danger" onClick={() => this.deleteCategory(element.id)}>Delete</button>
                                </td>
                            </tr>
                        )}
                    </tbody>
                    <Link to='/stores/new'>
                        <button className="btn btn-primary">Create New Store</button>
                    </Link>
                </table>
            </div>
        )
    }
}

export default ManageStores;
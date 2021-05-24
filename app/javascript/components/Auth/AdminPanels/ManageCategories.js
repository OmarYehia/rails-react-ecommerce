import React from "react";
import { Redirect, browserHistory, Link } from "react-router-dom";

import { Ring } from "react-awesome-spinners"
class ManageCategories extends React.Component {
    constructor() {
        super();
        this.state = {
            categories: null,
            loading: true,
            url: window.location.pathname,
            deleteSuccess: false,
            deleteFail: false,
        }
    }
    componentDidMount() {
        fetch("/api/v1/categories", {
            headers: {
                "Authorization": `Bearer ${this.props.getCookie("Authorization")}`
            }
        })
            .then(response => response.json())
            .then(result => {
                this.setState({ categories: result.data, loading: false })
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
                .then(result => {
                    if (!result.errors) {
                        this.setState({ deleteSuccess: true, deleteFail: false })
                        this.componentDidMount()
                    }else{
                        this.setState({ deleteFail: true, deleteSuccess: false })
                    }
                })
        }
    }
    render() {
        return (
            this.state.loading ? <Ring /> : <div>
                {this.state.deleteSuccess ? <center><div className="alert alert-success">Category deleted successfully !</div></center> : ""}
                {this.state.deleteFail ? <center><div className="alert alert-danger">Category was not deleted, Contact an admin for help.</div></center> : ""}
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Category ID</th>
                            <th scope="col">Name</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.categories.map(element =>
                            <tr key={element.id}>
                                <th scope="row">{element.id}</th>
                                <td>{element.name}</td>
                                <td>
                                    <button className="btn btn-success">Show</button>
                                    <Link to={`/categories/${element.id}/update`}>
                                        <button className="btn btn-warning">Update</button>
                                    </Link>
                                    <button className="btn btn-danger" onClick={() => this.deleteCategory(element.id)}>Delete</button>
                                </td>
                            </tr>
                        )}
                    </tbody>
                    <Link to='/categories/new'>
                        <button className="btn btn-primary">Create New Category</button>
                    </Link>
                </table>
            </div>
        )
    }
}

export default ManageCategories;
import React from "react";
import { Ring } from "react-awesome-spinners"
import { Redirect, browserHistory, Link } from "react-router-dom";
import StoreForm from "../../Store/StoreForm/StoreForm"
import StoreUpdateForm from "../../Store/StoreUpdateForm/StoreUpdateForm"

class ManageStores extends React.Component {
    constructor() {
        super();
        this.state = {
            stores: null,
            loading: true,
            url: window.location.pathname,
            deleteSuccess: false,
            deleteFail: false,
            create: false,
            update: false,
            updateID: null,
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
                .then(result => {
                    if (!result.errors) {
                        this.setState({ deleteSuccess: true, deleteFail: false });
                        this.componentDidMount();
                    } else {
                        this.setState({ deleteFail: true, deleteSuccess: false });
                    }
                })
        }
    }
    render() {
        return (
            this.state.loading ? <Ring /> : <div>
                {this.state.deleteSuccess ? (
                    <center>
                        <div className="alert alert-success">
                            Category deleted successfully !
            </div>
                    </center>
                ) : (
                    ""
                )}
                {this.state.deleteFail ? (
                    <center>
                        <div className="alert alert-danger">
                            Category was not deleted, Contact an admin for help.
            </div>
                    </center>
                ) : (
                    ""
                )}
                {!this.state.create && !this.state.update ? (<table class="table table-hover">
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
                                    <button className="btn btn-warning" onClick={() =>
                                        this.setState({
                                            update: !this.state.update,
                                            updateID: element.id,
                                        })
                                    }>Update</button>
                                    <button className="btn btn-danger" onClick={() => this.deleteCategory(element.id)}>Delete</button>
                                </td>
                            </tr>
                        )}
                    </tbody>
                    <button className="btn btn-primary" onClick={() =>
                        this.setState({
                            create: !this.state.create,
                        })
                    }>Create New Store</button>
                </table>) : ""}
                {this.state.create && (
                    <div className="d-flex flex-column justify-content-center">
                        <StoreForm getCookie={this.props.getCookie} />
                        <button
                            className="btn btn-primary ms-auto mt-3 me-5"
                            onClick={() => {
                                this.setState({ create: !this.state.create });
                                this.componentDidMount();
                            }}
                        >
                            Back to Manage Stores
            </button>
                    </div>
                )}
                {this.state.update && (
                    <div className="d-flex flex-column justify-content-center">
                        <StoreUpdateForm storeId={this.state.updateID} getCookie={this.props.getCookie}/>
                        <button
                            className="btn btn-primary ms-auto mt-3 me-5"
                            onClick={() => {
                                this.setState({ update: !this.state.update, updateID: null });
                                this.componentDidMount();
                            }}
                        >
                            Back to Manage Stores
            </button>
                    </div>
                )}
            </div>
        )
    }
}

export default ManageStores;
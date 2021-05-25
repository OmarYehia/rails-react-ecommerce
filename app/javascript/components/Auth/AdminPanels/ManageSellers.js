import React from "react";
import { Ring } from "react-awesome-spinners"
import { NavLink, Link } from "react-router-dom";
import SellerForm from "../SellersForm/SellerForm"
import UpdateForm from "../UpdateForm/UpdateForm"
class ManageSellers extends React.Component {
    constructor() {
        super();
        this.state = {
            sellers: null,
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
                {!this.state.create && !this.state.update ? (<table class="table table-hover">
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
                                    <button className="btn btn-warning" onClick={() =>
                                        this.setState({
                                            update: !this.state.update,
                                            updateID: element.id,
                                        })} > Update</button>
                                    <button className="btn btn-danger" onClick={() => this.deleteSeller(element.id)}>Delete</button>
                                </td>
                            </tr>
                        )}
                    </tbody>
                    <button className="btn btn-primary" onClick={() =>
                        this.setState({
                            create: !this.state.create,
                        })}> Add New Seller</button>
                </table>) : ("")}
                {this.state.create && (
                    <div className="d-flex flex-column justify-content-center">
                        <SellerForm getCookie={this.props.getCookie}/>
                        <button
                            className="btn btn-primary ms-auto mt-3 me-5"
                            onClick={() => {
                                this.setState({ create: !this.state.create });
                                this.componentDidMount();
                            }}
                        >
                            Back to Manage Sellers
            </button>
                    </div>
                )}
                {this.state.update && (
                    <div className="d-flex flex-column justify-content-center">
                        <UpdateForm id={this.state.updateID} getCookie={this.props.getCookie}/>
                        <button
                            className="btn btn-primary ms-auto mt-3 me-5"
                            onClick={() => {
                                this.setState({ update: !this.state.update, updateID: null });
                                this.componentDidMount();
                            }}
                        >
                            Back to Manage Sellers
            </button>
                    </div>
                )}
            </div>
        )
    }
}

export default ManageSellers;
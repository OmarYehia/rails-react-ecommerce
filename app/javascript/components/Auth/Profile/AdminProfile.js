import React from "react";
import { Redirect, browserHistory, Link } from "react-router-dom";
import NotFound from "../../NotFound/NotFound";
import StoreForm from "../../Store/StoreForm/StoreForm";
import ManageCategories from "../AdminPanels/ManageCategories";
import SellerForm from "../SellersForm/SellerForm";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ManageStores from "../AdminPanels/ManageStores";
import ManageBrands from "../AdminPanels/ManageBrands";
import ManageSellers from "../AdminPanels/ManageSellers";

class AdminProfile extends React.Component {
  constructor(props) {
    super();
    const data = localStorage.getItem("user");
    const user = JSON.parse(data);
    this.state = {
      email: user ? user.email : null,
      username: user ? user.username : null,
      errors: "",
      redirect: false,
      url: window.location.pathname,
    };
  }

  componentDidMount() {
    console.log(location.pathname);
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
          this.props.setUser(result.data.user);
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
        <Router>
          <div>
            <ul className="nav justify-content-center">
              <li className="nav-item">
                <Link className="nav-link active" to={`${this.state.url}/edit`}>
                  Edit Profile
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to={`${this.state.url}/manageseller`}
                >
                  Manage Sellers
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={`${this.state.url}/managestore`}>
                  Manage Stores
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to={`${this.state.url}/managecategories`}
                >
                  Manage Categories
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to={`${this.state.url}/managebrands`}
                >
                  Manage Brands
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={`${this.state.url}/stats`}>
                  View Stats
                </Link>
              </li>
            </ul>
            <Switch>
              <Route path="/profile/edit">
                <div>
                  {this.state.errors ? (
                    <div
                      class="alert alert-danger"
                      style={{ padding: 10 }}
                      role="alert"
                    >
                      {this.state.errors}
                    </div>
                  ) : (
                    ""
                  )}
                  <div className="form-group" style={{ padding: 10 }}>
                    <label htmlFor="exampleInputUsername">Username</label>
                    <input
                      type="text"
                      className="form-control"
                      id="exampleInputUsername"
                      name="username"
                      value={this.state.username}
                      onChange={this.change}
                    />
                  </div>
                  <div className="form-group" style={{ padding: 10 }}>
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input
                      type="email"
                      className="form-control"
                      id="exampleInputEmail1"
                      name="email"
                      value={this.state.email}
                      onChange={this.change}
                    />
                  </div>
                  <button className="btn btn-primary" onClick={this.update}>
                    Update Profile
                  </button>
                </div>
              </Route>
              <Route path="/profile/manageseller">
                <ManageSellers getCookie={this.props.getCookie} />
              </Route>
              <Route path="/profile/managestore">
                <ManageStores getCookie={this.props.getCookie} />
              </Route>
              <Route path="/profile/managecategories">
                <ManageCategories getCookie={this.props.getCookie} />
              </Route>
              {/* <Route path="/profile/managebrands">
                                <ManageBrands getCookie={this.props.getCookie} />
                            </Route> */}
              <Route path="/profile/stats">
                <h1>Stats</h1>
              </Route>
            </Switch>
          </div>
        </Router>
      );
    }
  }
}

export default AdminProfile;

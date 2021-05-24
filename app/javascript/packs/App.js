import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import BrandList from "../components/Brand/BrandList/BrandList";
import CategoryList from "../components/Category/CategoryList/CategoryList";
import LoginForm from "../components/Auth/Login/LoginForm";
import SignUpForm from "../components/Auth/SignUp/SignUpForm";
import Profile from "../components/Auth/Profile/Profile";
import AdminProfile from "../components/Auth/Profile/AdminProfile";
import CategoryForm from "../components/Category/CategoryForm/CategoryForm";
import CategoryUpdateForm from "../components/Category/CategoryUpdateForm/CategoryUpdateForm";
import BrandCreateForm from "../components/Brand/BrandCreateForm/BrandCreateForm";
import BrandUpdateForm from "../components/Brand/BrandUpdateForm/BrandUpdateForm";
import LandingPage from "../components/LandingPage/LandingPage";
import Navbar from "../components/Navbar/Navbar";
import NotFound from "../components/NotFound/NotFound";
import CartList from "../components/ShoppingCart/CartList/CartList";
import StoreForm from "../components/Store/StoreForm/StoreForm";
import StoreUpdateForm from "../components/Store/StoreUpdateForm/StoreUpdateForm";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      user: null,
    };
  }

  logout = () => {
    document.cookie =
      "Authorization= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
    window.localStorage.clear();
    this.setState({ user: null });
  };

  updateUser = (returnedUser) => {
    localStorage.setItem("user", JSON.stringify(returnedUser));
    this.setState({ user: returnedUser });
  };

  getCookie = (cname) => {
    console.log("inside");
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  };

  componentDidMount() {
    if (this.getCookie("Authorization") !== "") {
      fetch("/api/v1/auto_login", {
        headers: {
          Authorization: `Bearer ${this.getCookie("Authorization")}`,
        },
      })
        .then((response) => response.json())
        .then((result) => {
          console.log(result.user);
          this.setState({ user: result.user });
        });
    }
  }
  render() {
    return (
      <Router>
        <div className="App">
          <Navbar user={this.state.user} logout={this.logout} />
          <div className="content container">
            <Switch>
              <Route exact path="/">
                <LandingPage />
              </Route>
              <Route exact path="/categories">
                <CategoryList title="Categories" />
              </Route>
              <Route
                exact
                path="/categories/:categoryId/brands"
                component={BrandList}
              />
              <Route exact path="/categories/new" component={CategoryForm} />
              <Route
                exact
                path="/categories/:categoryId/update"
                component={CategoryUpdateForm}
              />
              <Route
                exact
                path="/categories/:categoryId/brands/new"
                component={BrandCreateForm}
              />
              <Route
                exact
                path="/brands/:brandId"
                component={BrandUpdateForm}
              />
              <Route path="/stores/new">
                <StoreForm />
              </Route>
              <Route path="/stores/:storeId/update">
                <StoreUpdateForm />
              </Route>
              <Route path="/login">
                <LoginForm setUser={this.updateUser} />
              </Route>
              <Route path="/signup">
                <SignUpForm />
              </Route>
              <Route path="/profile">
                {JSON.parse(localStorage.getItem("user")) ? (
                  JSON.parse(localStorage.getItem("user")).is_admin ? (
                    <AdminProfile
                      user={this.state.user}
                      setUser={this.updateUser}
                      getCookie={this.getCookie}
                    />
                  ) : (
                    <Profile
                      user={this.state.user}
                      setUser={this.updateUser}
                      getCookie={this.getCookie}
                    />
                  )
                ) : (
                  <Profile
                    user={this.state.user}
                    setUser={this.updateUser}
                    getCookie={this.getCookie}
                  />
                )}
              </Route>
              <Route path="profile/edit">
                <div>
                  <h1>{this.state.errors}</h1>
                  <span>Username: </span>
                  <input
                    type="text"
                    name="username"
                    value={this.state.username}
                    onChange={this.change}
                  />
                  <span>Email: </span>
                  <input
                    type="email"
                    name="email"
                    value={this.state.email}
                    onChange={this.change}
                  />
                  <button onClick={this.update}>Update Profile</button>
                </div>
              </Route>
              <Route path="/cart">
                <CartList />
              </Route>
              <Route path="*">
                <NotFound />
              </Route>
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;

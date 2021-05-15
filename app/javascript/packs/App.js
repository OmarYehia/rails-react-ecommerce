import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import BrandList from "../components/Brand/BrandList/BrandList";
import CategoryList from "../components/Category/CategoryList/CategoryList";
import LoginForm from "../components/Auth/Login/LoginForm";
import SignUpForm from "../components/Auth/SignUp/SignUpForm";
import CategoryForm from "../components/Category/CategoryForm/CategoryForm";
import CategoryUpdateForm from "../components/Category/CategoryUpdateForm/CategoryUpdateForm";
import BrandCreateForm from "../components/Brand/BrandCreateForm/BrandCreateForm";

function App() {
  return (
    <Router>
      <div className="App">
        {/* <Navbar /> */}
        <div className="content container">
          <Switch>
            <Route exact path="/">
              {/* <Home /> */}
            </Route>
            <Route exact path="/categories" component={CategoryList} />
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
            <Route path="/login">
              <LoginForm />
            </Route>
            <Route path="/signup">
              <SignUpForm />
            </Route>
            {/* <Route path="*"><NotFound /></Route> */}
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;

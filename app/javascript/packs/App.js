import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import BrandList from "../components/Brand/BrandList/BrandList";
import CategoryList from "../components/Category/CategoryList/CategoryList";

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
            <Route exact path="/categories">
              <CategoryList />
            </Route>
            <Route path="/categories/:categoryId/brands">
              <BrandList />
            </Route>
            {/* <Route path="*"><NotFound /></Route> */}
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;

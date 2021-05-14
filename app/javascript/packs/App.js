import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import CategoryCard from "../components/Category/CategoryCard/CategoryCard";

function App() {
  return (
    <Router>
      <div className="App">
        {/* <Navbar /> */}
        <div className="content">
          <Switch>
            <Route exact path="/">
              {/* <Home /> */}
              <CategoryCard categoryId="5" />
            </Route>
            <Route path="/:category/brands">{/* Some view */}</Route>
            <Route path="*">{/* <NotFound /> */}</Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;

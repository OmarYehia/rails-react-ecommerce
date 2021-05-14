import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
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
            <Route path="/categories">
              <CategoryList />
            </Route>
            <Route path="/:category/brands">{/* Some view */}</Route>
            {/* <Route path="*"><NotFound /></Route> */}
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;

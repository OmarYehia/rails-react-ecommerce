import React from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import UpdateForm from "../UpdateForm/UpdateForm";
import "./SellerProfile.css";

const SellerProfile = ({ user, getCookie }) => {
  console.log(user);
  return (
    <Router>
      <div className="">
        {/* Navbar */}
        <div className="px-3 py-1 d-flex align-items-center justify-content-center">
          <div className="links">
            <Link to="/profile/edit" className="link-item">
              Edit Profile
            </Link>
            <Link to="/mystore/approve-orders" className="link-item">
              Approve Orders
            </Link>
            <Link to="/mystore/manage-store" className="link-item">
              Manage store
            </Link>
          </div>
        </div>
        {/* Body */}
        <div className="container content">
          <Switch>
            <Route path="/profile/edit">
              {user && <UpdateForm id={user.id} getCookie={getCookie} />}
            </Route>
            <Route path="mystore/approve-orders"></Route>
            <Route path="mystore/manage-store"></Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default SellerProfile;

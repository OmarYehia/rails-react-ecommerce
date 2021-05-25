import React from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import ManageOrders from "../SellerPanels/ManageOrders";
import ManageStore from "../SellerPanels/ManageStore";
import UpdateForm from "../UpdateForm/UpdateForm";
import "./SellerProfile.css";

const SellerProfile = ({ user, getCookie }) => {
  return (
    <Router>
      <div className="">
        {/* Navbar */}
        <div className="px-3 py-1 d-flex align-items-center justify-content-center">
          <div className="links">
            <Link to="/profile/edit" className="link-item">
              Edit Profile
            </Link>
            <Link to="/profile/approve-orders" className="link-item">
              Approve Orders
            </Link>
            <Link to="/profile/manage-store" className="link-item">
              Manage store
            </Link>
          </div>
        </div>
        {/* Body */}
        {user && (
          <div className="container content">
            <Switch>
              <Route path="/profile/edit">
                <UpdateForm id={user.id} getCookie={getCookie} />
              </Route>
              <Route path="/profile/approve-orders">
                <ManageOrders userId={user.id} />
              </Route>
              <Route path="/profile/manage-store">
                <ManageStore userId={user.id} />
              </Route>
            </Switch>
          </div>
        )}
      </div>
    </Router>
  );
};

export default SellerProfile;

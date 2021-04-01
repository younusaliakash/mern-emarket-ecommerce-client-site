import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AddProduct from "../AddProduct/AddProduct";
import AdminMenu from "../AdminMenu/AdminMenu";
import EditProduct from "../EditProduct/EditProduct";
import ManageProduct from "../ManageProduct/ManageProduct";
import "./Admin.css";

const Admin = () => {
  return (
    <div>
      <div className="admin-handle-action">
        <Router>
          <div className="row d-flex">
            <AdminMenu></AdminMenu>
            <Switch>
              <Route path="/admin">
                <AddProduct></AddProduct>
              </Route>
              <Route path="/addProduct">
                <AddProduct></AddProduct>
              </Route>
              <Route path="/manageProduct">
                <ManageProduct></ManageProduct>
              </Route>
              <Route path="/editProduct">
                <EditProduct></EditProduct>
              </Route>
            </Switch>
          </div>
        </Router>
      </div>
    </div>
  );
};

export default Admin;

import React from "react";
import { Link } from "react-router-dom";
import "./AdminMenu.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilAlt, faPlus, faTasks } from '@fortawesome/free-solid-svg-icons'

const AdminMenu = () => {
  return (
    <div>
      <div className="box">
        <div className="admin-menu">
          <Link className="nav-item item-title" to="/manageProduct">
          <FontAwesomeIcon icon={faTasks} /> Manage Product
          </Link>
          <Link className="nav-item item-title" to="/addProduct">
          <FontAwesomeIcon icon={faPlus} /> Add Product
          </Link>
          <Link className="nav-item item-title" to="/editProduct">
          <FontAwesomeIcon icon={faPencilAlt} /> Edit Product
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminMenu;

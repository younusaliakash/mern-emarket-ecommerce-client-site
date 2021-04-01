import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faTrashAlt
} from "@fortawesome/free-solid-svg-icons";
import "./ManageProduct.css";

const ManageProduct = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("https://lychee-custard-23954.herokuapp.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  const handleDelete = (id) =>{
    fetch(`https://lychee-custard-23954.herokuapp.com/deleteProduct/${id}`, {
      method : "DELETE",
      headers : {'Content-Type' : 'application/json'},
      body : JSON.stringify(products)
    })
    .then(() => {
      fetch("https://lychee-custard-23954.herokuapp.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
    })
  }
  return (
    <div className="action-section">
      <div className="admin-menu-page-title">
        <h5>Manage Product</h5>
      </div>
      <div className="manage-product-area">
        <Table>
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Weight/GSM</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {
              products.length === 0 && <div className="loading-products"> <img src="https://epaper.timesgroup.com/TOI/TimesOfIndia/Images/Spinner.gif" alt=""/></div>
            }
            {products?.map((product) => (
              <tr>
                <td>{product.productName}</td>
                <td>{product.productWeight}</td>
                <td>${product.productPrice}</td>
                <td>
                  <Button className="btn btn-success edit">
                    <FontAwesomeIcon className="edit-icon" icon={faEdit} />
                  </Button>
                  <Button className="btn btn-danger" onClick={() => handleDelete(product._id)}>
                    <FontAwesomeIcon
                      className="delete-icon"
                      icon={faTrashAlt}
                    />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default ManageProduct;

import React from "react";
import { Card } from "react-bootstrap";
import { Link} from "react-router-dom";
import "./Products.css";

const Products = (props) => {
  const { productName, _id, productPrice, productImage } = props.productInfo;
  return (
    <Card className="col-md-4 product-card">
      <div className="product-body">
        <Card.Img variant="top" className="product-img img-fluid" src={productImage} />
        <Card.Body>
          <Card.Title className="product-title">{productName}</Card.Title>
        </Card.Body>
        <div className="card-detalis">
            <div className="price-and-btn">
                <h2>${productPrice}</h2>
                <Link className="nav-item btn btn-success" to={`/checkout/${_id}`}>Buy Now</Link>
            </div>
        </div>
      </div>
    </Card>
  );
};

export default Products;

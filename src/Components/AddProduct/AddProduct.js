import axios from "axios";
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import "./AddProduct.css";

const AddProduct = () => {
    const [productImageURL, setProductImageURL] = useState("")

  const handleImageUpload = (event) => {
    const image = event.target.files[0];
    const imageData = new FormData();
    imageData.set("key", "ee8da4145175b56bb40d15443cc5cea4");
    imageData.append("image", image);

    axios
      .post("https://api.imgbb.com/1/upload", imageData)
      .then((res) => {
        setProductImageURL(res.data.data.display_url);
      })
      .catch((error) => {

      });
  };

  const [productDetails,setProductDetails] =useState({
    productName : "",
    productWeight : "",
    productPrice : "",
    productImage : ""
  })

  const handleOnChanage = (e) =>{
      const newProduct = {...productDetails}
      newProduct[e.target.name] = e.target.value;
      setProductDetails(newProduct)
  }

  const handleOnSubmit = (event) => {
      event.preventDefault()
      clearForm()
      const addProduct = {...productDetails}
      addProduct.productImage = productImageURL;

        fetch("https://lychee-custard-23954.herokuapp.com/addProduct", {
            method : "POST",
            headers : {'Content-Type' : 'application/json'},
            body : JSON.stringify(addProduct)
        })
        .then(res => {
        })
  }
  const clearForm = () =>{
      setProductDetails({
        productName : "",
        productWeight : "",
        productPrice : "",
        productImage : ""
      })
  }


  return (
    <div className="action-section">
      <div className="admin-menu-page-title">
        <h5>Add Product</h5>
      </div>
      <div className="form-area">
        <Form className="add-product-form" onSubmit={handleOnSubmit}>
          <Form.Row>
            <Form.Group className="col-6">
              <Form.Label>Product Name</Form.Label>
              <Form.Control name="productName" value={productDetails.productName} type="text" onChange={handleOnChanage} placeholder="Enter name" />
            </Form.Group>
            <Form.Group className="col-6">
              <Form.Label>Weight/(GSM for Cloths)</Form.Label>
              <Form.Control name="productWeight" value={productDetails.productWeight} type="text" onChange={handleOnChanage} placeholder="Enter weight" />
            </Form.Group>
            <Form.Group className="col-6">
              <Form.Label>Add Price</Form.Label>
              <Form.Control name="productPrice" value={productDetails.productPrice} type="text" onChange={handleOnChanage} placeholder="Enter price" />
            </Form.Group>
            <Form.Group className="col-6">
              <Form.Label>Add Photo</Form.Label>
              <Form.Control onChange={handleImageUpload} type="file" />
            </Form.Group>
          </Form.Row>
          <Button variant="success" type="submit">
            Save
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default AddProduct;

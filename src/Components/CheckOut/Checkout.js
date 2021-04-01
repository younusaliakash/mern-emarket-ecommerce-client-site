import React, { useContext, useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { useParams } from "react-router";
import { UserInfoContext } from "../../App";
import './Checkout.css'

const Checkout = () => {
    const {_id} = useParams()
    const [loggedInUser] = useContext(UserInfoContext);
    const [selectedProduct, setSelectedProduct] = useState({})
    
    useEffect(() => {
        fetch('https://lychee-custard-23954.herokuapp.com/getSelectedProduct?id='+_id)
        .then(response => response.json())
        .then(data => setSelectedProduct(data[0]))
    },[_id])

    const handleCkeckout = () => {
      const order = {...loggedInUser, ...selectedProduct}
      const orderDate = new Date();
      delete order._id;
      order.orderDate = orderDate;
      
      fetch('https://lychee-custard-23954.herokuapp.com/addOrder',{
        method : "POST",
        headers : {'Content-Type' : 'application/json'},
        body : JSON.stringify(order)
      })
      .then(res => res.json())
      .then(data => {
          alert('Order Place Successfully done!')
      })
      .catch(e => {

      })
    }

  return (
    <div>
      <h3>Checkout</h3>
      <div className="checkout-sammary">
        <Table class="table no-border">
          <thead>
            <tr>
              <th>Description</th>
              <th className="quantity-number">Quantity</th>
              <th className="price-col">Price</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{selectedProduct.productName}</td>
              <td className="quantity-number">1</td>
              <td className="price-col">${selectedProduct.productPrice}</td>
            </tr>
            <tr>
              <td colSpan="2">Total</td>
              <td className="price-col">${selectedProduct.productPrice}</td>
            </tr>        
          </tbody>
        </Table>
        <Button className="btn btn-success checkout-btn" onClick={handleCkeckout}>Checkout</Button>
      </div>
    </div>
  );
};

export default Checkout;

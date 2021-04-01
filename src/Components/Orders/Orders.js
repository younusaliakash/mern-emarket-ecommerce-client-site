import React, { useContext, useEffect, useState } from "react";
import { UserInfoContext } from "../../App";
import "./Orders.css";

const Orders = () => {
    const [loggedInUser] = useContext(UserInfoContext);
    const [orders, setOrders] = useState([])

    useEffect(() => {
        fetch(`https://lychee-custard-23954.herokuapp.com/getOrders?email=`+loggedInUser.email)
        .then(response => response.json())
        .then(data => {
            setOrders(data)
        })
    },[loggedInUser.email])
  return (
    <div>
      <div className="order-history-box">
        <div className="title-box">
          <h4>
            Welcome! <span className="user-name">{loggedInUser.displayName}</span>
          </h4>
          <h5>Your Order Timeline</h5>
          <h6>Total Orders: {orders.length}</h6>
        </div>
        <div className="order-product-description">
          <div className="row">
            <div className="col-4">
              <b>Product Name</b>
            </div>
            <div className="col-3">
              <b>Quantity</b>
            </div>
            <div className="col-2 text-center">
              <b>Order Date</b>
            </div>
            <div className="col-3 text-right">
              <b>Price</b>
            </div>
          </div>
        </div>
        {
            orders?.map( order => <div className="order-product-description">
            <div className="row">
              <div className="col-4">
                <b>{order.productName}</b>
                <p>Weight/GSM : {order.productWeight}</p>
              </div>
              <div className="col-3">
                <b>1</b>
              </div>
              <div className="col-2 text-center">
                <b>{(new Date(order.orderDate)).toDateString('dd/MM/yyy')}</b>
              </div>
              <div className="col-3 text-right">
                <b>${order.productPrice}</b>
              </div>
            </div>
          </div>)
        }
      </div>
    </div>
  );
};

export default Orders;

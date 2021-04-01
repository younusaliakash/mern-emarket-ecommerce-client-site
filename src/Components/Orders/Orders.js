import React, { useContext, useEffect, useState } from "react";
import { UserInfoContext } from "../../App";
import "./Orders.css";

const Orders = () => {
    const [loggedInUser] = useContext(UserInfoContext);
    const [orders, setOrders] = useState([])

    useEffect(() => {
        fetch(`http://localhost:5000/getOrders?email=`+loggedInUser.email)
        .then(response => response.json())
        .then(data => {
            console.log(data)
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
          <h6>Total Oders: {orders.length}</h6>
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
            orders.length === 0 && <div className="loading-orders"> <img src="https://epaper.timesgroup.com/TOI/TimesOfIndia/Images/Spinner.gif" alt=""/></div>
        }
        {
            orders?.map( order => <div className="order-product-description">
            <div className="row">
              <div className="col-4">
                <b>{order.productName}</b>
                <p>Wight : {order.productWight}</p>
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

import "bootstrap/dist/css/bootstrap.min.css";
import React, { createContext, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Checkout from "./Components/CheckOut/Checkout";
import Admin from "./Components/Admin/Admin";
import Deals from "./Components/Deals/Deals";
import Header from "./Components/Header/Header";
import Home from "./Components/Home/Home";
import Login from "./Components/Login/Login";
import NotFound from "./Components/NotFound/NotFound";
import Orders from "./Components/Orders/Orders";
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute";

export const UserInfoContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  return (
    <UserInfoContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <div className="App">
        <div className="container">
          <Router>
            <Header></Header>
            <Switch>
              <Route exact path="/">
                <Home></Home>
              </Route>
              <Route path="/home">
                <Home></Home>
              </Route>
              <PrivateRoute path="/orders">
                <Orders></Orders>
              </PrivateRoute>
              <PrivateRoute path="/admin">
                <Admin></Admin>
              </PrivateRoute>
              <Route path="/deals">
                <Deals></Deals>
              </Route>
              <Route path="/login">
                <Login></Login>
              </Route>
              <PrivateRoute path="/checkout/:_id">
                <Checkout></Checkout>
              </PrivateRoute>
              <Route path="*">
                <NotFound></NotFound>
              </Route>
            </Switch>
          </Router>
        </div>
      </div>
    </UserInfoContext.Provider>
  );
}

export default App;

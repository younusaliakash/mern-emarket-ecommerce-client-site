import React, { useContext } from "react";
import { Link} from "react-router-dom";
import { Nav, Navbar } from "react-bootstrap";
import './Header.css'
import { UserInfoContext } from "../../App";

const Header = () => {
  const [loggedInUser] = useContext(UserInfoContext);
  const {displayName} = loggedInUser;
  return (
    <div>
      <Navbar collapseOnSelect expand="lg" bg="transperant" variant="light">
      <Link className="page-head-title" to="/">E-MARKET</Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ml-auto">
            <Link className="nav-item" to="/home">Home</Link>
            <Link className="nav-item" to="/orders">Orders</Link>
            <Link className="nav-item" to="/admin">Admin</Link>
            <Link className="nav-item" to="/deals">Deals</Link>
            {displayName ? <Link className="nav-item">{displayName}</Link> : <Link className="nav-item btn btn-success" to="/login">Log In</Link>}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default Header;

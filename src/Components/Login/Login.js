import React, { useContext, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link, useHistory, useLocation } from "react-router-dom";
import {
  handleGoogleSingIn,
  initializeLoginFramework,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "../AuthManager/AuthManager";
import "./login.css";
import { UserInfoContext } from "../../App";
import { useForm } from "react-hook-form";

const Login = () => {
  const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({
    isSignedIn: false,
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    photo: "",
    successNote: "",
    errorNote: "",
    notMatchPassword: "",
  });

  const { register, handleSubmit, errors } = useForm();
  const [loggedInUser, setLoggedInUser] = useContext(UserInfoContext);
  const history = useHistory();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  initializeLoginFramework();

  //social log in functions start//
  const googleSIngIn = () => {
    handleGoogleSingIn().then((result) => {
      handleResponseData(result, true);
    });
  };

  //social log in functions end//

  const handleResponseData = (result, redirect) => {
    setUser(result);
    setLoggedInUser(!newUser ? result : {});
    if (redirect) {
      history.replace(from);
    }
  };

  //***create account & log in functions start***//
  const handleOnBlur = (e) => {
    let isFieldValid = true;
    if (e.target.name === "email") {
      isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
    }
    if (e.target.name === "password") {
      const isPasswordValid = e.target.value.length > 6;
      const passwordHasNumber = /\d{1}/.test(e.target.value);
      isFieldValid = isPasswordValid && passwordHasNumber;
    }
    if (isFieldValid) {
      const newUserInfo = { ...user };
      newUserInfo[e.target.name] = e.target.value;
      setUser(newUserInfo);
    }
  };

  //handle new account creation function//
  const handleSingUp = () => {
    if (user.password !== user.confirmPassword) {
      let newUserInfo = { ...user };
      newUserInfo.notMatchPassword = "Password not match";
      newUserInfo.isSignedIn = true;
      setUser(newUserInfo);
      return;
    }
    if (newUser && user.email && user.password) {
      createUserWithEmailAndPassword(user.name, user.email, user.password).then(
        (result) => {
          handleResponseData(result, false);
        }
      );
    }
  };

  //handle log in account function
  const handleSingIn = () => {
    if (!newUser && user.email && user.password) {
      signInWithEmailAndPassword(user.email, user.password).then((result) => {
        handleResponseData(result, true);
      });
    }
  };

  const handleOnSubmit = (e) => {
    if (!newUser) {
      handleSingIn();
    } else {
      handleSingUp();
    }
  };
  //**create account & log in functions end***//

  return (
    <div className="col log-in-card">
      <h2 className="title">{newUser ? "Create New Account" : "Log In"}</h2>
      {user.successStatus ? (
        <p className="text-success text-center">{user.successNote}</p>
      ) : (
        <p className="text-danger text-center">{user.error}</p>
      )}
      <Form
        className="logIn-form"
        onSubmit={handleSubmit(handleOnSubmit)}
        noValidate
      >
        <Form.Row>
          {newUser && (
            <Form.Group className="col-12" controlId="validationCustom03">
              <Form.Control
                type="text"
                name="name"
                placeholder="Enter your Name"
                onBlur={handleOnBlur}
                ref={register({ required: true, mminLength: 2 })}
              />
              {errors.name && (
                <span className="text-danger">
                  Name must be more than 2 Characters
                </span>
              )}
            </Form.Group>
          )}
          <Form.Group className="col-12" controlId="validationCustom03">
            <Form.Control
              type="text"
              name="email"
              placeholder="Enter your Email"
              onBlur={handleOnBlur}
              ref={register({ required: true, pattern: /\S+@\S+\.\S+/ })}
            />
            {errors.email && (
              <span className="text-danger">Provide a valid email</span>
            )}
          </Form.Group>
          <Form.Group className="col-12" controlId="validationCustom04">
            <Form.Control
              type="password"
              name="password"
              placeholder="Password"
              onBlur={handleOnBlur}
              ref={register({
                required: true,
                mminLength: 6,
                pattern: /\d{1}/,
              })}
            />
            {errors.password && (
              <span className="text-danger">
                Password must be 6 characters with a number.
              </span>
            )}
          </Form.Group>
          {newUser && (
            <Form.Group className="col-12" controlId="validationCustom04">
              <Form.Control
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                onBlur={handleOnBlur}
                required
              />
              <p className="text-danger">{user.notMatchPassword}</p>
            </Form.Group>
          )}
        </Form.Row>
        {!newUser && (
          <Form.Group>
            <Form.Check label="Remember Password" />
          </Form.Group>
        )}
        {newUser ? (
          <Button
            type="submit"
            className="log-in-btn btn-primary  btn-lg btn-block"
          >
            Create an account
          </Button>
        ) : (
          <Button
            type="submit"
            className="log-in-btn btn-primary  btn-lg btn-block"
          >
            Login
          </Button>
        )}
        {newUser ? (
          <p>
            Already have an account?{" "}
            <Link onClick={() => setNewUser(!newUser)}>Log In</Link>
          </p>
        ) : (
          <p>
            Don't have an account?{" "}
            <Link onClick={() => setNewUser(!newUser)}>Create new account</Link>
          </p>
        )}
        <div className="social-sign-up">
          <p className="or">
            <span>or</span>
          </p>
          <div className="social-icon-with-btn">
            <div className="social google-area">
              <span className="social-link" onClick={googleSIngIn}>
                <img
                  className="icon google"
                  src="https://i.pinimg.com/originals/81/8f/f7/818ff7a3edc40836182c585939fbe82a.png"
                  alt=""
                />{" "}
                <span>Join with google</span>{" "}
              </span>
            </div>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default Login;

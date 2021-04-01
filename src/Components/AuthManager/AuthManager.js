import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./firebase.config";

export const initializeLoginFramework = () => {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
};

export const handleGoogleSingIn = () => {
  const googleSingInProvider = new firebase.auth.GoogleAuthProvider();
  return firebase
    .auth()
    .signInWithPopup(googleSingInProvider)
    .then((result) => {
      let user = result.user;
      const { displayName, email, photoURL } = user;
      const loggedInUser = {
        isLoggedIn: true,
        displayName: displayName,
        email: email,
        photo: photoURL,
        successStatus: true,
      };
      return loggedInUser;
    })
    .catch((error) => {});
};

export const createUserWithEmailAndPassword = (
  displayName,
  email,
  password
) => {
  return firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((res) => {
      const newUserInfo = res.user;
      newUserInfo.error = "";
      newUserInfo.successStatus = true;
      newUserInfo.successNote = "Account Creation Successfull .Reload & Log In";
      updateUserName(displayName);
      return newUserInfo;
    })
    .catch((error) => {
      const newUserInfo = {};
      newUserInfo.error = error.message;
      newUserInfo.successStatus = false;
      newUserInfo.errorNote = "Somthing went to wrong";
      return newUserInfo;
    });
};

export const signInWithEmailAndPassword = (email, password) => {
  return firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((res) => {
      const newUserInfo = res.user;
      newUserInfo.error = "";
      newUserInfo.successStatus = true;
      newUserInfo.successNote = "Log In Successfull";
      return newUserInfo;
    })
    .catch(function (error) {
      const newUserInfo = {};
      newUserInfo.error = error.message;
      newUserInfo.successStatus = false;
      newUserInfo.errorNote = "Email & password not match in any account";
      return newUserInfo;
    });
};

const updateUserName = (name) => {
  const user = firebase.auth().currentUser;
  user
    .updateProfile({
      displayName: name,
    })
    .then(function () {
      
    })
    .catch(function (error) {
      
    });
};
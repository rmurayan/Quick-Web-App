import React, { useState } from "react";
import "./Authentication.css";
import Logo from "../../logo.png";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../DB/database";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook
import { MdError } from "react-icons/md";

function Register() {
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate(); // Use useNavigate hook
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = () => {
    if (email === "" || password === "" || confirmPassword === "") {
      setErrorMessage("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    // Perform registration here
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Registration successful
        let userInfo = userCredential.user;
        // Navigate to the main/ page upon successful login
        navigate("/main/", {
          state: {
            userInfo: {
              userToken: userInfo.accessToken,
              userEmail: userInfo.email,
              userUid: auth.currentUser.uid,
            },
          },
        });
      })
      .catch((error) => {
        // Handle registration errors
        const errorCode = error.code;
        const errorMessage = error.message;
        switch (errorCode) {
          case "auth/email-already-in-use":
            setErrorMessage(
              "The email address is already in use by another account."
            );
            break;
          case "auth/invalid-email":
            setErrorMessage("The email address is not valid.");
            break;
          case "auth/operation-not-allowed":
            setErrorMessage(
              "The operation is not allowed. Please contact support."
            );
            break;
          case "auth/weak-password":
            setErrorMessage(
              "The password is too weak. Please choose a stronger password."
            );
            break;
          case "auth/network-request-failed":
            setErrorMessage(
              "A network error occurred while trying to register. Please check your internet connection and try again."
            );
            break;
          default:
            alert(errorMessage);
        }
      });
  };

  return (
    <>
      <div className="container">
        <div className="logo-container ">
          <img src={Logo} alt="Logo" className="logo" />
          <p className="text">Sign Up for QuickPickList</p>
        </div>
        <div className="input-container">
          <label className="label">Email</label>
          <input
            className="input"
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label className="label">Password</label>
          <input
            className="input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label className="label">Confirm Password</label>
          <input
            className="input"
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {errorMessage && (
            <p className="error">
              <MdError />
              {errorMessage}
            </p>
          )}
          <button className="button" onClick={handleRegister}>
            Register
          </button>
        </div>
      </div>
    </>
  );
}

export default Register;

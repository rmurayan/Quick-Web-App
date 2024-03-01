import React, { useState } from "react";
import "./Authentication.css";
import Logo from "../../logo.png";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook
import { Link } from "react-router-dom";
import { auth } from "../../DB/database";
import { signInWithEmailAndPassword } from "firebase/auth";

function Login() {
  const navigate = useNavigate(); // Use useNavigate hook
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Implement login logic here
    if (email === "" || password === "") {
      // Add validation for empty fields
      alert("Email and password cannot be empty.");
      return;
    }
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        console.log("user", userCredential);
        let userInfo = userCredential.user;

        // Navigate to the main/home page upon successful login
        navigate("/main/", {
          state: {
            userInfo:{
            userToken: userInfo.accessToken,
            userEmail: userInfo.email,
            userUid:auth.currentUser.uid
            }
          },
        });
      })
      .catch((error) => {
        // Handle authentication errors
        const errorCode = error.code;
        const errorMessage = error.message;
        // alert(errorMessage);
      });
  };
  return (
    <div className="container">
      <div className="logo-container">
        <img src={Logo} alt="Logo" className="logo" />
        <p className="text">Sign In for QuickPickList</p>
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
        <button className="button" onClick={handleLogin}>
          Login
        </button>
        <Link to="/register" className="button-register">
          Not registered? Create an account
        </Link>
      </div>
    </div>
  );
}

export default Login;

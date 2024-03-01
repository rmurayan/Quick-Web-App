import React, { useState } from "react";
import "./Authentication.css";
import Logo from "../../logo.png";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../DB/database";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook

function Register() {
  const navigate = useNavigate(); // Use useNavigate hook
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = () => {
    if (email === "" || password === "" || confirmPassword === "") {
      alert("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    // Perform registration here
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Registration successful
        console.log("User registered:", userCredential.user);
        navigate("/main/home");
      })
      .catch((error) => {
        // Handle registration errors
        const errorMessage = error.message;
        alert(errorMessage);
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
          <button className="button" onClick={handleRegister}>
            Register
          </button>
        </div>
      </div>
    </>
  );
}

export default Register;

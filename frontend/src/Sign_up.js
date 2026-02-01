import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Sign_up() {
    let navigate=useNavigate()
  let [name, setName] = useState("");
  let [gender, setGender] = useState("");
  let [age, setAge] = useState("");
  let [cont, setCont] = useState("");
  let [email, setEmail] = useState("");

  let dict={
    name:name,
    gender:gender,
    age:age,
    contact:cont,
    email:email
  }

  function sub(){
      let pt=axios.post("http://localhost:8000/add_patient",dict)
      console.log("done", dict)
      navigate("/login")
  }

  return (
   <div
  style={{
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    backdropFilter: "blur(4px)", // Modern glass effect for the background
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
    fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
  }}
>
  {/* Modal box */}
  <div
    style={{
      width: "100%",
      maxWidth: "420px",
      backgroundColor: "#fff",
      padding: "35px",
      borderRadius: "16px",
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      boxSizing: "border-box",
    }}
  >
    <h3 
      style={{ 
        marginBottom: "25px", 
        textAlign: "center", 
        fontSize: "24px", 
        fontWeight: "700", 
        color: "#1a202c",
        letterSpacing: "-0.5px"
      }}
    >
      Patient Sign Up
    </h3>

    {[
      { label: "Patient Name", value: name, setter: setName, type: "text", placeholder: "John Doe" },
      { label: "Email", value: email, setter: setEmail, type: "email", placeholder: "john@example.com" },
    ].map((field, idx) => (
      <div key={idx} style={{ marginBottom: "15px" }}>
        <label style={{ display: "block", marginBottom: "6px", fontSize: "14px", fontWeight: "600", color: "#4a5568" }}>
          {field.label}
        </label>
        <input
          type={field.type}
          value={field.value}
          placeholder={field.placeholder}
          onChange={(e) => field.setter(e.target.value)}
          style={{
            width: "100%",
            height: "42px",
            border: "1px solid #e2e8f0",
            borderRadius: "8px",
            padding: "0 12px",
            fontSize: "14px",
            outline: "none",
            boxSizing: "border-box",
          }}
        />
      </div>
    ))}

    <div style={{ marginBottom: "15px" }}>
      <label style={{ display: "block", marginBottom: "6px", fontSize: "14px", fontWeight: "600", color: "#4a5568" }}>
        Gender
      </label>
      <select
        value={gender}
        onChange={(e) => setGender(e.target.value)}
        style={{
          width: "100%",
          height: "42px",
          border: "1px solid #e2e8f0",
          borderRadius: "8px",
          padding: "0 12px",
          fontSize: "14px",
          backgroundColor: "#fff",
          outline: "none",
          boxSizing: "border-box",
          cursor: "pointer",
        }}
      >
        <option value="">Select an Option</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="Other">Other</option>
      </select>
    </div>

    <div style={{ display: "flex", gap: "15px", marginBottom: "20px" }}>
      <div style={{ flex: 1 }}>
        <label style={{ display: "block", marginBottom: "6px", fontSize: "14px", fontWeight: "600", color: "#4a5568" }}>
          Age
        </label>
        <input
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          style={{
            width: "100%",
            height: "42px",
            border: "1px solid #e2e8f0",
            borderRadius: "8px",
            padding: "0 12px",
            fontSize: "14px",
            outline: "none",
            boxSizing: "border-box",
          }}
        />
      </div>
      <div style={{ flex: 2 }}>
        <label style={{ display: "block", marginBottom: "6px", fontSize: "14px", fontWeight: "600", color: "#4a5568" }}>
          Contact
        </label>
        <input
          type="text"
          value={cont}
          placeholder="Phone number"
          onChange={(e) => setCont(e.target.value)}
          style={{
            width: "100%",
            height: "42px",
            border: "1px solid #e2e8f0",
            borderRadius: "8px",
            padding: "0 12px",
            fontSize: "14px",
            outline: "none",
            boxSizing: "border-box",
          }}
        />
      </div>
    </div>

    <button
      onClick={sub}
      style={{
        width: "100%",
        height: "45px",
        backgroundColor: "#1466BB",
        color: "#fff",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",
        fontSize: "16px",
        fontWeight: "600",
        transition: "all 0.2s ease",
        boxShadow: "0 4px 6px rgba(20, 102, 187, 0.2)",
      }}
      onMouseOver={(e) => (e.target.style.backgroundColor = "#0f4c82")}
      onMouseOut={(e) => (e.target.style.backgroundColor = "#1466BB")}
    >
      Create Account
    </button>
    
    <button 
      onClick={() => navigate("/login")} 
      style={{ 
        width: "100%", 
        background: "none", 
        border: "none", 
        color: "#718096", 
        marginTop: "15px", 
        fontSize: "13px", 
        cursor: "pointer",
        textDecoration: "underline"
      }}
    >
      Cancel and return to login
    </button>
  </div>
</div>
  );
}

export default Sign_up;

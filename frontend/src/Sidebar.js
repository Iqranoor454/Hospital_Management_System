import React from "react";
import { Navigate, useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate=useNavigate()
  return (
  <div style={{ display: "flex", height: "100vh", position: "fixed", top: "0", bottom: "0", left: "0" }}>
  {/* Sidebar */}
  <div
    style={{
      width: "220px",
      backgroundColor: "#1466BB", 
      color: "white",
      paddingTop: "30px",
      boxShadow: "3px 0 20px rgba(0,0,0,0.15)",
      fontFamily: "Segoe UI, sans-serif",
      display: "flex",
      flexDirection: "column",
    }}
  >
    <h3 style={{ textAlign: "center", marginBottom: "30px", fontWeight: "700" }}>Admin Panel</h3>

    <div
      style={{
        padding: "14px 20px",
        textAlign: "center",
        cursor: "pointer",
        fontSize: "17px",
        fontWeight: "600",
        borderRadius: "10px",
        margin: "5px 10px",
        transition: "all 0.3s ease",
        background: "transparent",
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.background = "#0f4c82";
        e.currentTarget.style.boxShadow = "0 4px 10px rgba(0,0,0,0.2)";
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.background = "transparent";
        e.currentTarget.style.boxShadow = "none";
      }}
      onClick={() => navigate("/admin")}
    >
      Admin
    </div>

    <div
      style={{
        padding: "14px 20px",
        textAlign: "center",
        cursor: "pointer",
        fontSize: "17px",
        fontWeight: "600",
        borderRadius: "10px",
        margin: "5px 10px",
        transition: "all 0.3s ease",
        background: "transparent",
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.background = "#0f4c82";
        e.currentTarget.style.boxShadow = "0 4px 10px rgba(0,0,0,0.2)";
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.background = "transparent";
        e.currentTarget.style.boxShadow = "none";
      }}
      onClick={() => navigate("/doctor")}
    >
      Doctors
    </div>

    <div
      style={{
        padding: "14px 20px",
        textAlign: "center",
        cursor: "pointer",
        fontSize: "17px",
        fontWeight: "600",
        borderRadius: "10px",
        margin: "5px 10px",
        transition: "all 0.3s ease",
        background: "transparent",
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.background = "#0f4c82";
        e.currentTarget.style.boxShadow = "0 4px 10px rgba(0,0,0,0.2)";
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.background = "transparent";
        e.currentTarget.style.boxShadow = "none";
      }}
      onClick={() => navigate("/department")}
    >
      Departments
    </div>

    <div
      style={{
        padding: "14px 20px",
        textAlign: "center",
        cursor: "pointer",
        fontSize: "17px",
        fontWeight: "600",
        borderRadius: "10px",
        margin: "5px 10px",
        transition: "all 0.3s ease",
        background: "transparent",
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.background = "#0f4c82";
        e.currentTarget.style.boxShadow = "0 4px 10px rgba(0,0,0,0.2)";
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.background = "transparent";
        e.currentTarget.style.boxShadow = "none";
      }}
      onClick={() => navigate("/patients")}
    >
      Patients
    </div>

    <div
      style={{
        padding: "14px 20px",
        textAlign: "center",
        cursor: "pointer",
        fontSize: "17px",
        fontWeight: "600",
        borderRadius: "10px",
        margin: "5px 10px",
        transition: "all 0.3s ease",
        background: "transparent",
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.background = "#0f4c82";
        e.currentTarget.style.boxShadow = "0 4px 10px rgba(0,0,0,0.2)";
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.background = "transparent";
        e.currentTarget.style.boxShadow = "none";
      }}
      onClick={() => navigate("/appointment")}
    >
      Appointments
    </div>

    <div
      style={{
        padding: "14px 20px",
        textAlign: "center",
        cursor: "pointer",
        fontSize: "17px",
        fontWeight: "600",
        borderRadius: "10px",
        margin: "5px 10px",
        transition: "all 0.3s ease",
        background: "transparent",
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.background = "#0f4c82";
        e.currentTarget.style.boxShadow = "0 4px 10px rgba(0,0,0,0.2)";
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.background = "transparent";
        e.currentTarget.style.boxShadow = "none";
      }}
      onClick={() => navigate("/inv")}
    >
      Inventory
    </div>

    <div
      style={{
        padding: "14px 20px",
        textAlign: "center",
        cursor: "pointer",
        fontSize: "17px",
        fontWeight: "600",
        borderRadius: "10px",
        margin: "5px 10px",
        transition: "all 0.3s ease",
        background: "transparent",
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.background = "#0f4c82";
        e.currentTarget.style.boxShadow = "0 4px 10px rgba(0,0,0,0.2)";
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.background = "transparent";
        e.currentTarget.style.boxShadow = "none";
      }}
      onClick={() => navigate("/")}
    >
      Logout
    </div>

  </div>
</div>

  );
}

export default Sidebar;

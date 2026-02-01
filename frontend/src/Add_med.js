import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function Add_med() {
  let navigate = useNavigate();
  let [name, setName] = useState("");
  let [stk, setStk] = useState(0);
  let [unit, setUnit] = useState("");
  let [exp, setExp] = useState("");

  const location = useLocation()
  const value = location.state

  const edit = value && value._id
  function handleClick(){
     if(edit){
    update(value._id)
  }
  else{submit()}
  }

  useEffect(() => {
    if(value){
      setName(value.name)
      setStk(value.stock)
      setUnit(value.unit)
      setExp(value.expiry)
    }
  }, [value]);

  let med_dict = {
    name: name,
    stock: stk,
    unit: unit,
    expiry: exp,
  };

  function submit() {
    let res = axios.post("http://localhost:8000/add_med", med_dict);
    console.log("Medicine Added ");
    alert("Medicine added");
  }
  async function update(id) {
    let res = await axios.put(`http://localhost:8000/med/${id}`, med_dict);
    alert("updated")
    navigate("/inv")
  }

  return (
    <div>
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "rgba(1, 1, 1, 0.65)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: "1000",
        }}
      >
        <div
          style={{
            background: "linear-gradient(145deg, #f8fafc, #e2e8f0)",
            borderRadius: "18px",
            width: "50%",
            maxWidth: "820px",
            maxHeight: "80%",
            overflowY: "auto",
            boxShadow: "0 15px 35px rgba(0, 0, 0, 0.25)",
            padding: "30px 35px",
            position: "relative",
            animation: "slideIn 0.4s ease",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <h3
                style={{
                  textAlign: "center",
                  marginBottom: "25px",
                  color: "#333",
                  letterSpacing: "1px",
                }}
              >
                Medicine Information Form
              </h3>
            </div>
            <div>
              <button onClick={() => navigate("/inv")}>X</button>
            </div>
          </div>

          <label>Name</label>
          <input
            value={name}
            type="text"
            style={{
              width: "100%",
              height: "36px",
              marginBottom: "10px",
              border: "1px solid #ccc",
              borderRadius: "6px",
              backgroundColor: "#fff",
              color: "#333",
              padding: "0 10px",
              outline: "none",
            }}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />

          <label>Stock</label>
          <input
            value={stk}
            type="number"
            style={{
              width: "100%",
              height: "36px",
              marginBottom: "10px",
              border: "1px solid #ccc",
              borderRadius: "6px",
              backgroundColor: "#fff",
              color: "#333",
              padding: "0 10px",
              outline: "none",
            }}
            onChange={(e) => {
              setStk(e.target.value);
            }}
          />

          <label>Unit</label>
          <input
            value={unit}
            type="text"
            style={{
              width: "100%",
              height: "36px",
              marginBottom: "10px",
              border: "1px solid #ccc",
              borderRadius: "6px",
              backgroundColor: "#fff",
              color: "#333",
              padding: "0 10px",
              outline: "none",
            }}
            onChange={(e) => {
              setUnit(e.target.value);
            }}
          />

          <label>Expiry</label>
          <input
            value={exp}
            type="date"
            style={{
              width: "100%",
              height: "36px",
              marginBottom: "10px",
              border: "1px solid #ccc",
              borderRadius: "6px",
              backgroundColor: "#fff",
              color: "#333",
              padding: "0 10px",
              outline: "none",
            }}
            onChange={(e) => {
              setExp(e.target.value);
            }}
          />

          <button
            style={{
              width: "100%",
              padding: "10px",
              backgroundColor: "#1e1e1e",
              border: "none",
              color: "#ffff",
              fontWeight: "600",
              borderRadius: "6px",
              cursor: "pointer",
              transition: "all 0.3s ease",
              boxShadow: "0 3px 8px rgba(0,0,0,0.4)",
              letterSpacing: "0.5px",
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = "#333";
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = "#1e1e1e";
            }}
            onClick={handleClick}
          >
            {edit ? "Update" : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Add_med;

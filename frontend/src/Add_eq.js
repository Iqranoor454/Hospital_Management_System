import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function Add_eq() {
  let navigate = useNavigate();
  let location = useLocation();
  let value = location.state;

  let [item, setItem] = useState("");
  let [cnt, setCnt] = useState(0);
  let [status, setStatus] = useState("");

  useEffect(() => {
    if (value) {
      setItem(value.item);
      setCnt(value.count);
      setStatus(value.status);
    }
  }, [value]);

  let eq_dict = {
    item: item,
    count: cnt,
    status: status,
  };

  let edit = value && value._id;
  function handleClick() {
    if (edit) {
      update(value._id);
    } else {
      submit();
    }
  }

  function submit() {
    let res = axios.post("http://localhost:8000/add_equ", eq_dict);
    console.log("equipment Added ");
    console.log(eq_dict);
    alert("Equipment added");
  }

  async function update(id) {
    let res = await axios.put(`http://localhost:8000/eq/${id}`, eq_dict);
    alert("Updated");
    navigate("/inv");
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
                Equipment Information Form
              </h3>
            </div>
            <div>
              <button onClick={() => navigate("/inv")}>X</button>
            </div>
          </div>

          <label>Item Name</label>
          <input
            value={item}
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
              setItem(e.target.value);
            }}
          />

          <label>Count</label>
          <input
            value={cnt}
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
              setCnt(e.target.value);
            }}
          />

          <label>Status</label>
          <input
            value={status}
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
              setStatus(e.target.value);
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
            onClick={() => handleClick()}
          >
            {edit ? "Update" : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Add_eq;

import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function Add_department(data) {
  const location = useLocation();

  const navigate = useNavigate();
  let [depID, setDepID] = useState("");
  let [name, setName] = useState("");
  let [floor, setFloor] = useState("");
  let [docID, setDocID] = useState("");
  let [abt, setAbt] = useState("");

  const value = location.state;
  console.log(value);

  useEffect(() => {
    if (value) {
      if (value.dept_id) setDepID(value.dept_id);
      if (value.name) setName(value.name);
      if (value.floor) setFloor(value.floor);
      if (value.head_doctor_id) setDocID(value.head_doctor_id);
      if (value.about) setAbt(value.about);

      console.log("States set:", {
        depID: value.dept_id,
        name: value.name,
        floor: value.floor,
        docID: value.head_doctor_id,
        about: value.abt,
      });
    }
  }, [value]);
  const isEditMode = value && value._id;

  const handleClick = () => {
    if (isEditMode) {
      up(value._id);
    } else {
      submit();
    }
  };

  let dep_dict = {
    dept_id: depID,
    name: name,
    floor: floor,
    head_doctor_id: docID,
    about: abt,
  };

  function submit() {
    let res = axios.post("http://localhost:8000/add_department", dep_dict);
    console.log("department Added ");
    alert("department added");
  }

  async function up(id) {
    console.log(id);
    let res = await axios.put(`http://localhost:8000/dep/${id}`, dep_dict);
    alert("updated");
    navigate("/department");
    console.log(res.data);
  }

  return (
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
              Department Information Form
            </h3>
          </div>
          <div>
            <button onClick={() => navigate("/department")}>X</button>
          </div>
        </div>

        <label>Name</label>
        <input
          type="text"
          value={name}
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

        <label>Department ID</label>
        <input
          type="text"
          value={depID}
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
            setDepID(e.target.value);
          }}
        />

        <label>Floor</label>
        <input
          type="number"
          value={floor}
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
            setFloor(e.target.value);
          }}
        />

        <label>Head Doctor ID</label>
        <input
          type="text"
          value={docID}
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
            setDocID(e.target.value);
          }}
        />

        <label>About</label>
        <input
          type="text"
          value={abt}
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
            setAbt(e.target.value);
          }}
        />
        <button
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "#1e1e1e",
            border: "none",
            color: "#fff",
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
          {isEditMode ? "Update" : "Submit"}
        </button>
      </div>
    </div>
  );
}

export default Add_department;

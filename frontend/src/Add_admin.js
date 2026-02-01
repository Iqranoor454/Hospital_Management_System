import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

function Add_admin() {
  let navigate = useNavigate();
  let location = useLocation();
  let value = location.state;

  let [adID, setAdId] = useState("");
  let [name, setName] = useState("");
  let [email, setEmail] = useState("");
  let [role, setRole] = useState("");
  let [phone, setPhone] = useState("");
  let [perm, setPerm] = useState("");
  let [pLst, setPLst] = useState([]);
  let [login, setLogin] = useState("");

  useEffect(() => {
    if (value) {
      setAdId(value.admin_id);
      setName(value.name);
      setEmail(value.email);
      setRole(value.role);
      setPhone(value.phone);
      setPLst(value.permissions || []);
      setLogin(value.last_login);
    }
  }, [value]);

  const addPermission = () => {
    if (perm.trim() !== "") {
      setPLst([...pLst, perm]);
      setPerm(""); // Clear input after adding
    }
  };

  const removePermission = (index) => {
    setPLst(pLst.filter((_, i) => i !== index));
  };

  let dict = {
    admin_id: adID,
    name: name,
    email: email,
    role: role,
    phone: phone,
    permissions: pLst,
    last_login: login,
  };

  let edit = value && value._id;

  async function handleClick() {
    if (edit) {
      await update(value._id);
    } else {
      submit();
    }
  }

  function submit() {
    axios.post("http://localhost:8000/add_admin", dict)
      .then(() => {
        alert("Admin added");
        navigate("/admin");
      })
      .catch(err => console.error(err));
  }

  async function update(id) {
    await axios.put(`http://localhost:8000/admin/${id}`, dict);
    alert("Admin Updated");
    navigate("/admin");
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="form-header">
          <h3 className="form-title">
            {edit ? "Edit Admin Account" : "Admin Information Form"}
          </h3>
          <button className="close-btn" onClick={() => navigate("/admin")}>X</button>
        </div>

        <div className="form-group">
          <label>Admin Name</label>
          <input
            className="form-input"
            value={name}
            type="text"
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Admin ID</label>
          <input
            className="form-input"
            value={adID}
            type="text"
            onChange={(e) => setAdId(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Email Address</label>
          <input
            className="form-input"
            value={email}
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Primary Role</label>
          <input
            className="form-input"
            value={role}
            type="text"
            placeholder="e.g. Super Admin, Editor"
            onChange={(e) => setRole(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Phone Number</label>
          <input
            className="form-input"
            value={phone}
            type="text"
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Specific Permissions</label>
          <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
            <input
              className="form-input"
              value={perm}
              type="text"
              placeholder="e.g. read_only"
              style={{ marginBottom: 0 }}
              onChange={(e) => setPerm(e.target.value)}
            />
            <button 
              type="button" 
              className="close-btn" 
              style={{ height: "42px" }} 
              onClick={addPermission}
            >
              ADD
            </button>
          </div>
          
          {/* Permission Tags Display */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "15px" }}>
            {pLst.map((p, index) => (
              <span 
                key={index} 
                style={{ 
                  background: "#1466BB", 
                  color: "white", 
                  padding: "4px 12px", 
                  borderRadius: "20px", 
                  fontSize: "12px",
                  display: "flex",
                  alignItems: "center",
                  gap: "5px"
                }}
              >
                {p}
                <b style={{ cursor: "pointer" }} onClick={() => removePermission(index)}>×</b>
              </span>
            ))}
          </div>
        </div>

        <div className="form-group">
          <label>Last Login (Simulated)</label>
          <input
            className="form-input"
            value={login}
            type="datetime-local"
            onChange={(e) => setLogin(e.target.value)}
          />
        </div>

        <button className="btn-primary btn-submit" onClick={handleClick}>
          {edit ? "Update Admin Account" : "Create Admin Account"}
        </button>
      </div>
    </div>
  );
}

export default Add_admin;
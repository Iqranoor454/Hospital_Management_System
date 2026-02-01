import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { useNavigate } from "react-router-dom";
function Admin() {
  let [data, setData] = useState([]);
  let navigate = useNavigate();

  useEffect(() => {
    ad();
  }, []);
  async function ad() {
    let res = await axios.get("http://localhost:8000/admins");
    setData(res.data.admins);
  }
  async function del(id) {
    let res = await axios.delete(`http://localhost:8000/admin/${id}`);
    console.log(res.data);
    if (res.data["response"]["deletedCount"] === 1) {
      ad();
    } else {
      alert("Id not Found!");
    }
  }

  return (
   <>
  <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "#f7f8fc" }}>
    <Sidebar />

    <div
      style={{
        flex: 1,
        marginLeft: "220px",
        padding: "30px 40px",
        minHeight: "100vh",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "30px",
        }}
      >
        <h2
          style={{
            color: "#0d2e4d",
            fontWeight: 600,
            fontSize: "28px",
          }}
        >
          ADMIN
        </h2>
        <button
          onClick={() => navigate("/add_admin")}
          style={{
            backgroundColor: "#1466BB",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            padding: "10px 20px",
            fontWeight: 600,
            cursor: "pointer",
            boxShadow: "0 3px 8px rgba(0,0,0,0.15)",
            transition: "all 0.3s ease",
          }}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#0f4c82")}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#1466BB")}
        >
          Add Admin
        </button>
      </div>

      {/* Table */}
      <div
        style={{
          overflowX: "auto",
          borderRadius: "12px",
          boxShadow: "0 4px 15px rgba(0,0,0,0.05)",
          backgroundColor: "#fff",
        }}
      >
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ backgroundColor: "#1466BB", color: "#fff", textAlign: "center" }}>
              <th style={thStyle}>Name</th>
              <th style={thStyle}>Admin ID</th>
              <th style={thStyle}>Permissions</th>
              <th style={thStyle}>Last Login</th>
              <th style={thStyle}>Action</th>
            </tr>
          </thead>

          <tbody>
            {data.map((d, index) => (
              <tr key={index} style={{ borderBottom: "1px solid #eee", textAlign: "center" }}>
                <td style={tdStyle}>{d.name}</td>
                <td style={tdStyle}>{d.admin_id}</td>
                <td style={tdStyle}>
                  <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                    {d.permissions.map((p, i) => (
                      <li key={i} style={{ marginBottom: "4px" }}>
                        {p}
                      </li>
                    ))}
                  </ul>
                </td>
                <td style={tdStyle}>{d.last_login}</td>
                <td style={tdStyle}>
                  <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
                    <i
                      className="fa-solid fa-trash"
                      onClick={() => del(d._id)}
                      style={{ cursor: "pointer", color: "#e74c3c", fontSize: "16px" }}
                    ></i>
                    <i
                      className="fa-regular fa-pen-to-square"
                      onClick={() => navigate("/add_admin", { state: d })}
                      style={{ cursor: "pointer", color: "#1466BB", fontSize: "16px" }}
                    ></i>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
</>


);
}

const thStyle = {
  border: "1px solid #ddd",
  padding: "12px 16px",
  fontSize: "14px",
  fontWeight: 600,
};

const tdStyle = {
  border: "1px solid #ddd",
  padding: "12px 16px",
  fontSize: "13px",
};
export default Admin;

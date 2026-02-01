import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
function Inv() {
  let navigate = useNavigate();
  let [data, setData] = useState([]);
  let [med, setMed] = useState([]);
  let locData;
  let data_med;
  useEffect(() => {
    a();
  }, []);

  async function a() {
    let res = await axios.get("http://localhost:8000/inv");
    locData = res.data.inventory.medicines;
    data_med = res.data.inventory.equipment;
    console.log(data_med);
    console.log(locData);
    setData(locData);
    setMed(data_med);
  }

  async function del(id) {
    let res_m = await axios.delete(`http://localhost:8000/med/${id}`);
    console.log(res_m.data);
    if (res_m.data["response"]["deletedCount"] === 1) {
      a();
    } else {
      alert("Id not Found!");
    }
  }
  async function del_eq(id) {
    let res_m = await axios.delete(`http://localhost:8000/eq/${id}`);
    console.log(res_m.data);
    if (res_m.data["response"]["deletedCount"] === 1) {
      a();
    } else {
      alert("Id not Found!");
    }
  }

  return (
    <>
      <div
        style={{
          display: "flex",
          minHeight: "100vh",
          backgroundColor: "#f4f6f8",
        }}
      >
        <Sidebar />

        <div
          style={{
            flex: 1,
            marginLeft: "220px",
            padding: "30px",
            minHeight: "100vh",
          }}
        >
          {/* Header */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "25px",
            }}
          >
            <h2
              style={{
                color: "#1f2a38",
                fontSize: "28px",
                fontWeight: 600,
              }}
            >
              Inventory
            </h2>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >
              <button style={buttonStyle} onClick={() => navigate("/add_med")}>
                Add Medicine
              </button>
              <button style={buttonStyle} onClick={() => navigate("/add_eq")}>
                Add Equipment
              </button>
            </div>
          </div>

          {/* Medicine Table */}
          <h3 style={{ marginBottom: "10px", color: "#1f2a38" }}>Medicine</h3>
          <div style={tableContainer}>
            <table style={tableStyle}>
              <thead>
                <tr style={theadStyle}>
                  <th style={thStyle}>Name</th>
                  <th style={thStyle}>Stock</th>
                  <th style={thStyle}>Unit</th>
                  <th style={thStyle}>Expiry</th>
                  <th style={thStyle}>Action</th>
                </tr>
              </thead>
              <tbody>
                {data.map((d) => (
                  <tr key={d._id} style={trStyle}>
                    <td style={tdStyle}>{d.name}</td>
                    <td style={tdStyle}>{d.stock}</td>
                    <td style={tdStyle}>{d.unit}</td>
                    <td style={tdStyle}>{d.expiry}</td>
                    <td style={tdStyle}>
                      <div style={actionStyle}>
                        <i
                          className="fa-solid fa-trash"
                          onClick={() => del(d._id)}
                          style={iconStyle}
                        ></i>
                        <i
                          className="fa-regular fa-pen-to-square"
                          onClick={() => navigate("/add_med", { state: d })}
                          style={iconStyle}
                        ></i>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Equipment Table */}
          <h3 style={{ marginBottom: "10px", color: "#1f2a38" }}>Equipment</h3>
          <div style={tableContainer}>
            <table style={tableStyle}>
              <thead>
                <tr style={theadStyle}>
                  <th style={thStyle}>Item</th>
                  <th style={thStyle}>Count</th>
                  <th style={thStyle}>Status</th>
                  <th style={thStyle}>Action</th>
                </tr>
              </thead>
              <tbody>
                {med.map((d) => (
                  <tr key={d._id} style={trStyle}>
                    <td style={tdStyle}>{d.item}</td>
                    <td style={tdStyle}>{d.count}</td>
                    <td style={tdStyle}>{d.status}</td>
                    <td style={tdStyle}>
                      <div style={actionStyle}>
                        <i
                          className="fa-solid fa-trash"
                          onClick={() => del_eq(d._id)}
                          style={iconStyle}
                        ></i>
                        <i
                          className="fa-regular fa-pen-to-square"
                          onClick={() => navigate("/add_eq", { state: d })}
                          style={iconStyle}
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

{
  /* Styles */
}
const buttonStyle = {
  backgroundColor: "#1466BB",
  color: "#fff",
  border: "none",
  borderRadius: "8px",
  padding: "8px 16px",
  cursor: "pointer",
  fontWeight: 600,
  fontSize: "14px",
  boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
  transition: "all 0.3s ease",
};

const tableContainer = {
  overflowX: "auto",
  borderRadius: "10px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
  marginBottom: "30px",
  backgroundColor: "#fff",
};

const tableStyle = { width: "100%", borderCollapse: "collapse" };

const theadStyle = {
  backgroundColor: "#1466BB",
  color: "#fff",
  textAlign: "center",
};

const thStyle = {
  padding: "12px 16px",
  fontWeight: 600,
  fontSize: "14px",
  borderBottom: "2px solid #ddd",
};

const trStyle = {
  backgroundColor: "#f9f9f9",
  transition: "background 0.3s",
  cursor: "default",
};

const tdStyle = {
  padding: "10px 12px",
  borderBottom: "1px solid #eee",
  textAlign: "center",
  fontSize: "13px",
};

const actionStyle = { display: "flex", gap: "8px", justifyContent: "center" };

const iconStyle = { cursor: "pointer", fontSize: "16px", color: "#1466BB" };
export default Inv;

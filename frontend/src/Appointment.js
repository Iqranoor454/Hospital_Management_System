import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import { useNavigate } from "react-router-dom";

function Appointment() {
  let navigate = useNavigate();
  let [data, setData] = useState([]);
  let locData;

  async function a() {
    let res = await axios.get("http://localhost:8000/appointments");
    locData = res.data.appointments;
    setData(locData);
    console.log(locData);
  }
  useEffect(() => {
    a();
  }, []);

  async function del(id) {
    let res = await axios.delete(`http://localhost:8000/appointment/${id}`);
    if (res.data["response"]["deletedCount"] == 1) {
      a();
    } else {
      console.log("id not found");
    }
  }

  return (
    <>
      <div
        style={{
          display: "flex",
          minHeight: "100vh",
          backgroundColor: "#f7f8fc",
        }}
      >
        <Sidebar />

        <div style={{ flex: 1, marginLeft: "220px", padding: "30px 40px" }}>
          {/* Header */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "30px",
            }}
          >
            <h2 style={{ color: "#0d2e4d", fontWeight: 600, fontSize: "28px" }}>
              APPOINTMENT
            </h2>
            <button
              onClick={() => navigate("/add_appointment")}
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
              onMouseOver={(e) =>
                (e.currentTarget.style.backgroundColor = "#0f4c82")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.backgroundColor = "#1466BB")
              }
            >
              Add Appointment
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
                <tr
                  style={{
                    backgroundColor: "#1466BB",
                    color: "#fff",
                    textAlign: "center",
                  }}
                >
                  <th style={thStyle}>Appointment ID</th>
                  <th style={thStyle}>Patient ID</th>
                  <th style={thStyle}>Doctor ID</th>
                  <th style={thStyle}>Department ID</th>
                  <th style={thStyle}>Date</th>
                  <th style={thStyle}>Time</th>
                  <th style={thStyle}>Status</th>
                  <th style={thStyle}>Notes</th>
                  <th style={thStyle}>Action</th>
                </tr>
              </thead>
              <tbody>
                {data.map((a, index) => (
                  <tr
                    key={index}
                    style={{
                      borderBottom: "1px solid #eee",
                      textAlign: "center",
                    }}
                  >
                    <td style={tdStyle}>{a.appointment_id}</td>
                    <td style={tdStyle}>{a.patient_id}</td>
                    <td style={tdStyle}>{a.doctor_id}</td>
                    <td style={tdStyle}>{a.department_id}</td>
                    <td style={tdStyle}>{a.date}</td>
                    <td style={tdStyle}>{a.time}</td>
                    <td style={tdStyle}>{a.status}</td>
                    <td style={tdStyle}>{a.notes}</td>
                    <td style={tdStyle}>
                      <div
                        style={{
                          display: "flex",
                          gap: "10px",
                          justifyContent: "center",
                        }}
                      >
                        <i
                          onClick={() => del(a._id)}
                          className="fa-solid fa-trash"
                          style={{
                            cursor: "pointer",
                            color: "#e74c3c",
                            fontSize: "16px",
                          }}
                        ></i>
                        <i
                          onClick={() =>
                            navigate("/add_appointment", { state: a })
                          }
                          className="fa-regular fa-pen-to-square"
                          style={{
                            cursor: "pointer",
                            color: "#1466BB",
                            fontSize: "16px",
                          }}
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
const thStyle = { padding: "12px 16px", fontWeight: 600 };
const tdStyle = { padding: "12px 16px", color: "#333", verticalAlign: "top" };
export default Appointment;

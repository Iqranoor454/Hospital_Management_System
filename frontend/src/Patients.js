import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Patients() {
  let navigate = useNavigate();
  let [data, setData] = useState([]);
  let [app, setApp] = useState([]);

  useEffect(() => {
    fetchPatients();
  }, []);

  async function fetchPatients() {
    try {
      const res = await axios.get("http://localhost:8000/patients");
      setData(res.data.patients);

      const resp = await axios.get("http://localhost:8000/appointments");
      setApp(resp.data.appointments);
    } catch (err) {
      console.log(err);
    }
  }

  async function del(id) {
    let res = await axios.delete(`http://localhost:8000/patient/${id}`);
    if (res.data["response"]["deletedCount"] === 1) {
      fetchPatients();
    } else {
      console.log("Id not found");
    }
  }

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        backgroundColor: "#f7f8fc",
      }}
    >
      <Sidebar />
      <div style={{ flex: 1, padding: "30px 40px", marginLeft: "220px" }}>
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
            PATIENTS
          </h2>
          <button
            onClick={() => navigate("/add_patients")}
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
            Add Patient
          </button>
        </div>

        {/* Table */}
        <div
          style={{
            overflowX: "auto",
            borderRadius: "12px",
            boxShadow: "0 4px 15px rgba(0,0,0,0.05)",
          }}
        >
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              backgroundColor: "#fff",
            }}
          >
            <thead>
              <tr
                style={{
                  backgroundColor: "#1466BB",
                  color: "#fff",
                  textAlign: "left",
                }}
              >
                <th style={thStyle}>Patient ID</th>
                <th style={thStyle}>Name</th>
                <th style={thStyle}>Gender</th>
                <th style={thStyle}>Appointment</th>
                <th style={thStyle}>Medical History</th>
                <th style={thStyle}>Medications</th>
                <th style={thStyle}>Emergency Contact</th>
                <th style={thStyle}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((p) => (
                <tr key={p._id} style={{ borderBottom: "1px solid #eee" }}>
                  <td style={tdStyle}>{p.patient_id}</td>
                  <td style={tdStyle}>{p.name}</td>
                  <td style={tdStyle}>{p.gender}</td>
                  <td style={tdStyle}>
                    <ul
                      style={{ listStyleType: "none", padding: 0, margin: 0 }}
                    >
                      {p.appointments &&
                        p.appointments.map((a, i) => {
                           let found =app.find(x => x._id === a)
                           if(!found) return null 
                           return <li key={i}>{found.appointment_id}</li>
                           
                           
})}
                    </ul>
                  </td>
                  <td style={tdStyle}>
                    <ul
                      style={{ listStyleType: "none", padding: 0, margin: 0 }}
                    >
                      {p.medical_history &&
                        p.medical_history.map((h, i) => <li key={i}>{h}</li>)}
                    </ul>
                  </td>
                  <td style={tdStyle}>
                    <ul
                      style={{ listStyleType: "none", padding: 0, margin: 0 }}
                    >
                      {p.current_medications &&
                        p.current_medications.map((m, i) => (
                          <li key={i}>{m}</li>
                        ))}
                    </ul>
                  </td>
                  <td style={tdStyle}>
                    <div>
                      {p.emergency_contact && (
                        <>
                          {p.emergency_contact.name} <br />
                          {p.emergency_contact.relation} <br />
                          {p.emergency_contact.phone}
                        </>
                      )}
                    </div>
                  </td>
                  <td style={{ ...tdStyle, textAlign: "center" }}>
                    <div
                      style={{
                        display: "flex",
                        gap: "10px",
                        justifyContent: "center",
                      }}
                    >
                      <i
                        onClick={() => del(p._id)}
                        className="fa-solid fa-trash"
                        style={{
                          cursor: "pointer",
                          color: "#e74c3c",
                          fontSize: "16px",
                        }}
                      ></i>
                      <i
                        onClick={() => navigate("/add_patients", { state: p })}
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
  );
}

// Common table styles
const thStyle = { padding: "12px 16px", fontWeight: 600 };
const tdStyle = { padding: "12px 16px", color: "#333", verticalAlign: "top" };

export default Patients;

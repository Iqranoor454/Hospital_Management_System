import Sidebar from "./Sidebar";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
function Doctor() {
  let navigate = useNavigate();
  // let [showApp, setShowApp] = useState(null);
  // let [selectedApp, setSelectedApp] = useState(null);

  let [data, setData] = useState([]);
  let [docAppointments, setDocAppointments] = useState();

  let [app, setApp] = useState([]);

  async function docInfo() {
    let res = await axios.get("http://localhost:8000/doctors");
    let locData = res.data.doctors;
    setData(locData);
    console.log(locData);

    let resApp = await axios.get("http://localhost:8000/appointments");
    setApp(resApp.data.appointments);
  }
  {console.log("z",app)}
  useEffect(() => {
    docInfo();
  }, []);

  async function del_p(id) {
    console.log(id);
    let res = await axios.delete(`http://localhost:8000/doctor/${id}`);
    console.log(res.data);
    if (res.data["response"]["deletedCount"] === 1) {
      docInfo();
    } else {
      alert("Id not Found!");
    }
  }

  return (
    <>
      <div style={{ display: "flex" }}>
        <div>
          <Sidebar />
        </div>
        <div
          style={{
            marginLeft: "220px",
            padding: "20px",
            flex: 1,
            backgroundColor: "#f0f4f8",
            minHeight: "100vh",
            borderRadius: "12px",
            boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
            fontFamily: "Segoe UI, sans-serif",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "0px 20px",
            }}
          >
            <div>
              <h2
                style={{
                  textAlign: "center",
                  color: "#1a1a1a",
                  marginBottom: "20px",
                }}
              >
                DOCTORS
              </h2>
            </div>
            <div>
              <button
                style={{
                  backgroundColor: "#1466BB",
                  color: "#fff",
                  border: "none",
                  padding: "8px 16px",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontWeight: "600",
                  fontSize: "14px",
                  transition: "all 0.3s ease",
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.backgroundColor = "#0f4c82")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.backgroundColor = "#1466BB")
                }
                onClick={() => navigate("/add_doctor")}
              >
                Add Doctor
              </button>
            </div>
          </div>

          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              fontFamily: "Segoe UI, sans-serif",
              fontSize: "14px",
              backgroundColor: "#fff",
              borderRadius: "10px",
              overflow: "hidden",
              boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
            }}
          >
            <thead style={{ backgroundColor: "#1466BB", color: "#fff" }}>
              <tr
                style={{
                  borderBottom: "1px solid #ddd",
                  transition: "background 0.3s",
                  cursor: "pointer",
                }}
              >
                <th style={{ padding: "12px 16px", border: "1px solid #ddd" }}>
                  Doctor ID
                </th>
                <th style={{ padding: "12px 16px", border: "1px solid #ddd" }}>
                  Name
                </th>
                <th style={{ padding: "12px 16px", border: "1px solid #ddd" }}>
                  Specialization
                </th>
                <th style={{ padding: "12px 16px", border: "1px solid #ddd" }}>
                  Day
                </th>
                <th style={{ padding: "12px 16px", border: "1px solid #ddd" }}>
                  Slots
                </th>
                <th style={{ padding: "12px 16px", border: "1px solid #ddd" }}>
                  Appointment
                </th>
                <th style={{ padding: "12px 16px", border: "1px solid #ddd" }}>
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {data.map((d) => (
                <tr
                  style={{
                    borderBottom: "1px solid #ddd",
                    transition: "background 0.3s",
                    cursor: "default",
                  }}
                  onMouseOver={(e) =>
                    (e.currentTarget.style.backgroundColor = "#eef6ff")
                  }
                  onMouseOut={(e) =>
                    (e.currentTarget.style.backgroundColor = "transparent")
                  }
                >
                  <td
                    style={{ padding: "12px 16px", border: "1px solid #ddd" }}
                  >
                    {d.doctor_id}
                  </td>
                  <td
                    style={{ padding: "12px 16px", border: "1px solid #ddd" }}
                  >
                    {d.name}
                  </td>

                  <td
                    style={{ padding: "12px 16px", border: "1px solid #ddd" }}
                  >
                    {d.specialization}
                  </td>

                  <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                    {d.availability.map((i) => (
                      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                        <li>{i.day}</li>
                      </ul>
                    ))}
                  </td>

                  <td
                    style={{ padding: "12px 16px", border: "1px solid #ddd" }}
                  >
                    {d.availability.map((i) => (
                      <ul
                        style={{
                          listStyle: "none",
                          padding: 0,
                          margin: 0,
                          marginBottom: "8px",
                        }}
                      >
                        <li>{i.slots.join(", ")}</li>
                      </ul>
                    ))}
                  </td>

                  <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                    <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                      {d.appointments && d.appointments.map((a,i) => {
                        let foundApp=app.find( x => x._id === a)
                        {console.log(foundApp)}
                        if (!foundApp) return null;
                        return(<li key={i}>{foundApp.appointment_id}</li>)
                      }
                      )}
                    </ul>
                  </td>

                  <td>
                    <div
                      style={{
                        display: "flex",
                        gap: "10px",
                        justifyContent: "center",
                      }}
                    >
                      <i
                        onClick={() => del_p(d._id)}
                        className="fa-solid fa-trash"
                        style={{
                          color: "#E74C3C",
                          cursor: "pointer",
                          transition: "all 0.3s ease",
                        }}
                        onMouseOver={(e) =>
                          (e.currentTarget.style.transform = "scale(1.2)")
                        }
                        onMouseOut={(e) =>
                          (e.currentTarget.style.transform = "scale(1)")
                        }
                      ></i>
                      <i
                        onClick={() => navigate("/add_doctor", { state: d })}
                        className="fa-regular fa-pen-to-square"
                        style={{
                          color: "#1466BB",
                          cursor: "pointer",
                          transition: "all 0.3s ease",
                        }}
                        onMouseOver={(e) =>
                          (e.currentTarget.style.transform = "scale(1.2)")
                        }
                        onMouseOut={(e) =>
                          (e.currentTarget.style.transform = "scale(1)")
                        }
                      ></i>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Doctor;

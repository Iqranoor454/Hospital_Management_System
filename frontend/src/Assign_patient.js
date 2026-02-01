import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

function Assign_patient() {
  let location = useLocation();
  let navigate = useNavigate();

  let [avl, setavl] = useState([]);
  let [dep, setDep] = useState([]);
  let [selDoc, setSelDoc] = useState("");
  let [appointDoc, setAppointDoc] = useState([]);
  let [selDep, setSelDep] = useState("");
  let [date, setDate] = useState("");
  let [time, setTime] = useState("");
  let [note, setNote] = useState("");
  let [selDocName, setSelDocName] = useState("");
  let [selDepName, setSelDepName] = useState("");
  let [selDate, setSelDate] = useState("");
  let [data, setData] = useState([]);
  let [info, setInfo] = useState(true);
  let [doc, setDoc] = useState(null);
  let [appoint, setAppoint] = useState(false);
  let [curApp, setCurApp] = useState(null);
  let [his, setHis] = useState(false);

  useEffect(() => {
    if (!location.state) return;

    let assignPa = location.state;

    async function a() {
      let resd = await axios.get("http://localhost:8000/doctors");
      setAppointDoc(resd.data.doctors);

      let res = await axios.get(`http://localhost:8000/pati/${assignPa._id}`);
      setData(res.data);

      let resp = await axios.get("http://localhost:8000/doctors");

      let resdep = await axios.get("http://localhost:8000/departments");
      setDep(resdep.data.departments);

      let resApp = await axios.get("http://localhost:8000/appointments");
      console.log("appointmen:", resApp.data.appointments);

      let foundApp = resApp.data.appointments.filter((i) =>
        res.data.appointments.includes(i._id),
      );
      setCurApp(foundApp);

      let foundDoctor = resp.data.doctors.find(
        (i) => i.doctor_id?.trim() === res.data.assigned_doctor_id?.trim(),
      );
      setDoc(foundDoctor);
    }
    a();
  }, []);
  let dict = {
    patient_id: data.patient_id,
    doctor_id: selDocName,
    department_id: selDepName,
    date: date,
    time: time,
    status: "pending",
    notes: note,
  };

  function appointment() {
    let res = axios.post("http://localhost:8000/add_appointment", dict);
    alert("Appointment booked");
  }

  const sidebarItem = {
    padding: "14px",
    margin: "6px 12px",
    borderRadius: "8px",
    cursor: "pointer",
    textAlign: "center",
    fontWeight: "500",
    transition: "background 0.2s",
  };

  const thStyle = {
    padding: "14px 16px",
    fontWeight: "600",
    letterSpacing: "0.5px",
  };

  const tdStyle = {
    padding: "14px 16px",
    borderBottom: "1px solid #e6eaf0",
    color: "#333",
  };

  const statusColor = (status) => {
    if (status === "pending") return "#d97706";
    if (status === "Confirmed") return "#16a34a";
    if (status === "Cancelled") return "#dc2626";
    return "#555";
  };

  return (
    <>
      {/* Sidebar */}
      <div
        style={{
          width: "220px",
          height: "100vh",
          background: "#155fa0",
          color: "#fff",
          position: "fixed",
          paddingTop: "25px",
          fontFamily: "Inter, sans-serif",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <i class="fa-solid fa-user" style={{ fontSize: "42px" }}></i>
        </div>

        <div
          style={sidebarItem}
          onMouseOver={(e) => (e.currentTarget.style.background = "#0f4c82")}
          onMouseOut={(e) => (e.currentTarget.style.background = "transparent")}
          onClick={() => {
            setInfo(true);
            setAppoint(false);
            setHis(false);
          }}
        >
          Profile
        </div>

        <div
          style={sidebarItem}
          onMouseOver={(e) => (e.currentTarget.style.background = "#0f4c82")}
          onMouseOut={(e) => (e.currentTarget.style.background = "transparent")}
          onClick={() => {
            setInfo(false);
            setAppoint(false);
            setHis(false);
            navigate("/add_patients", { state: data });
          }}
        >
          Update Profile
        </div>

        <div
          style={sidebarItem}
          onMouseOver={(e) => (e.currentTarget.style.background = "#0f4c82")}
          onMouseOut={(e) => (e.currentTarget.style.background = "transparent")}
          onClick={() => {
            setInfo(false);
            setHis(true);
            setAppoint(false);
          }}
        >
          History
        </div>

        <div
          style={sidebarItem}
          onMouseOver={(e) => (e.currentTarget.style.background = "#0f4c82")}
          onMouseOut={(e) => (e.currentTarget.style.background = "transparent")}
          onClick={() => {
            setInfo(false);
            setAppoint(true);
            setHis(false);
          }}
        >
          Appointment
        </div>

        <div
          style={sidebarItem}
          onMouseOver={(e) => (e.currentTarget.style.background = "#0f4c82")}
          onMouseOut={(e) => (e.currentTarget.style.background = "transparent")}
          onClick={() => navigate("/")}
        >
          Logout
        </div>
      </div>
      {info && (
        <div
          style={{
            marginLeft: "220px",
            padding: "40px",
            minHeight: "100vh",
            background: "#f4f7fb",
            fontFamily: "Inter, sans-serif",
          }}
        >
          <div
            style={{
              background: "#ffffff",
              borderRadius: "16px",
              padding: "32px",
              boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
              position: "relative",
            }}
          >
            <div
              style={{
                width: "90px",
                height: "90px",
                borderRadius: "50%",
                background: "#eef3f9",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "absolute",
                top: "30px",
                right: "30px",
              }}
            >
              <i class="fa-solid fa-user" style={{ fontSize: "3rem" }}></i>
            </div>

            <h2 style={{ marginBottom: "25px", color: "#1a2b3c" }}>
              {data.name}
            </h2>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "20px",
              }}
            >
              <div
                style={{
                  background: "#f9fbff",
                  padding: "20px",
                  borderRadius: "12px",
                }}
              >
                <h4 style={{ marginBottom: "12px", color: "#155fa0" }}>
                  Personal Details
                </h4>
                <p>Patient ID: {data.patient_id}</p>
                <p>Doctor ID: {data.assigned_doctor_id}</p>
                <p>Doctor Name: {doc?.name || "Not assigned"}</p>

                {console.log(doc)}
              </div>
              <div
                style={{
                  background: "#f9fbff",
                  padding: "20px",
                  borderRadius: "12px",
                }}
              >
                <h4 style={{ marginBottom: "12px", color: "#155fa0" }}>
                  Contact Details
                </h4>
                <p>Email: {data.email}</p>
                <p>Phone: {data.contact}</p>
                <p>Address: {data.address}</p>
              </div>
            </div>
            <div
              style={{
                background: "#f9fbff",
                padding: "20px",
                borderRadius: "12px",
                marginTop: "20px",
              }}
            >
              <h4 style={{ marginBottom: "12px", color: "#155fa0" }}>
                Appoitments
              </h4>
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  backgroundColor: "#ffffff",
                  borderRadius: "12px",
                  overflow: "hidden",
                  boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
                  fontFamily: "Inter, sans-serif",
                }}
              >
                <thead>
                  <tr
                    style={{
                      backgroundColor: "#155fa0",
                      color: "#fff",
                      textAlign: "left",
                    }}
                  >
                    <th style={thStyle}>Appointment No</th>
                    <th style={thStyle}>Date</th>
                    <th style={thStyle}>Time</th>
                    <th style={thStyle}>Status</th>
                  </tr>
                </thead>

                <tbody>
                  {curApp &&
                    curApp.map((i, index) => (
                      <tr
                        key={i._id}
                        style={{
                          backgroundColor:
                            index % 2 === 0 ? "#f9fbff" : "#ffffff",
                          transition: "background 0.2s",
                        }}
                        onMouseOver={(e) =>
                          (e.currentTarget.style.backgroundColor = "#eef4ff")
                        }
                        onMouseOut={(e) =>
                          (e.currentTarget.style.backgroundColor =
                            index % 2 === 0 ? "#f9fbff" : "#ffffff")
                        }
                      >
                        <td style={tdStyle}>{i.appointment_id}</td>
                        <td style={tdStyle}>{i.date}</td>
                        <td style={tdStyle}>{i.time || "-"}</td>
                        <td
                          style={{
                            ...tdStyle,
                            fontWeight: "600",
                            color: statusColor(i.status),
                          }}
                        >
                          {i.status}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>

              {/* <th>
                <tr>Appointment No</tr>
                <tr>date</tr>
                <tr>time</tr>
                <tr></tr>
                </th>
                <td>
              {curApp && curApp.map((i)=>(
                // <p>{i.appointment_id}</p>x
                <tr>{i.time}</tr>
                <tr>{i.date}</tr>
                <tr>{i.status}</tr>
              ))}
                </td> */}
            </div>
          </div>
        </div>
      )}

      {appoint && (
        <div style={{ marginLeft: "220px" }}>
          <section id="appointment" className="appointment section">
            <div className="container section-title" data-aos="fade-up">
              <h2>Book an Appointment</h2>
              <p>
                Enter your details, choose a department and doctor, and book
                your appointment instantly.
              </p>
            </div>
            <div className="container" data-aos="fade-up" data-aos-delay="100">
              <div className="php-email-form">
                <div className="row">
                  <div className="col-md-6 form-group mt-3">
                    <select
                      className="form-select"
                      value={selDep}
                      onChange={(e) => {
                        const depId = e.target.value;
                        setSelDep(depId);

                        const department = dep.find((d) => d._id === depId);
                        setSelDepName(department ? department.name : "");
                      }}
                      required
                    >
                      <option value="">Select Department</option>
                      {dep.map((d) => (
                        <option key={d._id} value={d._id}>
                          {d.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="col-md-6 form-group mt-3">
                    <select
                      className="form-select"
                      value={selDoc}
                      onChange={(e) => {
                        const doctorId = e.target.value;
                        setSelDoc(doctorId);

                        const selectedDoctor = appointDoc.find(
                          (d) => d._id === doctorId,
                        );

                        setavl(
                          selectedDoctor ? selectedDoctor.availability : [],
                        );
                        setSelDocName(
                          selectedDoctor ? selectedDoctor.name : "",
                        );
                      }}
                      required
                    >
                      <option value="">Select Doctor</option>
                      {appointDoc.map((d) => (
                        <option key={d._id} value={d._id}>
                          {d.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 form-group mt-3">
                    <select
                      className="form-select"
                      value={date}
                      onChange={(e) => {
                        let selectedDay = e.target.value;
                        setDate(selectedDay);
                        const dateObj = avl.find((d) => d.day === selectedDay);
                        setSelDate(dateObj);
                      }}
                      disabled={!avl.length}
                      required
                    >
                      <option value="">Select Slot (Day)</option>
                      {avl.map((s) => (
                        <option key={s.day} value={s.day}>
                          {s.day}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="col-md-6 form-group mt-3">
                    <select
                      className="form-select"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      disabled={!selDate}
                      required
                    >
                      <option value="">Select Time</option>
                      {selDate &&
                        selDate.slots.map((t, i) => (
                          <option key={i} value={t}>
                            {t}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>

                <div className="form-group mt-3">
                  <textarea
                    className="form-control"
                    name="message"
                    rows="5"
                    placeholder="Notes"
                    required
                    value={note}
                    onChange={(e) => {
                      setNote(e.target.value);
                    }}
                  ></textarea>
                </div>
                <div className="mt-3">
                  <div className="text-center">
                    <button type="submit" onClick={appointment}>
                      Book Appointment
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}

      {his && (
        <div
          style={{
            marginLeft: "220px",
            padding: "50px",
            minHeight: "100vh",
            backgroundColor: "#f8f9fa",
            fontFamily: "'Inter', 'Segoe UI', Roboto, sans-serif",
            color: "#333",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              maxWidth: "1100px",
              width: "100%",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
              gap: "30px",
              alignItems: "start",
            }}
          >
            {/* Medical History Section */}
            <section
              style={{
                backgroundColor: "#fff",
                padding: "32px",
                borderRadius: "16px",
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.05)",
                border: "1px solid #edf2f7",
                transition: "transform 0.2s ease",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "20px",
                }}
              >
                <div
                  style={{
                    width: "4px",
                    height: "24px",
                    backgroundColor: "#155fa0",
                    marginRight: "12px",
                    borderRadius: "2px",
                  }}
                ></div>
                <h2
                  style={{
                    fontSize: "20px",
                    fontWeight: "700",
                    margin: 0,
                    color: "#1a202c",
                  }}
                >
                  Medical History
                </h2>
              </div>

              {data.medical_history.length ? (
                <ul style={{ padding: 0, listStyle: "none", margin: 0 }}>
                  {data.medical_history.map((item, idx) => (
                    <li
                      key={idx}
                      style={{
                        padding: "12px 0",
                        borderBottom:
                          idx === data.medical_history.length - 1
                            ? "none"
                            : "1px solid #f0f0f0",
                        display: "flex",
                        alignItems: "flex-start",
                        fontSize: "15px",
                        lineHeight: "1.5",
                      }}
                    >
                      <span style={{ color: "#155fa0", marginRight: "10px" }}>
                        •
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              ) : (
                <p style={{ color: "#718096", fontStyle: "italic" }}>
                  No medical history available.
                </p>
              )}
            </section>

            {/* Current Medications Section */}
            <section
              style={{
                backgroundColor: "#fff",
                padding: "32px",
                borderRadius: "16px",
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.05)",
                border: "1px solid #edf2f7",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "20px",
                }}
              >
                <div
                  style={{
                    width: "4px",
                    height: "24px",
                    backgroundColor: "#2d3748",
                    marginRight: "12px",
                    borderRadius: "2px",
                  }}
                ></div>
                <h2
                  style={{
                    fontSize: "20px",
                    fontWeight: "700",
                    margin: 0,
                    color: "#1a202c",
                  }}
                >
                  Current Medications
                </h2>
              </div>

              {data.current_medications.length ? (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                  }}
                >
                  {data.current_medications.map((item, idx) => (
                    <div
                      key={idx}
                      style={{
                        padding: "12px 16px",
                        backgroundColor: "#f1f5f9",
                        borderRadius: "8px",
                        fontSize: "14px",
                        fontWeight: "500",
                        color: "#475569",
                        borderLeft: "4px solid #155fa0",
                      }}
                    >
                      {item}
                    </div>
                  ))}
                </div>
              ) : (
                <p style={{ color: "#718096", fontStyle: "italic" }}>
                  No current medications.
                </p>
              )}
            </section>
          </div>
        </div>
      )}
    </>
  );
}

export default Assign_patient;

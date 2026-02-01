import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

function Cur_Doc() {
  let navigate = useNavigate();
  let location = useLocation();

  const [doc, setDoc] = useState([]);
  const [patient, setPatient] = useState([]);
  const [docInfo, setDocInfo] = useState(true);
  const [assignPa, setAssignPa] = useState(false);
  let [app,setApp]=useState([])

  const sidebarItemStyle = {
    padding: "15px",
    textAlign: "center",
    cursor: "pointer",
    transition: "0.2s",
    fontSize: "17px",
  };

  useEffect(() => {
    let storedDoctor = location.state;

    async function fetchDoctorData() {
      let res = await axios.get(
        `http://localhost:8000/doc/${storedDoctor._id}`
      );
      setDoc(res.data);

      let resp = await axios.get("http://localhost:8000/patients");
      let filtered = resp.data.patients.filter(
        (i) => i.assigned_doctor_id === storedDoctor.doctor_id
      );
      setPatient(filtered);

      let resApp=await axios.get("http://localhost:8000/appointments")
      setApp(resApp.data.appointments)
    }

    fetchDoctorData();
  }, []);

  return (
    <>
      {/* Sidebar */}
     <div
  style={{
    width: "230px",
    height: "100vh",
    background: "#1466BB",  
    color: "white",
    position: "fixed",
    top: 0,
    left: 0,
    paddingTop: "30px",
    boxShadow: "3px 0 20px rgba(0,0,0,0.15)",
    fontFamily: "Segoe UI, sans-serif",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
  }}
>

   <div style={{ marginBottom: "15px", display:"flex",justifyContent:"center" }}>
    <i
      className="fas fa-user-md"  
      style={{
        fontSize: "50px",
        color: "white",
        marginBottom: "10px",
      }}
    ></i>
  </div>
  <div
    style={{
      padding: "15px",
      textAlign: "center",
      cursor: "pointer",
      fontSize: "17px",
      fontWeight: "600",
      borderRadius: "8px",
      margin: "5px 10px",
      transition: "0.3s",
    }}
    onMouseOver={(e) => (e.currentTarget.style.background = "#0f4c82")}
    onMouseOut={(e) => (e.currentTarget.style.background = "transparent")}
    onClick={() => {
      setAssignPa(false);
      setDocInfo(true);
    }}
  >
    <i className="fas fa-user"></i>
    Profile
  </div>

  <div
    style={{
      padding: "15px",
      textAlign: "center",
      cursor: "pointer",
      fontSize: "17px",
      fontWeight: "600",
      borderRadius: "8px",
      margin: "5px 10px",
      transition: "0.3s",
    }}
    onMouseOver={(e) => (e.currentTarget.style.background = "#0f4c82")}
    onMouseOut={(e) => (e.currentTarget.style.background = "transparent")}
    onClick={() => {
      setAssignPa(true);
      setDocInfo(false);
    }}
  >
    Assigned Patients
  </div>

  <div
    style={{
      padding: "15px",
      textAlign: "center",
      cursor: "pointer",
      fontSize: "17px",
      fontWeight: "600",
      borderRadius: "8px",
      margin: "5px 10px",
      transition: "0.3s",
    }}
    onMouseOver={(e) => (e.currentTarget.style.background = "#0f4c82")}
    onMouseOut={(e) => (e.currentTarget.style.background = "transparent")}
    onClick={() => navigate("/")}
  >
    Logout
  </div>
</div>


      {/* PROFILE SECTION */}
      {docInfo && (
        <div
          style={{
            marginLeft: "230px",
            padding: "40px",
            minHeight: "100vh",
            background: "#e9f1ff",
            fontFamily: "Arial",
          }}
        >
          {/* HEADER */}
          <div
            style={{
              width: "95%",
              background: "linear-gradient(135deg,#1572e8,#1b4c86)",
              padding: "35px",
              borderRadius: "18px",
              color: "white",
              position: "relative",
              marginBottom: "30px",
              boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
            }}
          >
            {/* Avatar */}
            <div
              style={{
                width: "110px",
                height: "110px",
                background: "white",
                borderRadius: "50%",
                overflow: "hidden",
                border: "4px solid #fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "absolute",
                top: "50%",
                right: "40px",
                transform: "translateY(-50%)",
                boxShadow: "0 6px 18px rgba(0,0,0,0.25)",
              }}
            >
              <img
                src="https://cdn-icons-png.flaticon.com/512/3774/3774299.png"
                alt="Patient"
                style={{ width: "75%", height: "75%" }}
              />
            </div>

            <h2 style={{ fontSize: "32px", margin: 0 }}>{doc.name}</h2>
            <p style={{ fontSize: "18px", opacity: 0.9 }}>
              {doc.specialization}
            </p>
          </div>

          <div
            style={{
              width: "95%",
              background: "white",
              padding: "40px",
              borderRadius: "18px",
              boxShadow: "0 8px 25px rgba(0,0,0,0.12)",
              transition: "0.3s",
              marginTop: "30px",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = "translateY(-4px)";
              e.currentTarget.style.boxShadow = "0 12px 30px rgba(0,0,0,0.18)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "translateY(0px)";
              e.currentTarget.style.boxShadow = "0 8px 25px rgba(0,0,0,0.12)";
            }}
          >
            <h3
              style={{
                fontSize: "26px",
                color: "#0d2e4d",
                marginBottom: "25px",
                fontWeight: "700",
                borderLeft: "5px solid #1572e8",
                paddingLeft: "12px",
              }}
            >
              Profile Information
            </h3>

            {/* TWO COLUMN MAIN INFO */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "25px",
                marginBottom: "35px",
              }}
            >
              <div
                style={{
                  background: "#f4f8ff",
                  padding: "20px",
                  borderRadius: "12px",
                  borderLeft: "5px solid #1572e8",
                }}
              >
                <h4
                  style={{
                    margin: "0 0 8px 0",
                    color: "#0d2e4d",
                    fontSize: "18px",
                    fontWeight: "600",
                  }}
                >
                  Contact Details
                </h4>
                <p style={{ margin: "6px 0", fontSize: "17px" }}>
                  📧 <strong>Email:</strong> {doc.email}
                </p>
                <p style={{ margin: "6px 0", fontSize: "17px" }}>
                  📞 <strong>Phone:</strong> {doc.phone}
                </p>
              </div>

              <div
                style={{
                  background: "#f4f8ff",
                  padding: "20px",
                  borderRadius: "12px",
                  borderLeft: "5px solid #1572e8",
                }}
              >
                <h4
                  style={{
                    margin: "0 0 8px 0",
                    color: "#0d2e4d",
                    fontSize: "18px",
                    fontWeight: "600",
                  }}
                >
                  Professional Details
                </h4>
                <p style={{ margin: "6px 0", fontSize: "17px" }}>
                  🩺 <strong>Specialization:</strong> {doc.specialization}
                </p>
                <p style={{ margin: "6px 0", fontSize: "17px" }}>
                  🆔 <strong>Doctor ID:</strong> {doc.doctor_id}
                </p>
              </div>
            </div>
            <h3
              style={{
                fontSize: "22px",
                fontWeight: "700",
                color: "#0d2e4d",
                marginBottom: "18px",
                borderLeft: "5px solid #1572e8",
                paddingLeft: "10px",
              }}
            >
              Quick Stats
            </h3>

            <div
              style={{
                display: "flex",
                gap: "25px",
                marginBottom: "30px",
              }}
            >
              <div
                style={{
                  flex: 1,
                  background: "linear-gradient(135deg,#1572e8,#1b4c86)",
                  padding: "20px",
                  borderRadius: "14px",
                  color: "white",
                  textAlign: "center",
                  boxShadow: "0 5px 15px rgba(0,0,0,0.15)",
                }}
              >
                <h4 style={{ margin: 0, fontSize: "20px" }}>
                  👥 Patients Assigned
                </h4>
                <p
                  style={{
                    fontSize: "32px",
                    fontWeight: "700",
                    marginTop: "10px",
                  }}
                >
                  {patient.length}
                </p>
              </div>
              <div
                style={{
                  flex: 1,
                  background: "linear-gradient(135deg,#1b4c86,#1572e8)",
                  padding: "20px",
                  borderRadius: "14px",
                  color: "white",
                  textAlign: "center",
                  boxShadow: "0 5px 15px rgba(0,0,0,0.15)",
                }}
              >
                <h4 style={{ margin: 0, fontSize: "20px" }}>🏥 Expertise</h4>
                <p
                  style={{
                    fontSize: "28px",
                    fontWeight: "700",
                    marginTop: "10px",
                  }}
                >
                  {doc.specialization}
                </p>
              </div>
            </div>

            {/* BUTTON */}
            <button
              onClick={() => navigate("/add_doctor", { state: doc })}
              style={{
                marginTop: "10px",
                background: "#1572e8",
                color: "white",
                border: "none",
                padding: "12px 28px",
                borderRadius: "10px",
                cursor: "pointer",
                fontSize: "17px",
                fontWeight: "600",
                display: "block",
              }}
              onMouseOver={(e) => (e.target.style.background = "#0f4c82")}
              onMouseOut={(e) => (e.target.style.background = "#1572e8")}
            >
              Edit Profile
            </button>
          </div>
        </div>
      )}

      {/* ASSIGNED PATIENTS TABLE */}
      {assignPa && (
        <div
          style={{
            marginLeft: "230px",
            padding: "40px",
            background: "#f2f6ff",
            minHeight: "100vh",
          }}
        >
          <h3
            style={{
              fontSize: "32px",
              color: "#1f3557",
              marginBottom: "25px",
              fontWeight: "700",
            }}
          >
            Assigned Patients
          </h3>

          <table
            style={{
              width: "95%",
              background: "#ffffff",
              borderCollapse: "separate",
              borderSpacing: "0",
              borderRadius: "14px",
              overflow: "hidden",
              boxShadow: "0 6px 25px rgba(0,0,0,0.12)",
            }}
          >
            <thead>
              <tr style={{ background: "#1466BB", color: "white" }}>
                {[
                  "Patient ID",
                  "Name",
                  "Age",
                  "Assigned Doctor",
                  "Medical History",
                  "Appointments",
                  "Medications",
                  "Update",
                ].map((title) => (
                  <th
                    style={{
                      padding: "14px",
                      textAlign: "left",
                      fontSize: "16px",
                      fontWeight: "600",
                      letterSpacing: "0.5px",
                    }}
                  >
                    {title}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {patient.map((p) => (
                <tr
                  key={p.patient_id}
                  style={{
                    transition: "0.25s",
                  }}
                  onMouseOver={(e) =>
                    (e.currentTarget.style.background = "#e9f1ff")
                  }
                  onMouseOut={(e) =>
                    (e.currentTarget.style.background = "#ffffff")
                  }
                >
                  <td style={{ padding: "14px", color: "#1f3557" }}>
                    {p.patient_id}
                  </td>
                  <td style={{ padding: "14px", color: "#1f3557" }}>
                    {p.name}
                  </td>
                  <td style={{ padding: "14px", color: "#1f3557" }}>{p.age}</td>
                  <td style={{ padding: "14px", color: "#1f3557" }}>
                    {p.assigned_doctor_id}
                  </td>

                  <td style={{ padding: "14px", color: "#a0adc0" }}>
                    {p.medical_history?.length > 0
                      ? p.medical_history.map((m) => <li>{m}</li>)
                      : "N/A"}
                  </td>

                  <td style={{ padding: "14px", color: "#1f3557" }}>
                    {p.appointments && p.appointments.map((a) =>
                      {let found = app.find(x => x._id === a)
                      if(!found) return null;
                      return  <li>{found.appointment_id}</li>}
                       )}
                  </td>

                  <td style={{ padding: "14px", color: "#1f3557" }}>
                    {p.current_medications?.length > 0
                      ? p.current_medications.map((m) => <li>{m}</li>)
                      : "N/A"}
                  </td>

                  <td style={{ padding: "14px" }}>
                    <i
                      className="fa-regular fa-pen-to-square"
                      style={{ cursor: "pointer" }}
                      onClick={() => navigate("/add_patients", { state: p })}
                    ></i>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}

export default Cur_Doc;

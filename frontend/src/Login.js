import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
function Login() {
  let [sign,setSign]= useState(false);

  let [data, setData] = useState([]);
  let [doc, setDoc] = useState([]);
  let [pati, setPati] = useState([]);

  let navigate = useNavigate();
  let [email, setEmail] = useState();
  let [phone, setPhone] = useState();
  useEffect(() => {
    a();
  }, []);

  async function a() {
    let res = await axios.get("http://localhost:8000/admins");
    let resp = await axios.get("http://localhost:8000/doctors");
    let resd = await axios.get("http://localhost:8000/patients");
    setData(res.data);
    setDoc(resp.data);
    setPati(resd.data);
  }

 function submit() {
  if (!email || !phone) {
    alert("Invalid credentials");
    return;
  }

  if (data?.admins?.length) {
    for (let admin of data.admins) {
      if (
        admin.email === email &&
        admin.phone === phone &&
        admin.role === "Admin"
      ) {
        navigate("/admin");
        return;
      }
    }
  }
  if (doc?.doctors?.length) {
    for (let doctor of doc.doctors) {
      if (
        doctor.email === email &&
        doctor.phone === phone &&
        doctor.role === "doctor"
      ) {
        navigate("/cur_doc", { state: doctor });
        return;
      }
    }
  }

  if (pati?.patients?.length) {
    for (let patient of pati.patients) {
      if (
        patient.email === email &&
        patient.contact === phone
      ) {
        navigate("/assign_patient", { state: patient });
        return;
      }
    }
  }

  alert("Invalid credentials");
}

  return (
   <div
  style={{
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
    fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
  }}
>
  <div
    style={{
      width: "360px",
      background: "#ffffff",
      padding: "40px",
      borderRadius: "16px",
      boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
      border: "1px solid rgba(255,255,255,0.8)",
    }}
  >
    <h3
      style={{
        textAlign: "center",
        marginBottom: "30px",
        color: "#1a202c",
        fontSize: "24px",
        fontWeight: "700",
        letterSpacing: "-0.5px",
      }}
    >
      Welcome Back
    </h3>

    <div style={{ marginBottom: "20px" }}>
      <label
        style={{
          display: "block",
          marginBottom: "8px",
          fontSize: "14px",
          fontWeight: "600",
          color: "#4a5568",
        }}
      >
        E-mail Address
      </label>
      <input
        type="email"
        placeholder="name@company.com"
        style={{
          width: "100%",
          padding: "12px 16px",
          border: "1px solid #e2e8f0",
          borderRadius: "8px",
          fontSize: "14px",
          outline: "none",
          transition: "border-color 0.2s",
          boxSizing: "border-box", // Prevents padding from breaking width
        }}
        onChange={(e) => setEmail(e.target.value)}
      />
    </div>

    <div style={{ marginBottom: "25px" }}>
      <label
        style={{
          display: "block",
          marginBottom: "8px",
          fontSize: "14px",
          fontWeight: "600",
          color: "#4a5568",
        }}
      >
        Phone Number
      </label>
      <input
        type="text"
        placeholder="+1 (555) 000-0000"
        style={{
          width: "100%",
          padding: "12px 16px",
          border: "1px solid #e2e8f0",
          borderRadius: "8px",
          fontSize: "14px",
          outline: "none",
          boxSizing: "border-box",
        }}
        onChange={(e) => setPhone(e.target.value)}
      />
    </div>

    <button
      style={{
        width: "100%",
        padding: "12px",
        backgroundColor: "#1466BB",
        color: "white",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",
        fontSize: "16px",
        fontWeight: "600",
        transition: "all 0.3s ease",
        boxShadow: "0 4px 6px rgba(20, 102, 187, 0.2)",
      }}
      onMouseOver={(e) => {
        e.target.style.backgroundColor = "#0f4c82";
        e.target.style.transform = "translateY(-1px)";
      }}
      onMouseOut={(e) => {
        e.target.style.backgroundColor = "#1466BB";
        e.target.style.transform = "translateY(0)";
      }}
      onClick={submit}
    >
      Sign In
    </button>

    <div 
      style={{ 
        textAlign: "center", 
        marginTop: "20px", 
        fontSize: "14px", 
        color: "#718096" 
      }}
    >
      Don't have an account?{" "}
      <a 
        href="/Sign_up" 
        style={{ 
          color: "#1466BB", 
          textDecoration: "none", 
          fontWeight: "600" 
        }}
      >
        Sign Up
      </a>
    </div>
  </div>
</div>
  );
}

export default Login;

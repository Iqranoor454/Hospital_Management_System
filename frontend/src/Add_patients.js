import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

function Add_patients() {
  let navigate = useNavigate();
  const location = useLocation();
  const value = location.state;

  let [name, setname] = useState("");
  let [gender, setGender] = useState("");
  let [age, setAge] = useState("");
  let [cont, setCont] = useState("");
  let [email, setEmail] = useState("");
  let [addr, setAddr] = useState("");
  let [doc, setDoc] = useState("");

  // Lists for History and Meds
  let [hLst, setHLst] = useState([]);
  let [his, setHis] = useState("");
  let [medLst, setMedLst] = useState([]);
  let [medi, setMedi] = useState("");

  // Emergency Contact
  let [ename, setEname] = useState("");
  let [rel, setRel] = useState("");
  let [phone, setPhone] = useState("");

  useEffect(() => {
    if (value) {
      setname(value.name);
      setGender(value.gender);
      setAge(value.age);
      setCont(value.contact);
      setEmail(value.email);
      setAddr(value.address);
      setMedLst(value.current_medications || []);
      setHLst(value.medical_history || []);
      setDoc(value.assigned_doctor_id);
      setEname(value.emergency_contact?.name || "");
      setRel(value.emergency_contact?.relation || "");
      setPhone(value.emergency_contact?.phone || "");
    }
  }, [value]);

  const edit = value && value._id;

  let dict = {
    name,
    gender,
    age,
    contact: cont,
    email,
    address: addr,
    medical_history: hLst,
    current_medications: medLst,
    assigned_doctor_id: doc,
    emergency_contact: { name: ename, relation: rel, phone: phone },
  };

  const handleClick = () => (edit ? update(value._id) : submit());

  function submit() {
    axios.post("http://localhost:8000/add_patient", dict).then(() => {
      alert("Patient added");
      navigate(-1);
    });
  }

  async function update(id) {
    await axios.put(`http://localhost:8000/patient/${id}`, dict);
    alert("Updated successfully");
    navigate(-1);
  }

  function addH() {
    if (his) {
      setHLst([...hLst, his]);
      setHis("");
    }
  }

  function addM() {
    if (medi) {
      setMedLst([...medLst, medi]);
      setMedi("");
    }
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="form-header">
          <h3 className="form-title">
            {edit ? "Update Patient" : "Patient Information Form"}
          </h3>
          <button className="close-btn" onClick={() => navigate(-1)}>X</button>
        </div>

        <div className="form-group">
          <label>Patient Name</label>
          <input className="form-input" value={name} type="text" onChange={(e) => setname(e.target.value)} />
        </div>

        <div className="form-group">
          <label>Gender</label>
          <select className="form-select" value={gender} onChange={(e) => setGender(e.target.value)}>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="form-group">
          <label>Age</label>
          <input className="form-input" value={age} type="number" onChange={(e) => setAge(e.target.value)} />
        </div>

        <div className="form-group">
          <label>Contact Number</label>
          <input className="form-input" value={cont} type="text" onChange={(e) => setCont(e.target.value)} />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input className="form-input" value={email} type="email" onChange={(e) => setEmail(e.target.value)} />
        </div>

        <div className="form-group">
          <label>Address</label>
          <input className="form-input" value={addr} type="text" onChange={(e) => setAddr(e.target.value)} />
        </div>

        <div className="form-group">
          <label>Assigned Doctor ID</label>
          <input className="form-input" value={doc} type="text" onChange={(e) => setDoc(e.target.value)} />
        </div>

        <hr style={{ margin: '20px 0', border: '0', borderTop: '1px solid #eee' }} />

        {/* Medical History Section */}
        <div className="form-group">
          <label>Medical History</label>
          <div style={{ display: "flex", gap: "10px" }}>
            <input className="form-input" value={his} type="text" onChange={(e) => setHis(e.target.value)} placeholder="Enter condition..." />
            <button type="button" className="close-btn" style={{ height: '42px' }} onClick={addH}>ADD</button>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginBottom: '10px' }}>
            {hLst.map((item, i) => (
              <span key={i} style={{ background: '#e2e8f0', padding: '2px 10px', borderRadius: '15px', fontSize: '12px' }}>{item}</span>
            ))}
          </div>
        </div>

        {/* Medications Section */}
        <div className="form-group">
          <label>Current Medications</label>
          <div style={{ display: "flex", gap: "10px" }}>
            <input className="form-input" value={medi} type="text" onChange={(e) => setMedi(e.target.value)} placeholder="Enter medication..." />
            <button type="button" className="close-btn" style={{ height: '42px' }} onClick={addM}>ADD</button>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginBottom: '10px' }}>
            {medLst.map((item, i) => (
              <span key={i} style={{ background: '#e2e8f0', padding: '2px 10px', borderRadius: '15px', fontSize: '12px' }}>{item}</span>
            ))}
          </div>
        </div>

        <h4 className="availability-title" style={{ textAlign: 'left', marginTop: '20px' }}>Emergency Contact</h4>
        <div className="form-group">
          <label>Contact Name</label>
          <input className="form-input" value={ename} type="text" onChange={(e) => setEname(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Relation</label>
          <input className="form-input" value={rel} type="text" onChange={(e) => setRel(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Emergency Phone</label>
          <input className="form-input" value={phone} type="text" onChange={(e) => setPhone(e.target.value)} />
        </div>

        <button className="btn-primary btn-submit" onClick={handleClick}>
          {edit ? "Update Patient" : "Register Patient"}
        </button>
      </div>
    </div>
  );
}

export default Add_patients;
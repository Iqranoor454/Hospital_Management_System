import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

function Add_appointment() {
  const location = useLocation();
  const value = location.state;
  const navigate = useNavigate();

  let [dep, setDep] = useState([]);
  let [doc, setDoc] = useState([]);
  let [avl, setAvl] = useState([]);
  let [selAvl, setSelAvl] = useState([]);

  let [paID, setPaID] = useState("");
  let [docID, setDocID] = useState("");
  let [depID, setDepID] = useState("");
  let [date, setDate] = useState("");
  let [time, setTime] = useState("");
  let [note, setNote] = useState("");
  let [status, setStatus] = useState("pending");

  useEffect(() => {
    async function getData() {
      try {
        let depData = await axios.get("http://localhost:8000/departments");
        setDep(depData.data.departments);

        let docData = await axios.get("http://localhost:8000/doctors");
        setDoc(docData.data.doctors);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    if (value) {
      setPaID(value.patient_id);
      setDocID(value.doctor_id);
      setDepID(value.department_id);
      setDate(value.date);
      setTime(value.time);
      setNote(value.notes);
      setStatus(value.status);
    }
    getData();
  }, [value]);

  let app_dict = {
    patient_id: paID,
    doctor_id: docID,
    department_id: depID,
    date: date,
    time: time,
    status: status,
    notes: note,
  };

  function submit() {
    axios.post("http://localhost:8000/add_appointment", app_dict)
      .then(() => {
        alert("Appointment Added");
        navigate("/appointment");
      });
  }

  async function update(id) {
    await axios.put(`http://localhost:8000/app/${id}`, app_dict);
    alert("Updated successfully");
    navigate("/appointment");
  }

  const isEditMode = value && value._id;

  const handleClick = () => {
    if (isEditMode) {
      update(value._id);
    } else {
      submit();
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="form-header">
          <h3 className="form-title">
            {isEditMode ? "Update Appointment" : "Appointment Form"}
          </h3>
          <button className="close-btn" onClick={() => navigate("/appointment")}>
            X
          </button>
        </div>

        <div className="form-group">
          <label>Patient ID</label>
          <input
            className="form-input"
            value={paID}
            type="text"
            onChange={(e) => setPaID(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Department</label>
          <select
            className="form-select"
            value={depID}
            onChange={(e) => setDepID(e.target.value)}
            required
          >
            <option value="">Select Department</option>
            {dep && dep.map((d) => (
              <option key={d._id} value={d.name}>{d.name}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Doctor</label>
          <select
            className="form-select"
            value={docID}
            onChange={(e) => {
              let selectedDoc = e.target.value;
              setDocID(selectedDoc);
              let docObj = doc.find((x) => x.name === selectedDoc);
              setAvl(docObj ? docObj.availability : []);
            }}
            required
          >
            <option value="">Select Doctor</option>
            {doc && doc.map((d) => (
              <option key={d._id} value={d.name}>{d.name}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Day</label>
          <select
            className="form-select"
            value={date}
            onChange={(e) => {
              let selDate = e.target.value;
              setDate(selDate);
              let avlObj = avl.find((t) => t.day === selDate);
              setSelAvl(avlObj ? avlObj.slots : []);
            }}
            disabled={!avl.length}
            required
          >
            <option value="">Select Day</option>
            {avl && avl.map((d) => (
              <option key={d._id} value={d.day}>{d.day}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Time Slot</label>
          <select
            className="form-select"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            disabled={!selAvl.length}
            required
          >
            <option value="">Select Time</option>
            {selAvl && selAvl.map((slot, index) => (
              <option key={index} value={slot}>{slot}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Status</label>
          <select
            className="form-select"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            required
          >
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
          </select>
        </div>

        <div className="form-group">
          <label>Notes</label>
          <input
            className="form-input"
            value={note}
            type="text"
            onChange={(e) => setNote(e.target.value)}
          />
        </div>

        <button className="btn-primary btn-submit" onClick={handleClick}>
          {isEditMode ? "Update Appointment" : "Submit Appointment"}
        </button>
      </div>
    </div>
  );
}

export default Add_appointment;
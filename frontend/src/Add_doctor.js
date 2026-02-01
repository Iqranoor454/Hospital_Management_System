import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "./form_css.css";

function Form() {
  const navigate = useNavigate();
  let [docID, setDocID] = useState("");
  let [role, setRole] = useState("");
  let [name, setName] = useState("");
  let [special, setSpecial] = useState("");
  let [gender, setGender] = useState("");
  let [phone, setPhone] = useState("");
  let [email, setEmail] = useState("");
  let [depID, setDepID] = useState("");
  let [exp, setExp] = useState(0);
  let [avl, setAvl] = useState([]);
  let [app, setApp] = useState("");
  let [rating, setRating] = useState(0);
  const [selectedDay, setSelectedDay] = useState("");
  const [slotInput, setSlotInput] = useState("");
  const [slots, setSlots] = useState([]);
  let updated;

  const location = useLocation();
  const value = location.state;

  useEffect(() => {
    if (value) {
      setDocID(value.doctor_id);
      setRole(value.role);
      setName(value.name);
      setSpecial(value.specialization);
      setGender(value.gender);
      setPhone(value.phone);
      setEmail(value.email);
      setDepID(value.department_id);
      setExp(value.experience_years);
      setAvl(value.availability);
      setRating(value.rating);
    }
  }, [value]);

  let dict = {
    doctor_id: docID,
    role: role,
    name: name,
    specialization: special,
    gender: gender,
    phone: phone,
    email: email,
    department_id: depID,
    experience_years: exp,
    availability: avl,
    rating: rating,
  };

  function submit() {
    let res = axios.post("http://localhost:8000/add_doctor", dict);
    console.log("doctor Added ");
    console.log(dict);
  }

  async function update(id) {
    let res = await axios.put(`http://localhost:8000/doc/${id}`, dict);
    alert("updated");
  }

  const isEditMode = value && value._id;

  const handleClick = () => {
    if (isEditMode) {
      update(value._id);
    } else {
      submit();
    }
  };

  function setValue() {
    setAvl((prev) => {
      updated = [...prev, { day: selectedDay, slots: slots }];
      console.log(updated);
      return updated;
    });
    console.log(avl);
  }

  const addSlot = () => {
    if (slotInput.trim() === "") return;
    setSlots((prev) => [...prev, slotInput.trim()]);
    setSlotInput("");
  };

  const removeSlot = (index) => {
    setSlots((prev) => prev.filter((_, i) => i !== index));
  };

  const saveSlots = () => {
    console.log("Slots to send to DB:", slots);
  };

  const weekDays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];


return (
  <div className="modal-overlay">
    <div className="modal-content">
      {/* Header */}
      <div className="form-header">
        <h3 className="form-title">Doctor Information Form</h3>
        <button className="close-btn" onClick={() => navigate(-1)}>
          X
        </button>
      </div>

      <div className="form-group">
        <label>Doctor ID</label>
        <input
          className="form-input"
          type="text"
          value={docID}
          onChange={(e) => setDocID(e.target.value)}
        />

        <label>Role</label>
        <input
          className="form-input"
          type="text"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          required
        />

        <label>Name</label>
        <input
          className="form-input"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label>Specialization</label>
        <input
          className="form-input"
          type="text"
          value={special}
          onChange={(e) => setSpecial(e.target.value)}
        />

        <label>Gender</label>
        <select
          className="form-select"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>

        <label>Phone</label>
        <input
          className="form-input"
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <label>Email</label>
        <input
          className="form-input"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label>Department ID</label>
        <input
          className="form-input"
          type="text"
          value={depID}
          onChange={(e) => setDepID(e.target.value)}
        />

        <label>Experience Years</label>
        <input
          className="form-input"
          type="number"
          value={exp}
          onChange={(e) => setExp(e.target.value)}
        />

        <label>Rating</label>
        <input
          className="form-input"
          type="number"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        />
      </div>

      <h4 className="availability-title">Availability</h4>

      <div className="availability-container">
        <label>Select a Day</label>
        <select
          className="form-select"
          style={{ backgroundColor: "#fff" }}
          value={selectedDay}
          onChange={(e) => setSelectedDay(e.target.value)}
        >
          <option value="">-- Choose Day --</option>
          {weekDays.map((day) => (
            <option key={day} value={day}>
              {day}
            </option>
          ))}
        </select>

        <input
          className="form-input"
          style={{ backgroundColor: "#fff" }}
          type="text"
          placeholder="Enter slot (e.g., 1pm - 2pm)"
          value={slotInput}
          onChange={(e) => setSlotInput(e.target.value)}
        />

        <button className="btn-primary" onClick={addSlot}>
          + Add Slot
        </button>

        {slots.length > 0 && (
          <ul style={{ listStyle: "none", padding: 0 }}>
            {slots.map((slot, idx) => (
              <li key={idx} className="slot-item">
                <span className="slot-text">{slot}</span>
                <button className="btn-remove" onClick={() => removeSlot(idx)}>
                  ✕
                </button>
              </li>
            ))}
          </ul>
        )}

        {slots.length > 0 && (
          <button className="btn-primary" style={{ marginTop: "10px" }} onClick={saveSlots}>
            Save to Database
          </button>
        )}
      </div>

      <button className="btn-primary btn-submit" onClick={handleClick}>
        {isEditMode ? "Update" : "Submit"}
      </button>
    </div>
  </div>
);
}

export default Form;

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Admin from "./Admin";
import Doctor from "./Doctor";
import Patients from "./Patients";
import Appointment from "./Appointment";
import Add_doctor from "./Add_doctor";
import Add_patients from "./Add_patients";
import Add_department from "./Add_department";
import Department from "./Department";
import Add_appointment from "./Add_appointment";
import Add_admin from "./Add_admin";
import Add_med from "./Add_med";
import Inv from "./Inv";
import Add_eq from "./Add_eq";
import Cur_Doc from "./Cur_Doc";
import Home from "./Home";
import Assign_patient from "./Assign_patient";
import Sign_up from "./Sign_up";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/doctor" element={<Doctor />} />
        <Route path="/patients" element={<Patients />} />
        <Route path="/appointment" element={<Appointment />} />
        <Route path="/add_doctor" element={<Add_doctor />} />
        <Route path="/department" element={<Department />} />
        <Route path="/add_patients" element={<Add_patients />} />
        <Route path="/add_department" element={<Add_department />} />
        <Route path="/add_appointment" element={<Add_appointment />} />
        <Route path="/add_admin" element={<Add_admin />} />
        <Route path="/inv" element={<Inv />} />
        <Route path="/add_med" element={<Add_med />} />
        <Route path="/add_eq" element={<Add_eq />} />
        <Route path="/cur_doc" element={<Cur_Doc />} />
        <Route path="/assign_patient" element={<Assign_patient />} />
        <Route path="/sign_up" element={<Sign_up />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

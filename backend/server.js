import express from "express";
import { MongoClient, ObjectId } from "mongodb";
import cors from "cors";
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(express.json());
// enabling CORS for any unknown origin(https://xyz.example.com)
app.use(cors("*"));

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);
const dbName = "hospital_management";
let admins;
let doctors;
let patients;
let appointments;
let departments;
let medicines;
let equipments;

client.connect().then(() => {
  const db = client.db(dbName);
  admins = db.collection("admins");
  doctors = db.collection("doctors");
  patients = db.collection("patients");
  departments = db.collection("departments");
  appointments = db.collection("appointments");
  medicines = db.collection("medicines");
  equipments = db.collection("equipments");
  console.log("MongoDB Connected");
});

// admin
app.post("/add_admin", async (req, res) => {
  const admin = req.body;
  const data = {
    admin_id: admin.admin_id,
    name: admin.name,
    email: admin.email,
    role: admin.role,
    phone: admin.phone,
    permissions: admin.permissions,
    last_login: admin.last_login,
  };
  await admins.insertOne(data);
  res.json({ message: "Admin added successfully" });
});

app.get("/admins", async (req, res) => {
  const data = await admins.find({}).toArray();
  res.json({ admins: data });
});

app.delete("/admin/:id", async (req, res) => {
  let objId = new ObjectId(req.params.id);
  let resp = await admins.deleteOne({ _id: objId });
  res.json({ response: resp });
});

app.put("/admin/:id", async(req,res)=>{
  let objId=new ObjectId(req.params.id)
  let resp=await admins.updateOne({ _id:objId },{"$set" :req.body })
  res.json({response:resp})
})

// doctor
app.post("/add_doctor", async (req, res) => {
  const doctor = req.body;
  const d_data = {
    doctor_id: doctor.doctor_id,
    role: doctor.role,
    name: doctor.name,
    specialization: doctor.specialization,
    gender: doctor.gender,
    phone: doctor.phone,
    email: doctor.email,
    department_id: doctor.department_id,
    experience_years: doctor.experience_years,
    availability: doctor.availability,
    appointments: [],
    rating: doctor.rating,
  };
  await doctors.insertOne(d_data);
  res.json({ message: "doctor added successfully" });
});

app.get("/doctors", async (req, res) => {
  const d_data = await doctors.find({}).toArray();
  res.json({ doctors: d_data });
});

app.get("/doc/:id", async (req, res) => {
  let objId = new ObjectId(req.params.id);
  let result = await doctors.findOne({ _id: objId });
  res.json(result);
});


app.delete("/doctor/:id", async (req, res) => {
  let objId = new ObjectId(req.params.id);
  let resp = await doctors.deleteOne({ _id: objId });
  res.json({ response: resp });
});

app.put("/doc/:id",async(req,res)=>{
  let objId = new ObjectId(req.params.id);
  let resp = await doctors.updateOne({_id : objId },{"$set":req.body})
  res.json({response : resp})
})

// patient
app.post("/add_patient", async (req, res) => {
  const patient = req.body;
  let count= await patients.countDocuments();
  const p_data = {
    patient_id: "PT00" + (count+1),
    name: patient.name,
    gender: patient.gender,
    age: patient.age,
    contact: patient.contact,
    email: patient.email,
    address: patient.address,
    medical_history: patient.medical_history,
    current_medications: patient.current_medications,
    assigned_doctor_id: patient.assigned_doctor_id,
    appointments: [],
    emergency_contact: patient.emergency_contact,
  };
  await patients.insertOne(p_data);
  res.json({ message: "Patient added succesfully" });
});

app.get("/patients", async (req, res) => {
  const p_data = await patients.find({}).toArray();
  res.json({ patients: p_data });
});

app.get("/pati/:id", async (req, res) => {
  let objId = new ObjectId(req.params.id);
  let result = await patients.findOne({ _id: objId });
  res.json(result);
});

// : here is used for variable
app.delete("/patient/:id", async (req, res) => {
  let objId = new ObjectId(req.params.id);
  let resp = await patients.deleteOne({ _id: objId });
  res.json({ response: resp });
});

app.put("/patient/:id",async(req,res)=>{
  let objId=new ObjectId(req.params.id)
  let resp=await patients.updateOne({_id:objId},{"$set":req.body})
  res.json({response:resp})
})


// department
app.post("/add_department", async (req, res) => {
  const department = req.body;
  const dep_data = {
    dept_id: department.dept_id,
    name: department.name,
    floor: department.floor,
    head_doctor_id: department.head_doctor_id,
    about: department.about,
  };
  await departments.insertOne(dep_data);
  res.json({ message: "Department added successfully" });
});

app.get("/departments", async (req, res) => {
  const dep_data = await departments.find({}).toArray();
  res.json({ departments: dep_data });
});

app.delete("/department/:id", async (req, res) => {
  let objId = new ObjectId(req.params.id);
  let resp = await departments.deleteOne({ _id: objId });
  res.json({ response: resp });
});

app.put("/dep/:id",async(req,res) => {
   let objId = new ObjectId(req.params.id);
  let resp = await departments.updateOne({ _id: objId },{"$set": req.body});
  res.json({response:resp})
})

// app.put("/dep/:id", async(req, res) => {
//   let value= req.params.id
//   let data=req.body
//   let response = await departments.updateOne({"_id": new ObjectId(value)}, {"$set":data})
//   res.json({"msg":response})
// })

app.put("/app/:id",async(req,res)=>{
  let objId=new ObjectId(req.params.id);
  let resp=await appointments.updateOne({_id:objId},{"$set":req.body})
   res.json({response:resp})
})
// appointment
app.post("/add_appointment", async (req, res) => {
  const appointment = req.body;
  const count=await appointments.countDocuments();
  const a_data = {
    appointment_id:"AP00" + (count + 1) ,
    patient_id: appointment.patient_id,
    doctor_id: appointment.doctor_id,
    department_id: appointment.department_id,
    date: appointment.date,
    time: appointment.time,
    status: appointment.status,
    notes: appointment.notes,
  };
  // await appointments.insertOne(a_data);
  // res.json({ message: "appointment added successfully" });
   const result = await appointments.insertOne(a_data);

  // 2️⃣ Push appointment ID into patient
  await patients.updateOne(
    { patient_id: appointment.patient_id },
    { $push: { appointments: result.insertedId } }
  );
    await doctors.updateOne(
    { name: appointment.doctor_id },
    { $push: { appointments: result.insertedId } }
  );

  res.json({ message: "appointment added successfully" });
});

app.get("/appointments", async (req, res) => {
  const a_data = await appointments
    .find({}).toArray();
  res.json({ appointments: a_data });
});

app.get("/appointment/:id", async (req, res) => {
  const objId = new ObjectId(req.params.id);
  const appointment = await appointments.findOne({ _id: objId });
  res.json(appointment);
});


app.delete("/appointment/:id", async (req, res) => {
  let objId = new ObjectId(req.params.id);
  let resp = await appointments.deleteOne({ _id: objId });
  res.json({ response: resp });
});



// inventory

// medicines
app.post("/add_med", async (req, res) => {
  const med = req.body;

  let med_data = {
    name: med["name"],
    stock: med["stock"],
    unit: med["unit"],
    expiry: med["expiry"],
  };

  await medicines.insertOne(med_data);
  res.json({ message: "Medicine added successfully" });
});

app.delete("/med/:id", async (req, res) => {
  let objId = new ObjectId(req.params.id);
  let resp = await medicines.deleteOne({ _id: objId });
  res.json({ response: resp });
});


app.put("/med/:id", async(req,res)=>{
  let objID=new ObjectId (req.params.id)
  let resp=await medicines.updateOne({_id:objID},{"$set":req.body})
  res.json({respnse:resp})
})
// equipment
app.post("/add_equ", async (req, res) => {
  const equ = req.body;

  let equ_data = {
    item: equ["item"],
    count: equ["count"],
    status: equ["status"],
  };

  await equipments.insertOne(equ_data);
  res.json({ message: "Equipment added successfully" });
});

app.delete("/eq/:id", async (req, res) => {
  let objId = new ObjectId(req.params.id);
  let resp = await equipments.deleteOne({ _id: objId });
  res.json({ response: resp });
});

app.put("/eq/:id",async(req,res)=>{
  let objId=new ObjectId(req.params.id);
  let resp=await equipments.updateOne({_id:objId},{ "$set": req.body})
  res.json({response:resp})
})

app.get("/inv",async(req,res)=>{
  const med_d = await medicines.find({}).toArray();
  const eq_d = await equipments.find({}).toArray();
  res.json( { inventory: {
    "medicines":med_d,
    "equipment":eq_d
  }});
})




app.listen(8000, () => console.log("Server running on http://localhost:8000"));


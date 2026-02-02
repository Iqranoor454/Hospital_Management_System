<h1>🏥 Hospital Management System (HMS)</h1>

<p>A full-stack healthcare coordination platform designed to streamline interactions between <strong>Patients</strong>, <strong>Doctors</strong>, and <strong>Administrators</strong>. This system allows for secure authentication, patient registration, and real-time appointment tracking.</p>

<h2>🚀 Features</h2>

<h3>👤 Patient Portal</h3>
<ul>
  <li><strong>Self-Registration:</strong> Patients can create an account via the Sign-Up form.</li>
  <li><strong>Secure Login:</strong> Access to a personalized dashboard using email and phone verification.</li>
  <li><strong>Appointment Management:</strong> Book appointments and view real-time status details.</li>
  <li><strong>Medical Transparency:</strong> View assigned doctor details and personal medical history.</li>
</ul>

<h3>🩺 Doctor Portal</h3>
<ul>
  <li><strong>Patient Management:</strong> Ability to add new patients directly to the system.</li>
  <li><strong>Schedule Overview:</strong> View all booked appointments and patient details for the day.</li>
  <li><strong>Clinical Records:</strong> Access and update patient medical history and current medications.</li>
</ul>

<h3>🛡️ Admin Dashboard</h3>
<ul>
  <li><strong>System Oversight:</strong> Manage both doctor and patient databases.</li>
  <li><strong>Role-Based Access:</strong> Add or update administrative accounts with specific permissions.</li>
  <li><strong>Operational Control:</strong> Monitor all activity across the hospital system.</li>
</ul>

<hr>

<h2>🛠️ Tech Stack</h2>

<h3>Frontend:</h3>
<ul>
  <li><strong>React.js:</strong> Functional components with Hooks (<code>useState</code>, <code>useEffect</code>).</li>
  <li><strong>React Router Dom:</strong> For seamless navigation between forms and dashboards.</li>
  <li><strong>Axios:</strong> For handling API requests to the backend.</li>
  <li><strong>Inline CSS:</strong> Modern, responsive UI with glassmorphism effects.</li>
</ul>

<h3>Backend:</h3>
<ul>
  <li><strong>Node.js & Express:</strong> RESTful API architecture.</li>
  <li><strong>Database:</strong> MongoDB </li>
</ul>

<hr>

<h2>📂 Project Structure</h2>

<pre><code>
hospital-management-system/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Add_patients.jsx    <!-- Doctor-side patient entry -->
│   │   │   ├── Add_admin.jsx       <!-- Admin management form -->
│   │   │   ├── Sign_up.jsx         <!-- Patient registration -->
│   │   │   └── Login.jsx           <!-- Unified login portal -->
│   │   └── App.js                  <!-- Routing logic -->
├── backend/
│   ├── server.js                   <!-- Express server setup -->
│   └── routes/                    <!-- API endpoints (Add, Put, Get) -->
└── README.md
</code></pre>

<hr>

<h2>⚙️ Installation & Setup</h2>

<ol>
  <li><strong>Clone the repository:</strong>
    <pre><code>git clone https://github.com/iqranoor454/hospital-management-system.git</code></pre>
  </li>
  <li><strong>Install dependencies for backend and frontend:</strong>
    <pre><code>cd backend
npm install

cd ../frontend
npm install</code></pre>
  </li>
  <li><strong>Configure the Database:</strong>  
    Create a <code>.env</code> file inside <code>backend/</code> with:
    <pre><code>MONGO_URI=your_mongodb_connection_string
PORT=5000
    </code></pre>
  </li>
  <li><strong>Run the backend server:</strong>
    <pre><code>cd backend
npm start</code></pre>
  </li>
  <li><strong>Run the frontend server:</strong>
    <pre><code>cd frontend
npm start</code></pre>
  </li>
</ol>

<hr>

<h2>📝 API Endpoints</h2>

<table>
  <thead>
    <tr><th>Method</th><th>Endpoint</th><th>Description</th></tr>
  </thead>
  <tbody>
    <tr><td>POST</td><td>/add_patient</td><td>Registers a new patient</td></tr>
    <tr><td>PUT</td><td>/patient/:id</td><td>Updates existing patient data</td></tr>
    <tr><td>POST</td><td>/add_admin</td><td>Creates a new admin account</td></tr>
    <tr><td>PUT</td><td>/admin/:id</td><td>Updates admin permissions/roles</td></tr>
    <tr><td>POST</td><td>/login</td><td>Authenticates users (Patient/Doctor/Admin)</td></tr>
  </tbody>
</table>

<hr>

<h2>🌐 Deployment</h2>

<p><strong>Frontend:</strong> Hosted on GitHub Pages or Vercel.</p>
<p><strong>Backend:</strong> Hosted on Render or Railway.</p>

<p><em>Ensure API base URLs in frontend are updated to point to the deployed backend URL.</em></p>

<hr>

<h2>🤝 Contributing</h2>

<p>Contributions are welcome! Please open issues or submit pull requests for improvements.</p>

<hr>

<h2>📧 Contact</h2>

<p>Developed by <strong>Your Name</strong> — <a href="mailto:your-email@example.com">your-email@example.com</a></p>

<hr>

<h2>📜 License</h2>

<p>This project is licensed under the MIT License.</p>

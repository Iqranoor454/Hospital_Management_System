import axios from "axios";
import React, { useEffect, useState } from "react";
import { redirectDocument, useNavigate } from "react-router-dom";

const Home = () => {
  let [pa, setPa] = useState([]);

  let navigate = useNavigate();
  let [doc, setDoc] = useState([]);
  let [dep, setDep] = useState([]);
  let [avl, setavl] = useState([]);

  let [ID, setID] = useState("");
  let [email, setEmail] = useState("");
  let [cont, setCont] = useState("");
  let [selDoc, setSelDoc] = useState("");

  let [selDep, setSelDep] = useState("");
  let [date, setDate] = useState("");
  let [time, setTime] = useState("");
  let [note, setNote] = useState("");

  let [selDocName, setSelDocName] = useState("");
  let [selDepName, setSelDepName] = useState("");
  let [selDate, setSelDate] = useState("");

  let dict = {
    patient_id: ID,
    doctor_id: selDocName,
    department_id: selDepName,
    date: date,
    time: time,
    status: "pending",
    notes: note,
  };

  function appoint() {
    console.log(pa);
    if (email && cont && ID) {
      for (let i = 0; i < pa.length; i++) {
        let pati = pa[i];
        if (
          pati["email"] === email &&
          pati["contact"] === cont &&
          pati["patient_id"] === ID
        ) {
          let res = axios.post("http://localhost:8000/add_appointment", dict);
          console.log(dict);
          alert("Appointment booked");
          return;
        } else {
          navigate("/login");
        }
      }
    }
  }

  useEffect(() => {
    async function getData() {
      let res = await axios.get("http://localhost:8000/doctors");
      setDoc(res.data.doctors);

      let resd = await axios.get("http://localhost:8000/departments");
      setDep(resd.data.departments);

      let resp = await axios.get("http://localhost:8000/patients");
      setPa(resp.data.patients);
    }

    getData();
  }, []);

  return (
    <>
      <header id="header" className="header sticky-top">
        <div className="topbar d-flex align-items-center">
          <div className="container d-flex justify-content-center justify-content-md-between">
            <div className="contact-info d-flex align-items-center">
              <i className="bi bi-envelope d-flex align-items-center">
                <a href="mailto:contact@example.com">contact@example.com</a>
              </i>
              <i className="bi bi-phone d-flex align-items-center ms-4">
                <span>+1 5589 55488 55</span>
              </i>
            </div>
            <div className="social-links d-none d-md-flex align-items-center">
              <a href="#" className="twitter">
                <i className="bi bi-twitter-x"></i>
              </a>
              <a href="#" className="facebook">
                <i className="bi bi-facebook"></i>
              </a>
              <a href="#" className="instagram">
                <i className="bi bi-instagram"></i>
              </a>
              <a href="#" className="linkedin">
                <i className="bi bi-linkedin"></i>
              </a>
            </div>
          </div>
        </div>

        <div className="branding d-flex align-items-center">
          <div className="container position-relative d-flex align-items-center justify-content-between">
            <a href="/" className="logo d-flex align-items-center me-auto">
              <h1 className="sitename">Medilab</h1>
            </a>
            <nav id="navmenu" className="navmenu">
              <ul>
                <li>
                  <a href="#hero" className="active">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#about">About</a>
                </li>
                <li>
                  <a href="#departments">Departments</a>
                </li>
                <li>
                  <a href="#doctors">Doctors</a>
                </li>
                <li
                  onClick={() => {
                    navigate("/login");
                  }}
                >
                  {" "}
                  Login
                </li>
                <li>
                  <a href="#contact">Contact</a>
                </li>
              </ul>
              <i className="mobile-nav-toggle d-xl-none bi bi-list"></i>
            </nav>
            <a className="cta-btn d-none d-sm-block" href="#appointment">
              Make an Appointment
            </a>
          </div>
        </div>
      </header>

      <main className="main">
        <section id="hero" className="hero section light-background">
          <img src="assets/img/hero-bg.jpg" alt="" data-aos="fade-in" />
          <div className="container position-relative">
            <div
              className="welcome position-relative"
              data-aos="fade-down"
              data-aos-delay="100"
            >
              <h2>WELCOME TO MEDILAB</h2>
              <p>
                Book appointments, explore departments, and consult expert
                doctors — all in one place.
              </p>
            </div>
            <div className="content row gy-4">
              <div className="col-lg-4 d-flex align-items-stretch">
                <div
                  className="why-box"
                  data-aos="zoom-out"
                  data-aos-delay="200"
                >
                  <h3>Why Choose Medilab?</h3>
                  <p>
                    Medilab provides trusted healthcare services with
                    experienced doctors, modern facilities, and easy online
                    appointment booking.
                  </p>
                  <div className="text-center">
                    <a href="#about" className="more-btn">
                      <span>Learn More</span>{" "}
                      <i className="bi bi-chevron-right"></i>
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-lg-8 d-flex align-items-stretch">
                <div className="d-flex flex-column justify-content-center">
                  <div className="row gy-4">
                    <div className="col-xl-4 d-flex align-items-stretch">
                      <div
                        className="icon-box"
                        data-aos="zoom-out"
                        data-aos-delay="300"
                      >
                        <i className="bi bi-clipboard-data"></i>
                        <h4>Comprehensive Patient Care</h4>
                        <p>
                          Providing personalized and attentive care to ensure
                          the best health outcomes for every patient.
                        </p>
                      </div>
                    </div>
                    <div className="col-xl-4 d-flex align-items-stretch">
                      <div
                        className="icon-box"
                        data-aos="zoom-out"
                        data-aos-delay="400"
                      >
                        <i className="bi bi-gem"></i>
                        <h4>Expert Medical Professionals</h4>
                        <p>
                          Our team consists of experienced and skilled doctors
                          dedicated to your wellbeing.
                        </p>
                      </div>
                    </div>
                    <div className="col-xl-4 d-flex align-items-stretch">
                      <div
                        className="icon-box"
                        data-aos="zoom-out"
                        data-aos-delay="500"
                      >
                        <i className="bi bi-inboxes"></i>
                        <h4>Advanced Medical Facilities</h4>
                        <p>
                          Equipped with the latest technology to provide
                          accurate diagnosis and effective treatments.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="about section">
          <div className="container">
            <div className="row gy-4 gx-5">
              <div
                className="col-lg-6 position-relative align-self-start"
                data-aos="fade-up"
                data-aos-delay="200"
              >
                <img
                  src="assets/img/about.jpg"
                  className="img-fluid"
                  alt="About Medilab"
                />
                <a
                  href="#"
                  className="glightbox pulsating-play-btn"
                  aria-label="Watch Medilab Intro Video"
                ></a>
              </div>
              <div
                className="col-lg-6 content"
                data-aos="fade-up"
                data-aos-delay="100"
              >
                <h3>About Medilab</h3>
                <p>
                  Medilab is a comprehensive healthcare platform offering a
                  seamless connection between patients and medical professionals
                  through transparent and efficient services.
                </p>
                <ul>
                  <li>
                    <i className="fa-solid fa-vial-circle-check"></i>
                    <div>
                      <h5>Trusted Medical Expertise</h5>
                      <p>
                        Our team of certified specialists provide accurate
                        diagnoses and compassionate care.
                      </p>
                    </div>
                  </li>
                  <li>
                    <i className="fa-solid fa-pump-medical"></i>
                    <div>
                      <h5>State-of-the-Art Facilities</h5>
                      <p>
                        Equipped with advanced technology to support modern
                        medical treatments.
                      </p>
                    </div>
                  </li>
                  <li>
                    <i className="fa-solid fa-heart-circle-xmark"></i>
                    <div>
                      <h5>Patient-Centered Approach</h5>
                      <p>
                        We prioritize patient comfort, safety, and personalized
                        care at every step.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section id="stats" className="stats section light-background">
          <div className="container" data-aos="fade-up" data-aos-delay="100">
            <div className="row gy-4">
              <div className="col-lg-3 col-md-6 d-flex flex-column align-items-center">
                <i className="fa-solid fa-user-doctor"></i>
                <div className="stats-item">
                  <span
                    data-purecounter-start="0"
                    data-purecounter-end="85"
                    data-purecounter-duration="1"
                    className="purecounter"
                  ></span>
                  <h5>Doctors</h5>
                  <h6>{doc.length}</h6>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 d-flex flex-column align-items-center">
                <i className="fa-regular fa-hospital"></i>
                <div className="stats-item">
                  <span
                    data-purecounter-start="0"
                    data-purecounter-end="18"
                    data-purecounter-duration="1"
                    className="purecounter"
                  ></span>
                  <h5>Departments</h5>
                  <h6>{dep.length}</h6>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 d-flex flex-column align-items-center">
                <i className="fas fa-flask"></i>
                <div className="stats-item">
                  <span
                    data-purecounter-start="0"
                    data-purecounter-end="12"
                    data-purecounter-duration="1"
                    className="purecounter"
                  ></span>
                  <h5>Research Labs</h5>
                  <h6>10</h6>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 d-flex flex-column align-items-center">
                <i className="fas fa-award"></i>
                <div className="stats-item">
                  <span
                    data-purecounter-start="0"
                    data-purecounter-end="150"
                    data-purecounter-duration="1"
                    className="purecounter"
                  ></span>
                  <h5>Awards</h5>
                  <h6>10</h6>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="appointment" className="appointment section">
          <div className="container section-title" data-aos="fade-up">
            <h2>Book an Appointment</h2>
            <p>
              Enter your details, choose a department and doctor, and book your
              appointment instantly.
            </p>
          </div>
          <div className="container" data-aos="fade-up" data-aos-delay="100">
            <div className="php-email-form">
              <div className="row">
                <div className="col-md-4 form-group">
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    id="name"
                    placeholder="Enter patient ID"
                    value={ID}
                    onChange={(e) => {
                      setID(e.target.value);
                    }}
                    required
                  />
                </div>
                <div className="col-md-4 form-group mt-3 mt-md-0">
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    id="email"
                    placeholder="Your Email"
                    required
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                </div>
                <div className="col-md-4 form-group mt-3 mt-md-0">
                  <input
                    type="tel"
                    className="form-control"
                    name="phone"
                    id="phone"
                    placeholder="Your Phone"
                    required
                    value={cont}
                    onChange={(e) => {
                      setCont(e.target.value);
                    }}
                  />
                </div>
              </div>

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

                      const doctor = doc.find((d) => d._id === doctorId);
                      setavl(doctor ? doctor.availability : []);
                      setSelDocName(doctor ? doctor.name : "");
                    }}
                    required
                  >
                    <option value="">Select Doctor</option>
                    {doc.map((d) => (
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
                  <button type="submit" onClick={appoint}>
                    Book Appointment
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="departments" className="departments section">
          <div className="container section-title" data-aos="fade-up">
            <h2>Departments</h2>
            <p>
              Explore our medical departments and learn about the services we
              provide.
            </p>
          </div>
          <div className="container" data-aos="fade-up" data-aos-delay="100">
            <div className="row">
              <div className="col-lg-3">
                <ul className="nav nav-tabs flex-column">
                  {dep &&
                    dep.map((i, index) => (
                      <li className="nav-item" key={i._id}>
                        <a
                          className={`nav-link ${
                            index === 0 ? "active show" : ""
                          }`}
                          data-bs-toggle="tab"
                          href={`#dept-${i._id}`}
                        >
                          {i.name}
                        </a>
                      </li>
                    ))}
                </ul>
              </div>
              <div className="col-lg-9 mt-4 mt-lg-0">
                <div className="tab-content">
                  {dep &&
                    dep.map((i, index) => (
                      <div
                        key={i._id}
                        className={`tab-pane fade ${
                          index === 0 ? "active show" : ""
                        }`}
                        id={`dept-${i._id}`}
                      >
                        <div className="row">
                          <div className="col-lg-8 details order-2 order-lg-1">
                            <h3>{i.name}</h3>
                            <p>{i.about}</p>
                          </div>

                          <div className="col-lg-4 text-center order-1 order-lg-2">
                            <img
                              src="assets/img/departments-1.jpg"
                              alt={i.name}
                              className="img-fluid"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="doctors" className="doctors section">
          <div className="container section-title" data-aos="fade-up">
            <h2>Our Doctors</h2>
            <p>
              Meet our experienced and qualified doctors from various
              specialties.
            </p>
          </div>
          <div className="container">
            <div className="row gy-4">
              {doc ? (
                <>
                  {doc.map((d) => (
                    <div
                      className="col-lg-6"
                      data-aos="fade-up"
                      data-aos-delay="100"
                    >
                      <div className="team-member d-flex align-items-start">
                        <div className="pic">
                          <img
                            src="https://cdn-icons-png.flaticon.com/512/3774/3774299.png"
                            className="img-fluid"
                            alt=""
                          />
                        </div>
                        <div className="member-info">
                          <h4>{d.name}</h4>
                          <span>{d.specialization} </span>
                          <div className="social">
                            <a href="">
                              <i className="bi bi-twitter-x"></i>
                            </a>
                            <a href="">
                              <i className="bi bi-facebook"></i>
                            </a>
                            <a href="">
                              <i className="bi bi-instagram"></i>
                            </a>
                            <a href="">
                              <i className="bi bi-linkedin"></i>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              ) : (
                <></>
              )}
            </div>
          </div>
        </section>

        <section id="gallery" className="gallery section">
          <div className="container section-title" data-aos="fade-up">
            <h2>Gallery</h2>
            <p>
              Explore our collection of moments capturing the advanced
              facilities, compassionate care, and vibrant community at Medilab.
            </p>
          </div>
          <div
            className="container-fluid"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <div className="row g-0">
              <div className="col-lg-3 col-md-4">
                <div className="gallery-item">
                  <a
                    href="assets/img/gallery/gallery-1.jpg"
                    className="glightbox"
                    data-gallery="images-gallery"
                  >
                    <img
                      src="assets/img/gallery/gallery-1.jpg"
                      alt=""
                      className="img-fluid"
                    />
                  </a>
                </div>
              </div>
              <div className="col-lg-3 col-md-4">
                <div className="gallery-item">
                  <a
                    href="assets/img/gallery/gallery-2.jpg"
                    className="glightbox"
                    data-gallery="images-gallery"
                  >
                    <img
                      src="assets/img/gallery/gallery-2.jpg"
                      alt=""
                      className="img-fluid"
                    />
                  </a>
                </div>
              </div>
              <div className="col-lg-3 col-md-4">
                <div className="gallery-item">
                  <a
                    href="assets/img/gallery/gallery-3.jpg"
                    className="glightbox"
                    data-gallery="images-gallery"
                  >
                    <img
                      src="assets/img/gallery/gallery-3.jpg"
                      alt=""
                      className="img-fluid"
                    />
                  </a>
                </div>
              </div>
              <div className="col-lg-3 col-md-4">
                <div className="gallery-item">
                  <a
                    href="assets/img/gallery/gallery-4.jpg"
                    className="glightbox"
                    data-gallery="images-gallery"
                  >
                    <img
                      src="assets/img/gallery/gallery-4.jpg"
                      alt=""
                      className="img-fluid"
                    />
                  </a>
                </div>
              </div>
              <div className="col-lg-3 col-md-4">
                <div className="gallery-item">
                  <a
                    href="assets/img/gallery/gallery-5.jpg"
                    className="glightbox"
                    data-gallery="images-gallery"
                  >
                    <img
                      src="assets/img/gallery/gallery-5.jpg"
                      alt=""
                      className="img-fluid"
                    />
                  </a>
                </div>
              </div>
              <div className="col-lg-3 col-md-4">
                <div className="gallery-item">
                  <a
                    href="assets/img/gallery/gallery-6.jpg"
                    className="glightbox"
                    data-gallery="images-gallery"
                  >
                    <img
                      src="assets/img/gallery/gallery-6.jpg"
                      alt=""
                      className="img-fluid"
                    />
                  </a>
                </div>
              </div>
              <div className="col-lg-3 col-md-4">
                <div className="gallery-item">
                  <a
                    href="assets/img/gallery/gallery-7.jpg"
                    className="glightbox"
                    data-gallery="images-gallery"
                  >
                    <img
                      src="assets/img/gallery/gallery-7.jpg"
                      alt=""
                      className="img-fluid"
                    />
                  </a>
                </div>
              </div>
              <div className="col-lg-3 col-md-4">
                <div className="gallery-item">
                  <a
                    href="assets/img/gallery/gallery-8.jpg"
                    className="glightbox"
                    data-gallery="images-gallery"
                  >
                    <img
                      src="assets/img/gallery/gallery-8.jpg"
                      alt=""
                      className="img-fluid"
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="contact section">
          <div className="container section-title" data-aos="fade-up">
            <h2>Contact Us</h2>
            <p>
              Reach out to Medilab for appointments, inquiries, or medical
              assistance.
            </p>
          </div>
          <div className="mb-5" data-aos="fade-up" data-aos-delay="200">
            <iframe
              style={{ border: 0, width: "100%", height: "270px" }}
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d48389.78314118045!2d-74.006138!3d40.710059!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a22a3bda30d%3A0xb89d1fe6bc499443!2sDowntown%20Conference%20Center!5e0!3m2!1sen!2sus!4v1676961268712!5m2!1sen!2sus"
              frameBorder="0"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </section>
      </main>

      <footer id="footer" className="footer light-background">
        <div className="container footer-top">
          <div className="row gy-4">
            <div className="col-lg-4 col-md-6 footer-about">
              <a href="/" className="logo d-flex align-items-center">
                <span className="sitename">Medilab</span>
              </a>
              <div className="footer-contact pt-3">
                <p>123 Health Ave, Suite 100</p>
                <p>New York, NY 10001</p>
                <p className="mt-3">
                  <strong>Phone:</strong> <span>+1 (558) 955-4885</span>
                </p>
                <p>
                  <strong>Email:</strong> <span>support@medilab.com</span>
                </p>
              </div>
              <div className="social-links d-flex mt-4">
                <a href="#" aria-label="Twitter">
                  <i className="bi bi-twitter"></i>
                </a>
                <a href="#" aria-label="Facebook">
                  <i className="bi bi-facebook"></i>
                </a>
                <a href="#" aria-label="Instagram">
                  <i className="bi bi-instagram"></i>
                </a>
                <a href="#" aria-label="LinkedIn">
                  <i className="bi bi-linkedin"></i>
                </a>
              </div>
            </div>

            <div className="col-lg-2 col-md-3 footer-links">
              <h4>Quick Links</h4>
              <ul>
                <li>
                  <a href="#">Home</a>
                </li>
                <li>
                  <a href="#">About Us</a>
                </li>
                <li>
                  <a href="#">Services</a>
                </li>
                <li>
                  <a href="#">Terms of Service</a>
                </li>
                <li>
                  <a href="#">Privacy Policy</a>
                </li>
              </ul>
            </div>

            <div className="col-lg-2 col-md-3 footer-links">
              <h4>Our Services</h4>
              <ul>
                <li>
                  <a href="#">General Consultation</a>
                </li>
                <li>
                  <a href="#">Specialist Care</a>
                </li>
                <li>
                  <a href="#">Medical Testing</a>
                </li>
                <li>
                  <a href="#">Health Checkups</a>
                </li>
                <li>
                  <a href="#">Emergency Care</a>
                </li>
              </ul>
            </div>

            <div className="col-lg-2 col-md-3 footer-links">
              <h4>Support</h4>
              <ul>
                <li>
                  <a href="#">FAQ</a>
                </li>
                <li>
                  <a href="#">Help Center</a>
                </li>
                <li>
                  <a href="#">Appointment Booking</a>
                </li>
                <li>
                  <a href="#">Billing & Payments</a>
                </li>
                <li>
                  <a href="#">Contact Support</a>
                </li>
              </ul>
            </div>

            <div className="col-lg-2 col-md-3 footer-links">
              <h4>Resources</h4>
              <ul>
                <li>
                  <a href="#">Blog</a>
                </li>
                <li>
                  <a href="#">Patient Stories</a>
                </li>
                <li>
                  <a href="#">Careers</a>
                </li>
                <li>
                  <a href="#">Press</a>
                </li>
                <li>
                  <a href="#">Legal</a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="container copyright text-center mt-4">
          <p>
            © <span>{new Date().getFullYear()}</span>{" "}
            <strong className="px-1 sitename">Medilab</strong>. All Rights
            Reserved.
          </p>
        </div>
      </footer>
    </>
  );
};

export default Home;

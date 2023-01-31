import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";

const BookingPage = () => {

    const {user} = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const today = moment(new Date(), "YYYY-MM-DD").format("YYYY-MM-DD");
    const params = useParams();
    const [doctor, setDoctor] = useState([]);
    const [date, setDate] = useState(today);
    const [time, setTime] = useState("20:00");
    const [isAvailable, setIsAvailable] = useState(false);
    // const [timing1, setTiming1] = useState("20:00");
    // const [timing2, setTiming2] = useState("20:15");

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

  // Get Doctor Data
  const getDoctor = async () => {
    try {
      const res = await axios.post(
        "/api/v1/doctor/getDoctorById",
        { doctorId: params.doctorId },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      if (res.data.success) {
        setDoctor(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDoctor();
    //eslint-disable-next-line
  }, []);

  const checkAvaiability = async () => {
    setSuccess("");
    setError("");
    console.log(params.doctorId, moment(date, "YYYY-MM-DD").format("YYYY-MM-DD"), moment(time, "HH:mm").format("HH:mm"))
    try {
      dispatch(showLoading)
      const res = await axios.post('/api/v1/user/booking-availability', 
      {
        doctorId:params.doctorId, date, time
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      if(res.data.available === "yes") {
        dispatch(hideLoading)
        setSuccess(res.data.message);
        setIsAvailable(true);
        setTimeout(() => {
          setSuccess("");
          setError("");
        }, 3000);
      } else {
        dispatch(hideLoading)
        setError(res.data.message);
        setIsAvailable(false);
        setTimeout(() => {
          setSuccess("");
          setError("");
        }, 3000);
      }
    } catch (error) {
      dispatch(hideLoading)
      setError(error);
      console.log(error)
      setTimeout(() => {
        setSuccess("");
        setError("");
      }, 3000);
    }
  }

  const handleBookAppointment = async () => {
    console.log(date, time, params?.doctorId, user?._id, doctor, user);
    
    setSuccess("");
    setError("");
    try {
      dispatch(showLoading);
      const res = await axios.post('/api/v1/user/book-appointment', {
        doctorId: params?.doctorId,
        userId: user?._id,
        doctorInfo: doctor,
        userInfo: user,
        date: date,
        time: time
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      dispatch(hideLoading);
      if(res.data.success) {
        setSuccess(res.data.message);
        setTimeout(() => {
          setSuccess("");
          setError("");
        }, 3000);
      }
    } catch (error) {
      dispatch(hideLoading);
      setError(error);
      console.log(error);
    }
  }

  return (
    <Layout>
      {/* <div className="page-header">
        <div className="row">
          <div className="col-sm-12">
            <ul className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/">Doctors </Link>
              </li>
              <li className="breadcrumb-item">
                <i className="feather-chevron-right"></i>
              </li>
              <li className="breadcrumb-item active">Booking Page</li>
            </ul>
          </div>
        </div>
      </div> */}

      <div className="row">
        <div className="col-sm-12">
          <div className="card">
            <div className="card-body">
              <div className="row">
                <div className="col-md-12">
                  <div className="about-info">
                    <h4>
                        Booking Page
                        <span>
                            <a href="#">
                            <i className="fa-solid fa-ellipsis-vertical"></i>
                            </a>
                        </span>
                    </h4>
                  </div>
                  <div className="doctor-profile-head">
                    <div className="profile-bg-img">
                      <img src="/img/profile-bg.jpg" alt="Profile" />
                    </div>
                    <div className="row">
                      <div className="col-lg-5 col-md-5">
                        <div className="profile-user-box" style={{ justifyContent: `flex-start` }} >
                          <div className="profile-user-img" style={{ minWidth: 141, marginRight: 10, marginLeft: 10}} >
                            <img src="/img/profile-user-01.jpg" alt="Profile" />
                            <div className="form-group doctor-up-files profile-edit-icon mb-0">
                              <div className="uplod d-flex">
                                <label className="file-upload profile-upbtn mb-0">
                                  <img src="/img/icons/camera-icon.svg" alt="Profile" />
                                  <input type="file" />
                                </label>
                              </div>
                            </div>
                          </div>
                          <div className="names-profiles" style={{ minWidth: 186 }}>
                            <h4>
                              {doctor?.title}. {doctor?.firstName}{" "}
                              {doctor?.lastName}
                            </h4>
                            <h5>Senior Doctor</h5>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-7 col-md-7 d-flex align-items-center">
                        <div className="follow-group pe-5">
                            <div className="doctor-follows">
                            <h5>Fee</h5>
                            <h4>{doctor?.feePerConsultation}</h4>
                          </div>
                          <div className="doctor-follows">
                            <h5>Appointment</h5>
                            <h4>1250</h4>
                          </div>
                          <div className="doctor-follows">
                            <h5>Patients</h5>
                            <h4>850</h4>
                          </div>
                          <div className="doctor-follows">
                            <h5>Operation</h5>
                            <h4>180</h4>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-3 col-md-3 d-flex align-items-center"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-4">
              <div className="doctor-personals-grp">
                <div className="card">
                  <div className="card-body">
                    <div className="heading-detail ">
                      <h4 className="mb-3">About me</h4>
                      <p>
                        Hello I am {doctor?.title}. {doctor?.firstName} {doctor?.lastName} a {doctor?.specialization} in {doctor?.address}. I love to work with all my hospital
                        staff and seniour doctors.
                      </p>
                    </div>
                    <div className="about-me-list">
                      <ul className="list-space">
                        <li>
                          <h4>Gender</h4>
                          <span>Male</span>
                        </li>
                        <li>
                          <h4>Experience</h4>
                          <span>15 Years plus</span>
                        </li>
                        <li>
                          <h4>Specialization</h4>
                          <span>{doctor?.specialization}</span>
                        </li>
                        <li>
                          <h4>Timing</h4>
                          <span>{moment(doctor?.start,'HHmm').format("hh:mm a")} -  {moment(doctor?.end,'HHmm').format("hh:mm a")}</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="doctor-personals-grp">
                <div className="card">
                  <div className="card-body">
                    <div className="heading-detail">
                      <h4>Skills:</h4>
                    </div>
                    <div className="skill-blk">
                      <div className="skill-statistics">
                        <div className="skills-head">
                          <h5>Operations</h5>
                          <p>45%</p>
                        </div>
                        <div className="progress mb-0">
                          <div
                            className="progress-bar bg-operations"
                            role="progressbar"
                            style={{ width: `45%` }}
                            aria-valuenow="45"
                            aria-valuemin="0"
                            aria-valuemax="100"
                          ></div>
                        </div>
                      </div>
                      <div className="skill-statistics">
                        <div className="skills-head">
                          <h5>Patient Care</h5>
                          <p>85%</p>
                        </div>
                        <div className="progress mb-0">
                          <div
                            className="progress-bar bg-statistics"
                            role="progressbar"
                            style={{ width: `85%` }}
                            aria-valuenow="85"
                            aria-valuemin="0"
                            aria-valuemax="100"
                          ></div>
                        </div>
                      </div>
                      <div className="skill-statistics">
                        <div className="skills-head">
                          <h5>Endoscopic </h5>
                          <p>65%</p>
                        </div>
                        <div className="progress mb-0">
                          <div
                            className="progress-bar bg-endoscopic"
                            role="progressbar"
                            style={{ width: `65%` }}
                            aria-valuenow="65"
                            aria-valuemin="0"
                            aria-valuemax="100"
                          ></div>
                        </div>
                      </div>
                      <div className="skill-statistics">
                        <div className="skills-head">
                          <h5>Patient Visit </h5>
                          <p>90%</p>
                        </div>
                        <div className="progress mb-0">
                          <div
                            className="progress-bar bg-visit"
                            role="progressbar"
                            style={{ width: `90%` }}
                            aria-valuenow="90"
                            aria-valuemin="0"
                            aria-valuemax="100"
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="doctor-personals-grp">
                <div className="card">
                  <div className="card-body">
                    <div className="heading-detail">
                      <h4>Speciality</h4>
                    </div>
                    <div className="personal-activity">
                      <div className="personal-icons status-grey">
                        <img src="/img/icons/medal-01.svg" alt="" />
                      </div>
                      <div className="views-personal">
                        <h4>Proffesionals</h4>
                        <h5>Certified Skin Treatment</h5>
                      </div>
                    </div>
                    <div className="personal-activity">
                      <div className="personal-icons status-green">
                        <img src="/img/icons/medal-02.svg" alt="" />
                      </div>
                      <div className="views-personal">
                        <h4>Certified</h4>
                        <h5>Cold Laser Operation</h5>
                      </div>
                    </div>
                    <div className="personal-activity mb-0">
                      <div className="personal-icons status-orange">
                        <img src="/img/icons/medal-03.svg" alt="" />
                      </div>
                      <div className="views-personal">
                        <h4>Medication Laser</h4>
                        <h5>Hair Lose Product</h5>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-8">
              <div className="doctor-personals-grp">
                  <div className="card">
                      <div className="card-body">
                          <div className="personal-list-out">
                              <div className="row">
                                  <div className="col-xl-3 col-md-6">
                                      <div className="detail-personal">
                                          <h2>Full Name</h2>
                                          <h3>{doctor?.title}. {doctor?.firstName}{" "}{doctor?.lastName}</h3>
                                      </div>
                                  </div>
                                  <div className="col-xl-3 col-md-6">
                                      <div className="detail-personal">
                                          <h2>Mobile No</h2>
                                          <h3>{doctor?.phone}</h3>
                                      </div>
                                  </div>
                                  <div className="col-xl-3 col-md-6">
                                      <div className="detail-personal">
                                          <h2>Email Address</h2>
                                          <h3>
                                              <Link to="#">[Email Protected]</Link>
                                          </h3>
                                      </div>
                                  </div>
                                  <div className="col-xl-3 col-md-6">
                                      <div className="detail-personal">
                                          <h2>Location</h2>
                                          <h3>Lahore</h3>
                                      </div>
                                  </div>
                              </div>
                          </div>
                          <div className="row">
                              {
                                error !== "" ?
                                <div className="col-md-12"><div className='alert alert-danger mb-4'><div className='alert-text'>{error}</div></div></div>
                                : <></>
                              }
                              {
                                success !== "" ?
                                <div className="col-md-12"><div className='alert alert-success mb-4'><div className='alert-text'>{success}</div></div></div>
                                : <></>
                              }
                              <div className="col-lg-12">
                                  <div className="form-heading">
                                      <h4>Book Appointment</h4>
                                  </div>
                              </div>
                              <div className="col-12 col-md-12 col-xl-12">
                                  <div className="form-group local-forms">
                                      <label>Date of Appointment <span className="login-danger">*</span></label>
                                      <input 
                                          defaultValue={moment(date, "YYYY-MM-DD").format("YYYY-MM-DD")} 
                                          onChange={(e) => setDate(moment(e.target.value, "YYYY-MM-DD").format('YYYY-MM-DD'))} 
                                          className="form-control" 
                                          type="date" 
                                          format="YYYY-MM-DD" 
                                          min={today}
                                      />
                                  </div>
                              </div>
                              <div className="col-12 col-md-12 col-xl-12">
                                  <div className="form-group local-forms">
                                      <label>Appointment Timing <span className="login-danger">*</span></label>
                                      <input 
                                          className="form-control" 
                                          type="time" 
                                          format="HH:mm"
                                          value={time}
                                          onChange={(e) => setTime(e.target.value)}
                                      />
                                  </div>
                              </div>
                              <div className="col-12 col-md-12 col-xl-12">
                                  <div className="form-group mb-3">
                                      <button className="btn btn-primary btn-block py-2" type="button" onClick={checkAvaiability}>
                                          Check Availability
                                      </button>
                                  </div>
                                  {
                                    isAvailable &&
                                    <div className="form-group">
                                        <button className="btn btn-success btn-block py-2" type="button" onClick={handleBookAppointment}>
                                            Book Appointment
                                        </button>
                                    </div>
                                  }
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BookingPage;

import React, {useState} from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import axios from 'axios'

const ApplyDoctor = () => {

    const { user } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [title, setTitle] = useState("Dr");
    const [firstName, setFirstName] = useState("");
    const [lastName, setlastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [website, setWebsite] = useState("");
    const [address, setAddress] = useState("");
    const [specialization, setSpecialization] = useState("Cardiologist");
    const [experience, setExperience] = useState("");
    const [fee, setFee] = useState(0);
    const [timing1, setTiming1] = useState("20:00");
    const [timing2, setTiming2] = useState("23:59");
    
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleSubmit = async ()=> {
        const values = {
            userId: user._id,
            title:title, 
            firstName: firstName, 
            lastName: lastName, 
            email:email,
            phone:phone,
            website:website,
            address:address,
            experience:experience,
            feePerConsultation:fee,
            specialization: specialization,
            start:timing1, 
            end:timing2
        }

        setSuccess("");
        setError("");
        
        try {
            dispatch(showLoading())
            const res = await axios.post('/api/v1/user/apply-doctor', {...values, userId: user._id}, {
                headers:{
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            dispatch(hideLoading())
            if(res.data.success) {
                setSuccess(res.data.message);
                setTimeout(() => {
                    navigate("/");
                }, 2500);
            } else {
                setError(res.data.message);
            }
        } catch (error) {
            dispatch(hideLoading());
           console.log(error);
           setError("Something went wrong"); 
        }
    }

  return (
    <Layout>
      <div className="page-header">
        <div className="row">
          <div className="col-sm-12">
            <ul className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/doctors">Doctors </Link>
              </li>
              <li className="breadcrumb-item">
                <i className="feather-chevron-right"></i>
              </li>
              <li className="breadcrumb-item active">Add Doctor</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-sm-12">
          <div className="card">
            <div className="card-body">
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

                    <div className="col-md-12">
                        <div className="form-heading">
                            <h4>Doctor Details</h4>
                        </div>
                    </div>
                    
                    <div className="col-12 col-md-6 col-xl-4">
                        <div className="form-group local-forms">
                            <label>Title <span className="login-danger">*</span></label>
                            <select
                                className="form-control" 
                                name="title" 
                                defaultValue={title}
                                onChange={(e) => setTitle(e.target.value)}
                            >
                                <option value="Dr">Dr</option>
                                <option value="Professor">Professor</option>
                            </select>
                        </div>
                    </div>

                    <div className="col-12 col-md-6 col-xl-4">
                        <div className="form-group local-forms">
                            <label>First Name <span className="login-danger">*</span></label>
                            <input 
                                className="form-control" 
                                name="firstName" 
                                type="text" 
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="col-12 col-md-6 col-xl-4">
                        <div className="form-group local-forms">
                            <label>Last Name <span className="login-danger">*</span></label>
                            <input 
                                className="form-control" 
                                name="lastName" 
                                type="text" 
                                value={lastName}
                                onChange={(e) => setlastName(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="col-12 col-md-6 col-xl-4">
                        <div className="form-group local-forms">
                            <label>Email Address <span className="login-danger">*</span></label>
                            <input 
                                className="form-control" 
                                name="email" 
                                type="email" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="col-12 col-md-6 col-xl-4">
                        <div className="form-group local-forms">
                            <label>Phone no <span className="login-danger">*</span></label>
                            <input 
                                className="form-control" 
                                name="phone" 
                                type="text" 
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="col-12 col-md-6 col-xl-4">
                        <div className="form-group local-forms">
                            <label>Website</label>
                            <input 
                                className="form-control" 
                                name="website" 
                                type="text" 
                                value={website}
                                onChange={(e) => setWebsite(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="col-12">
                        <div className="form-group local-forms">
                            <label>Address <span className="login-danger">*</span></label>
                            <textarea 
                                className="form-control" 
                                name="address" 
                                rows="3" 
                                cols="30"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                            ></textarea>
                        </div>
                    </div>

                    <div className="col-12 col-md-6 col-xl-4">
                        <div className="form-group local-forms">
                            <label>Specialization <span className="login-danger">*</span></label>
                            <select
                                className="form-control" 
                                name="specialization" 
                                defaultValue={specialization}
                                onChange={(e) => setSpecialization(e.target.value)}
                            >
                                <option value="Cardiologist">Cardiologist</option>
                                <option value="Child Specialist">Child Specialist</option>
                                <option value="Dermatologist">Dermatologist</option>
                                <option value="Family Physician">Family Physician</option>
                                <option value="General Physician">General Physician</option>
                                <option value="Gastroenterologist">Gastroenterologist</option>
                                <option value="Gynacologist">Gynacologist</option>
                                <option value="Hematologist">Hematologist</option>
                                <option value="Neurologist">Neurologist</option>
                                <option value="Orthopedics">Orthopedics</option>
                                <option value="Radiologist">Radiologist</option>
                                <option value="Urologist">Urologist</option>
                            </select>
                        </div>
                    </div>

                    <div className="col-12 col-md-6 col-xl-4">
                        <div className="form-group local-forms">
                            <label>Experience <span className="login-danger">*</span></label>
                            <input 
                                className="form-control" 
                                name="experience" 
                                type="text" 
                                value={experience}
                                onChange={(e) => setExperience(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="col-12 col-md-6 col-xl-4">
                        <div className="form-group local-forms">
                            <label>Consultation Fee <span className="login-danger">*</span></label>
                            <select
                                className="form-control" 
                                name="title" 
                                defaultValue={fee}
                                onChange={(e) => setFee(e.target.value)}
                            >
                                <option value="0">Free</option>
                                <option value="500">500</option>
                                <option value="1000">1000</option>
                                <option value="1500">1500</option>
                                <option value="2000">2000</option>
                                <option value="3000">3000</option>
                                <option value="4000">4000</option>
                                <option value="5000">5000</option>
                            </select>
                        </div>
                    </div>

                    <div className="col-12 col-md-6 col-xl-4">
                        <div className="form-group local-forms">
                            <label>Timing <span className="login-danger">*</span></label>
                            <div className="form-control d-flex justify-content-between">
                                <input 
                                    name="timing1" 
                                    type="time"
                                    format="HH:mm" 
                                    size="10"
                                    placeholder="Start Time"
                                    className="border-0"
                                    value={timing1}
                                    onChange={(e) => setTiming1(e.target.value)}
                                />
                                
                                <div className="ant-picker-range-separator"><svg viewBox="0 0 1024 1024" focusable="false" data-icon="swap-right" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M873.1 596.2l-164-208A32 32 0 00684 376h-64.8c-6.7 0-10.4 7.7-6.3 13l144.3 183H152c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h695.9c26.8 0 41.7-30.8 25.2-51.8z"></path></svg></div>
                                <input 
                                    name="timing2" 
                                    type="time"
                                    format="HH:mm" 
                                    size="10"
                                    placeholder="End Time"
                                    className="border-0"
                                    value={timing2}
                                    onChange={(e) => setTiming2(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="col-12 col-md-6 col-xl-8">
                        <div className="doctor-submit text-end">
                            <button 
                                type="submit" 
                                className="btn btn-primary submit-form me-2"
                                onClick={handleSubmit}
                            >
                                Submit
                            </button>
                            <button 
                                type="button" 
                                className="btn btn-primary cancel-form"
                            >
                                Cancel
                            </button>
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

export default ApplyDoctor;

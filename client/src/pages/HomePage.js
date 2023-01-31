import React, {useState,useEffect} from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import Layout from '../components/Layout';
import DoctorList from '../components/DoctorList';

const HomePage = () => {

    const [user, setUser] = useState([]);
    const [doctors, setDoctors] = useState([]);

    // login user data
    const getUserData = async () => {
        try {
            const res = await axios.post('/api/v1/user/getUserData',{},{
                headers: {
                    Authorization: "Bearer " + localStorage.getItem('token')
                }
            })
            if(res.data.success) {
              setUser(res.data.data)
            }
        } catch (error) {
            console.log(error)
        }
    }


    // Get All Doctors Data
    const getAllDoctors = async () => {
        try {
            const res = await axios.get(
              '/api/v1/user/getDoctors', 
              {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem('token')
                }
              }
            );
            if(res.data.success) {
              setDoctors(res.data.data)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getUserData();
        getAllDoctors();
    }, []);
    
    return (
        <Layout>
          <div className="page-header">
            <div className="row">
              <div className="col-sm-12">
                <ul className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/">Dashboard </Link>
                  </li>
                  <li className="breadcrumb-item">
                    <i className="feather-chevron-right"></i>
                  </li>
                  <li className="breadcrumb-item active">Dashboard page</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="good-morning-blk">
            <div className="row">
              <div className="col-md-6">
                <div className="morning-user">
                  <h2>Hello <span>{user?.name}</span></h2>
                  <p>Have a nice day at work</p>
                </div>
              </div>
              <div className="col-md-6 position-blk">
                <div className="morning-img">
                  <img src="/img/morning-img-01.png" alt="" />
                </div>
              </div>
            </div>
          </div>

          <div className='row'>

            {/* <div className="col-md-6 col-sm-6 col-lg-6 col-xl-6">
              <div className="dash-widget">

                <div className="activity-top">
                  <div className="dash-boxs comman-flex-center me-3">
                    <img src="/img/icons/profile-add.svg" alt="" />
                  </div>
                  <div className="departments-list">
                    <h4>Dr. Tariq Mahmood</h4>
                    <p>Tariq Hospital, Misri Shah Lahore.</p>
                  </div>
                </div>

                <div className="activity-top">
                  <div className="dash-boxs comman-flex-center me-3">
                    <img src="/img/icons/dep-icon-01.svg" alt="" />
                  </div>
                  <div className="departments-list">
                    <h4>Specialization</h4>
                    <p>General Physition</p>
                  </div>
                </div>

                <div className="activity-top">
                  <div className="dash-boxs comman-flex-center me-3">
                    <img src="/img/icons/calendar.svg" alt="" />
                  </div>
                  <div className="departments-list">
                    <h4>Experience</h4>
                    <p>15 Years plus</p>
                  </div>
                </div>

                <div className="activity-top">
                  <div className="dash-boxs comman-flex-center me-3">
                    <img src="/img/icons/empty-wallet.svg" alt="" />
                  </div>
                  <div className="departments-list">
                    <h4>Consultation Fee</h4>
                    <p>1500</p>
                  </div>
                </div>

                <div className="activity-top">
                  <div className="dash-boxs comman-flex-center me-3">
                    <img src="/img/icons/clock2.svg" alt="" />
                  </div>
                  <div className="departments-list">
                    <h4>Clinic Timing</h4>
                    <p>08:00PM - 11:30PM</p>
                  </div>
                </div>

                <button className="btn btn-primary">Get Appointment</button>
                
              </div>
            </div> */}

            {
              doctors && doctors.map(doctor => (
                <DoctorList key="docs9897" doctor={doctor} />
              ))
            }

          </div>

        </Layout>
    );
}

export default HomePage;
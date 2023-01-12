import React, {useEffect} from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import Layout from '../components/Layout';

const HomePage = () => {

    // login user data
    const getUserData = async () => {
        try {
            const res = await axios.post('/api/v1/user/geyUserData',{},{
                headers: {
                    Authorization: "Bearer " + localStorage.getItem('token')
                }
            })
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getUserData();
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
                  <li className="breadcrumb-item active">Admin Dashboard</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="good-morning-blk">
            <div className="row">
              <div className="col-md-6">
                <div className="morning-user">
                  <h2>Good Morning, <span>Shahbaz Mughal</span></h2>
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
          <div className="row">
            <div className="col-md-6 col-sm-6 col-lg-6 col-xl-3">
              <div className="dash-widget">
                <div className="dash-boxs comman-flex-center">
                  <img src="/img/icons/calendar.svg" alt="" />
                </div>
                <div className="dash-content dash-count">
                  <h4>Appointments</h4>
                  <h2><span className="counter-up">250</span></h2>
                  <p>
                    <span className="passive-view"
                      ><i className="feather-arrow-up-right me-1"></i>40%</span>
                    vs last month
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-sm-6 col-lg-6 col-xl-3">
              <div className="dash-widget">
                <div className="dash-boxs comman-flex-center">
                  <img src="/img/icons/profile-add.svg" alt="" />
                </div>
                <div className="dash-content dash-count">
                  <h4>New Patients</h4>
                  <h2><span className="counter-up">140</span></h2>
                  <p>
                    <span className="passive-view"
                      ><i className="feather-arrow-up-right me-1"></i>20%</span>
                    vs last month
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-sm-6 col-lg-6 col-xl-3">
              <div className="dash-widget">
                <div className="dash-boxs comman-flex-center">
                  <img src="/img/icons/scissor.svg" alt="" />
                </div>
                <div className="dash-content dash-count">
                  <h4>Operations</h4>
                  <h2><span className="counter-up">56</span></h2>
                  <p>
                    <span className="negative-view"
                      ><i className="feather-arrow-down-right me-1"></i>15%</span>
                    vs last month
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-sm-6 col-lg-6 col-xl-3">
              <div className="dash-widget">
                <div className="dash-boxs comman-flex-center">
                  <img src="/img/icons/empty-wallet.svg" alt="" />
                </div>
                <div className="dash-content dash-count">
                  <h4>Earnings</h4>
                  <h2>$<span className="counter-up"> 20,250</span></h2>
                  <p>
                    <span className="passive-view"
                      ><i className="feather-arrow-up-right me-1"></i>30%</span>
                    vs last month
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Layout>
    );
}

export default HomePage;
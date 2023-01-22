import React, {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { useSelector, useDispatch } from 'react-redux';
import { showLoading, hideLoading } from '../redux/features/alertSlice';
import axios from 'axios'

const NotificationPage = ()=> {

    const {user} = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();

    const handleMarkAllRead = async () => {
        try {
            dispatch(showLoading());
            const res = await axios.post('/api/v1/user/get-all-notifications', {userId: user._id}, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem('token')
                }
            });
            dispatch(hideLoading());
            if(res.data.success) {
                setSuccess(res.data.message)
            } else {
                setError(res.data.message)
            }
        } catch (error) {
            dispatch(hideLoading());
            console.log(error);
        }
    }
    const markAllUnread = async() => {
        try {
            dispatch(showLoading());
            const res = await axios.post('/api/v1/user/delete-all-notification', {userId: user._id}, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem('token')
                }
            });
            dispatch(hideLoading());
            if (res.data.success) {
                setSuccess(res.data.message);
              } else {
                setError(res.data.message);
              }
        } catch (error) {
                dispatch(hideLoading());
                console.log(error);
        }
    }

    return (
        <Layout>
            
            <div className="page-header">
                <div className="row">
                    <div className="col-sm-12">
                        <ul className="breadcrumb">
                            <li className="breadcrumb-item"><Link to="/notification">Notifications </Link></li>
                            <li className="breadcrumb-item"><i className="feather-chevron-right"></i></li>
                            <li className="breadcrumb-item active">User Notifications</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-body">
                            <div className="activity">
                                <div className="activity-box">

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

                                    <div className="profile-tabs">
                                        <ul className="nav nav-tabs nav-tabs-bottom">
                                            <li className="nav-item"><a className="nav-link active" href="#about-cont" data-bs-toggle="tab">Unread</a></li>
                                            <li className="nav-item"><a className="nav-link" href="#bottom-tab2" data-bs-toggle="tab">Read</a></li>
                                        </ul>
                                        <div className="tab-content">
                                            <div className="tab-pane active" id="about-cont">
                                                {
                                                    user && user?.notification.length > 0 ?
                                                    <>
                                                    <h5 className='text-link text-info' onClick={handleMarkAllRead}>
                                                        Mark all Read
                                                    </h5>
                                                    {
                                                        user?.notification.map((notifiMsg, n) => (
                                                            <div className="comman-activitys flex-grow-1 text-link mb-5" key={n}>
                                                                <h3><span>{notifiMsg?.message}</span></h3>
                                                                <p>User Notification (Added by: {notifiMsg.name})</p>
                                                            </div>
                                                        ))
                                                    }
                                                    </>
                                                    : 
                                                    <>
                                                        <div className="comman-activitys flex-grow-1 text-link">
                                                            <h3>Unread <span>Notification Empty!</span></h3>
                                                            <p>No data available!</p>
                                                        </div>
                                                    </>
                                                }
                                            </div>
                                            <div className="tab-pane" id="bottom-tab2">
                                                {
                                                    user && user?.seennotification.length > 0 ?
                                                    <>
                                                    <h5 className='text-link text-info' onClick={markAllUnread}>
                                                        Delete all Unread
                                                    </h5>
                                                    {
                                                        user?.seennotification.map((notifiMsg, index) => (
                                                            <div className="comman-activitys flex-grow-1 text-link mb-5" key={index}>
                                                                <h3><span>{notifiMsg?.message}</span></h3>
                                                                <p>User Notification (Added by: {notifiMsg.name})</p>
                                                            </div>
                                                        ))
                                                    }
                                                    </>
                                                    : 
                                                    <>
                                                        <div className="comman-activitys flex-grow-1 text-link">
                                                            <h3>Read <span>Notification Empty!</span></h3>
                                                            <p>No data available!</p>
                                                        </div>
                                                    </>
                                                }
                                            </div>
                                        </div>
                                    </div>

                                    {/* <div className="comman-activitys flex-grow-1">
                                        <h3><span> Completed the Patient visit at Glory Hospital in Florida, USA .</span></h3>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod</p>
                                    </div> */}

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </Layout>
    );
}

export default NotificationPage;
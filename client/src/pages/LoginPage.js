import React, {useState} from 'react';
import { Link, useNavigate } from "react-router-dom";
import {useDispatch} from 'react-redux'
import { showLoading, hideLoading } from '../redux/features/alertSlice';
import axios from 'axios'
import '../styles/style.css'

const LoginPage = () => {
    
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const submitForm = async () => {
        setError("");
        const data = {email: email, password: password};
        try{
            dispatch(showLoading());
            const res = await axios.post(`/api/v1/user/login`, data);
            dispatch(hideLoading());
            if(res.data.success) {
                localStorage.setItem('token', res.data.token);
                setSuccess("Login successfully")
                setTimeout(() => {
                    navigate('/')
                    setSuccess("")
                }, 2000);
            } else {
                setSuccess("");
                setError(res.data.message)
            }
        } catch (error) {
            dispatch(hideLoading());
            console.log(error)
            setError("Something went wrong.");
        }
    }

    return (
        <div className="main-wrapper login-body">
            <div className="container-fluid px-0">
                <div className="row">
                    <div className="col-lg-6 login-wrap">
                        <div className="login-sec">
                            <div className="log-img">
                                <img
                                className="img-fluid"
                                src="/img/login-02.png"
                                alt="Logo"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6 login-wrap-bg">
                        <div className="login-wrapper">
                            <div className="loginbox">
                                <div className="login-right">
                                    <div className="login-right-wrap">
                                        <div className="account-logo">
                                            <Link to="/login">
                                                <img src="/img/login-logo.png" alt="Logo" />
                                            </Link>
                                        </div>
                                        <h2 className='mb-4'>Login Form</h2>

                                        <form>
                                            {
                                                error &&
                                                <div className='alert alert-danger mb-4'>
                                                    <div className='alert-text'>{error}</div>
                                                </div>
                                            }
                                            {
                                                success &&
                                                <div className='alert alert-success mb-4'>
                                                    <div className='alert-text'>{success}</div>
                                                </div>
                                            }
                                            <div className="form-group">
                                                <label>Email <span className="login-danger">*</span></label>
                                                <input 
                                                    name="email" 
                                                    className="form-control" 
                                                    type="email" 
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    value={email}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label
                                                >Password <span className="login-danger">*</span></label>
                                                <input 
                                                    name="password" 
                                                    type="password" 
                                                    className="form-control pass-input"
                                                    onChange={(e) => setPassword(e.target.value)}
                                                    value={password}
                                                />
                                                <span
                                                className="profile-views feather-eye-off toggle-password"
                                                ></span>
                                            </div>
                                            <div className="form-group login-btn">
                                                <button className="btn btn-primary btn-block" type="button" onClick={submitForm}>
                                                Sign in
                                                </button>
                                            </div>
                                        </form>

                                        <div className="next-sign">
                                            <p className="account-subtitle">
                                                New User? Register Here. <Link to="/register">Register</Link>
                                            </p>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
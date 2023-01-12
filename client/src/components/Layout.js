import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AdminMenu, UserMenu } from "../data/data";
import { message } from "antd";
import { useSelector } from "react-redux";

function Layout({ children }) {

  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const SidebarMenu = user?.isAdmin ? AdminMenu : UserMenu;
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    message.success("Logout Successfully");
  };

  useEffect(() => {
        console.log(SidebarMenu)
      // console.log(location.pathname)
  }, [])

  const [mini, setMini] = useState("");
  const [sm1, setSm1] = useState("");
  const [sd1, setSd1] = useState("");
  const [sm2, setSm2] = useState("");
  const [sd2, setSd2] = useState("");
  const [sm3, setSm3] = useState("");
  const [sd3, setSd3] = useState("");

  const sm1Click =()=> {
    if(sm1 === ""){
        setSm1("subdrop");
        setSd1("show");
        setSm2("");
        setSd2("");
        setSm3("");
        setSd3("");
    } else {
        setSm1("");
        setSd1("");
    }
  }

  const sm2Click =()=> {
    if(sm2 === ""){
        setSm1("");
        setSd1("");
        setSm2("subdrop");
        setSd2("show");
        setSm3("");
        setSd3("");
    } else {
        setSm2("");
        setSd2("");
    }
  }

  const sm3Click =()=> {
    if(sm3 === ""){
        setSm1("");
        setSd1("");
        setSm2("");
        setSd2("");
        setSm3("subdrop");
        setSd3("show");
    } else {
        setSm3("");
        setSd3("");
    }
  }

  const toggleSidebar = () => {
    if (mini === "") {
      setMini("mini-sidebar");
    } else {
      setMini("");
    }
  };
  const toggleSidebar2 = () => {
    if (mini === "") {
      setMini("slide-nav");
    } else {
      setMini("");
    }
  };
  return (
    <div className={`body ${mini}`}>
      <div className="main-wrapper">
        <div className="header">
          <div className="header-left">
            <Link to="/" className="logo">
              <img src="/img/logo.png" width="35" height="35" alt="" />
              <span>Sam Clinic</span>
            </Link>
          </div>
          <div id="toggle_btn" className="text-link" onClick={toggleSidebar}>
            <img src="/img/icons/bar-icon.svg" alt="" />
          </div>
          <Link
            id="mobile_btn"
            className="mobile_btn float-start"
            to="#"  onClick={toggleSidebar2}
          >
            <img src="/img/icons/bar-icon.svg" alt="" />
          </Link>
          <ul className="nav user-menu float-end">
            <li className="nav-item dropdown d-none d-sm-block">
              <Link
                to="#"
                className="dropdown-toggle nav-link"
                data-bs-toggle="dropdown"
              >
                <img src="/img/icons/note-icon-01.svg" alt="" />
                <span className="pulse"></span>
              </Link>
              <div className="dropdown-menu notifications">
                <div className="topnav-dropdown-header">
                  <span>Notifications</span>
                </div>
                <div className="drop-scroll">
                  <ul className="notification-list">
                    <li className="notification-message">
                      <Link to="/">
                        <div className="media">
                          <span className="avatar">
                            <img
                              alt="John Doe"
                              src="/img/user.jpg"
                              className="img-fluid"
                            />
                          </span>
                          <div className="media-body">
                            <p className="noti-details">
                              <span className="noti-title">John Doe</span> added
                              new task
                              <span className="noti-title">
                                Patient appointment booking
                              </span>
                            </p>
                            <p className="noti-time">
                              <span className="notification-time">
                                4 mins ago
                              </span>
                            </p>
                          </div>
                        </div>
                      </Link>
                    </li>
                    <li className="notification-message">
                      <Link to="/">
                        <div className="media">
                          <span className="avatar">V</span>
                          <div className="media-body">
                            <p className="noti-details">
                              <span className="noti-title">
                                Tarah Shropshire
                              </span>
                              changed the task name
                              <span className="noti-title">
                                Appointment booking with payment gateway
                              </span>
                            </p>
                            <p className="noti-time">
                              <span className="notification-time">
                                6 mins ago
                              </span>
                            </p>
                          </div>
                        </div>
                      </Link>
                    </li>
                    <li className="notification-message">
                      <Link to="/">
                        <div className="media">
                          <span className="avatar">L</span>
                          <div className="media-body">
                            <p className="noti-details">
                              <span className="noti-title">Misty Tison</span>{" "}
                              added
                              <span className="noti-title">
                                Domenic Houston
                              </span>{" "}
                              and
                              <span className="noti-title">
                                Claire Mapes
                              </span>{" "}
                              to project
                              <span className="noti-title">
                                Doctor available module
                              </span>
                            </p>
                            <p className="noti-time">
                              <span className="notification-time">
                                8 mins ago
                              </span>
                            </p>
                          </div>
                        </div>
                      </Link>
                    </li>
                    <li className="notification-message">
                      <Link to="/">
                        <div className="media">
                          <span className="avatar">G</span>
                          <div className="media-body">
                            <p className="noti-details">
                              <span className="noti-title">Rolland Webber</span>
                              completed task
                              <span className="noti-title">
                                Patient and Doctor video conferencing
                              </span>
                            </p>
                            <p className="noti-time">
                              <span className="notification-time">
                                12 mins ago
                              </span>
                            </p>
                          </div>
                        </div>
                      </Link>
                    </li>
                    <li className="notification-message">
                      <Link href="/">
                        <div className="media">
                          <span className="avatar">V</span>
                          <div className="media-body">
                            <p className="noti-details">
                              <span className="noti-title">
                                Bernardo Galaviz
                              </span>
                              added new task
                              <span className="noti-title">
                                Private chat module
                              </span>
                            </p>
                            <p className="noti-time">
                              <span className="notification-time">
                                2 days ago
                              </span>
                            </p>
                          </div>
                        </div>
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="topnav-dropdown-footer">
                  <Link href="/">View all Notifications</Link>
                </div>
              </div>
            </li>
            <li className="nav-item dropdown has-arrow user-profile-list">
              <Link
                href="/"
                className="dropdown-toggle nav-link user-link"
                data-bs-toggle="dropdown"
              >
                <div className="user-names">
                  <h5>{user?.name}</h5>
                  <span>{user?.email}</span>
                </div>
                <span className="user-img">
                  <img src="/img/sam.jpg" alt="Admin" />
                </span>
              </Link>
              <div className="dropdown-menu">
                <Link className="dropdown-item" to="#">
                  My Profile
                </Link>
                <Link className="dropdown-item" to="#">
                  Edit Profile
                </Link>
                <Link className="dropdown-item" to="#">
                  Settings
                </Link>
                <Link className="dropdown-item" to="/login" onClick={handleLogout}>
                  Logout
                </Link>
              </div>
            </li>
            <li className="nav-item">
              <Link to="#" className="hasnotifications nav-link">
                <img src="/img/icons/setting-icon-01.svg" alt="" />
              </Link>
            </li>
          </ul>
          <div className="dropdown mobile-user-menu float-end">
            <Link
              to="#"
              className="dropdown-toggle"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i className="fa-solid fa-ellipsis-vertical"></i>
            </Link>
            <div className="dropdown-menu dropdown-menu-end">
              <Link className="dropdown-item" to="/">
                My Profile
              </Link>
              <Link className="dropdown-item" to="/">
                Edit Profile
              </Link>
              <Link className="dropdown-item" to="/">
                Settings
              </Link>
              <Link className="dropdown-item" to="/">
                Logout
              </Link>
            </div>
          </div>
        </div>

        <div className="sidebar" id="sidebar">
          <div className="sidebar-inner slimscroll">
            <div id="sidebar-menu" className="sidebar-menu">
              <ul>
                <li className="menu-title">Main Menu</li>
                {SidebarMenu.map((menu, i) => {
                  const isActive = location.pathname === menu.path;
                  return (
                    <li className="submenu" key={i}>
                      <Link to={menu.path} className={`menu-item ${isActive && "active"}`}>
                        <span className="menu-side">
                          <i className={`fa ${menu.icon}`} alt={menu.name} ></i>
                        </span>{" "}
                        <span> {menu.name} </span>{" "}
                      </Link>
                    </li>
                  );
                })}
                
                <li className="submenu">
                  <Link to="#" className={sm1} onClick={sm1Click}>
                    <span className="menu-side">
                      <img src="/img/icons/menu-icon-02.svg" alt="" />
                    </span>
                    <span> Doctors </span> <span className="menu-arrow"></span>
                  </Link>
                  <ul className={sd1}>
                    <li>
                      <Link to="/">Doctor List</Link>
                    </li>
                    <li>
                      <Link to="/">Add Doctor</Link>
                    </li>
                    <li>
                      <Link to="/">Edit Doctor</Link>
                    </li>
                    <li>
                      <Link to="/">Doctor Profile</Link>
                    </li>
                  </ul>
                </li>
                <li className="submenu">
                  <Link href="#" className={sm2} onClick={sm2Click}>
                    <span className="menu-side">
                      <img src="/img/icons/menu-icon-03.svg" alt="" />
                    </span>{" "}
                    <span>Patients </span> <span className="menu-arrow"></span>
                  </Link>
                  <ul className={sd2}>
                    <li>
                      <Link to="/">Patients List</Link>
                    </li>
                    <li>
                      <Link to="/">Add Patients</Link>
                    </li>
                    <li>
                      <Link to="/">Edit Patients</Link>
                    </li>
                    <li>
                      <Link to="/">Patients Profile</Link>
                    </li>
                  </ul>
                </li>
                <li className="submenu">
                  <Link to="#" className={sm3} onClick={sm3Click}>
                    <span className="menu-side">
                      <img src="/img/icons/menu-icon-04.svg" alt="" />
                    </span>
                    <span> Appointments </span>{" "}
                    <span className="menu-arrow"></span>
                  </Link>
                  <ul className={sd3}>
                    <li>
                      <Link to="/">Appointment List</Link>
                    </li>
                    <li>
                      <Link to="/">Book Appointment</Link>
                    </li>
                    <li>
                      <Link to="/">Edit Appointment</Link>
                    </li>
                  </ul>
                </li>
                <li className="submenu" onClick={handleLogout}>
                  <Link href="/login">
                    <span className="menu-side">
                      <img src="/img/icons/logout.svg" alt="Logout" />
                    </span>
                    <span>Logout</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="page-wrapper">
            <div className="content">
                {children}
            </div>
        </div>

      </div>
    </div>
  );
}

export default Layout;

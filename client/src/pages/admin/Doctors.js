import React, { useEffect, useState } from "react";
import Layout from "./../../components/Layout";
import axios from "axios";
import { message, Table } from "antd";
import { Link } from "react-router-dom";

const Doctors = () => {

    const [doctors, setDoctors] = useState([]);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    //getUsers
    const getDoctors = async () => {
        try {
        const res = await axios.get("/api/v1/admin/getAllDoctors", {
            headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
        if (res.data.success) {
            setDoctors(res.data.data);
        }
        } catch (error) {
        console.log(error);
        }
    };

    // handle account
    const handleAccountStatus = async (record, status) => {
        try {
        const res = await axios.post(
            "/api/v1/admin/changeAccountStatus",
            { doctorId: record._id, userId: record.userId, status: status },
            {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            }
        );
        if (res.data.success) {
            setSuccess(res.data.message);
            window.location.reload();
        }
        } catch (error) {
          setError("Something went wrong");
        }
    };

    useEffect(() => {
        getDoctors();
    }, []);

    const columns = [
        {
          title: "Name",
          dataIndex: "name",
          render: (text, record) => (
            <span>
              {record.firstName} {record.lastName}
            </span>
          ),
        },
        {
          title: "Status",
          dataIndex: "status",
        },
        {
          title: "phone",
          dataIndex: "phone",
        },
        {
          title: "Actions",
          dataIndex: "actions",
          render: (text, record) => (
            <div className="d-flex">
              {record.status === "pending" ? (
                <button
                  className="btn btn-success btn-sm"
                  onClick={() => handleAccountStatus(record, "approved")}
                >
                  Approve
                </button>
              ) : (
                <button className="btn btn-danger btn-sm">Reject</button>
              )}
            </div>
          ),
        },
    ];

    return (
        <Layout>
            <div className="page-header">
                <div className="row">
                    <div className="col-sm-12">
                        <ul className="breadcrumb">
                        <li className="breadcrumb-item">
                            <Link to="/admin/doctors">Doctors </Link>
                        </li>
                        <li className="breadcrumb-item">
                            <i className="feather-chevron-right"></i>
                        </li>
                        <li className="breadcrumb-item active">Doctors List</li>
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
                                <Table columns={columns} dataSource={doctors} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>            
        </Layout>
    );
}

export default Doctors;
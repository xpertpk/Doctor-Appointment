import React, { useEffect, useState } from "react";
import Layout from "./../../components/Layout";
import axios from "axios";
import { Table } from "antd";
import { Link } from "react-router-dom";

const Users =()=> {

    const [users, setUsers] = useState([]);

    //getUsers
    const getUsers = async () => {
        try {
            const res = await axios.get("/api/v1/admin/getAllUsers", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            });
            if (res.data.success) {
                setUsers(res.data.data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getUsers();
    }, []);

    // antD table col
    const columns = [
        {
        title: "Name",
        dataIndex: "name",
        },
        {
        title: "Email",
        dataIndex: "email",
        },
        {
        title: "Doctor",
        dataIndex: "isDoctor",
        render: (text, record) => <span>{record.isDoctor ? "Yes" : "No"}</span>,
        },
        {
        title: "Actions",
        dataIndex: "actions",
        render: (text, record) => (
            <div className="d-flex">
            <button className="btn btn-danger btn-sm">Block</button>
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
                                <Table columns={columns} dataSource={users} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>            
        </Layout>
    );
}

export default Users;
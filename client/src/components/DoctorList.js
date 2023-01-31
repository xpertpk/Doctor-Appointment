import React from 'react';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

const DoctorList =({doctor})=> {

    const navigate = useNavigate();

    return (
        <div className="col-md-6 col-sm-6 col-lg-6 col-xl-6" key={doctor?._id}>
            <div className="dash-widget">

                <div className="activity-top">
                  <div className="dash-boxs comman-flex-center me-3">
                    <img src="/img/icons/profile-add.svg" alt="" />
                  </div>
                  <div className="departments-list">
                    <h4>{doctor?.title} {doctor?.firstName} {doctor?.lastName}</h4>
                    <p>{doctor?.address}</p>
                  </div>
                </div>

                <div className="activity-top">
                  <div className="dash-boxs comman-flex-center me-3">
                    <img src="/img/icons/dep-icon-01.svg" alt="" />
                  </div>
                  <div className="departments-list">
                    <h4>Specialization</h4>
                    <p>{doctor?.specialization}</p>
                  </div>
                </div>

                <div className="activity-top">
                  <div className="dash-boxs comman-flex-center me-3">
                    <img src="/img/icons/calendar.svg" alt="" />
                  </div>
                  <div className="departments-list">
                    <h4>Experience</h4>
                    <p>{doctor?.experience}</p>
                  </div>
                </div>

                <div className="activity-top">
                  <div className="dash-boxs comman-flex-center me-3">
                    <img src="/img/icons/empty-wallet.svg" alt="" />
                  </div>
                  <div className="departments-list">
                    <h4>Consultation Fee</h4>
                    <p>{doctor?.feePerConsultation}</p>
                  </div>
                </div>

                <div className="activity-top">
                  <div className="dash-boxs comman-flex-center me-3">
                    <img src="/img/icons/clock2.svg" alt="" />
                  </div>
                  <div className="departments-list">
                    <h4>Clinic Timing</h4>
                    <p className='text-uppercase'>
                        {moment(doctor?.start,'HHmm').format("hh:mm a")} - 
                        {moment(doctor?.end,'HHmm').format("hh:mm a")}
                    </p>
                  </div>
                </div>

                <button className="btn btn-primary ms-1 mb-3" onClick={() => navigate(`/doctor/book-appointment/${doctor?._id}`)}>
                    Get Appointment
                </button>

            </div>
        </div>
    );
}

export default DoctorList;
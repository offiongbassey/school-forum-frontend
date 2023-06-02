import React from 'react';
import {Link} from "react-router-dom";
import {MdOutlinePayment} from "react-icons/md";
import {BsCartCheck} from "react-icons/bs";
import {BiStore} from "react-icons/bi";
import {RiMoneyDollarCircleLine} from "react-icons/ri";
import {MdOutlineGppGood} from "react-icons/md";
import {CgProfile} from "react-icons/cg";
import "./Dashboard.css";
import { selectUserName } from '../../redux/features/auth/authSlice';
import { useSelector } from 'react-redux';


const StudentDashboard = () => {
    const userName = useSelector(selectUserName);
  return (
    <div>
      <div className='container dashboard-page'>
          <h4>Welcome, {userName}</h4>
          <div className='row'>
              <div className='col-md-6'>
                 
                <div className='dashboard-card'>
                    <MdOutlinePayment className='dashboard-icon' size={30} />
                    <h4>WHY USE THE ONLINE STORE?</h4>
                    <div className='description'>
                    <MdOutlineGppGood size={20} /> The Online Store is to enable students purchase items such as Text-Books, Manual, at ease. <br/>
                    <MdOutlineGppGood size={20} /> This Online Store eliminates the stress involved in paper work. Records of all the items being purchased are saved in the database with the students' data for reference purpose. 
                    </div>
                    <Link to="/account/store"> <button className='btn btn-primary'>Purchase New Item</button></Link>
                    

                </div>
              </div>
              <div className='col-md-6'>
                <div className='row'>
                    <div className='col-md-6'>
                        <div className='dashboard-card-split'>
                            <BsCartCheck className='dashboard-icon-split' size={30} />
                            <h4>ORDERS</h4>
                            <Link to="/account/my-orders"> <button className='btn btn-primary'>View Orders</button></Link>
                        </div>
                    </div>
                    <div className='col-md-6'>
                        <div className='dashboard-card-split'>
                            <BiStore className='dashboard-icon-split' size={30} />
                            <h4>STORE</h4>
                           <Link to="/account/store"> <button className='btn btn-primary'>View Store</button></Link>
                        </div>
                    </div>
                    <div className='col-md-6'>
                        <div className='dashboard-card-split'>
                            <RiMoneyDollarCircleLine className='dashboard-icon-split' size={30} />
                            <h4>TRANSACTIONS</h4>
                            <Link to="/account/transactions"><button className='btn btn-primary'>View Transactions</button></Link>
                        </div>
                    </div>
                    <div className='col-md-6'>
                        <div className='dashboard-card-split'>
                            <CgProfile className='dashboard-icon-split' size={30} />
                            <h4>PROFILE</h4>
                            <Link to="/account/profile"><button className='btn btn-primary'>View Profile</button></Link>
                        </div>
                    </div>
                </div>
              </div>

          </div>

      </div>
    </div>
  )
}

export default StudentDashboard

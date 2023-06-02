import React, { useEffect, useState } from 'react';
import { AiFillDollarCircle } from 'react-icons/ai';
import { FaUserTie, FaUsers } from 'react-icons/fa';
import { BsCart4 } from 'react-icons/bs';
import { getAdminValues } from '../../services/adminService';
import { SpinerImg } from '../../components/loader/Loader';
import { selectUserName } from '../../redux/features/auth/authSlice';
import { useSelector } from 'react-redux';

const AdminDashboard = () => {
 let data = null;
  const [sumOrder, setSumOrder] = useState(null);
  const [fundsWithdrawn, setFundsWithdrawn] = useState(null);
  const [totalBalance, setTotalBalance] = useState(null);
  const [totalProducts, setTotalProducts] = useState(null);
  const [totalLecturers, setTotalLecturers] = useState(null);
  const [totalStudents, setTotalStudents] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const userName = useSelector(selectUserName);

  useEffect(() => {
    async function getValues() {
        data = await getAdminValues();
        if(data){
          setSumOrder(data.sumOrder);
        setFundsWithdrawn(data.fundsWithdrawn);
        setTotalBalance(data.totalBalance);
        setTotalProducts(data.totalProducts);
        setTotalLecturers(data.totalLecturers);
        setTotalStudents(data.totalStudents);
        setIsLoading(false);
        }
        
    }
    getValues();
})
    

  const orderIcon = <AiFillDollarCircle size={20} color="#fff"/>;
  const productIcon = <BsCart4 size={20} color="#fff"/>;
  const lecturersIcon = <FaUserTie size={20} color="#fff"/>;
  const studetnsIcon = <FaUsers size={20} color="#fff"/>;
  const FirstRow = ({card, icon, title, count, desc}) => {
    return(
      <div className='col-md-3'>
      <div className='dashboard-card'>
        <span className={`info-icon ${card}`}>{icon}</span>
          <span className='info-text'>
          <p >{title}</p>
          <h4>{count}</h4>
          <b>{desc}</b>
        </span>
      </div>
  </div>
    )
  }
  const SecondRow = ({card, icon, title, count}) => {
    return(
      <div className='col-md-4'>
      <div className='dashboard-card'>
        <span className={`info-icon ${card}`}>{icon}</span>
          <span className='info-text'>
          <p >{title}</p>
          <h4>{count}</h4>
        </span>
      </div>
  </div>
    )
  }
  return (
    <div className='container'>
      <h4>Welcome, {userName}</h4>
      {isLoading && <SpinerImg />}
      {!isLoading ? (<>
      <div className='row'>
        
        <FirstRow card={"card1"} icon={orderIcon} title={"ORDERS"} count={sumOrder ? (
          sumOrder.map((data) => {
            return(<>{`₦${data.amount.toLocaleString(undefined, {maximumFactorDigits: 2})}`}</>)
          })          
          ) : (0)} desc={"Total Orders Generated"} />
        <FirstRow card={"card2"} icon={productIcon} title={"PRODUCTS"} count={totalProducts} desc={"Total Products Generated"} />
        <FirstRow card={"card3"} icon={lecturersIcon} title={"LECTURERS"} count={totalLecturers} desc={"Total Lecturers Registered"} />
        <FirstRow card={"card4"} icon={studetnsIcon} title={"STUDENTS"} count={totalStudents} desc={"Total Stduents Registered"} />
      </div>

      <div className='row'>
      <SecondRow card={"card3"} icon={orderIcon} title={"TOTAL FUNDS"} count={sumOrder ? (
          sumOrder.map((data) => {
            return(<>{`₦${data.amount.toLocaleString(undefined, {maximumFactorDigits: 2})}`}</>)
          })          
          ) : (0)}  />
        <SecondRow card={"card1"} icon={productIcon} title={"WITHDRAWN"} count={fundsWithdrawn ? (
          fundsWithdrawn.map((data) => {
            return(<>{`₦${data.amount.toLocaleString(undefined, {maximumFactorDigits: 2})}`}</>)
          })          
          ) : (0)} />
        <SecondRow card={"card2"} icon={lecturersIcon} title={"AVAILABLE"} count={totalBalance ? (
          totalBalance.map((data) => {
            return(<>{`₦${data.balance.toLocaleString(undefined, {maximumFactorDigits: 2})}`}</>)
          })          
          ) : (0)} />
      </div>
      </>)  : (<></>)}
    </div>
  )
}

export default AdminDashboard

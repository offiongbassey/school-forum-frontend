import React from 'react';
import "./InfoBox.css";

const InfoBox = ({bgColor, title, count, icon, extraInfo}) => {
  return (
    <div className='col-md-3'>
      <div className='dashboard-card'>
    {/* <div className={`info-box ${bgColor}`}> */}
      <span className={`info-icon ${bgColor}`}>{icon}</span>
      <span className='info-text'>
            <p >{title}</p>
            <h4>{count}</h4>
            <b>{extraInfo}</b>
      </span>
    {/* </div> */}
    </div>
    </div>
  )
}

export default InfoBox

import React from 'react';
import authImage from "../../assets/auth.jpg";

const Authimage = () => {
  return (
    <div className='col-md-6 image-section'>
              <div className='image'>
                  <img src={authImage} alt='account-usage' />
              </div>
    </div>
  )
}

export default Authimage

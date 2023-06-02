import React from 'react';
import "./auth.css";
const AuthContainer = ({children}) => {
  return (
    <div className='auth'>
    <div className='container'>
        <div className='row'>
            {children}
        </div>
    </div>
    </div>
  )
}

export default AuthContainer

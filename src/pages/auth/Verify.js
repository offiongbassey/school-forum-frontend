import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import AuthContainer from '../../components/auth/AuthContainer';
import Authimage from '../../components/auth/Authimage';
import Loader from '../../components/loader/Loader';
import { verifyEmail } from '../../services/authService';

const Verify = () => {
  const [isLoading, setIsLoading] = useState(false);
  const {token} = useParams();
  let resMessage = '';
  const verify = async() => {
  setIsLoading(true);
    try {
      const data = await verifyEmail(token);
      toast.success(data.message);
      setIsLoading(false);
      resMessage = data.message;
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }
  return (
    <div onLoad={verify}>
      {isLoading && <Loader />}
    <AuthContainer>
    <div className='col-md-6'>
      <div className='card form-section'>
      <div className='form-desc'>
      <h1>Account Verification</h1>
      <p>{resMessage}</p>
      </div>
        <div className='form-group'>
          <Link to="/login">
          <button className='btn btn-primary large-btn'>Login</button>
          </Link>
        </div>
    </div>
    </div>
    <Authimage />
    </AuthContainer>
    </div>
  )
}

export default Verify

import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import AuthContainer from '../../components/auth/AuthContainer';
import Authimage from '../../components/auth/Authimage';
import Loader from '../../components/loader/Loader';
import { resetPassword } from '../../services/authService';


const initialState = {
  password: "",
  confirmPassword: ""
}


const Reset = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setformData ] = useState(initialState);
  const {password, confirmPassword} = formData;
  const {resetToken} = useParams();

  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setformData({...formData, [name]: value})
  }

  const reset = async (e) => {
    e.preventDefault();

    if(password.length < 6){
      return toast.error("Password must be up to 6 characters");
    }
    if(password !== confirmPassword){
      return toast.error("Passwords do not match");
    }
    const userData = {
      password, confirmPassword
    }
    setIsLoading(true);
    try {
      const data = await resetPassword(userData, resetToken);
      toast.success(data.message)
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }

  }

  return (
    <div>
      {isLoading && <Loader/>}
    <AuthContainer>
    <div className='col-md-6'>
      <div className='card form-section'>
      <div className='form-desc'>
      <h1>Change Password</h1>
      
      </div>
      <form onSubmit={reset}>
      <div className='form-group'>
          <input required type="password" placeholder='Password' name="password" className='form-control' value={password} onChange={handleInputChange}/>
        </div>
        <div className='form-group'>
          <input required type="password" placeholder='Confirm Password' name="confirmPassword" className='form-control' value={confirmPassword} onChange={handleInputChange}/>
        </div>
        
        <div className='form-group'>
          <button type='submit' className='btn btn-primary large-btn'>Change Password</button>
        </div>
      </form>
      <div className='form-footer'>
        <hr></hr>
          <Link to="/login">
          <p><b>Back to Login</b></p>
          </Link>
      </div>
    </div>
    </div>
    <Authimage />
    </AuthContainer>
    </div>
  )
}

export default Reset

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import AuthContainer from '../../components/auth/AuthContainer';
import Authimage from '../../components/auth/Authimage';
import { registerUser, validateEmail } from '../../services/authService';
import { SET_LOGIN, SET_NAME } from '../../redux/features/auth/authSlice';
import Loader from "../../components/loader/Loader";
import { useDispatch } from "react-redux";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: ""
}
const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setformData ] = useState(initialState);
  const {firstName, lastName, email, password, confirmPassword} = formData;
  

  const handleInputChange = (e) => {
    const {name, value} = e.target;

    setformData({...formData, [name]: value})
  }
  const register = async (e) => {
    e.preventDefault();
    if(!firstName || !lastName || !email || !password){
      return toast.error("All fields are required");
    }
    if(password.length < 6){
      return toast.error("Password must be up to 6 characters");
    }
    if(!validateEmail(email)){
      return toast.error("Please enter a valid Email");
    }
    if(password !== confirmPassword){
      return toast.error("Passwords do not match");
    }

    const userData = {
      firstName, lastName, email, password, confirmPassword
    }
    setIsLoading(true);
    try {
      const data = await registerUser(userData);
      // await dispatch(SET_LOGIN(true));
      // await dispatch(SET_NAME(data.firstName));
      // navigate("/dashboard");
      // console.log(data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error.message);
    }

  }
  return (
    <div>
      {isLoading && <Loader/>}
      <AuthContainer>
          <div className='col-md-6'>
            <div className='card form-section'>
            <div className='form-desc'>
            <h1>SignUp</h1>
            
            <p>Already have an account? <Link to="/login"><b>Login</b></Link></p>
            
            </div>
            <form onSubmit={register}>
            <div className='form-group'>
                <input required type="text" placeholder='First Name' name="firstName" className='form-control' value={firstName} onChange={handleInputChange} />
              </div>
              <div className='form-group'>
                <input required type="text" placeholder='Last Name' name="lastName" className='form-control' value={lastName} onChange={handleInputChange} />
              </div>
              <div className='form-group'>
                <input required type="email" placeholder='Email Address' name="email" className='form-control' value={email} onChange={handleInputChange} />
              </div>
              <div className='form-group'>
                <input required type="password" placeholder='Password' name="password" className='form-control' value={password} onChange={handleInputChange}/>
              </div>
              <div className='form-group'>
                <input required type="password" placeholder='Confirm Password' name="confirmPassword" className='form-control' value={confirmPassword} onChange={handleInputChange}/>
              </div>
              
              <div className='form-group'>
                <button type='submit' className='btn btn-primary large-btn'>SignUp</button>
              </div>
            </form>
            <div className='form-footer'>
              <hr></hr>
                <Link to="/resend-link">
                <p><b>Resend Verification Link</b></p>
                </Link>
            </div>
          </div>
          </div>
          <Authimage />
          </AuthContainer>
    </div>
  )
}

export default Register

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import AuthContainer from '../../components/auth/AuthContainer';
import Authimage from '../../components/auth/Authimage';
import { SET_LOGIN, SET_NAME, SET_ROLE, SET_PHOTO, SET_USERNAME } from '../../redux/features/auth/authSlice';
import { loginUser, validateEmail } from '../../services/authService';
import { useDispatch } from "react-redux";
import Loader from "../../components/loader/Loader";

const initialState = {
  email: "",
  password: "",
}

const Login = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setformData ] = useState(initialState);
  const {email, password} = formData;

  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setformData({...formData, [name]: value})
  }

  const login  = async (e) => {
    e.preventDefault();

    if(!email || !password){
      return toast.error("All fields are required");
    }
    if(!validateEmail(email)){
      return toast.error("Please enter a valid Email");
    }
    const userData = {
      email, password
    }
    setIsLoading(true);
    try {
      const data = await loginUser(userData);
      // console.log(data);
      await dispatch(SET_LOGIN(true));
      await dispatch(SET_NAME(data.firstName));
      await dispatch(SET_ROLE(data.role));
      await dispatch(SET_PHOTO(data.photo));
      await dispatch(SET_USERNAME(data.firstName));
      if(data.role === "Lecturer"){
        navigate("/dashboard");
      }else if(data.role === "Admin"){
        navigate("/admin/dashboard");
      }else if(data.role === "Student"){
        navigate("/account/dashboard");
      }else{
        navigate("/account/dashboard"); 
      }
      
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }

    
  }
  return (
    <div>
      {isLoading && <Loader />}
      <AuthContainer>
          <div className='col-md-6'>
            <div className='card form-section'>
            <div className='form-desc'>
            <h1>Login</h1>
            
            <p>Don't have an account? <Link to="/signup"><b>Register</b></Link></p>
            
            </div>
            <form onSubmit={login}>
              <div className='form-group'>
                <input required type="email" placeholder='Email Address' name="email" className='form-control' value={email} onChange={handleInputChange} />
              </div>
              <div className='form-group'>
                <input required type="password" placeholder='Password' name="password" className='form-control' value={password} onChange={handleInputChange} />
              </div>
              
              <div className='form-group'>
                <button type='submit' className='btn btn-primary large-btn'>Continue</button>
              </div>
            </form>
            <div className='form-footer'>
              <hr></hr>
                <Link to="/forgot">
                <p><b>Forgot Password</b></p>
                </Link>
            </div>
          </div>
          </div>
          <Authimage />
          </AuthContainer>
          </div>
  )
}

export default Login

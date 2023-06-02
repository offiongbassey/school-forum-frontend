import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import AuthContainer from '../../components/auth/AuthContainer';
import Authimage from '../../components/auth/Authimage';
import Loader from '../../components/loader/Loader';
import { forgotPassowrd, validateEmail } from '../../services/authService';

const Forgot = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const forgot = async(e) => {
    e.preventDefault();
    if(!email){
      return toast.error("Please enter an email");
    }
    if(!validateEmail(email)){
      return toast.error("Please enter a valid Email");
    }
    
    const userData = {
      email
    };
    setIsLoading(true);
    await forgotPassowrd(userData)
    setEmail("");
    setIsLoading(false);

  }
  return (
    <div>
      {isLoading && <Loader />}
    <AuthContainer>
          <div className='col-md-6'>
            <div className='card form-section'>
            <div className='form-desc'>
            <h1>Forgot Password</h1>
            
            <p>Back to <Link to="/login"><b>Login</b></Link></p>
            
            </div>
            <form onSubmit={forgot}>
              <div className='form-group'>
                <input required type="email" placeholder='Email Address' name="email" className='form-control' value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className='form-group'>
                <button className='btn btn-primary large-btn'>Get Reset Mail</button>
              </div>
            </form>
            <div className='form-footer'>
              <hr></hr>
                <Link to="/signup">
                <p><b>Don't have an account? Signup</b></p>
                </Link>
            </div>
          </div>
          </div>
          <Authimage />
          </AuthContainer>
          </div>
  )
}

export default Forgot

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import AuthContainer from '../../components/auth/AuthContainer';
import Authimage from '../../components/auth/Authimage';
import Loader from '../../components/loader/Loader';
import { resendLink, validateEmail } from '../../services/authService';

const Resend = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const resend = async(e) => {
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
    await resendLink(userData)
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
      <h1>Resend Verification Link</h1>
      
      <p>Back to <Link to="/login"><b>Login</b></Link></p>
      
      </div>
      <form onSubmit={resend}>
        <div className='form-group'>
          <input required type="email" placeholder='Email Address' name="email" value={email} onChange={(e) => setEmail(e.target.value)} className='form-control' />
        </div>
        <div className='form-group'>
          <button type='submit' className='btn btn-primary large-btn'>Resend Link</button>
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

export default Resend

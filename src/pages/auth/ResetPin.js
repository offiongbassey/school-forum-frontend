import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import AuthContainer from '../../components/auth/AuthContainer';
import Authimage from '../../components/auth/Authimage';
import Loader from '../../components/loader/Loader';
import { resetPin } from '../../services/authService';


const initialState = {
  walletPin: "",
  confirmWalletPin: ""
}


const ResetPin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setformData ] = useState(initialState);
  const {walletPin, confirmWalletPin} = formData;
  const {token} = useParams();
    
  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setformData({...formData, [name]: value})
  }

  const reset = async (e) => {
    e.preventDefault();
    
    if(walletPin !== confirmWalletPin){
      return toast.error("PINs do not match");
    }
    const userData = {
      walletPin, confirmWalletPin
    }
    setIsLoading(true);
    try {
      const data = await resetPin(userData, token);
      toast.success(data.message);
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
      <h1>Change walletPin</h1>
      
      </div>
      <form onSubmit={reset}>
      <div className='form-group'>
          <input required type="password" placeholder='PIN' name="walletPin" className='form-control' value={walletPin} onChange={handleInputChange}/>
        </div>
        <div className='form-group'>
          <input required type="password" placeholder='Confirm Pin' name="confirmWalletPin" className='form-control' value={confirmWalletPin} onChange={handleInputChange}/>
        </div>
        
        <div className='form-group'>
          <button type='submit' className='btn btn-primary large-btn'>Change walletPin</button>
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

export default ResetPin

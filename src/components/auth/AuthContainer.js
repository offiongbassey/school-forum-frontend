import React from 'react';
import "./auth.css";
import {ImHome} from "react-icons/im";
import {GiReturnArrow} from "react-icons/gi";
import { Link } from 'react-router-dom';
const AuthContainer = ({children}) => {
  return (
    <div className='auth'>
    <div className='container'>
     <Link to="/"> <h4><ImHome size={30} color={'#5C469C'} /> <GiReturnArrow size={25} color={'#D4ADFC'} /></h4></Link>
        <div className='row'>
            {children}
        </div>
    </div>
    <section className='home-footer'>
        <div className='container'>
          <hr/>
          <p>Developed by <b>Offiong Bassey</b>, Powered by <b>Computer Science Dept.</b></p>
        </div>
      </section>
    </div>
  )
}

export default AuthContainer

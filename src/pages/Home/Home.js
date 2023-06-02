import React from 'react';
import {RiProductHuntLine} from "react-icons/ri";
import {Link} from "react-router-dom";
import "./Home.css";
import heroImage from "../../assets/hero1.jpg";
import { ShowOnLogout, ShowOnLogin } from '../../components/protect/HiddenLink';
import { useSelector } from 'react-redux';
import { selectRole } from '../../redux/features/auth/authSlice';


const SimplifiedProcess = ({title, desc, colorClass}) => {

    return(
        <div className='col-md-4 box'>
        <div className={colorClass}>
        <h4>{title}</h4>
        <p>{desc}</p>
        </div>
    </div>
    )
}
const Home = () => {
  const role = useSelector(selectRole);
  return (
    <div className='home'>
    <div className='navbar'>
      <nav className='container --flex-between nav'>
        <div className='logo'>
            <h4>UNICROSS Forum</h4>
        </div>
        <ul className='home-links'>
            <ShowOnLogout>
            <li>
            <Link to="/login">
            <button type="button" class="btn btn-primary">
                 Login
            </button>
            </Link>
            </li>
            </ShowOnLogout>
            <ShowOnLogin>
            <li>
                            {role === "Admin" && (
                            <Link to="/admin/dashboard">
                            <button type="button" class="btn btn-primary">
                                 Dashboard
                            </button>
                            </Link>
                            )}
                            {role === "Lecturer" && (
                            <Link to="/dashboard">
                            <button type="button" class="btn btn-primary">
                                 Dashboard
                            </button>
                            </Link>
                            )}
                            {role === "Student" && (
                            <Link to="/account/dashboard">
                            <button type="button" class="btn btn-primary">
                                 Dashboard
                            </button>
                            </Link>
                            )}
            
            </li>
            </ShowOnLogin>
        </ul>
      </nav>
      </div>
      
      <section className='welcome'>
        <div className='container'>
        <div className='row'>
        <div className='hero-text col-md-6'>
                <h1>Welcome to <br />Unicross Forum!</h1>
                <h4>Purchase your Textbooks, Handouts and other Materials <br/> directly from your lecturer at ease.</h4>
                <br />
                <br />
                <Link to="signup">
                <button className='btn btn-success'>
                        SignUp
                </button>
                </Link>
        </div>
        <div className='hero-image col-md-6'>
                <img src={heroImage} />
        </div>
        </div>
        </div>
      </section>
      <section className='process'>
        <div className='container'>
            <h1>Simplified Process</h1>
            <div className='row'>
                <SimplifiedProcess title="Sign Up" desc="Create an account with just a click of a button" colorClass="card orange"/>
                <SimplifiedProcess title="Verify Email" desc="Verify your account with the link sent to your email" colorClass="card purple"/>
                <SimplifiedProcess title="Login" desc="Login to your account with email and password" colorClass="card lemon"/>
                <SimplifiedProcess title="Order" desc="Place Order and proceed to payment" colorClass="card purple"/>
                <SimplifiedProcess title="Payment" desc="Make payment with your credit card" colorClass="card lemon"/>
                <SimplifiedProcess title="Success" desc="Download your receipt. That's all." colorClass="card orange"/>
            </div>
        </div>
      </section>
      <div className='account container'>
                <div className='row'>
                    <div className='col-md-6 verification box'>
                      <div className='card'>
                            <h1>Resend Verification Link</h1>
                            <h4>If you haven't received a Verification link, kindly resend</h4>
                            <br />
                            <Link to="/resend-link">
                            <button type="button" class="btn btn-primary lg">
                                Resend
                            </button>
                            </Link>
                        </div>
                    </div>
                    <div className='col-md-6 signup box'>
                      <br/>
                      <br/>
                      <br/>
                      <br/>
                            <h1>Don't have an Account?</h1>
                            <h4>Signup now to enjoy the great features of the forum</h4>
                            <br />
                            <Link to="/signup">
                            <button type="button" class="btn btn-primary lg">
                                Signup
                            </button>
                            </Link>
                    </div>
                </div>
      </div>
    </div>
  )
}


export default Home

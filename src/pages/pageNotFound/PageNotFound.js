import React from 'react';
import { Link } from 'react-router-dom';
import "./PageNotFound.css";
import notFound from "../../assets/notfound.svg";

const PageNotFound = () => {
  return (
      <div className='error-page'>
    <div className='container'>
        <div className='row'>
            <div className='col-md-12'>
                <div className='page-not-found'>
                <h4>Sorry, page not found!</h4>
                <p>Sorry, we could't find the page you're looking for. Please check your spelling.</p>
                <br/>
                <img src={notFound} />
                <br/>
                <Link to="/"><button className='btn btn-primary'>Go To Home</button></Link>
                </div>
            </div>
        </div>
    </div>
    </div>
  )
}

export default PageNotFound

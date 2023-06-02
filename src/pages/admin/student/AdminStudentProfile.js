import React, { useEffect, useState } from 'react';
import "../../profile/Profile.css";
import useRedirectLoggedOutUser from '../../../customHook/useRedirectLoggedOutUser';
import { useDispatch } from 'react-redux';
import { SpinerImg } from '../../../components/loader/Loader';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { adminChangeStudentStatus, adminFetchStudent } from '../../../services/adminService';
import { toast } from 'react-toastify';


const AdminStudentProfile = () => {
    useRedirectLoggedOutUser("/login");
    const {studentId} = useParams();
    
        
    const dispatch = useDispatch();
    const [profile, setProfile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true)
        async function getUserData() {
            const data = await adminFetchStudent(studentId);
            
            setProfile(data);
            setIsLoading(false);

        }
        getUserData();
    }, [dispatch])

    
    const navigate = useNavigate();
    const [profileImage, setProfileImage] = useState("");

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setProfile({...profile, [name]: value})
    }
    const handleImageChange = (e) => {
        setProfileImage(e.target.files[0])
    }

    const changeStatus = async (e) => {
        e.preventDefault();
     try {
            const status = await adminChangeStudentStatus(studentId);
            setIsLoading(false);
            toast.success(status);
    } catch (error) {
            setIsLoading(false);
            console.log(error.message);
    }

    }


  return (
    <div className='profile'>
      {isLoading && <SpinerImg />}
      {profile && (
      <>
        <div className='container'>
    <div className='description'>
    <h4>Profile -- {profile?.role}</h4>
    <hr/>
    </div>
    <div className='row'>
            <div className='col-md-4 center-div'>
                <div className='dashboard-card'>
                        <div className='profile-photo'>
                                <img src={profile?.photo} alt="profilepic" />
                        </div>
                        <h2>{profile?.firstName + ' ' + profile?.lastName}</h2>
                                <span>{profile?.email}</span>
                                <br/>
                                
                                <button onClick={changeStatus} className='btn btn-primary'>Change Status</button>
                </div>
            </div>

            <div className='col-md-8'>
                <div className='dashboard-card'>
                        <div className='row'>
                            <div className='col-md-6'>
                            <label>First Name: </label>
                                <input disabled type="text" name="firstName"  className='form-control' value={profile?.firstName} onChange={handleInputChange} />
                            </div>
                            <div className='col-md-6'>
                                <label>Last Name: </label>
                                <input disabled  type="text" name="lastName"  className='form-control' value={profile?.lastName} onChange={handleInputChange} />
                            </div>
                            <div className='col-md-6'>
                            <label>Other Names: </label>
                                <input disabled type="text" name="otherName"  className='form-control' value={profile?.otherName} onChange={handleInputChange} />
                            </div>
                            <div className='col-md-6'>
                            <label>Phone Number: </label>
                                <input disabled type="text" name="phone"  className='form-control' value={profile?.phone} onChange={handleInputChange} />
                            </div>
                            <div className='col-md-6'>
                            <label>Address: </label>
                                <input disabled type="text" name="address"  className='form-control' value={profile?.address} onChange={handleInputChange} />
                            </div>
                            <div className='col-md-6'>
                            <label>Bio: </label>
                                <textarea disabled name='bio' className='form-control' value={profile?.bio}
                                onChange={handleInputChange} cols="30" rows="10" 
                                >
                                </textarea>
                            </div>
                        </div>
                
                        <br/>
                        <hr />
                        <div className='row'>
                            <div className='col-md-6'>
                            <label>Reg Number: </label>
                                <input disabled type="text" name="regNumber"  className='form-control' value={profile?.regNumber} onChange={handleInputChange} />
                            </div>
                           
                           
                        </div>
                </div>
            </div>
    </div>
</div>
        
      </>
      )}
    </div>
  )
}

export default AdminStudentProfile

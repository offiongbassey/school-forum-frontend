import React from 'react'

const StudentProfile = ({profile, saveProfile, handleImageChange, handleInputChange}) => {
  return (
    <div className='container'>
    <div className='description'>
    <h4>Profile</h4>
    <hr/>
    </div>
    <form onSubmit={saveProfile}>
    <div className='row'>
            <div className='col-md-4 center-div'>
                <div className='dashboard-card'>
                        <div className='profile-photo'>
                                <img src={profile?.photo} alt="profilepic" />
                        </div>
                        <h2>{profile?.firstName + ' ' + profile?.lastName}</h2>
                                <span>{profile?.email}</span>
                                <p>
                                <label>Upload Image: </label>
                                    <input type="file" name="image" onChange={handleImageChange} />
                                </p>
                </div>
            </div>

            <div className='col-md-8'>
                <div className='dashboard-card'>
                        <div className='row'>
                            <div className='col-md-6'>
                            <label>First Name: </label>
                                <input type="text" name="firstName"  className='form-control' value={profile?.firstName} onChange={handleInputChange} />
                            </div>
                            <div className='col-md-6'>
                                <label>Last Name: </label>
                                <input  type="text" name="lastName"  className='form-control' value={profile?.lastName} onChange={handleInputChange} />
                            </div>
                            <div className='col-md-6'>
                            <label>Other Names: </label>
                                <input type="text" name="otherName"  className='form-control' value={profile?.otherName} onChange={handleInputChange} />
                            </div>
                            <div className='col-md-6'>
                            <label>Phone Number: </label>
                                <input type="text" name="phone"  className='form-control' value={profile?.phone} onChange={handleInputChange} />
                            </div>
                            <div className='col-md-6'>
                            <label>Address: </label>
                                <input type="text" name="address"  className='form-control' value={profile?.address} onChange={handleInputChange} />
                            </div>
                            <div className='col-md-6'>
                            <label>Bio: </label>
                                <textarea name='bio' className='form-control' value={profile?.bio}
                                onChange={handleInputChange} cols="30" rows="10" 
                                >
                                </textarea>
                            </div>
                        </div>
                        <label>***Account Info</label>
                        <br/>
                        <hr />
                        <div className='row'>
                            <div className='col-md-6'>
                            <label>Account Number: </label>
                                <input type="number" name="accountNumber"  className='form-control' value={profile?.accountNumber} onChange={handleInputChange} />
                            </div>
                            <div className='col-md-6'>
                            <label>Account Name: </label>
                                <input type="text" name="accountName"  className='form-control' value={profile?.accountName} onChange={handleInputChange} />
                            </div>
                            <div className='col-md-6'>
                            <label>Bank: </label>
                                <select name="bank"  className='form-control' value={profile?.bank} onChange={handleInputChange} >
                                    <option>First Bank</option>
                                    <option>Zenith Bank</option>
                                </select>
                            </div>
                            <div className='col-md-6'>
                                <div className='profile-btn'>
                                    <button className='btn btn-primary'>Save</button>
                                </div>
                            </div>
                        </div>
                </div>
            </div>
    </div>
    </form>

</div>
  )
}

export default StudentProfile

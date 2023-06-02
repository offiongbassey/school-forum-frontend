import React from 'react'

const LecturerProfile = ({profile, banks, saveProfile, handleImageChange, handleInputChange, verifyBank, setBankId, bankId}) => {
  return (
    <div className='container'>
    <div className='description'>
    <h4>Profile -- {profile?.role}</h4>
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
                        {profile?.role === 'Lecturer' ? (
                        <>
                        <label>***Account Info. (Acc. Name: {profile.accountName})</label>
                        <br/>
                        <hr />
                        <div className='row'>
                            <div className='col-md-6'>
                            <label>Account Number: </label>
                                <input type="number" name="accountNumber"  className='form-control' value={profile?.accountNumber} onChange={handleInputChange} />
                            </div>
                            
                            <div className='col-md-6'>
                                <br/>
                            <label>Bank: {profile?.bank}</label>
                                <select required name="bankId"  className='form-control' value={bankId} onChange={(e) => setBankId(e.target.value)} >
                                        {profile.bankStatus === 'Active' ? (
                                            <>
                                            <option value={profile.bankId}>{profile.bank}</option>
                                            </>
                                        ) : (
                                            <>
                                            <option value={0}>Please Select a Bank</option>
                                            </>
                                        )}
                                        
                                        {banks.map((bank, index) => {
                                            return(
                                            <option value={bank._id}>{bank.name}</option>
                                            )
                                        })}
                                </select>
                            </div>
                            <div className='col-md-6'>
                                <br/>
                                <br/>
                                <button onClick={verifyBank} type='button' className='btn btn-success'>Verify Bank Account</button>
                            </div>
                           
                        </div>
                        </>
                        ) : (<>
                        </>)}
                        {profile?.role === 'Student' ? (
                        <>
                        <br/>
                        <hr />
                        <div className='row'>
                            <div className='col-md-6'>
                            <label>Reg Number: </label>
                                <input type="text" name="regNumber"  className='form-control' value={profile?.regNumber} onChange={handleInputChange} />
                            </div>
                            {/* <div className='col-md-6'>
                            <label>Campus:</label>
                                <select name="campus"  className='form-control' value={profile?.campus} onChange={handleInputChange} >
                                {profile?.campus ?
                                    (
                                        <option value={profile?.campus}>{profile?.campus}</option>
                                    ) :(<></>) }
                                        <>
                                        <option value={profile?.campus}>64666c8a69a6328449bc3274</option>
                                        <option>Camp 2</option>
                                        </>
                                </select>
                            </div>
                            <div className='col-md-6'>
                            <label>Faculty:</label>
                                <select name="faculty"  className='form-control' value={profile?.faculty} onChange={handleInputChange} >
                                        <option>Faculty 1</option>
                                        <option>Faculty 2</option>
                                </select>
                            </div>
                            <div className='col-md-6'>
                            <label>Department:</label>
                                <select name="department"  className='form-control' value={profile?.department} onChange={handleInputChange} >
                                        <option>Dept 1</option>
                                        <option>Dept 2</option>
                                </select>
                            </div>
                            <div className='col-md-6'>
                            <label>Unit: </label>
                                <input type="text" name="unit"  className='form-control' value={profile?.unit} onChange={handleInputChange} />
                            </div> */}
                           
                        </div>
                        </>
                        ) : (<>
                        </>)}
                        <div className='row'>
                        <div className='col-md-12'>
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

export default LecturerProfile

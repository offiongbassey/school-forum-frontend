import React, { useEffect, useState } from 'react';
import "./Profile.css";
import useRedirectLoggedOutUser from '../../customHook/useRedirectLoggedOutUser';
import { useDispatch } from 'react-redux';
import { getUser, updateUser } from '../../services/authService';
import { SET_NAME, SET_PHOTO, SET_ROLE, SET_USER, SET_USERNAME } from '../../redux/features/auth/authSlice';
import Loader, { SpinerImg } from '../../components/loader/Loader';
import { Link, useNavigate } from 'react-router-dom';
import LecturerProfile from './LecturerProfile';
import { toast } from 'react-toastify';
import { fetchActiveBanks } from '../../services/adminService';
import { verifyBankAccount } from '../../services/orderService';

const Profile = () => {
    useRedirectLoggedOutUser("/login");
    const dispatch = useDispatch();
    const [profile, setProfile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [banks, setBanks] = useState([]);
    const [bankId, setBankId] = useState("");

    useEffect(() => {
        setIsLoading(true)
        async function getUserData() {
            const data = await getUser();
            if(data){
            setProfile(data);
            setIsLoading(false);
            await dispatch(SET_USER(data));
            await dispatch(SET_NAME(data?.firstName));
            await dispatch(SET_ROLE(data.role));
            await dispatch(SET_PHOTO(data.photo));
            await dispatch(SET_USERNAME(data.firstName));
        }
        setIsLoading(false);
        }
        getUserData();
    }, [dispatch])


    useEffect(() => {
        async function getActiveBank() {
            const data = await fetchActiveBanks();

            setBanks(data);
        }
        getActiveBank();
    }, [])

    
    const navigate = useNavigate();
    const [profileImage, setProfileImage] = useState("");

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setProfile({...profile, [name]: value})
    }
    const handleImageChange = (e) => {
        setProfileImage(e.target.files[0])
    }

    const saveProfile = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            //image upload validation
            let imageURL;
            if(
                profileImage && 
                ( 
                    profileImage.type === "image/jpeg" ||
                    profileImage.type === "image/jpg" ||
                    profileImage.type === "image/png" 
                )
            ){
                const image = new FormData();
                image.append("file", profileImage)
                image.append("cloud_name", "dfhabqprq")
                image.append("upload_preset", "ddvbqi0c")

                //save image to cloudinary
                const response = await fetch(
                    "https://api.cloudinary.com/v1_1/dfhabqprq/image/upload",
                    {method: "post", body: image}
                    );
                    const imgData = await response.json();
                    imageURL = imgData.url.toString();
                
            }  
            //save profile
            const formData = {
                firstName: profile.firstName,
                lastName: profile.lastName,
                photo: profileImage ? imageURL : profile.photo,
                phone: profile.phone,
                otherName: profile.otherName,
                address: profile.address,
                bio: profile.bio,
                regNumber: profile.regNumber,
                campus: profile.campus,
                faculty: profile.faculty,
                department: profile.department,
                unit: profile.unit
                
            }
            const data = await updateUser(formData);
            if(data.status === 200){
            toast.success("Profile Updated Successfully");
            }else{
                toast.error("An error occured, pls try again later.")
            }
            // navigate("/dashboard");
            setIsLoading(false);
        } catch (error) {
                setIsLoading(false);
                console.log(error);
                toast.error(error.message);
        }
    }

    const verifyBank = async () => {
       
        if(!bankId){
            return toast.error("Please Select a Bank");    
        }
        if(!profile.accountNumber){
            return toast.error("Account Number is required");
        }
        
        setIsLoading(true);
        const userData = {
            bankId
          };
        const formData = {
            bank: bankId,
            account_number: profile.accountNumber,
            currency: "NGN",
            type: "nuban"
        }
        const data = await verifyBankAccount(formData);
        setIsLoading(false);
        // return toast.success(`${data}`);
    }

  return (
    <div className='profile'>
      {isLoading && <Loader />}
      {profile && (
      <>
        {!isLoading && profile === null ?  (
            <p>Something went wrong, please reload the page.</p>
        ) : (
            <LecturerProfile verifyBank={verifyBank} profile={profile} banks={banks} saveProfile={saveProfile} handleImageChange={handleImageChange} handleInputChange={handleInputChange} setBankId={setBankId} bankId={bankId} /> 
        )}
      </>
      )}
    </div>
  )
}

export default Profile

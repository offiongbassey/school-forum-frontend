import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loader from '../../components/loader/Loader';
import { selectUser, SET_NAME, SET_USER } from '../../redux/features/auth/authSlice';
import { getUser, updateUser } from '../../services/authService';
import useRedirectLoggedOutUser from '../../customHook/useRedirectLoggedOutUser';
import LecturerProfile from './LecturerProfile';
import AdminProfile from './AdminProfile';

const EditProfile = () => {
    useRedirectLoggedOutUser("/login");
    const dispatch = useDispatch();
    const [profile, setProfile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true)
        async function getUserData() {
            const data = await getUser();

            setProfile(data);
            setIsLoading(false);
            await dispatch(SET_USER(data));
            await dispatch(SET_NAME(data.firstName));

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
                
            }
            const data = await updateUser(formData);
            toast.success("Profile Updated Successfully");
            navigate("/dashboard");
            setIsLoading(false);
        } catch (error) {
                setIsLoading(false);
                console.log(error);
                toast.error(error.message);
        }
    }

  return (
    <div className='profile my2'>
        <h2>Role {profile.firstName}</h2>
                {/* <LecturerProfile profile={profile} saveProfile={saveProfile} handleImageChange={handleImageChange} handleInputChange={handleInputChange} /> */}
    </div>
  )
}

export default EditProfile

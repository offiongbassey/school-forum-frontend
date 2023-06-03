import axios from "axios";
import {toast} from "react-toastify";

export const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export const validateEmail = (email) => {
    return email.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
}
export const registerUser = async(userData) => {
    try{
        const response = await axios.post(
            `${BACKEND_URL}/api/portal/register`, userData, 
        {withCredentials: true});
        if(response.status === 201){
            toast.success(response.data.message); 
        }
        return response.data;
    }catch(error){
        const message = (
            error.response && error.response.data 
            && error.response.data.message) 
            || error.message || error.toString(); 
            toast.error(message)
        }

}
export const registerLecturer = async(userData) => {
    try{
        const response = await axios.post(
            `${BACKEND_URL}/api/lecturer/signup`, userData, 
        {withCredentials: true});
        if(response.status === 201){
            toast.success(response.data.message); 
        }
        return response.data;
    }catch(error){
        const message = (
            error.response && error.response.data 
            && error.response.data.message) 
            || error.message || error.toString(); 
            toast.error(message)
        }
}

export const loginUser = async(userData) => {
    try{
        const response = await axios.post(
            `${BACKEND_URL}/api/portal/login`, userData, {withCredentials: true});
        if(response.statusText === "OK"){
            toast.success('Login Successful'); 
        }
        return response.data
    }catch(error){
        const message = (
            error.response && error.response.data 
            && error.response.data.message) 
            || error.message || error.toString(); 
            toast.error(message)
        }
}
//logout user
export const logoutUser = async() => {
    try{
        await axios.get(
            `${BACKEND_URL}/api/portal/logout`
            );
        
    }catch(error){
        const message = (
            error.response && error.response.data 
            && error.response.data.message) 
            || error.message || error.toString(); 
            toast.error(message)
        }
}

//forgot password
export const forgotPassowrd = async(userData) => {
    try{
        const response = await axios.post(
            `${BACKEND_URL}/api/portal/forgotpassword`, userData
            );
            toast.success(response.data.message);
        
    }catch(error){
        const message = (
            error.response && error.response.data 
            && error.response.data.message) 
            || error.message || error.toString(); 
            toast.error(message)
        }
}

//resend Link for verification
export const resendLink = async(userData) => {
    try{
        const response = await axios.post(
            `${BACKEND_URL}/api/portal/resendverification`, userData
            );
            toast.success(response.data.message);
        
    }catch(error){
        const message = (
            error.response && error.response.data 
            && error.response.data.message) 
            || error.message || error.toString(); 
            toast.error(message)
        }
}

//Reset Password
export const resetPassword = async(userData, resetToken) => {
    try{
        const response = await axios.put(
            `${BACKEND_URL}/api/portal/resetpassword/${resetToken}`, userData
            );
                return response.data
    }catch(error){
        const message = (
            error.response && error.response.data 
            && error.response.data.message) 
            || error.message || error.toString(); 
            toast.error(message)
        }
}
//Reset Password
export const resetPin = async(userData, token) => {
    try{
        const response = await axios.patch(
            `${BACKEND_URL}/api/lecturer/changepin/${token}`, userData
            );
                return response.data
    }catch(error){
        const message = (
            error.response && error.response.data 
            && error.response.data.message) 
            || error.message || error.toString(); 
            toast.error(message)
        }
}
//verify email
export const verifyEmail = async(token) => {
    try{
        const response = await axios.get(
            `${BACKEND_URL}/api/portal/confirmemail/${token}`
            );
                return response.data
    }catch(error){
        const message = (
            error.response && error.response.data 
            && error.response.data.message) 
            || error.message || error.toString(); 
            toast.error(message)
        }
}

//get login status
export const getLoginStatus = async() => {
    try{
        const response = await axios.get(
            `${BACKEND_URL}/api/portal/loggedin`
            );
                return response.data
    }catch(error){
        const message = (
            error.response && error.response.data 
            && error.response.data.message) 
            || error.message || error.toString(); 
            toast.error(message)
        }
}

//get user  profile
export const getUser = async() => {
    try{
        const response = await axios.get(
            `${BACKEND_URL}/api/portal/finduser`
            );
                return response.data
    }catch(error){
        const message = (
            error.response && error.response.data 
            && error.response.data.message) 
            || error.message || error.toString(); 
            toast.error(message)
        }
}

//update  profile
export const updateUser = async(formData) => {
    try{
        const response = await axios.patch(
            //this url is for admin
            `${BACKEND_URL}/api/portal/updateuser`, formData
            // `${BACKEND_URL}/api/lecturer/updateprofile`, formData
            );
                return response.data
    }catch(error){
        const message = (
            error.response && error.response.data 
            && error.response.data.message) 
            || error.message || error.toString(); 
            toast.error(message)
        }
}

export const getStudent = async(userId) => {
    try{
        const response = await axios.get(
            `${BACKEND_URL}/api/lecturer/viewstudent/${userId}`
            );
                return response.data.student
    }catch(error){
        const message = (
            error.response && error.response.data 
            && error.response.data.message) 
            || error.message || error.toString(); 
            toast.error(message)
        } 
}

export const getLecturerSumOrder = async() => {
    try{
        const response = await axios.get(
            `${BACKEND_URL}/api/lecturer/sumorders`
            );
                return response.data
    }catch(error){
        const message = (
            error.response && error.response.data 
            && error.response.data.message) 
            || error.message || error.toString(); 
            toast.error(message)
        } 
}

export const withDrawNow = async (formData) => {
    try{
        const response = await axios.post(
            `${BACKEND_URL}/api/lecturer/withdraw`, formData
            );
            // if(response.status === 201){
                toast.success(response.data.message);
            // }
            
                return response.data
                
    }catch(error){
        const message = (
            error.response && error.response.data 
            && error.response.data.message) 
            || error.message || error.toString(); 
            toast.error(message)
        } 
}

export const fetchLecturerWithdraws = async () => {
    try{
        const response = await axios.get(
            `${BACKEND_URL}/api/lecturer/withdraw`
            );
                return response.data
    }catch(error){
        const message = (
            error.response && error.response.data 
            && error.response.data.message) 
            || error.message || error.toString(); 
            toast.error(message)
        }  
}

export const resetWithdrawPIN = async () => {
    try{
        const response = await axios.post(
            `${BACKEND_URL}/api/lecturer/resetpin`
            );
            toast.success(response.data.message);
                return response.data
    }catch(error){
        const message = (
            error.response && error.response.data 
            && error.response.data.message) 
            || error.message || error.toString(); 
            toast.error(message)
        }  
}
import axios from "axios"
import { toast } from "react-toastify";

export const BACKEND_URL  = process.env.REACT_APP_BACKEND_URL;

export const getAdminOrders = async () => {
    try {
        const response = await axios.get(
            `${BACKEND_URL}/api/portal/orders`
        );
        
        return response.data.orders;
    } catch (error) {
        const message = (
            error.response && error.response.data 
            && error.response.data.message) 
            || error.message || error.toString(); 
            toast.error(message)
        }  
}
export const adminFetchTransactions = async () => {
    try {
        const response = await axios.get(
            `${BACKEND_URL}/api/portal/transactions`
        );
        
        return response.data;
    } catch (error) {
        const message = (
            error.response && error.response.data 
            && error.response.data.message) 
            || error.message || error.toString(); 
            toast.error(message)
        }  
}


export const adminFetchWithdraws = async () => {
    try {
        const response = await axios.get(
            `${BACKEND_URL}/api/portal/withdraws`
        );
        
        return response.data;
    } catch (error) {
        const message = (
            error.response && error.response.data 
            && error.response.data.message) 
            || error.message || error.toString(); 
            toast.error(message)
        } 
}

export const adminFetchlecturers = async () => {
    try {
        const response = await axios.get(
            `${BACKEND_URL}/api/portal/viewlecturers`
        );
        
        return response.data.lecturers;
    } catch (error) {
        const message = (
            error.response && error.response.data 
            && error.response.data.message) 
            || error.message || error.toString(); 
            toast.error(message)
        } 
}

export const adminFetchStudents = async () => {
    try {
        const response = await axios.get(
            `${BACKEND_URL}/api/portal/viewstudents`
        );
        
        return response.data.students;
    } catch (error) {
        const message = (
            error.response && error.response.data 
            && error.response.data.message) 
            || error.message || error.toString(); 
            toast.error(message)
        } 
}

export const adminFetchProducts = async () => {
    try {
        const response = await axios.get(
            `${BACKEND_URL}/api/products/all`
        );
        
        return response.data;
    } catch (error) {
        const message = (
            error.response && error.response.data 
            && error.response.data.message) 
            || error.message || error.toString(); 
            toast.error(message)
        }
}

export const adminFetchStudent = async (studentId) => {
    try {
        const response = await axios.get(
            `${BACKEND_URL}/api/portal/viewstudent/${studentId}`
        );
        
        return response.data.student;
    } catch (error) {
        const message = (
            error.response && error.response.data 
            && error.response.data.message) 
            || error.message || error.toString(); 
            toast.error(message)
        }
}


export const adminFetchLecturer = async (lecturerId) => {
    try {
        const response = await axios.get(
            `${BACKEND_URL}/api/portal/viewlecturer/${lecturerId}`
        );
        // toast.success(response.data);
        return response.data.lecturer;
    } catch (error) {
        const message = (
            error.response && error.response.data 
            && error.response.data.message) 
            || error.message || error.toString(); 
            toast.error(message)
        }
}

export const adminChangeLecturerStatus = async (lecturerId)=> {
    try {
        const response = await axios.patch(
            `${BACKEND_URL}/api/portal/changelecturerstatus/${lecturerId}`
        );
        // toast.success(response.data);
        return response.data.message;
    } catch (error) {
        const message = (
            error.response && error.response.data 
            && error.response.data.message) 
            || error.message || error.toString(); 
            toast.error(message)
        }
}

export const adminChangeStudentStatus = async (studentId) => {
    try {
        const response = await axios.patch(
            `${BACKEND_URL}/api/portal/changestudentstatus/${studentId}`
        );
        // toast.success(response.data);
        return response.data.message;
    } catch (error) {
        const message = (
            error.response && error.response.data 
            && error.response.data.message) 
            || error.message || error.toString(); 
            toast.error(message)
        }
}

export const adminChangeProductStatus = async (url) => {
    try {
        const response = await axios.patch(
            `${BACKEND_URL}/api/portal/changeproductstatus/${url}`
        );
        // toast.success(response.data);
        return response.data.message;
    } catch (error) {
        const message = (
            error.response && error.response.data 
            && error.response.data.message) 
            || error.message || error.toString(); 
            toast.error(message)
        }
}

export const adminFetchBanks = async () => {
    try {
        const response = await axios.get(
            `${BACKEND_URL}/api/bank/view`
        );
        // toast.success(response.data);
        return response.data;
    } catch (error) {
        const message = (
            error.response && error.response.data 
            && error.response.data.message) 
            || error.message || error.toString(); 
            toast.error(message)
        }
}

export const AdminAddBank = async (formData)=> {
    try {
        const response = await axios.post(
            `${BACKEND_URL}/api/bank/create`, formData
        );
        // toast.success(response.data);
        return response.data.message;
    } catch (error) {
        const message = (
            error.response && error.response.data 
            && error.response.data.message) 
            || error.message || error.toString(); 
            toast.error(message)
        }
}

export const adminFetchBank = async (bankId) => {
    try {
        const response = await axios.get(
            `${BACKEND_URL}/api/bank/${bankId}`,
        );
        // toast.success(response.data);
        return response.data;
    } catch (error) {
        const message = (
            error.response && error.response.data 
            && error.response.data.message) 
            || error.message || error.toString(); 
            toast.error(message)
        }
}

export const AdminBankEdit = async (bankId, formData) => {
    try {
        const response = await axios.patch(
            `${BACKEND_URL}/api/bank/update/${bankId}`, formData
        );
        
        toast.success(response.data.message);
        return response.data.message;
    } catch (error) {
        const message = (
            error.response && error.response.data 
            && error.response.data.message) 
            || error.message || error.toString(); 
            toast.error(message)
        }
}

export const adminChangeBankStatus = async (bankId) => {
    try {
        const response = await axios.patch(
            `${BACKEND_URL}/api/bank/updatestatus/${bankId}`
        );
        // toast.success(response.data);
        return response.data.message;
    } catch (error) {
        const message = (
            error.response && error.response.data 
            && error.response.data.message) 
            || error.message || error.toString(); 
            toast.error(message)
        }
}

export const fetchActiveBanks = async () => {
    try {
        const response = await axios.get(
            `${BACKEND_URL}/api/bank/active`
        );
        // toast.success(response.data);
        return response.data;
    } catch (error) {
        const message = (
            error.response && error.response.data 
            && error.response.data.message) 
            || error.message || error.toString(); 
            toast.error(message)
        }
}

export const getAdminValues = async () => {
    try{
        const response = await axios.get(
            `${BACKEND_URL}/api/portal/accountdata`
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
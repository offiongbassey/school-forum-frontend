import axios from "axios"
import { toast } from "react-toastify";

export const BACKEND_URL  = process.env.REACT_APP_BACKEND_URL;

export const getOrderProcess = async(id) => {
try {
    const response = await axios.get(
        `${BACKEND_URL}/api/orders/${id}`
    );
    return response.data.order;
} catch (error) {
    const message = (
        error.response && error.response.data 
        && error.response.data.message) 
        || error.message || error.toString(); 
        toast.error(message)
    }

}

export const getStudentOrders = async () => {
    try {
        const response = await axios.get(
            `${BACKEND_URL}/api/orders/`
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

export const getLecturerOrders = async () => {
    try {
        const response = await axios.get(
            `${BACKEND_URL}/api/lecturer/orders`
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

export const approveOrder = async (transactionCode) => {
   
    try {
        const response = await axios.patch(
            `${BACKEND_URL}/api/orders/payment/${transactionCode}`
        );
        if(response.data.status === 200){
            return toast.success(response.data.message);
        }
                return response.data;
    } catch (error) {
        const message = (
            error.response && error.response.data 
            && error.response.data.message) 
            || error.message || error.toString(); 
            toast.error(message)
        }
     
}

export const getStudentTranscations = async () => {
    try {
        const response = await axios.get(
            `${BACKEND_URL}/api/orders/transactions`
        );
        // console.log(response.data);
        return response.data;
    } catch (error) {
        const message = (
            error.response && error.response.data 
            && error.response.data.message) 
            || error.message || error.toString(); 
            toast.error(message)
        }
}

export const getLecturerTransactions = async () => {
    try {
        const response = await axios.get(
            `${BACKEND_URL}/api/lecturer/transactions`
        );
        // console.log(response.data);
        return response.data;
    } catch (error) {
        const message = (
            error.response && error.response.data 
            && error.response.data.message) 
            || error.message || error.toString(); 
            toast.error(message)
        }
}
export const verifyBankAccount = async (formData) => {
    try {
        const response = await axios.post(
            `${BACKEND_URL}/api/lecturer/verifybankaccount`, formData
        );
        if(response.data.status === true){
        toast.success(`${response.data.message}. Acc. Name: ${response.data.data.details.account_name}`);
        }else{
            toast.error(response.data.message);
        }
        // console.log(response.data);
        return response.data;
    } catch (error) {
        const message = (
            error.response && error.response.data 
            && error.response.data.message) 
            || error.message || error.toString(); 
            toast.error(message)
        }
}


export const getGeneralReceipt = async(transactionCode) => {
    try {
        const response = await axios.get(
            `${BACKEND_URL}/api/portal/receipt/${transactionCode}`
        );
        // console.log(response.data.transaction);
        return response.data.transaction;
    } catch (error) {
        const message = (
            error.response && error.response.data 
            && error.response.data.message) 
            || error.message || error.toString(); 
            toast.error(message)
        }
}
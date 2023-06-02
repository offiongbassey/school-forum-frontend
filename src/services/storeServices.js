import axios from "axios"
import { toast } from "react-toastify";

export const BACKEND_URL  = process.env.REACT_APP_BACKEND_URL;

export const getStoreProducts = async() => {
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
export const getStoreAuthorProducts = async (userId) => {
    try {
        const response = await axios.get(
            `${BACKEND_URL}/api/products/author/${userId}`
        );
        console.log(userId);
        return response.data;
    } catch (error) {
        const message = (
            error.response && error.response.data 
            && error.response.data.message) 
            || error.message || error.toString(); 
            toast.error(message)
        }
    
}

export const getStoreProduct = async (url) => {
    try {
        const response = await axios.get(
            `${BACKEND_URL}/api/products/single/${url}`
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

export const createOrder = async (productId) => {
    try {
        const response = await axios.post(
            `${BACKEND_URL}/api/orders`, productId, {withCredentials: true}
        );
        if(response.status === 201){
            toast.success("Order Placed, Continue."); 
        }
        // console.log(response.data.order._id);
        return response.data.order._id;

    } catch (error) {
        const message = (
            error.response && error.response.data 
            && error.response.data.message) 
            || error.message || error.toString(); 
            toast.error(message)
        
    }
}
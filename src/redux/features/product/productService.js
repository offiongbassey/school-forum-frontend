import axios from "axios";
import { toast } from "react-toastify";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API_URL = `${BACKEND_URL}/api/products`;
//create new product
const createProduct = async(formData) => {
    
    const response = await axios.post(
        `${API_URL}`, formData
    );
   
    return response.data;
}
//get all products
const getProducts = async() => {
    const response = await axios.get(
        `${API_URL}/lecturer`
    )
    return response.data;
}

//delete product
const deleteProduct = async(id) => {
    const response = await axios.delete(
        `${API_URL}/${id}`
    )
    return response.data;
}
//upload product softcopy
const uploadSoftcopy = async(productId, formData) => {
    const response = await axios.patch(
        `${API_URL}/softcopy/${productId}`, formData
    )
    if(response.status === 200){
        toast.success("Softcopy Uploaded Successfully");
    }
    return response.data;
}
//get single product
const getProduct = async(id) => {
    const response = await axios.get(
        `${API_URL}/${id}`
    )
    return response.data;
}
//update product
const updateProduct = async(id, formData) => {
    const response = await axios.patch(
        `${API_URL}/${id}`, formData
    )
   
    return response.data;
}


const productService = {
    createProduct,
    getProducts,
    deleteProduct,
    getProduct,
    updateProduct,
    uploadSoftcopy
}
export default productService;
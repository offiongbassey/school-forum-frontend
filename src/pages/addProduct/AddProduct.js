import React, { useState } from 'react'
import ProductForm from '../../components/product/productForm/ProductForm';
import { useSelector} from "react-redux";
import { createProduct, selectIsLoading } from '../../redux/features/product/productSlice';
import { useDispatch } from "react-redux";
import Loader from '../../components/loader/Loader';
import {  useNavigate } from 'react-router-dom';
import useRedirectLoggedOutUser from '../../customHook/useRedirectLoggedOutUser';
const initialState = {
    name: "",
    quantity: "",
    price: "",
    orderNote: ""
}

const AddProduct = () => {
  useRedirectLoggedOutUser("/login");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [product, setProduct] = useState(initialState);
    const [productImage, setProductImage] = useState("");
    const [imagePreview, setImagePreview] = useState(null)
    const [description, setDescription] = useState("");
    const isLoading = useSelector(selectIsLoading);

    const {name, quantity, price, orderNote} = product;
    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setProduct({...product, [name]: value})
      }

      const handleImageChange = (e) => {
          setProductImage(e.target.files[0])
          setImagePreview(URL.createObjectURL(e.target.files[0]));
      }

      const saveProduct = async (e) => {
        e.preventDefault();
        const formData = new FormData()
        formData.append("name", name)
        formData.append("quantity", quantity)
        formData.append("price", price)
        formData.append("orderNote", orderNote)
        formData.append("image", productImage)
        formData.append("description", description)

        // console.log(...formData);
        try {
          await dispatch(createProduct(formData));
          navigate("/products");  
        } catch (error) {
          isLoading(false);
        }
        
      }

  return (
    <div>
        {isLoading && <Loader/>}
       
       <ProductForm 
       product={product}
       productImage={productImage}
       imagePreview={imagePreview}
       description={description}
       setDescription={setDescription}
       handleInputChange={handleInputChange}
       handleImageChange={handleImageChange}
       saveProduct={saveProduct}
       />
    </div>
  )
}

export default AddProduct

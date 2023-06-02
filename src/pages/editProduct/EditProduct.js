import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { useSelector} from "react-redux";
import {  useNavigate } from 'react-router-dom';
import useRedirectLoggedOutUser from '../../customHook/useRedirectLoggedOutUser';
import { getProduct, getProducts, selectIsLoading, selectProduct, updateProduct } from '../../redux/features/product/productSlice';
import Loader from '../../components/loader/Loader';
import ProductForm from '../../components/product/productForm/ProductForm';

const EditProduct = () => {
    const {id} = useParams();
    useRedirectLoggedOutUser("/login");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isLoading = useSelector(selectIsLoading);

    const productEdit = useSelector(selectProduct);
    const [product, setProduct] = useState(productEdit);
    const [productImage, setProductImage] = useState("");
    const [imagePreview, setImagePreview] = useState(null)
    const [description, setDescription] = useState("");


    useEffect(() => {
        dispatch(getProduct(id))
    }, [dispatch, id]);

    useEffect(() => {
        setProduct(productEdit)

        setImagePreview(
            productEdit && productEdit.image ? `${productEdit.image.filePath}` : null
        )
        setDescription(
            productEdit && productEdit.description ? productEdit.description : ""
        )
    }, [productEdit])

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
        const formData = new FormData();
        formData.append("name", product?.name);
        formData.append("quantity", product?.quantity);
        formData.append("price", product?.price);
        formData.append("orderNote", product?.orderNote);
        formData.append("description", description);
        if(productImage){
        formData.append("image", productImage);
        }
        // console.log(...formData);
        try {
          await dispatch(updateProduct({id, formData}));
          await dispatch(getProducts());
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

export default EditProduct

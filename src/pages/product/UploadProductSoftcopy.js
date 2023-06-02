import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loader, { SpinerImg } from '../../components/loader/Loader';
import useRedirectLoggedOutUser from '../../customHook/useRedirectLoggedOutUser';
import { selectIsLoggedIn } from '../../redux/features/auth/authSlice';
import { getProduct, getProducts, uploadProductSoftcopy } from '../../redux/features/product/productSlice';

const UploadProductSoftcopy = () => {
    const [productImage, setProductImage] = useState("");
    const {productId} = useParams();
    useRedirectLoggedOutUser("/login");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isLoggedIn = useSelector(selectIsLoggedIn);

    const {product, isError, message} = 
    useSelector((state) => state.product);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
            if(isLoggedIn === true){
                dispatch(getProduct(productId));
            }
            if(isError){
                console.log(message);
            }
    }, [isLoggedIn, isError, message, dispatch])
    
    const handleImageChange = (e) =>  {
    setProductImage(e.target.files[0]);
    }

    const uploadSoftcopy = async (e) => {
        e.preventDefault();
        
        const formData = new FormData();
        if(!productImage){
            return toast.error("Please upload softcopy");
        }
        setIsLoading(true);
        formData.append("image", productImage);
        try {
            
            await dispatch(uploadProductSoftcopy({productId, formData }));
            await dispatch(getProducts());
            navigate("/products");
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
        }

    }
  return (
    <div className='container'>
          {isLoading && <Loader />}
                {product && (
      <div className='row'>
            <div className='col-md-4'>
                <div className='dashboard-card'>
                    <h4>Softcopy Upload - {product.name}</h4>
                    <hr/>
                    <p>Uploading softcopy will enable students to download the material and print after successfuly payment at their own comfort.</p>
                </div>
            </div>

            <div className='col-md-8'>
                <div className='dashboard-card'>
                    <form onSubmit={uploadSoftcopy}>
                    <input type="file" className='form-control' name="image" onChange={(e) => handleImageChange(e)} />
                    <button type='submit' className='btn btn-primary'>Save</button>
                    </form>
                </div>
            </div>
      </div>
      )}
    </div>
  )
}

export default UploadProductSoftcopy

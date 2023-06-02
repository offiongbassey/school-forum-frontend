import React, { useEffect } from 'react';
import "./ProductDetail.css";
import useRedirectLoggedOutUser from '../../../customHook/useRedirectLoggedOutUser';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import { getProduct } from '../../../redux/features/product/productSlice';
import { SpinerImg } from '../../loader/Loader';
import { selectIsLoggedIn } from '../../../redux/features/auth/authSlice';
import DOMPurify from "dompurify";
import {BiBadgeCheck} from "react-icons/bi";
import {MdOutlineCancel} from "react-icons/md";
import {AiOutlineQrcode} from "react-icons/ai";
import {ImPriceTags} from "react-icons/im";
import {RiNumbersFill} from "react-icons/ri";


const ProductDetail = () => {
    useRedirectLoggedOutUser("/login");
    const dispatch = useDispatch();
    const {id} = useParams();
    const isLoggedIn = useSelector(selectIsLoggedIn);

  const {product, isLoading, isError, message} = 
  useSelector((state) => state.product);

  const stockStatus = (quantity) => {
      if(quantity > 0){
          return <span className='--color-success'> <BiBadgeCheck size={30} /> In Stock</span>
      }else{
        return <span className='--color-danger'><MdOutlineCancel size={30} /> Out of Stock</span>
      }
  }


  useEffect(() => {
      if(isLoggedIn === true){
          dispatch(getProduct(id));
      }
      if(isError){
          console.log(message);
      }
  }, [isLoggedIn, isError, message, dispatch])
  
  return (
    <div>
        <h3 className='--mt'>Product Detail</h3>
            <div className='container'>
                {isLoading && <SpinerImg />}
                {product && (
                    <div className='row'>
                        <div className='col-md-4'>
                            <div className='dashboard-card'>
                                <div className='detail'>
                                    <div className='image-preview'>
                                        {product?.image ? (
                                        <img src={product.image.filePath} alt={product.image.fileName} />
                                    ) : (
                                        <p>Image not available for this product</p>
                                    )}  
                                    </div>
                                </div>
                         </div>
                         </div>
                        
                        <div className='col-md-8'>
                                    <div className='dashboard-card'>
                                    <h4> {product.name}</h4> 
                                    <hr/>
                                    <h4>
                                        Availability: &nbsp; {stockStatus(product.quantity)}
                                    </h4>
                                    <p>
                                        <b><AiOutlineQrcode size={25}/> Product Code: {product.productCode}</b>
                                    </p>
                                    <p>
                                        <b><ImPriceTags size={25} /> Price: {`₦${product.price.toLocaleString(undefined, {maximumFactorDigits: 2})}`}</b>
                                    </p>
                                    <p>
                                        <b><RiNumbersFill size={25}/> Quantity: {`${product.quantity.toLocaleString(undefined, {maximumFactorDigits: 2})}`}</b>
                                    </p>
                                    <p>
                                        <b><ImPriceTags size={25} /> Total Value in Stock: {`₦${(product.price * product.quantity).toLocaleString(undefined, {maximumFactorDigits: 2})}`}</b>
                                    </p>
                                    <p>
                                        <b>&rarr; Order Note: {product.orderNote}</b>
                                    </p>
                                    <hr />
                                    <h4>Description:</h4>
                                    <div dangerouslySetInnerHTML={{
                                        __html: DOMPurify.sanitize(product.description)
                                    }}>
                                    </div>
                                    <hr/>
                                        <code className='--color-dark'> Created on: {product.createdAt.toLocaleString("en-US")}</code>
                                        <br/>
                                        <code className='--color-dark'> Last Updated: {product.updatedAt.toLocaleString("en-US")}</code>
                                
                                </div>
                        </div>
                    </div>
                )}
            </div>
    </div>
  )
}

export default ProductDetail

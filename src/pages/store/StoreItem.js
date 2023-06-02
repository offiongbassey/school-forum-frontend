import React, { useEffect, useState } from 'react';
import "./Store.css";
import { useDispatch } from 'react-redux';
import useRedirectLoggedOutUser from '../../customHook/useRedirectLoggedOutUser';
import { createOrder, getStoreProduct } from '../../services/storeServices';
import { Link, NavigationType, useNavigate, useParams } from 'react-router-dom';
import DOMPurify from "dompurify";
import {BiBadgeCheck} from "react-icons/bi";
import {MdOutlineCancel} from "react-icons/md";
import {AiOutlineQrcode} from "react-icons/ai";
import {ImPriceTags} from "react-icons/im";
import {RiNumbersFill} from "react-icons/ri";
import { SpinerImg } from '../../components/loader/Loader';
import { toast } from 'react-toastify';

const StoreItem = () => {
    const [productId, setProductId] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    useRedirectLoggedOutUser("/login");
    const [product, setProduct] = useState("");
    const {url} = useParams();

    useEffect(() => {
        setIsLoading(true);
        async function getProduct(){
            const storeProduct =  await getStoreProduct(url);
            setProduct(storeProduct);
            setProductId(storeProduct._id);
            setIsLoading(false);
        }
        getProduct();
    }, [])
    
    
    


  const stockStatus = (quantity) => {
      if(quantity > 0){
          return <span className='--color-success'> <BiBadgeCheck size={30} /> In Stock</span>
      }else{
        return <span className='--color-danger'><MdOutlineCancel size={30} /> Out of Stock</span>
      }
  }

const placeOrder = async (e) => {
    e.preventDefault();
    if(!productId){
        return toast.error("Please enter an id");
      }
      setIsLoading(true);
      const userData = { productId};
    //   const userData = productId;
        try {
                const data = await createOrder(userData);
                setIsLoading(false);
                navigate(`/account/order/${data}`);
        } catch (error) {
                setIsLoading(false);
                console.log(error.message);
        }

}
  
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
                                        <img src={"https://res.cloudinary.com/dfhabqprq/image/upload/v1685431592/6621261_qpkva3.jpg"} alt={"default image"} />    
                                    )}  
                                    </div>
                                    <div className='store-item-btn'>
                                    {product.quantity === 0 ? (
                                        <span className='--color-danger'><MdOutlineCancel size={30} /> Out of Stock</span>
                                    ) : (
                                    <form onSubmit={placeOrder}>
                                        <input type='hidden' name='productId' value={productId} onChange={(e) => setProductId(e.target.value) } />
                                    <button type='submit' className='btn btn-primary'>Purchase Item</button>
                                    </form>
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
                                        <b>&rarr; Order Note: {product.orderNote}</b>
                                    </p>
                                    <hr />
                                    <h4>Description:</h4>
                                    <div dangerouslySetInnerHTML={{
                                        __html: DOMPurify.sanitize(product.description)
                                    }}>
                                    </div>
                                    <hr/>
                                    <div className='about-author'>
                                            <p><b>About The Author</b></p>
                                            <div className='row'>
                                                <div className='col-md-4'>
                                                    <div className='author-photo'>
                                                    <img src={product.userId.photo} alt="product"/>
                                                    </div>
                                                </div>
                                                <div className='col-md-8'>
                                                <p><b>Name: {product.userId.firstName + ' ' + product.userId.lastName}</b></p>
                                                    <label><b>Bio:</b> {product.userId.bio}</label>
                                                    
                                                </div>
                                                <div className='col-md-12'>
                                                <div className='author-button'>
                                                    <br/>
                                                       <Link to={`/account/products/author/${product.userId._id}`}> <button className='btn btn-primary'>View More </button></Link>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                    </div>
                                       
                                </div>
                        </div>
                    </div>
                )}
            </div>
    </div>
  )
}

export default StoreItem

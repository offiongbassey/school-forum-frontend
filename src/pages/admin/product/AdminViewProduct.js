import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useRedirectLoggedOutUser from '../../../customHook/useRedirectLoggedOutUser';
import { getStoreProduct } from '../../../services/storeServices';
import DOMPurify from "dompurify";
import {BiBadgeCheck} from "react-icons/bi";
import {MdOutlineCancel} from "react-icons/md";
import {AiOutlineQrcode} from "react-icons/ai";
import {ImPriceTags} from "react-icons/im";
import {RiNumbersFill} from "react-icons/ri";
import { SpinerImg } from '../../../components/loader/Loader';
import { toast } from 'react-toastify';
import { adminChangeProductStatus } from '../../../services/adminService';

const AdminViewProduct = () => {
    const [productId, setProductId] = useState("");
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
    
    
    
    const changeStatus = async (e) => {
        e.preventDefault();
     try {
            const status = await adminChangeProductStatus(url);
            setIsLoading(false);
            toast.success(status);
    } catch (error) {
            setIsLoading(false);
            console.log(error.message);
    }
    }

  const stockStatus = (quantity) => {
      if(quantity > 0){
          return <span className='--color-success'> <BiBadgeCheck size={30} /> In Stock</span>
      }else{
        return <span className='--color-danger'><MdOutlineCancel size={30} /> Out of Stock</span>
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
                                <button onClick={changeStatus} type='submit' className='btn btn-primary'>Change Status</button>
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
                                   
                            </div>
                    </div>
                </div>
            )}
        </div>
</div>
  )
}

export default AdminViewProduct

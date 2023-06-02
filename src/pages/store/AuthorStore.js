import React, { useEffect, useState } from 'react';
import "./Store.css";
import { useDispatch } from 'react-redux';
import useRedirectLoggedOutUser from '../../customHook/useRedirectLoggedOutUser';
import { getStoreAuthorProducts } from '../../services/storeServices';
import { Link, useParams } from 'react-router-dom';
import { SpinerImg } from '../../components/loader/Loader';
import { toast } from 'react-toastify';

const initialState = {
    productId: ""
}
const AuthorStore = () => {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    useRedirectLoggedOutUser("/login");
    const [products, setProducts] = useState([]);
    const {userId} = useParams();

    useEffect(() => {
        setIsLoading(true);
        async function getProducts(){
            const storeProducts =  await getStoreAuthorProducts(userId);
            setProducts(storeProducts);
            setIsLoading(false);
        }
        getProducts();
    }, [])

    const shortenText = (text, n) => {
        if(text.length > n){
            const shortendText = text.substring(0, n).
            concat("...");
            return shortendText;
        }
        return text;
    };
    

    
  return (
    <div>
        <h2>Store Items by Author</h2>
      <div className='container'>
      {isLoading && <SpinerImg />}
                {products && (
        <div className='row'>
        {products.map((product) => {
            return(
            <div className='col-md-3'>
                <div className='store-dashboard-card'>
                    <div className='group-store-product'>
                        <Link to={`/account/product/${product.url}`}>
                        <div className='store-image-preview'>
                            {product?.image ?(
                            <img src={product?.image.filePath} alt={product.image.fileName} />    
                            ): (<>
                            <img src={"https://res.cloudinary.com/dfhabqprq/image/upload/v1685431592/6621261_qpkva3.jpg"} alt={"default image"} />    
                            </>)}
                        {/* <h3>{product.image.fileName}</h3> */}
                        </div>
                        </Link>
                        <Link to={`/account/product/${product.url}`}>
                        <div className='store-details'>
                        <p>
                        {shortenText(product.name, 28)} 
                        </p>
                        <span>{`₦${product.price.toLocaleString(undefined, {maximumFactorDigits: 2})}`}</span>
                        </div>
                        </Link>
                </div>


                </div>
            </div>
            )
             })}
        </div>
        )}
    </div>
                
    </div>
  )
}

export default AuthorStore

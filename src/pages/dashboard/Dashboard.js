import React, { useEffect, useState } from 'react';
import ProductSummary from '../../components/product/productSummary/ProductSummary';
import useRedirectLoggedOutUser from '../../customHook/useRedirectLoggedOutUser';
import {getProducts} from "../../redux/features/product/productSlice";
import {useDispatch, useSelector} from "react-redux";
import {selectIsLoggedIn, selectUserName, SET_NAME, SET_USER} from "../../redux/features/auth/authSlice";


const Dashboard = () => {
  useRedirectLoggedOutUser("/login");
  const userName = useSelector(selectUserName);
  
  const isLoggedIn = useSelector(selectIsLoggedIn);
  

  const {products, isLoading, isError, message} = 
  useSelector((state) => state.product);

  const dispatch = useDispatch();
 


  useEffect(() => {
      if(isLoggedIn === true){
          dispatch(getProducts());
      }
      if(isError){
          console.log(message);
      }
  }, [isLoggedIn, isError, message, dispatch])
  

  
  return (
    <div>
          <ProductSummary products={products} userName={userName} />
    </div>
  )
}

export default Dashboard

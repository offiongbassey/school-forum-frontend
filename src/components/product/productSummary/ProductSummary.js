import React, { useEffect, useState } from 'react';
import "./ProductSummary.css";
import {AiFillDollarCircle} from "react-icons/ai";
import {BsCart4, BsCartX} from "react-icons/bs";
import InfoBox from '../../infoBox/InfoBox';
import { useDispatch, useSelector} from "react-redux";
import { CAL_OUTOFSTOCK, CAL_STORE_VALUE, selectOutOfStock, selectTotalStoreValue } from '../../../redux/features/product/productSlice';
import { getLecturerSumOrder } from '../../../services/authService';
import { SpinerImg } from '../../loader/Loader';

//icons
const earningIcon = <AiFillDollarCircle size={20} color="#fff" />;
const productIcon = <BsCart4 size={20} color="#fff" />;
const outOfStockIcon = <BsCartX size={20} color="#fff" />;



const ProductSummary = ({products, userName}) => {
  
  const dispatch = useDispatch();
  const totalStoreValue = useSelector(selectTotalStoreValue);
  const outOfStock = useSelector(selectOutOfStock);
  const activeProducts = products.length - outOfStock;
  const [isLoading, setIsLoading] = useState(true);

  const [sumOrder, setSumOrder] = useState(null);
  const [fundsWithdrawn, setFundsWithdrawn] = useState(null);
  const [totalBalance, setTotalBalance] = useState(null);

  
  useEffect(() => {
    dispatch(CAL_STORE_VALUE(products));
    dispatch(CAL_OUTOFSTOCK(products));
  }, [dispatch, products]);
  let data = null;
  useEffect(() => {
    async function getSumOrder() {
        data = await getLecturerSumOrder();
        if(data){
          setSumOrder(data.sumOrder);
        setFundsWithdrawn(data.fundsWithdrawn);
        setTotalBalance(data.totalBalance);
        setIsLoading(false);
        }
        
        
    }
    getSumOrder();
})
  return (
    <div className='product-summary'>
      <div className='info-summary'>
        <div className='container'>
          <h4>Welcome, {userName}</h4>
        {isLoading && <SpinerImg />}
      {!isLoading && sumOrder ? 
      (<>
            <div className='row'>
              <InfoBox icon={earningIcon} title={"TOTAL ORDER"} count={sumOrder.length > 0 ? (
                sumOrder.map((order) => {
                  return(<>{`₦${order.amount.toLocaleString(undefined, {maximumFactorDigits: 2})}`}</>)
                })          
                ) : (0)} bgColor="card2" extraInfo={"Total Successful Orders"} />
            <InfoBox icon={productIcon} title={"TOTAL PRODUCTS"} count={products.length} bgColor="card1" extraInfo={'All Products for Order'} />
            <InfoBox icon={earningIcon} title={"TOTAL PRODUCT VALUE"} count={`₦${totalStoreValue.toLocaleString(undefined, {maximumFactorDigits: 2})}`} bgColor="card4" extraInfo={"Estimated Total Product Value"}/>
            <InfoBox icon={outOfStockIcon} title={"OUT OF STOCK"} count={`${outOfStock.toLocaleString(undefined, {maximumFactorDigits: 2})}`} bgColor="card3" extraInfo={"Products currently unavailable"} />
          </div>
          <div className='row'>
          <InfoBox icon={earningIcon} title={"TOTAL FUNDS"} count={sumOrder.length > 0  ? (
                sumOrder.map((order) => {
                  return(<>{`₦${order.amount.toLocaleString(undefined, {maximumFactorDigits: 2})}`}</>)
                })          
                ) : (0)}  bgColor="card4" extraInfo={''} />
            <InfoBox icon={earningIcon} title={"FUNDS WITHDRAWN"} count={fundsWithdrawn.length > 0  ? (
                fundsWithdrawn.map((data) => {
                  return(<>{`₦${data.amount.toLocaleString(undefined, {maximumFactorDigits: 2})}`}</>)
                })          
                ) : (0)} bgColor="card1" extraInfo={""}/>
            <InfoBox icon={earningIcon} title={"FUNDS AVAILABLE"} count={totalBalance ? (
                totalBalance.map((data) => {
                  return(<>{`₦${data.balance.toLocaleString(undefined, {maximumFactorDigits: 2})}`}</>)
                })          
                ) : (0)} bgColor="card2" extraInfo={""} />
            <InfoBox icon={productIcon} title={"ACTIVE PRODUCTS"} count={`${activeProducts.toLocaleString(undefined, {maximumFactorDigits: 2})}`} bgColor="card2" extraInfo={""} />
          </div>
          </>)  : (<></>)}
       </div>
      </div>
    </div>
  )
}

export default ProductSummary

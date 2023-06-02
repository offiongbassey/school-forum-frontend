import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import heroImage from "../../assets/hero1.jpg";
import { SpinerImg } from '../../components/loader/Loader';
import useRedirectLoggedOutUser from '../../customHook/useRedirectLoggedOutUser';
import { approveOrder, getOrderProcess } from '../../services/orderService';
import { usePaystackPayment } from 'react-paystack';
import "./Order.css";
import { toast } from 'react-toastify';

const REACT_APP_PAYSTACK_KEY = process.env.REACT_APP_PAYSTACK_KEY;

const ProcessOrder = () => {
    // console.log(`this is payment gateway key${PAYMENT_GATEWAY_API}`);
    const navigate = useNavigate();
    
    const {id} = useParams();

    useRedirectLoggedOutUser("/login");
    const [order, setOrder] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true)
        async function getOrder() {
            const data = await getOrderProcess(id);

            setOrder(data);
            setIsLoading(false);
        }
        getOrder();
    }, []);

    //begin paystack integration
    
const config = {
    
    reference: order?.transactionCode.toString(),
    email: order?.userId.email,
    amount: order?.grandTotal * 100, //Amount is in the country's lowest currency. E.g Kobo, so 20000 kobo = N200
    publicKey: REACT_APP_PAYSTACK_KEY
};

// you can call this function anything
const onSuccess =  (reference) => {
    // Implementation for whatever you want to do with reference and after success call.
    processOrder(order?.transactionCode);
    console.log(reference);
    
  };
   // you can call this function anything
   const onClose = () => {
    // implementation for  whatever you want to do when the Paystack dialog closed.
    navigate(`/account/order/${id}`);
  }

  const PaystackHookExample = () => {
    const initializePayment = usePaystackPayment(config);
    return (
      <div>
          <button className="btn btn-primary" onClick={() => {
              initializePayment(onSuccess, onClose)
          }}>Pay with Paystack</button>
      </div>
    );
};

const processOrder = async (transactionCode) => {
    setIsLoading(true);
    const updateOrder = await  approveOrder(transactionCode);
    
    // toast.success("Payment Successful" + transactionCode);
    navigate("/receipt/"+transactionCode);
}

  return (
    <div className='container'>
        <h4>Pre Payment Confirmation </h4>
        {isLoading && <SpinerImg />}
        {order && !isLoading && (
           <div className='row'>
           <div className='pre-order-img col-md-6'>
               <div className=''>
                   <img src={heroImage} />
               </div>
           </div>

           <div className='col-md-6'>
               <div className='dashboard-card'>
                   <div className='pre-order-title'>
                   <h4>SUMMARY</h4>
                   <span>Transaction Code: {order?.transactionCode}</span>
                   <hr/>
                   <hr/>
                   </div>
                   <p>Amount: {`₦${order?.amount.toLocaleString(undefined, {maximumFactorDigits: 2})}`}</p>
                   <p>Transaction Fee: {`₦${order?.serviceCharge.toLocaleString(undefined, {maximumFactorDigits: 2})}`}</p>
                   <hr/>
                   <div className='grand-total'>
                   <span className='grand-span'>Grand Total:</span><h1> {`₦${order?.grandTotal.toLocaleString(undefined, {maximumFactorDigits: 2})}`}</h1>
                   </div>
                   <div className='pre-order-btn'>
                       <PaystackHookExample />
                   </div>
               </div>
           </div>
       </div> 
        )}
        
    </div>
  )
}

export default ProcessOrder

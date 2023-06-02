import React, { useEffect, useRef, useState } from 'react';
import "./OrderReceipt.css";
import Loader, { SpinerImg } from '../../components/loader/Loader';
import { Link, useParams } from 'react-router-dom';
import { getGeneralReceipt } from '../../services/orderService';
import ReactToPrint from 'react-to-print';

const OrderReceipt = () => {
    const componentRef = useRef();
    const [isLoading, setIsLoading] = useState();
    const [transaction, setTransaction] = useState("");
    const [product, setProduct] = useState("");
    const [userName, setUserName] = useState("");
    const [amount, setAmount] = useState("");
    const [serviceCharge, setServiceCharge] = useState("");
    const [grandTotal, setGrandTotal] = useState("");
    const {transactionCode} =  useParams();
    
    
    useEffect(() => {
        setIsLoading(true);
        async function getReceipt(){
            const transactionData = await getGeneralReceipt(transactionCode);
            setTransaction(transactionData);
            setProduct(transactionData.productId.name);
            setUserName(transactionData.userId);
            setAmount(transactionData.amount);
            setServiceCharge(transactionData.serviceCharge);
            setGrandTotal(transactionData.grandTotal);

            setIsLoading(false);
        }
        getReceipt()
    },[]);
    let newDate = new Date(transaction.createdAt)
    
  return (
    <div class="container" >
         {!isLoading && transaction.length === 0 ? (<SpinerImg />) : 
                (
    <div class="row gutters">
            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12" >
                <div class="card" ref={componentRef}>
                    <div class="card-body p-0">
                        <div class="invoice-container">
                            <div class="invoice-header">
                                <div class="row gutters">
                                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                                    </div>
                                </div>
                                <div class="row gutters">
                                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                                        <a href="index.html" class="invoice-logo">
                                            Payment Receipt
                                        </a>
                                    </div>
                                    <div class="col-lg-6 col-md-6 col-sm-6">
                                        <h4 class="text-left">
                                            UNICROSS ONLINE STORE<br/>
                                        </h4>
                                    </div>
                                </div>
                                <div class="row gutters">
                                    <div class="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12">
                                        <div class="invoice-details">
                                            <address>
                                                Name: {userName.firstName}<br/>
                                                Reg. No: {userName.regNumber}<br/>
                                                Phone Number: {userName.phone} <br/>
                                            </address>
                                        </div>
                                    </div>
                                    <div class="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12">
                                        <div class="invoice-details">
                                            <div class="invoice-num">
                                                <div>Transaction Code: {transaction.transactionCode}</div>
                                                <div>Type: {transaction.type}</div>
                                                <div>Date: {newDate.toDateString()}</div>
                                            </div>
                                        </div>													
                                    </div>
                                </div>
                            </div>
                            <div class="invoice-body">
                                <div class="row gutters">
                                    <div class="col-lg-12 col-md-12 col-sm-12">
                                        <div class="table-responsive">
                                            <table class="table custom-table m-0">
                                                <thead>
                                                    <tr>
                                                        <th>Items</th>
                                                        <th>Price</th>
                                                        <th>Quantity</th>
                                                        <th>Sub Total</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>
                                                        {product}
                                                            <p class="m-0 text-muted">
                                                                {/* Reference site about Lorem Ipsum, giving information on its origins. */}
                                                            </p>
                                                        </td>
                                                        <td>{`₦${amount.toLocaleString(undefined, {maximumFactorDigits: 2})}`}</td>
                                                        <td>1</td>
                                                        <td>{`₦${amount.toLocaleString(undefined, {maximumFactorDigits: 2})}`}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>&nbsp;</td>
                                                        <td colspan="2">
                                                            <p>
                                                                Subtotal<br/>
                                                                Transaction Fee:<br/>
                                                            </p>
                                                            <h5 class="text-success"><strong>Grand Total</strong></h5>
                                                        </td>			
                                                        <td>
                                                            <p>
                                                            {`₦${amount.toLocaleString(undefined, {maximumFactorDigits: 2})}`}<br/>
                                                            {`₦${serviceCharge.toLocaleString(undefined, {maximumFactorDigits: 2})}`}<br/>
                                                            </p>
                                                            <h5 class="text-success"><strong>{`₦${grandTotal.toLocaleString(undefined, {maximumFactorDigits: 2})}`}</strong></h5>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <hr/>
                            <div class="invoice-footer">
                               Powered by Computer Science Department
                            </div>
                        </div>
                    </div>
                    
                </div>
                <div class="custom-actions-btns mb-5">
                    <ReactToPrint
                    trigger={() => <button className='btn btn-primary'>Print</button>}
                    content={() => componentRef.current}
                />
            </div>
            </div>
            
        </div>
        ) }
    </div>
  )
}

export default OrderReceipt

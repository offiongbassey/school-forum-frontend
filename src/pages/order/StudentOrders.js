
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import useRedirectLoggedOutUser from '../../customHook/useRedirectLoggedOutUser';
import { getStudentOrders } from '../../services/orderService';
import { SpinerImg } from '../../components/loader/Loader';
import "./Order.css";
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import { BiDotsVerticalRounded } from 'react-icons/bi';
import { HiViewGrid } from 'react-icons/hi';

const StudentOrders = () => {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    useRedirectLoggedOutUser("/login");
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        setIsLoading(true);
        async function getOrders(){
            const storeOrders =  await getStudentOrders();
            setOrders(storeOrders);
            setIsLoading(false);
        }
        getOrders();
    }, [])

    const shortenText = (text, n) => {
        if(text.length > n){
            const shortendText = text.substring(0, n).
            concat("...");
            return shortendText;
        }
        return text;
    };

      //begin pagination
    
      const [currentItmes, setCurrentItems] = useState([]);
      const [pageCount, setPageCount] = useState(0);
  
      const [itemOffset, setItemOffset] = useState(0);
      const itemsPerPage = 10;
  
      useEffect(() => {
          const endOffset = itemOffset + itemsPerPage;
  
          setCurrentItems(orders.slice(itemOffset, endOffset));
          setPageCount(Math.ceil(orders.length / itemsPerPage));
  
      }, [itemOffset, itemsPerPage, orders]);
  
      const handlePageClick = (event) => {
          const newOffset = (event.selected * itemsPerPage)
           % orders.length;
           setItemOffset(newOffset);
      }
      
  
      //end pagination
  return (
    <div className='container'>
        <h4>My Orders</h4>
      <div className='row'>
            <div className='col-md-12'>
                <div className='dashboard-card'>
                    
                    {isLoading && <SpinerImg />}
                    <div className='table'>
                    {!isLoading && orders.length === 0  ? (
                        <div className='record-not-found'>
                        <p>No Record Found</p>
                        </div>
                    ) : (
                        <table>
                            <thead>
                                <tr>
                                    <th>ITEM</th>
                                    <th>ORDER CODE</th>
                                    <th>TRANSACTION CODE</th>
                                    <th>AMOUNT</th>
                                    <th>STATUS</th>
                                    <th>DATE</th>
                                    <th></th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                  currentItmes.map((order, index) => {
                                        const {_id, productId, productCode, orderCode, grandTotal, status, transactionCode, createdAt } = order;
                                        let newDate = new Date(createdAt);
                                        const REACT_APP_BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
                                        return (
                                            <tr key={_id}>
                                                <td><Link to={`/account/product/${productId.url}`}>{shortenText(productId.name, 25)}</Link></td>
                                                <td>{orderCode}</td>
                                                <td>{transactionCode}</td>
                                                <td>{`₦${grandTotal.toLocaleString(undefined, {maximumFactorDigits: 2})}`}</td>
                                                <td>{status === "Successful" ? (
                                                <span className='status-success'>
                                                {status}
                                                </span>
                                              ) : (
                                                <span className='status-pending'>
                                                {status}
                                                </span>
                                              )}  
                                                </td>
                                                <td>{newDate.toDateString()}</td>
                                                <td className='icons'>
                                                    <div class="btn-group dropstart">
                                                        <BiDotsVerticalRounded size={25} data-bs-toggle="dropdown" aria-expanded="false" />
                                                    <ul class="dropdown-menu drop-down-icon">
                                                        <li><Link class="dropdown-item" to={`/account/product/${productId.url}`}><HiViewGrid size={20}/> View Item </Link></li>
                                                    </ul>
                                                    </div>
                                                </td>
                                                <td>{productId.softCopy && status === "Successful" && (
                                                    <Link to={`${process.env.REACT_APP_BACKEND_URL}/${productId.softCopy.filePath}`}><button className='btn btn-primary'>Download</button></Link>
                                                    )}
                                                    </td>
                                            </tr>
                                        )
                                    })
                                    
                                }
                            </tbody>
                        </table>
                    ) }
                </div>
                <ReactPaginate
                    breakLabel="..."
                    nextLabel="Next"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={10}
                    pageCount={pageCount}
                    previousLabel="Prev"
                    renderOnZeroPageCount={null}
                    containerClassName="pagination"
                    pageLinkClassName='page-num'
                    previousLinkClassName='page-num'
                    nextLinkClassName='page-num'
                    activeLinkClassName='activePage'

                />
                </div>
            </div>
      </div>
    </div>
  )
}

export default StudentOrders

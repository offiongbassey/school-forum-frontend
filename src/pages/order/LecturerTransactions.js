import React, { useEffect, useState } from 'react'
import useRedirectLoggedOutUser from '../../customHook/useRedirectLoggedOutUser';
import { SpinerImg } from '../../components/loader/Loader';
import "./Order.css";
import ReactPaginate from 'react-paginate';
import { Link } from 'react-router-dom';
import { BiDotsVerticalRounded } from 'react-icons/bi';
import { HiViewGrid } from 'react-icons/hi';
import { getLecturerTransactions } from '../../services/orderService';

const LecturerTransactions = () => {
const [isLoading, setIsLoading] = useState(false);
useRedirectLoggedOutUser("/login");
const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        setIsLoading(true);
        async function getTransactions(){
            const transactions = await getLecturerTransactions();
            setTransactions(transactions);
            setIsLoading(false);
        }
        getTransactions();

    }, []);
    
  //begin pagination
    
  const [currentItmes, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);

  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 10;

  useEffect(() => {
      const endOffset = itemOffset + itemsPerPage;

      setCurrentItems(transactions.slice(itemOffset, endOffset));
      setPageCount(Math.ceil(transactions.length / itemsPerPage));

  }, [itemOffset, itemsPerPage, transactions]);

  const handlePageClick = (event) => {
      const newOffset = (event.selected * itemsPerPage)
       % transactions.length;
       setItemOffset(newOffset);
  }
  

  //end pagination
  return (
    <div className='container'>
        <h4>Transactions</h4>
    <div className='row'>
          <div className='col-md-12'>
              <div className='dashboard-card'>
                  {isLoading && <SpinerImg />}
                  <div className='table'>
                  {!isLoading && transactions.length === 0  ? (
                      <div className='record-not-found'>
                      <p>No Record Found</p>
                      </div>
                  ) : (
                      <table>
                          <thead>
                              <tr>
                                  <th>TRANSACTION CODE</th>
                                  <th>AMOUNT</th>
                                  <th>DATE PAID</th>
                                  <th>PAYER NAME</th>
                                  <th>STATUS</th>
                                  <th></th>
                              </tr>
                          </thead>
                          <tbody>
                              {
                                currentItmes.map((transaction, index) => {
                                      const {_id, userId, orderId, amount, grandTotal, type, purpose, status, transactionCode, createdAt } = transaction;
                                      let newDate = new Date(createdAt);
                                      return (
                                          
                                          <tr key={_id}>
                                              
                                              <td><Link to={`/receipt/${transactionCode}`}>{transactionCode}</Link></td>
                                              <td>{`₦${grandTotal.toLocaleString(undefined, {maximumFactorDigits: 2})}`}</td>
                                              <td>{
                                              newDate.toDateString()}</td> 
                                              <td><Link to={`/student-profile/${userId._id}`}>{userId.firstName + ' ' + userId.lastName}</Link></td>
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
                                              <td className='icons'>
                                                    <div class="btn-group dropstart">
                                                        <BiDotsVerticalRounded size={25} data-bs-toggle="dropdown" aria-expanded="false" />
                                                    <ul class="dropdown-menu drop-down-icon">
                                                        <li><Link class="dropdown-item" to={`/receipt/${transactionCode}`}><HiViewGrid size={20}/> Receipt </Link></li>
                                                        <li><Link class="dropdown-item" to={`/student-profile/${userId._id}`}><HiViewGrid size={20}/> View Student </Link></li>
                                                    </ul>
                                                    </div>
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

export default LecturerTransactions

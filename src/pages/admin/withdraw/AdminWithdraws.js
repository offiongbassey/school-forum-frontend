import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { Link } from 'react-router-dom';
import { adminFetchWithdraws } from '../../../services/adminService';

const AdminWithdraws = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [withdraws, setWithdraws] = useState([]);

    useEffect(() => {
      setIsLoading(true);
      async function getWithdrawals(){
          const data =  await adminFetchWithdraws();
          setWithdraws(data);
          setIsLoading(false);
      }
      getWithdrawals();
  }, [])


      //begin pagination
    
      const [currentItmes, setCurrentItems] = useState([]);
      const [pageCount, setPageCount] = useState(0);
  
      const [itemOffset, setItemOffset] = useState(0);
      const itemsPerPage = 10;
  
      useEffect(() => {
          const endOffset = itemOffset + itemsPerPage;
  
          setCurrentItems(withdraws.slice(itemOffset, endOffset));
          setPageCount(Math.ceil(withdraws.length / itemsPerPage));
  
      }, [itemOffset, itemsPerPage, withdraws]);
  
      const handlePageClick = (event) => {
          const newOffset = (event.selected * itemsPerPage)
           % withdraws.length;
           setItemOffset(newOffset);
      } 
      
            //end pagination
  return (
    <div className='container'>
        <div className='row'>
            <div className='col-md-12'>
            <div className='dashboard-card'>
                    <div className='table'>
                    {!isLoading && withdraws.length === 0  ? (
                        <div className='record-not-found'>
                        <p>No Record Found</p>
                        </div>
                    ) : (
                        <table>
                            <thead>
                                <tr>
                                    <th>NAME</th>
                                    <th>AMOUNT</th>
                                    <th>TYPE</th>
                                    <th>STATUS</th>
                                    <th>WITHDRAWAL CODE</th>
                                    <th>DATE</th>
                                    <th>BALANCE LEFT</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                  currentItmes.map((withdraw, index) => {
                                        const {_id, userId, amount, currentBal, purpose, status, transactionCode, createdAt } = withdraw;
                                        let newDate = new Date(createdAt);
                                        return (
                                            <tr key={_id}>
                                                 <td><Link to={`/admin/lecturer/${userId._id}`}>{userId.firstName + ' ' + userId.lastName}</Link></td>
                                                <td>{`₦${amount.toLocaleString(undefined, {maximumFactorDigits: 2})}`}</td>
                                                
                                                <td>{purpose}</td>
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
                                                <td>{transactionCode}</td>
                                                <td>{newDate.toDateString()}</td>
                                                <td>{`₦${currentBal.toLocaleString(undefined, {maximumFactorDigits: 2})}`}</td>
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

export default AdminWithdraws

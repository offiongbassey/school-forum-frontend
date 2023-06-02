import React, { useEffect, useState } from 'react'
import { getAdminOrders } from '../../../services/adminService';
import Loader, { SpinerImg } from '../../../components/loader/Loader';
import { Link } from 'react-router-dom';
import { BiDotsVerticalRounded } from 'react-icons/bi';
import { HiViewGrid } from 'react-icons/hi';
import ReactPaginate from 'react-paginate';

const AdminOrders = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [orders, setOrders] = useState([]);


  useEffect(() => {
    setIsLoading(true);
    async function getOrders(){
        const data =  await getAdminOrders();
        setOrders(data);
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
      {isLoading && <Loader />}
          <div className='row'>
            <div className='col-md-12'>
            <div className='dashboard-card'>
              
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
                              <th>LECTURER</th>
                              <th>STUDENT</th>
                              <th>ORDER CODE</th>
                              <th>TRANSACTION CODE</th>
                              <th>AMOUNT</th>
                              <th>STATUS</th>
                              <th>DATE</th>
                              <th></th>
                          </tr>
                      </thead>
                      <tbody>
                          {
                            currentItmes.map((order, index) => {
                                  const {_id, productId, productCode, orderCode, grandTotal, status, transactionCode, createdAt, userId, author } = order;
                                  let newDate = new Date(createdAt);
                                  return (
                                      <tr key={_id}>
                                          <td><Link to={`/admin/product/${productId.url}`}>{shortenText(productId.name, 25)}</Link></td>
                                          <td><Link to={`/admin/lecturer/${author._id}`}>{shortenText(author.firstName + ' ' + author.lastName, 25)}</Link></td>
                                          <td><Link to={`/admin/student-profile/${userId._id}`}>{shortenText(userId.firstName + ' ' + userId.lastName + ' - ' + userId.regNumber, 25)}</Link></td>
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
                                                  <li><Link class="dropdown-item" to={`/admin/product/${productId.url}`}><HiViewGrid size={20}/> View Item </Link></li>
                                                  <li><Link class="dropdown-item" to={`/admin/lecturer/${author._id}`}><HiViewGrid size={20}/> View Lecturer </Link></li>
                                                  <li><Link class="dropdown-item" to={`/admin/student-profile/${userId._id}`}><HiViewGrid size={20}/> View Student </Link></li>
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

export default AdminOrders

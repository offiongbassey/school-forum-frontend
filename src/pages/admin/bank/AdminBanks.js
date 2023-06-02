import React, { useEffect, useState } from 'react'
import { BiDotsVerticalRounded } from 'react-icons/bi';
import { HiViewGrid } from 'react-icons/hi';
import { RiAddLine } from 'react-icons/ri';
import ReactPaginate from 'react-paginate';
import { Link } from 'react-router-dom';
import { SpinerImg } from '../../../components/loader/Loader';
import useRedirectLoggedOutUser from '../../../customHook/useRedirectLoggedOutUser';
import { adminFetchBanks } from '../../../services/adminService';

const AdminBanks = () => {

  const [isLoading, setIsLoading] = useState(false);
  useRedirectLoggedOutUser("/login");
  const [banks, setBanks] = useState([]);
  
      useEffect(() => {
          setIsLoading(true);
          async function getBanks(){
              const banks = await adminFetchBanks();
              setBanks(banks);
              setIsLoading(false);
          }
          getBanks();
  
      }, []);
    //begin pagination
      
    const [currentItmes, setCurrentItems] = useState([]);
    const [pageCount, setPageCount] = useState(0);
  
    const [itemOffset, setItemOffset] = useState(0);
    const itemsPerPage = 10;
  
    useEffect(() => {
        const endOffset = itemOffset + itemsPerPage;
  
        setCurrentItems(banks.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(banks.length / itemsPerPage));
  
    }, [itemOffset, itemsPerPage, banks]);
  
    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage)
         % banks.length;
         setItemOffset(newOffset);
    }
    
  
    //end pagination
  return (
    <div className='container'>
        <div className='row'>
            <div className='col-md-9'>
                 <div className='form-group --flex-between'>
                 <Link to="/admin/banks/create"><button type='submit' className='btn btn-primary'><RiAddLine size={30} color={"#ffff"} /> Add New</button></Link>
                </div>
            </div>
        </div>
    <div className='row'>
          <div className='col-md-12'>
              <div className='dashboard-card'>
              <h4>Banks</h4>
                  {isLoading && <SpinerImg />}
                  <div className='table'>
                  {!isLoading && banks.length === 0  ? (
                      <div className='record-not-found'>
                      <p>No Record Found</p>
                      </div>
                  ) : (
                      <table>
                          <thead>
                              <tr>
                                  <th>NAME</th>
                                  <th>AUTHOR</th>
                                  <th>CODE</th>
                                  <th>STATUS</th>
                                  <th>DATE</th>
                                  <th></th>
                              </tr>
                          </thead>
                          <tbody>
                              {
                                currentItmes.map((bank, index) => {
                                      const {_id, userId, name, code, status, createdAt } = bank;
                                      let newDate = new Date(createdAt);
                                      return (
                                          
                                          <tr key={_id}>
                                              <td>{name}</td>
                                              <td>{userId.firstName + ' ' + userId.lastName}</td>
                                              <td>{code}</td>
                                              <td>{status === "Active" ? (
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
                                                        <li><Link class="dropdown-item" to={`/admin/bank/${_id}`}><HiViewGrid size={20}/> Edit Bank </Link></li>
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

export default AdminBanks

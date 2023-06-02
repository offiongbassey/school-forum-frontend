import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { Link } from 'react-router-dom';
import { adminFetchlecturers } from '../../../services/adminService';
import { BiDotsVerticalRounded } from 'react-icons/bi';
import { HiViewGrid } from 'react-icons/hi';
import { SpinerImg } from '../../../components/loader/Loader';

const AdminLecturers = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [lecturers, setLecturers] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    async function getLecturer(){
        const data =  await adminFetchlecturers();
        setLecturers(data);
        setIsLoading(false);
    }
    getLecturer();
}, [])


    //begin pagination
  
    const [currentItmes, setCurrentItems] = useState([]);
    const [pageCount, setPageCount] = useState(0);

    const [itemOffset, setItemOffset] = useState(0);
    const itemsPerPage = 10;

    useEffect(() => {
        const endOffset = itemOffset + itemsPerPage;

        setCurrentItems(lecturers.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(lecturers.length / itemsPerPage));

    }, [itemOffset, itemsPerPage, lecturers]);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage)
         % lecturers.length;
         setItemOffset(newOffset);
    } 
    
          //end pagination

  return (
    <div className='container'>
        <div className='row'>
            <div className='col-md-12'>
            <div className='dashboard-card'>
            {isLoading && <SpinerImg />}
                    <div className='table'>
                    {!isLoading && lecturers.length === 0  ? (
                        <div className='record-not-found'>
                        <p>No Record Found</p>
                        </div>
                    ) : (
                        <table>
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>NAME</th>
                                    <th>PHONE</th>
                                    <th>EMAIL</th>
                                    <th>STATUS</th>
                                    <th>DATE</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                  currentItmes.map((lecturer, index) => {
                                        const {_id, firstName, lastName, phone, email, photo, status, createdAt } = lecturer;
                                        let newDate = new Date(createdAt);
                                        return (
                                            <tr key={_id}>
                                              <td><div className='user-list-image-preview'><img src={photo}  alt={firstName} /></div></td>
                                                 <td><Link to={`/admin/lecturer/${_id}`}>{firstName + ' ' + lastName}</Link></td>
                                                <td>{phone}</td>
                                                <td>{email}</td>
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
                                                        <li><Link class="dropdown-item" to={`/admin/lecturer/${_id}`}><HiViewGrid size={20}/> View Profile </Link></li>
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

export default AdminLecturers

import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { Link } from 'react-router-dom';
import { BiDotsVerticalRounded } from 'react-icons/bi';
import { HiViewGrid } from 'react-icons/hi';
import { adminFetchProducts } from '../../../services/adminService';
import { SpinerImg } from '../../../components/loader/Loader';


const AdminProducts = () => {

  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    async function getproduct(){
        const data =  await adminFetchProducts();
        setProducts(data);
        setIsLoading(false);
    }
    getproduct();
}, [])


    //begin pagination
  
    const [currentItmes, setCurrentItems] = useState([]);
    const [pageCount, setPageCount] = useState(0);

    const [itemOffset, setItemOffset] = useState(0);
    const itemsPerPage = 10;

    useEffect(() => {
        const endOffset = itemOffset + itemsPerPage;

        setCurrentItems(products.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(products.length / itemsPerPage));

    }, [itemOffset, itemsPerPage, products]);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage)
         % products.length;
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
                {!isLoading && products.length === 0  ? (
                    <div className='record-not-found'>
                    <p>No Record Found</p>
                    </div>
                ) : (
                    <table>
                        <thead>
                            <tr>
                                <th></th>
                                <th>NAME</th>
                                <th>AUTHOR</th>
                                <th>PRICE</th>
                                <th>QUANTITY</th>
                                <th>PRODUCT CODE</th>
                                <th>STATUS</th>
                                <th>DATE</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                              currentItmes.map((product, index) => {
                                    const {_id, userId, name, productCode, url, quantity, price, status, image, createdAt } = product;
                                    let newDate = new Date(createdAt);
                                    return (
                                        <tr key={_id}>
                                          <td><div className='user-list-image-preview'>
                                          {image ?(
                                          <img src={image.filePath}  alt={name} />    
                                          ): (<>
                                          <img src={"https://res.cloudinary.com/dfhabqprq/image/upload/v1685431592/6621261_qpkva3.jpg"} alt={"default image"} />    
                                          </>)}
                                            
                                            </div>
                                            </td>
                                             <td><Link to={`/admin/product/${url}`}>{name}</Link></td>
                                             <td><Link to={`/admin/lecturer/${userId._id}`}>{userId.firstName + ' ' + userId.lastName}</Link></td>
                                            <td>{`₦${price.toLocaleString(undefined, {maximumFactorDigits: 2})}`}</td>
                                            <td>{`${quantity.toLocaleString(undefined, {maximumFactorDigits: 2})}`}</td>
                                            <td>{productCode}</td>
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
                                                    <li><Link class="dropdown-item" to={`/admin/product/${url}`}><HiViewGrid size={20}/> View Product </Link></li>
                                                    <li><Link class="dropdown-item" to={`/admin/lecturer/${_id}`}><HiViewGrid size={20}/> View Author </Link></li>
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

export default AdminProducts

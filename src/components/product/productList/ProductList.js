import React, { useEffect, useState } from 'react';
import "./productList.css";
import { SpinerImg } from '../../loader/Loader';
import { Link } from 'react-router-dom';
import Search from '../../search/Search';
import { useDispatch, useSelector } from "react-redux";
import { FILTER_PRODUCTS, selectFilteredProducts } from '../../../redux/features/product/filterSlice';
import ReactPaginate from 'react-paginate';
import {BiDotsVerticalRounded} from "react-icons/bi";
import {HiViewGrid} from "react-icons/hi";
import {TbTrashX} from "react-icons/tb";
import {MdModeEditOutline} from "react-icons/md";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { deleteProduct, getProducts } from '../../../redux/features/product/productSlice';
import {RiAddLine} from "react-icons/ri";
import { toast } from 'react-toastify';

const ProductList = ({products, isLoading}) => {
    
    const [search, setSearch] = useState("");
    const filteredProducts = useSelector(selectFilteredProducts);

    const dispatch = useDispatch();

     const shortenText = (text, n) => {
        if(text.length > n){
            const shortendText = text.substring(0, n).concat("...");
            return shortendText;
        }
        return text;
    };
    const delProduct = async (id) => {
            await dispatch(deleteProduct(id));
            await dispatch(getProducts());
    }
    const confirmDelete = (id) => {
        confirmAlert({
            title: 'Delete Product',
            message: 'Are you sure you want to Delete Product?',
            buttons: [
              {
                label: 'Delete',
                onClick: () => delProduct(id)
              },
              {
                label: 'Cancel'
                // onClick: () => alert('Click No')
              }
            ]
          });
    }

    //begin pagination
    
    const [currentItmes, setCurrentItems] = useState([]);
    const [pageCount, setPageCount] = useState(0);

    const [itemOffset, setItemOffset] = useState(0);
    const itemsPerPage = 5;

    useEffect(() => {
        const endOffset = itemOffset + itemsPerPage;

        setCurrentItems(filteredProducts.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(filteredProducts.length / itemsPerPage));

    }, [itemOffset, itemsPerPage, filteredProducts]);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage)
         % filteredProducts.length;
         setItemOffset(newOffset);
    }
    

    //end pagination
    useEffect(() => {
        dispatch(FILTER_PRODUCTS({products, search}))
    }, [products, search, dispatch]);


    const copyToClipBoard = async copyMe => {
        try {
            await navigator.clipboard.writeText(copyMe);
            toast.success("Link Copied!");
        } catch (error) {
            toast.error("Failed to Copy");
        }
    }
  return (
    <div className='product-list'>
        <hr />
        <div className='table'>
        <div className='container'>
        <div className='row'>
            
            <div className='col-md-9'>
                 <div className='form-group --flex-between'>
                 <Link to="/add-product"><button type='submit' className='btn btn-primary'><RiAddLine size={30} color={"#ffff"} /> Add New</button></Link>
                </div>
            </div>
            <div className='col-md-3'>
                 <Search value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
        </div>

        <div className='row'>

            <div className='col-md-12'>
                <div className='dashboard-card'>

                {isLoading && <SpinerImg />}
                <div className='table'>
                    {!isLoading && products.length === 0  ? (
                        <p>Product not found, please add a product</p>
                    ) : (
                        <table>
                            <thead>
                                <tr>
                                    <th>S/N</th>
                                    <th>NAME</th>
                                    <th>PRICE</th>
                                    <th>QUANTITY</th>
                                    <th>SOFTCOPY</th>
                                    <th>ACTION</th>
                                    <th>DOWNLOAD</th>
                                    
                                </tr>
                            </thead>
                            <tbody>
                                {
                                  currentItmes.map((product, index) => {
                                        const {_id, name, quantity, price, } = product;
                                        return (
                                            <tr key={_id}>
                                                <td>{index + 1}</td>
                                                <td><Link class="dropdown-item" to={`/product-detail/${_id}`}>{shortenText(name, 20)}</Link></td>
                                                <td>{`₦${price.toLocaleString(undefined, {maximumFactorDigits: 2})}`}</td>
                                                <td>{quantity}</td>
                                                <td><Link to={`/product/upload-softcopy/${_id}`}><button className='btn btn-secondary'>Softcopy</button></Link>
                                                </td>
                                                <td className='icons'>
                                                    <div class="btn-group dropstart">
                                                        <BiDotsVerticalRounded size={25} data-bs-toggle="dropdown" aria-expanded="false" />
                                                    <ul class="dropdown-menu drop-down-icon">
                                                        <li><Link class="dropdown-item" to={`/product-detail/${_id}`}><HiViewGrid size={20}/> View </Link></li>
                                                        <li><Link class="dropdown-item" to={`/edit-product/${_id}`}><MdModeEditOutline size={20} /> Edit</Link></li>
                                                        <li><span class="dropdown-item" onClick={() => copyToClipBoard(`localhost:3000/account/product/${product.url}`)}><MdModeEditOutline size={20} /> Copy Link</span></li>
                                                        <li onClick={() => confirmDelete(_id)} class="dropdown-item"><TbTrashX  size={20} color={"red"}/> <span>Delete</span></li>
                                                    </ul>
                                                    </div>
                                                </td>
                                                <td>{product.softCopy && (
                                                    <Link to={`${process.env.REACT_APP_BACKEND_URL}/${product.softCopy.filePath}`}><button className='btn btn-primary'>Download</button></Link>
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
                    pageRangeDisplayed={5}
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
      
      </div>
    </div>
  )
}

export default ProductList

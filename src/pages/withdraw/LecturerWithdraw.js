import React, { useEffect, useState } from 'react';
import "./Withdraw.css";
import Modal from 'react-modal';
import ReactDOM from 'react-dom';
import ReactPaginate from 'react-paginate';
import { AiFillEyeInvisible} from "react-icons/ai";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchLecturerWithdraws, resetWithdrawPIN, withDrawNow } from '../../services/authService';
import { toast } from 'react-toastify';
import Loader, { SpinerImg } from '../../components/loader/Loader';

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

  // Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root');

const initialState = {
  amount: "",
  pin: "",
}

const LecturerWithdraw = () => {
  const [formData, setformData ] = useState(initialState);
  const {amount, pin} = formData;
  
  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setformData({...formData, [name]: value})
}
    let subtitle;
    const [modalIsOpen, setIsOpen] = React.useState(false);
  
    function openModal() {
      setIsOpen(true);
    }
  
    function afterOpenModal() {
      // references are now sync'd and can be accessed.
      subtitle.style.color = '#f00';
    }
  
    function closeModal() {
      setIsOpen(false);
    }
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

  
    const withdraw =  async (e) => {
      e.preventDefault();

    if(!amount){
      return toast.error("Amount is required!");
    }
    if(!pin){
      return toast.error("PIN is required!");
    }
    const userData = {
      amount, pin
    }
    setIsLoading(true);
    try {
      const data = await withDrawNow(userData);
      // console.log(data);
      setIsLoading(false);
      if(data.message === "Transaction Successful"){
        closeModal();
      }

    } catch (error) {
      setIsLoading(false);
    }
    }
    const [withdraws, setWithdraws] = useState([]);

    useEffect(() => {
      setIsLoading(true);
      async function getWithdrawals(){
          const data =  await fetchLecturerWithdraws();
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
      const resetPin = async (e) => {
          e.preventDefault();
          setIsLoading(true);
    try {
      const data = await resetWithdrawPIN();
      // console.log(data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
      }
  


  return (
      <div className='withdraw'>
        {isLoading && <Loader />}
    <div className='conatiner'>
        
        <div className='row'>
            <div className='col-md-12'>
            <div className='withdraw-btn'>
                <button className='btn btn-primary' onClick={openModal}>Withdraw</button>
                <button className='btn btn-success' onClick={resetPin}>Change Pin</button>
            </div>
            </div>
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

    <div>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2 ref={(_subtitle) => (subtitle = _subtitle)}></h2>
        <h4>Withdraw Funds</h4>
        <form onSubmit={withdraw}>
                            <div className='form-group'>
                            <label>Amount:</label>
                            <input type="number" placeholder='Amount' required className='form-control' 
                              name="amount" value={amount} onChange={handleInputChange} />
                            </div>
                            <div className='form-group'>
                            <label>PIN:</label>
                            <input type="password" id='password' placeholder='PIN' required className='form-control' 
                              name="pin" value={pin} onChange={handleInputChange} />
                              
                            </div>
                            <div className='withdraw-form-btn'>
                                <button type='submit' className='btn btn-success'>Withdraw</button>
                                <button className='btn btn-danger' onClick={closeModal}>close</button>
                            </div>
        </form>
        
      </Modal>
    </div>
    
    </div>
  )
}

export default LecturerWithdraw

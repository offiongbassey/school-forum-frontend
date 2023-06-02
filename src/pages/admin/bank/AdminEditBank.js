import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loader from '../../../components/loader/Loader';
import useRedirectLoggedOutUser from '../../../customHook/useRedirectLoggedOutUser';
import { AdminBankEdit, adminChangeBankStatus, adminFetchBank } from '../../../services/adminService';

const AdminEditBank = () => {
    const {bankId} = useParams();

    const handleInputChange = (e) => {
      const {name, value} = e.target;
      setBank({...bank, [name]: value})
  }

    const [isLoading, setIsLoading] = useState(false);
    useRedirectLoggedOutUser("/login");
    const [bank, setBank] = useState([]);
    
        useEffect(() => {
            setIsLoading(true);
            async function getBank(){
                const data = await adminFetchBank(bankId);
                setBank(data);
                setIsLoading(false);
            }
            getBank();
    
        }, []);
        
    const editBank = async (e) => {
      e.preventDefault();

     
      if(!bank.name){
          return toast.error("Bank Name is required");
      }
      if(!bank.code){
          return toast.error("Bank Code is required");
      }
      const formData = {
        name: bank.name,
        code: bank.code
      }
      
      setIsLoading(true);
      try {
          const data = await AdminBankEdit(bankId, formData);
          setIsLoading(false);
          
      } catch (error) {
          setIsLoading(false);   
      }

  }

  const changeStatus = async () => {
    setIsLoading(true);
 try {
        const status = await adminChangeBankStatus(bankId);
        setIsLoading(false);
        toast.success(status);
} catch (error) {
        setIsLoading(false);
        console.log(error.message);
}

}


  return (
    <div className='container'>
    {isLoading && <Loader />}
 <div className='row'>
     <div className='col-md-12'>
          <button className='btn btn-primary' onClick={changeStatus}>Change Status</button>
           <div className='dashboard-card'>
               <h4>Edt Bank</h4>
               {bank && (
               <form onSubmit={editBank}>
               <div className='row'>
                   <div className='col-md-6'>
                       <div className='form-group'>
                           <input required type="text" placeholder='Bank Name' name="name" className='form-control' value={bank.name} onChange={handleInputChange}  />
                       </div>
                   </div>
                   <div className='col-md-6'>
                       <div className='form-group'>
                           <input required type="text" placeholder='Bank Code' name="code" className='form-control' value={bank.code} onChange={handleInputChange}  />
                       </div>
                   </div>
                   <div className='col-md-12'>
                       <div className='form-group'>
                           <button type='submit' className='btn btn-primary'>Save</button>
                       </div>
                   </div>
               </div>
               </form>
        )}
           </div>
     </div>

 </div>
</div>
  )
}

export default AdminEditBank

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import Loader from '../../../components/loader/Loader';
import { AdminAddBank } from '../../../services/adminService';


const initialState = {
    name: "",
    code: "",
  }
  

const AdminCreateBank = () => {

    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setformData ] = useState(initialState);
    const {name, code} = formData;
  
    const handleInputChange = (e) => {
      const {name, value} = e.target;
      setformData({...formData, [name]: value})
    }

    const addBank = async (e) => {
        e.preventDefault();
        if(!name){
            return toast.error("Bank Name is required");
        }
        if(!code){
            return toast.error("Bank Code is required");
        }
        const userData = {
            name, code
        }
        setIsLoading(true);
        try {
            const data = await AdminAddBank(userData);
            toast.success(data);
            setIsLoading(false);
            
        } catch (error) {
            setIsLoading(false);   
        }

    }
  
  return (
    <div className='container'>
         {isLoading && <Loader />}
      <div className='row'>
          <div className='col-md-12'>
                <div className='dashboard-card'>
                    <h4>Add New Bank</h4>
                    <form onSubmit={addBank}>
                    <div className='row'>
                        <div className='col-md-6'>
                            <div className='form-group'>
                                <input required type="text" placeholder='Bank Name' name="name" className='form-control' value={name} onChange={handleInputChange} />
                            </div>
                        </div>
                        <div className='col-md-6'>
                            <div className='form-group'>
                                <input required type="text" placeholder='Bank Code' name="code" className='form-control' value={code} onChange={handleInputChange} />
                            </div>
                        </div>
                        <div className='col-md-12'>
                            <div className='form-group'>
                                <button type='submit' className='btn btn-primary'>Submit</button>
                            </div>
                        </div>
                    </div>
                    </form>

                </div>
          </div>

      </div>
    </div>
  )
}

export default AdminCreateBank

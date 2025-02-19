import Edit from '../../features/reusables/EditViewDelete/Edit'
import React, { useState, useEffect } from 'react'
import OutlinedButton from '../../features/reusables/Buttons/OutlinedButton';
import FilledButton from '../../features/reusables/Buttons/FilledButton';
import style from '../../features/reusables/EditViewDelete/editStyle.module.css'
import { useEditResourceMutation } from '../../redux/api/generalApi';

const EditClient = ({close, data}) => {

  const [formData, setFormData] = useState({})
  const [formError, setFormError] = useState()
  const [editResource, { isSuccess, isLoading, error }] = useEditResourceMutation()

  const handleSubmit = async (e) => {
    e.preventDefault();

    const clientData = {
        name: e.target.name.value,
        phoneNo: e.target.phoneNo.value,
        address: e.target.address.value,
        DOB: e.target.DOB.value,
        email: e.target.email.value,
        category: e.target.category.value,
        description: e.target.description.value,
    };

    try {
        let result;
        if (data?.clientId) {
            // console.log(formData.acctId)
            // Update existing account
            result = await editResource({
                url: `client/update/${data.clientId}`,
                method: 'PUT',
                data: clientData,
            }).unwrap();
            // console.log('Account updated successfully:', result);
            setFormData(null)
            alert('Client updated successfully');
        } else {
            // Create new account
            result = await postResource({
                url: '/client/create',
                data: clientData,
            }).unwrap();
            // console.log('Account created successfully:', result);
            alert('Client created successfully');
        }

        e.target.reset();
        window.location.reload();
        if (!keepOpen) {
            toggleForm();
        }
    } catch (error) {
        console.error('Error saving client:');
        // alert(`Error saving client: ${error.message}`);
        if ( error.data) {
            // If the error message is in the response
            const errorMessage = error.data.error;
            setFormError(errorMessage);
        } else {
            // Generic fallback for other errors
            setFormError("An unexpected error occurred");
        }
    }
};

useEffect(() => {
  if (data) {
      setFormData({
          ...data,
      });
  }
}, [data]);


  //handles the inut change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
        ...prev,
        [name]: value,
    }));
};

  const formContent = 
  <form className={style.form} onSubmit={handleSubmit}>
    <span>
      <div className=''>
        <label htmlFor="" className=''>Client Name</label>
        <input type="text" className='' name='name' value={formData?.name} onChange={handleInputChange}/>
      </div>
      <div>
        <label htmlFor="">Phone Number</label>
        <input type="number" name='phoneNo' value={formData?.phoneNo} onChange={handleInputChange}/>
      </div>
      <div>
        <label htmlFor="">Email Address</label>
        <input type="text" name='email' value={formData?.email} onChange={handleInputChange}/>
      </div>
      <div>
        <label htmlFor="">Birth Day</label>
        <input type="date" name='DOB' value={formData?.DOB?.slice(0,10)} onChange={handleInputChange}/>
      </div>
      <div>
        <label htmlFor="">Address</label>
        <input type="text" name='address' value={formData?.address} onChange={handleInputChange}/>
      </div>
      <div >
        <label >Category</label>
        <select
          required
          name='category'
          value={formData?.category}
          onChange={handleInputChange}
        >
          <option value="">Select category</option>
          <option value="first_time">First Time</option>
          <option value="returning">Returning</option>
        </select>
      </div>
      <div>
        <label htmlFor="">Description</label>
        <input type="text" name='description' value={formData?.description} onChange={handleInputChange}/>
      </div>
    </span>
    <span className='flex gap-3 mt-10'>
      <OutlinedButton content={'Cancel'} performAction={close}/>
      <FilledButton content={'Update'}/>
    </span>
  </form>

  return (
    <div>
      <Edit close={close} formContenten={formContent} header='Edit Client Details'/>
    </div>
  )
}

export default EditClient

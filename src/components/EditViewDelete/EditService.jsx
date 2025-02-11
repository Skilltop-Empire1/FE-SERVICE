import Edit from '../../features/reusables/EditViewDelete/Edit'
import React, { useState, useEffect } from 'react'
import OutlinedButton from '../../features/reusables/Buttons/OutlinedButton';
import FilledButton from '../../features/reusables/Buttons/FilledButton';
import style from '../../features/reusables/EditViewDelete/editStyle.module.css'
import { useEditResourceMutation, useFetchResourceQuery } from '../../redux/api/generalApi';

const EditContent = ({close, data}) => {

  const [formData, setFormData] = useState({})
  const [formError, setFormError] = useState()
  const [editResource, { isSuccess, isLoading, error }] = useEditResourceMutation()
  const { data: employeeData, isLoading: dataLoading, isError: dataError } = useFetchResourceQuery('/employee/list');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const serviceData = {
        serviceName: e.target.serviceName.value,
        phoneNumber: e.target.phoneNumber.value,
        serviceManager: e.target.serviceManager.value,
        duration: e.target.duration.value,
        price: e.target.price.value,
        description: e.target.description.value,
    };

    try {
        let result;
        if (data?.serviceId) {
            // console.log(formData.acctId)
            // Update existing account
            result = await editResource({
                url: `/service/edit/${data.serviceId}`,
                method: 'PUT',
                data: serviceData,
            }).unwrap();
            // console.log('Account updated successfully:', result);
            setFormData(null)
            alert('Service updated successfully');
        } else {
            // Create new account
            result = await postResource({
                url: '/service/create',
                data: serviceData,
            }).unwrap();
            // console.log('Account created successfully:', result);
            alert('Service created successfully');
        }

        e.target.reset();
        window.location.reload();
        if (!keepOpen) {
            toggleForm();
        }
    } catch (error) {
        console.error('Error saving Service:');
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
    <div>
      <label htmlFor="">Service Name</label>
       <input type="text" name='serviceName' value={formData?.serviceName} onChange={handleInputChange}/>
    </div>
    <div>
      <label htmlFor="">Price</label>
      <input type="text" name='price' value={formData?.price} onChange={handleInputChange}/>
    </div>
    <div>
      <label htmlFor="">Average TAT (Duration)</label>
      <input type="text" name='duration' value={formData?.duration} onChange={handleInputChange}/>
    </div>
    <div >
      <label >Service Manager</label>
      <select
        required
        name='serviceManager'
        value={formData?.serviceManager}
        onChange={handleInputChange}
      >
      <option value="">Select Service Manager</option>
      {employeeData?.getEmployees?.map((data) => (
                <option key={data.userId} value={data.userId}>
                  {data.email}
                </option>
              ))}
      </select>
    </div>
    <div>
      <label htmlFor="">Phone Number</label>
       <input type="number" name='phoneNumber' value={formData?.phoneNumber} onChange={handleInputChange}/>
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
      <Edit close={close} formContenten={formContent} header='Edit Service Details'/>
    </div>
  )
}

export default EditContent

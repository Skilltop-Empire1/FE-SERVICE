import React, { useState } from 'react';
import AddModal from '../../features/reusables/AddModal'
import { useNavigate } from 'react-router'
import { usePostResourceMutation, useFetchResourceQuery } from '../../redux/api/generalApi';
import OutlinedButton from '../../features/reusables/Buttons/OutlinedButton';
import FilledButton from '../../features/reusables/Buttons/FilledButton';

const AddService = () => {
  const navigate = useNavigate()
  const [postResource, { isSuccess, isLoading, error }] = usePostResourceMutation();
  const { data: employeeData, isLoading: dataLoading, isError: dataError } = useFetchResourceQuery('/employee/list');
  const [formError, setFormError] = useState(null);
  const goBack = () =>   navigate('/app/Services')



  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Ensure the form is actually submitting data
    const form = document.getElementById("add-client-form");
    const formData = new FormData(form);
  
    console.log("Form data:", Object.fromEntries(formData.entries())); // Debugging
  
    const serviceName = formData.get("serviceName") || "";
    const serviceManager = formData.get("serviceManager") || "";
    const phoneNumber = formData.get("phoneNo") || "";
    const price = formData.get("price") || "";
    const duration = formData.get("duration") || "";
    const description = formData.get("description") || "";
  
    if (!serviceName || !serviceManager || !phoneNumber || !description || !price || !duration) {
      setFormError("All fields are required.");
      return;
    }
  
    const payload = {
      serviceName,
      serviceManager,
      phoneNumber,
      price,
      duration,
      description,
    };
  
    console.log("Submitting data:", payload);
  
    try {
      await postResource({
        url: "/service/create",
        data: payload, // Send as JSON instead of FormData unless backend expects multipart/form-data
      }).unwrap();
  
      alert("Client added successfully");
      form.reset();
      goBack()
    } catch (error) {
      console.error("Error adding client:", error);
      setFormError(error.data?.error || "An unexpected error occurred");
    }
  };


  const formContent = 
  <form onSubmit={handleSubmit} id="add-client-form">
         <span className='md:grid grid-cols-2 gap-5'>
          <div >
            <label >Service Name</label>
            <input
              type=""
              required
              placeholder='Service Name'
              name='serviceName'
            />
          </div>
          <div >
            <label >Service Manager</label>
            <select
              required
              name='serviceManager'
            >
              <option value="">Select Service Manager</option>
              {employeeData?.getEmployees?.map((data) => (
                <option key={data.userId} value={data.userId}>
                  {data.email}
                </option>
              ))}
            </select>
          </div>
          <div >
            <label >Price</label>
            <input
              type="number"
              required
              placeholder='Price'
              name='price'
            />
          </div>
          <div >
            <label >Phone Number</label>
            <input
              type="number"
              required
              placeholder='Phone Number'
              name='phoneNo'
            />
          </div>
          <div >
            <label >Average TAT (Duration)</label>
            <input
              type="text"
              required
              placeholder='Average TAT (Duration)'
              name='duration'
            />
          </div>
          <div >
            <label >Description</label>
            <input
              type="text"
              required
              placeholder='Description'
              name='description'
            />
          </div>
         </span>
         <span className='grid-cols-2 md:grid sticky bg-[#fff] pt-2 border-t-2 md:border-t-0 lg:relative bottom-1 mt-10'>
                <span className="mt-8 flex items-center gap-4">
                  <input
                    type="checkbox"
                    name="check"
                  //   checked={addAnother}
                    // onChange={addAnother}
                    className={`flex items-center justify-center`}
                  />
                  <label htmlFor="check">{'Add another Client'}</label>
                </span>

                <span className="mt-5 flex justify-around gap-2 px-2">
                  <OutlinedButton content={'Cancel'} performAction={goBack}/>
                  <FilledButton content={'Save'}/>
                </span>
        </span>
  </form>



  return (
    <div className='h-full'>
        {/* use the addAnother to implement the logic to remain on the page if checked */}
        <AddModal
          header={'Add Service'} 
          formContent={formContent} 
          close={goBack} 
          anotherContent={'Add another service'}
          
        />
    </div>
  )
}

export default AddService

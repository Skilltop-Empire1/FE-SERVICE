import React, { useState } from 'react';
import AddModal from '../../features/reusables/AddModal'
import { useNavigate } from 'react-router'
import { usePostResourceMutation, useFetchResourceQuery } from '../../redux/api/generalApi';
import OutlinedButton from '../../features/reusables/Buttons/OutlinedButton';
import FilledButton from '../../features/reusables/Buttons/FilledButton';

const AddClient = () => {
  const navigate = useNavigate();
  const [postResource, { isSuccess, isLoading, error }] = usePostResourceMutation();
  const [formError, setFormError] = useState(null);

  // const { data: fetchedData } = useFetchResourceQuery('/service/allServices');
  // const { data: employeeData } = useFetchResourceQuery('/employee/list');

  const goBack = () => navigate('/app/clients');

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Ensure the form is actually submitting data
    const form = document.getElementById("add-client-form");
    const formData = new FormData(form);
  
    console.log("Form data:", Object.fromEntries(formData.entries())); // Debugging
  
    const name = formData.get("name") || "";
    const email = formData.get("email") || "";
    const phoneNo = formData.get("phoneNo") || "";
    const description = formData.get("description") || "";
    const DOB = formData.get("DOB") || "";
    const category = formData.get("category") || "";
    const address = formData.get("address") || "";
  
    if (!name || !email || !phoneNo || !description || !DOB || !category || !address) {
      setFormError("All fields are required.");
      return;
    }
  
    const payload = {
      name,
      email,
      phoneNo,
      description,
      DOB,
      category,
      address,
    };
  
    console.log("Submitting data:", payload);
  
    try {
      await postResource({
        url: "/client/create",
        data: payload, // Send as JSON instead of FormData unless backend expects multipart/form-data
      }).unwrap();
  
      alert("Client added successfully");
      form.reset();
      window.location.reload();
    } catch (error) {
      console.error("Error adding client:", error);
      setFormError(error.data?.error || "An unexpected error occurred");
    }
  };
  

  const formContent = (
    <form onSubmit={handleSubmit} id="add-client-form" className=''>
      <span className='md:grid grid-cols-2 gap-5'>
        <div className=''>
          <label>Client Name</label>
          <input type="text" required placeholder="Service Name" name="name" />
        </div>
        <div>
          <label>Residential Address</label>
          <input type="text" required placeholder="Address" name="address" />
        </div>
        <div>
          <label>Phone Number</label>
          <input type="number" required placeholder="Phone Number" name="phoneNo" />
        </div>
        <div>
          <label>Category</label>
          <select required name="category">
            <option value="">Select category</option>
            <option value="first_time">First Time</option>
            <option value="returning">Returning</option>
          </select>
        </div>
        <div>
          <label>Email Address</label>
          <input type="email" required placeholder="" name="email" />
        </div>
        <div>
          <label>Description</label>
          <input type="text" required placeholder="" name="description" />
        </div>
        <div>
          <label>Birthday</label>
          <input type="date" required placeholder="" name="DOB" />
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
  );
  



  return (
    <div className='h-full'>
        {/* use the addAnother to implement the logic to remain on the page if checked */}
        <AddModal
          header={'Add Client'} 
          formContent={formContent} 
          close={goBack} 
          anotherContent={'Add another Client'}
          save={isLoading ? 'Saving' : 'Save'}
          submit={handleSubmit}
          />
          {formError && <p className="text-red-500">{formError}</p>}
    </div>
  )
}

export default AddClient

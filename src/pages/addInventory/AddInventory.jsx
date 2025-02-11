import React, { useState } from 'react';
import AddModal from '../../features/reusables/AddModal'
import { useNavigate } from 'react-router'
import { usePostResourceMutation, useFetchResourceQuery } from '../../redux/api/generalApi';
import OutlinedButton from '../../features/reusables/Buttons/OutlinedButton';
import FilledButton from '../../features/reusables/Buttons/FilledButton';


const AddInventory = () => {
  const goBack = () => navigate('/app/inventories')

  const navigate = useNavigate()
  const [postResource, { isSuccess, isLoading, error }] = usePostResourceMutation();
  const [formError, setFormError] = useState(null);

  // const { data: fetchedData } = useFetchResourceQuery('/service/allServices');
  // const { data: employeeData } = useFetchResourceQuery('/employee/list');


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


  const formContent = 
  <form onSubmit={handleSubmit} id="add-client-form" className=''>
      <span className='md:grid grid-cols-2 gap-5'>
        <div >
            <label >Item Name</label>
            <input
              type=""
              required
              placeholder='Item Name'
              name='itemName'
            />
          </div>
          <div >
            <label >Total Value</label>
            <input
              type="number"
              required
              placeholder='Total Value'
              name='totalValue'
            />
          </div>
          <div >
            <label >Category</label>
            <select
              required
              name='category'
            >
              <option value="">Select Category</option>
              <option value="full">Full Payment</option>
              <option value="part_payment">Part Payment</option>
              <option value="credit">Credit Sales</option>
            </select>
          </div><div >
            <label >Assigned To/Location</label>
            <select
              required
              name='assignedTo'
            >
              <option value="">Select Location</option>
              <option value="full">Full Payment</option>
              <option value="part_payment">Part Payment</option>
              <option value="credit">Credit Sales</option>
            </select>
          </div>
          <div >
            <label >Item Id</label>
            <input
              type="text"
              required
              placeholder='Item Id'
              name='itemId'
            />
          </div>
          <div >
            <label >Date Purchased</label>
            <input
              type="date"
              required
              placeholder='Date Purchased'
              name='datePurchased'
            />
          </div>
          <div >
            <label >Quantity</label>
            <input
              type="number"
              required
              placeholder='Quantity'
              name='quantity'
            />
          </div>
          <div >
            <label >Note</label>
            <input
              type="text"
              required
              placeholder='Add Note'
              name='note'
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
          header={'Add Inventory'} 
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

export default AddInventory

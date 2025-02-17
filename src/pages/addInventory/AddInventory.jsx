import React, { useState } from 'react';
import AddModal from '../../features/reusables/AddModal'
import { useNavigate } from 'react-router'
import { usePostResourceMutation, useFetchResourceQuery } from '../../redux/api/generalApi';
import OutlinedButton from '../../features/reusables/Buttons/OutlinedButton';
import FilledButton from '../../features/reusables/Buttons/FilledButton';
import { PlusCircle } from 'lucide-react';
import ModalWrapper from '../../components/common/ModalWrapper';


const AddInventory = () => {
  const goBack = () => navigate('/app/inventories')

  const navigate = useNavigate()
  const [postResource, { isSuccess, isLoading, error }] = usePostResourceMutation();
  const [formError, setFormError] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const { data: categoryData, isLoading: categoryLoading, isError: categoryError } = useFetchResourceQuery('/category/allcategories');
  const { data: employeeData, isLoading: employeeLoading, isError: employeeError } = useFetchResourceQuery('/employee/list');


      //toggle category modal
      const togglecategory = () => {
        setModalVisible(!modalVisible)
      }


  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Ensure the form is actually submitting data
    const form = document.getElementById("add-client-form");
    const formData = new FormData(form);
  
    console.log("Form data:", Object.fromEntries(formData.entries())); // Debugging
  
    const itemName = formData.get("itemName") || "";
    const totalValue = formData.get("totalValue") || "";
    const assignedTo = formData.get("assignedTo") || "";
    const itemId = formData.get("itemId") || "";
    const datePurchased = formData.get("datePurchased") || "";
    const category = formData.get("category") || "";
    const quantity = formData.get("quantity") || "";
    const note = formData.get("note") || "";
  
    if (!itemName || !totalValue || !assignedTo || !itemId || !datePurchased || !category || !quantity || !note) {
      setFormError("All fields are required.");
      return;
    }
  
    const payload = {
      itemName,
      totalValue,
      assignedTo,
      itemId,
      datePurchased,
      category,
      quantity,
      note,
    };
  
    console.log("Submitting data:", payload);
  
    try {
      await postResource({
        url: "/inventory/create",
        data: payload, // Send as JSON instead of FormData unless backend expects multipart/form-data
      }).unwrap();
  
      alert("Inventory added successfully");
      form.reset();
      goBack()
      window.location.reload();
    } catch (error) {
      console.error("Error adding inventory:", error);
      setFormError(error.data?.error || "An unexpected error occurred");
    }
  };






  // category submission
  const submitCategory = async (e) => {
    e.preventDefault();
  
    // Ensure the form is actually submitting data
    const form = document.getElementById("add-category-form");
    const formData = new FormData(form);
  
    console.log("Form data:", Object.fromEntries(formData.entries())); // Debugging
  
    const name = formData.get("categoryName") || "";
  
    if (!name) {
      setFormError("All fields are required.");
      return;
    }
  
    const payload = {
      name,
    };
  
    console.log("Submitting data:", payload);
  
    try {
      await postResource({
        url: "/category/create",
        data: payload, // Send as JSON instead of FormData unless backend expects multipart/form-data
      }).unwrap();
  
      alert("Category added successfully");
      form.reset();
      window.location.reload();
    } catch (error) {
      console.error("Error adding category:", error);
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
            <label className='flex gap-2'>Category<PlusCircle className='hover:cursor-pointer' onClick={togglecategory}/></label>
            <select
              required
              name='category'
            >
              <option value="">Select Category</option>
              { categoryLoading ? 
                  <option value="">Loading categories</option> 
                  :
                  categoryError ? 
                  <option value="">Error loading categories</option>
                  :
              categoryData?.category?.map((category) => 
                ( 
                  <option value={category.name}>{category.name}</option>
                )
              )}
              
            </select>
          </div><div >
            <label >Assigned To</label>
            <select
              required
              name='assignedTo'
            >
              <option value="">Select Staff</option>
              { employeeLoading ? 
                  <option value="">Loading categories</option> 
                  :
                  employeeError ? 
                  <option value="">Error loading categories</option>
                  :
                  employeeData?.getEmployees?.map((category) => (           
                  <option value={category.email}>{category.email}</option>              
                   ))}
              
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

         {
          modalVisible &&
         <ModalWrapper onClose={togglecategory}>
            <div className='p-5 h-[60%]'>
                <h3 className='text-2xl font-bold'>Add category</h3>    
                <form action="" className='flex flex-col mt-5'  id="add-category-form" onSubmit={submitCategory}>
                  <label htmlFor="">Category Name</label>
                  <input type="text" className='border-2 rounded-md border-[#000] h-[50px] mt-4 px-4' name='categoryName'/>
                  <span className="mt-5 flex justify-around gap-2 px-2">
                    <OutlinedButton content={'Cancel'} performAction={togglecategory}/>
                    <FilledButton content={'Add'}/>
                  </span>
                </form>
            </div>
        </ModalWrapper>}
    </div>
  )
}

export default AddInventory

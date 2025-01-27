import React from 'react'
import AddModal from '../../features/reusables/AddModal'
import { useNavigate } from 'react-router'

const AddInventory = () => {
  const navigate = useNavigate()

  const goBack = () => [
    navigate('/app/inventories')
  ]

  const formContent = 
  <>
          <div >
            <label >Item Name</label>
            <input
              type=""
              required
              placeholder='Item Name'
            />
          </div>
          <div >
            <label >Total Value</label>
            <input
              type="number"
              required
              placeholder='Total Value'
            />
          </div>
          <div >
            <label >Category</label>
            <select
              required
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
            />
          </div>
          <div >
            <label >Date Purchased</label>
            <input
              type="date"
              required
              placeholder='Date Purchased'
            />
          </div>
          <div >
            <label >Quantity</label>
            <input
              type="number"
              required
              placeholder='Quantity'
            />
          </div>
          <div >
            <label >Note</label>
            <input
              type="text"
              required
              placeholder='Add Note'
            />
          </div>
  </>



  return (
    <div className='h-full'>
        {/* use the addAnother to implement the logic to remain on the page if checked */}
        <AddModal
          header={'Add Inventory'} 
          formContent={formContent} 
          close={goBack} 
          anotherContent={'Add another Inventory'}
          
        />
    </div>
  )
}

export default AddInventory

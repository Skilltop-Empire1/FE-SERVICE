import Edit from '../../features/reusables/EditViewDelete/Edit'
import React from 'react'

const EditInventory = ({close}) => {

  const formContent = 
  <>
    <div>
      <label htmlFor="">Item Name</label>
       <input type="text" />
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
    </div>
    <div>
      <label htmlFor="">Item Id</label>
      <input type="text" />
    </div>
    <div>
      <label htmlFor="">Quantity</label>
      <input type="number" />
    </div>
    <div>
      <label htmlFor="">Date Added</label>
      <input type="date" />
    </div>
    <div>
      <label htmlFor="">Address</label>
      <input type="text" />
    </div>
    <div >
      <label >Loyalty Status</label>
      <select
        required
      >
      <option value="">Select Loyalty Status</option>
      <option value="full">Full Payment</option>
      <option value="part_payment">Part Payment</option>
      <option value="credit">Credit Sales</option>
      </select>
    </div>
    <div>
      <label htmlFor="">Note</label>
      <input type="text" />
    </div>
  </>

  return (
    <div>
      <Edit close={close} formContenten={formContent} header='Edit Inventory Details'/>
    </div>
  )
}

export default EditInventory

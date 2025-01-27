import Edit from '../../features/reusables/EditViewDelete/Edit'
import React from 'react'

const EditClient = ({close}) => {

  const formContent = 
  <>
    <div>
      <label htmlFor="">Client Name</label>
       <input type="text" />
    </div>
    <div>
      <label htmlFor="">Phone Number</label>
      <input type="text" />
    </div>
    <div>
      <label htmlFor="">Email Address</label>
      <input type="text" />
    </div>
    <div>
      <label htmlFor="">Birth Day</label>
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
      <label htmlFor="">Description</label>
      <input type="text" />
    </div>
  </>

  return (
    <div>
      <Edit close={close} formContenten={formContent} header='Edit Client Details'/>
    </div>
  )
}

export default EditClient

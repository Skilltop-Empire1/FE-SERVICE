import Edit from '../../features/reusables/EditViewDelete/Edit'
import React from 'react'

const EditContent = ({close}) => {

  const formContent = 
  <>
    <div>
      <label htmlFor="">Service Name</label>
       <input type="text" />
    </div>
    <div>
      <label htmlFor="">Price</label>
      <input type="text" />
    </div>
    <div>
      <label htmlFor="">Average TAT (Duration)</label>
      <input type="text" />
    </div>
    <div >
      <label >Service Manager</label>
      <select
        required
      >
      <option value="">Select Service Manager</option>
      <option value="full">Full Payment</option>
      <option value="part_payment">Part Payment</option>
      <option value="credit">Credit Sales</option>
      </select>
    </div>
    <div>
      <label htmlFor="">Phone Number</label>
       <input type="text" />
    </div>
    <div>
      <label htmlFor="">Description</label>
      <input type="text" />
    </div>
  </>

  return (
    <div>
      <Edit close={close} formContenten={formContent} header='Edit Service Details'/>
    </div>
  )
}

export default EditContent

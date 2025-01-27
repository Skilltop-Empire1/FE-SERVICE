import Edit from '../../features/reusables/EditViewDelete/Edit'
import React from 'react'

const EditTask = ({close}) => {

  const formContent = 
  <>
    <div>
      <label htmlFor="">Task Name</label>
       <input type="text" />
    </div>
    <div >
      <label >Service</label>
      <select
        required
      >
      <option value="">Select Service</option>
      <option value="full">Full Payment</option>
      <option value="part_payment">Part Payment</option>
      <option value="credit">Credit Sales</option>
      </select>
    </div>
    <div >
      <label >Assigned To</label>
      <select
        required
      >
      <option value=""></option>
      <option value="full">Full Payment</option>
      <option value="part_payment">Part Payment</option>
      <option value="credit">Credit Sales</option>
      </select>
    </div>
    <div >
      <label >Priority</label>
      <select
        required
      >
      <option value="full">Low</option>
      <option value="part_payment">Medium</option>
      <option value="credit">High</option>
      </select>
    </div>
    <div>
      <label htmlFor="">DUe Date</label>
      <input type="date" />
    </div>
    <div >
      <label >Task Status</label>
      <select
        required
      >
      <option value="full">To Do</option>
      <option value="part_payment">In Progress</option>
      <option value="credit">Done</option>
      </select>
    </div>
    <div>
      <label htmlFor="">Description</label>
      <input type="text" />
    </div>
  </>

  return (
    <div>
      <Edit close={close} formContenten={formContent} header={'Edit Task Details'}/>
    </div>
  )
}

export default EditTask

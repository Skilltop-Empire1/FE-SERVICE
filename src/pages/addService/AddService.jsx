import React from 'react'
import AddModal from '../../features/reusables/AddModal'
import { useNavigate } from 'react-router'

const AddService = () => {
  const navigate = useNavigate()

  const goBack = () => [
    navigate('/app/Services')
  ]

  const formContent = 
  <>
          <div >
            <label >Service Name</label>
            <input
              type=""
              required
              placeholder='Service Name'
            />
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
          <div >
            <label >Price</label>
            <input
              type="number"
              required
              placeholder='Price'
            />
          </div>
          <div >
            <label >Phone Number</label>
            <input
              type="number"
              required
              placeholder='Phone Number'
            />
          </div>
          <div >
            <label >Average TAT (Duration)</label>
            <input
              type="number"
              required
              placeholder='Average TAT (Duration)'
            />
          </div>
  </>



  return (
    <div className='h-full'>
        {/* use the addAnother to implement the logic to remain on the page if checked */}
        <AddModal
          header={'Add Sales Record'} 
          formContent={formContent} 
          close={goBack} 
          anotherContent={'Add another service'}
          
        />
    </div>
  )
}

export default AddService

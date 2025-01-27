import React from 'react'
import AddModal from '../../features/reusables/AddModal'
import { useNavigate } from 'react-router'

const AddClient = () => {
  const navigate = useNavigate()

  const goBack = () => [
    navigate('/app/clients')
  ]

  const formContent = 
  <>
          <div >
            <label >Client Name</label>
            <input
              type=""
              required
              placeholder='Service Name'
            />
          </div>
          <div >
            <label >Residential Address</label>
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
            <label >Category</label>
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
            <label >Email Address</label>
            <input
              type="text"
              required
              placeholder='Average TAT (Duration)'
            />
          </div>
          <div >
            <label >Description</label>
            <input
              type="text"
              required
              placeholder='Average TAT (Duration)'
            />
          </div>
          <div >
            <label >Birthday</label>
            <input
              type="date"
              required
              placeholder='Average TAT (Duration)'
            />
          </div>
  </>



  return (
    <div className='h-full'>
        {/* use the addAnother to implement the logic to remain on the page if checked */}
        <AddModal
          header={'Add Client'} 
          formContent={formContent} 
          close={goBack} 
          anotherContent={'Add another Client'}
          
        />
    </div>
  )
}

export default AddClient

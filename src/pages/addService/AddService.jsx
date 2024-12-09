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
            <label >Payment Option</label>
            <select
              required
            >
              <option value="">Select payment option</option>
              <option value="full">Full Payment</option>
              <option value="part_payment">Part Payment</option>
              <option value="credit">Credit Sales</option>
            </select>
          </div>
          <div>
            <label>Payment Option</label>
            <select

              required
            >
              <option value="">Select payment option</option>
              <option value="full">Full Payment</option>
              <option value="part_payment">Part Payment</option>
              <option value="credit">Credit Sales</option>
            </select>
          </div>
          <div >
            <label>Payment Option</label>
            <select
              required
            >
              <option value="">Select payment option</option>
              <option value="full">Full Payment</option>
              <option value="part_payment">Part Payment</option>
              <option value="credit">Credit Sales</option>
            </select>
          </div>
          <div >
            <label >Quantity:</label>
            <input
              type="number"
              required
            />
          </div>
          <div >
            <label >Quantity:</label>
            <input
              type="number"
              required
            />
          </div>
  </>



  return (
    <div>
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

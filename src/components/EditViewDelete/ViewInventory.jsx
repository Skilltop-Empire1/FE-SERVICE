import View from '../../features/reusables/EditViewDelete/View'
import React from 'react'

const ViewInventory = ({close}) => {

    const formContent = 
    <>
      <div>
        <h3 >Item Name</h3>
        <p>Text goes here</p>
      </div>
      <div>
        <h3 >Category</h3>
        <p>Text goes here</p>
      </div>
      <div>
        <h3 >Item Id</h3>
        <p>Text goes here</p>
      </div>
      <div >
        <h3 >Quantity</h3>
        <p>Text goes here</p>
      </div>
      <div>
        <h3 >Assign To/Locations</h3>
        <p>Text goes here</p>
      </div>
      <div>
        <h3 >Date Purchased</h3>
        <p>Text goes here</p>
      </div>
      <div>
        <h3 >Note</h3>
        <p>Text goes here</p>
      </div>
    </>

  return (
    <div>
      <View close={close} formContenten = {formContent} header='Inventory Details'/>
    </div>
  )
}

export default ViewInventory

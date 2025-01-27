import View from '../../features/reusables/EditViewDelete/View'
import React from 'react'

const ViewClient = ({close}) => {

    const formContent = 
    <>
      <div>
        <h3 >Client Name</h3>
        <p>Text goes here</p>
      </div>
      <div>
        <h3 >Phone Number</h3>
        <p>Text goes here</p>
      </div>
      <div>
        <h3 >Email Address</h3>
        <p>Text goes here</p>
      </div>
      <div >
        <h3 >Birth Day</h3>
        <p>Text goes here</p>
      </div>
      <div>
        <h3 >Address</h3>
        <p>Text goes here</p>
      </div>
      <div>
        <h3 >Loyalty Status</h3>
        <p>Text goes here</p>
      </div>
      <div>
        <h3 >Description</h3>
        <p>Text goes here</p>
      </div>
    </>

  return (
    <div>
      <View close={close} formContenten = {formContent} header='Client Detail'/>
    </div>
  )
}

export default ViewClient

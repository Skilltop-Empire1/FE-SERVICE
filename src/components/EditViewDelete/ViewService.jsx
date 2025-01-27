import View from '../../features/reusables/EditViewDelete/View'
import React from 'react'

const ViewService = ({close}) => {

    const formContent = 
    <>
      <div>
        <h3 >Service Name</h3>
        <p>Text goes here</p>
      </div>
      <div>
        <h3 >Price</h3>
        <p>Text goes here</p>
      </div>
      <div>
        <h3 >Average TAT (Duration)</h3>
        <p>Text goes here</p>
      </div>
      <div >
        <h3 >Service Manager</h3>
        <p>Text goes here</p>
      </div>
      <div>
        <h3 >Phone Number</h3>
        <p>Text goes here</p>
      </div>
      <div>
        <h3 >Description</h3>
        <p>Text goes here</p>
      </div>
    </>

  return (
    <div>
      <View close={close} formContenten = {formContent} header='Service Detail'/>
    </div>
  )
}

export default ViewService

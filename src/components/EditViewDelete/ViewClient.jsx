import View from '../../features/reusables/EditViewDelete/View'
import React from 'react'

const ViewClient = ({close , data}) => {

    const formContent = 
    <>
      <div>
        <h3 >Client Name</h3>
        <p>{data?.name}</p>
      </div>
      <div>
        <h3 >Phone Number</h3>
        <p>{data?.phoneNo}</p>
      </div>
      <div>
        <h3 >Email Address</h3>
        <p>{data?.email}</p>
      </div>
      <div >
        <h3 >Birth Day</h3>
        <p>{data?.DOB.slice(0,10)}</p>
      </div>
      <div>
        <h3 >Address</h3>
        <p>{data?.address}</p>
      </div>
      <div>
        <h3 >Loyalty Status</h3>
        <p>{data?.category}</p>
      </div>
      <div>
        <h3 >Description</h3>
        <p>{data?.description}</p>
      </div>
    </>

  return (
    <div>
      <View close={close} formContenten = {formContent} header='Client Detail'/>
    </div>
  )
}

export default ViewClient

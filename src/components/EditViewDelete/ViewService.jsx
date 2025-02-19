import View from '../../features/reusables/EditViewDelete/View'
import React from 'react'

const ViewService = ({close, data}) => {

    const formContent = 
    <>
      <div>
        <h3 >Service Name</h3>
        <p>{data?.serviceName}</p>
      </div>
      <div>
        <h3 >Price</h3>
        <p>{data?.price}</p>
      </div>
      <div>
        <h3 >Average TAT (Duration)</h3>
        <p>{data?.duration}</p>
      </div>
      <div >
        <h3 >Service Manager</h3>
        <p>{data?.serviceManager}</p>
      </div>
      <div>
        <h3 >Phone Number</h3>
        <p>{data?.phoneNumber == null ? 'NIL' : data?.phoneNumber}</p>
      </div>
      <div>
        <h3 >Description</h3>
        <p>{data?.description == null ? 'NIL' : data?.description}</p>
      </div>
    </>

  return (
    <div>
      <View close={close} formContenten = {formContent} header='Service Detail'/>
    </div>
  )
}

export default ViewService

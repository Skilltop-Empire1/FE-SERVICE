import View from '../../features/reusables/EditViewDelete/View'
import React from 'react'

const ViewTask = ({close, data}) => {

    const formContent = 
    <>
      <div>
        <h3 >Task Name</h3>
        <p>{data?.taskTitle}</p>
      </div>
      <div>
        <h3 >Service</h3>
        <p>{data?.Service?.serviceName}</p>
      </div>
      <div>
        <h3 >Assigned To</h3>
        <p>{data?.User?.firstName} {data?.User?.lastName}</p>
      </div>
      <div >
        <h3 >Priority</h3>
        <p>{data?.priority}</p>
      </div>
      <div>
        <h3 >Due Date</h3>
        <p>{data?.dueDate}</p>
      </div>
      <div>
        <h3 >Task Status    </h3>
        <p>{data?.taskStatus}</p>
      </div>
      <div>
        <h3 >Description</h3>
        <p>{data?.description}</p>
      </div>
    </>

  return (
    <div>
      <View close={close} formContenten = {formContent} header='Task Detail'/>
    </div>
  )
}

export default ViewTask

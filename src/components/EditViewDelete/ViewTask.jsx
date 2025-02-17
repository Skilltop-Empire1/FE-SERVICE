import View from '../../features/reusables/EditViewDelete/View'
import React from 'react'

const ViewTask = ({close, data}) => {

  const isPDF = data?.fileUrl?.match(/\.pdf$/i);
  const isImage = data?.fileUrl?.match(/\.(jpeg|jpg|png|gif|webp)$/i);
  const isWordDoc = data?.fileUrl?.match(/\.(doc|docx)$/i);

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
        <p>{data?.User?.firstName} {data?.User?.lastName} {data?.User?.email}</p>
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
      <div>
        <h3 >File</h3>
        {
            isPDF ?
            (
             <iframe src={data?.fileUrl} frameborder="0"></iframe>
            )
            :
            isImage ? 
            (
                <img src={data?.fileUrl} alt="Report Preview" className=" max-w-xs h-[250px] w-[150px] rounded-lg shadow-md mt-2" />
            )
            :
            isWordDoc ? 
            (
                <a href={data?.fileUrl} download target="_blank" rel="noopener noreferrer" className="text-blue-500 underline mt-2 block">
                  Download Word Document
                </a>
            ) 
            :
            <p>No file to preview</p>
        }
        {data?.fileUrl ? (
          <a href={data?.fileUrl} download target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
            Download File
          </a>
        ) : <p>No file available for download</p>
     }
      </div>
    </>

  return (
    <div>
      <View close={close} formContenten = {formContent} header='Task Detail'/>
    </div>
  )
}

export default ViewTask

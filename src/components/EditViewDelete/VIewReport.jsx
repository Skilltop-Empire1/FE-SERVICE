import View from '../../features/reusables/EditViewDelete/View'
import React from 'react'

const ViewReport = ({close, data}) => {

    const isPDF = data?.fileUrl?.match(/\.pdf$/i);
    const isImage = data?.fileUrl?.match(/\.(jpeg|jpg|png|gif|webp)$/i);
    const isWordDoc = data?.fileUrl?.match(/\.(doc|docx)$/i);

    const formContent = 
    <>
      <div>
        <h3 >Report Name</h3>
        <p>{data?.reportTitle}</p>
      </div>
      <div>
        <h3 >Report Type</h3>
        <p>{data?.reportType}</p>
      </div>
      <div>
        <h3 >Date Range</h3>
        <p>{data?.dateRangeFrom} <span className='font-extrabold text-xl'>-</span> {data?.dateRangeTo?.slice(0,10)}</p>
      </div>
      <div >
        <h3 >Created By</h3>
        <p>{data?.serviceManager}</p>
      </div>
      <div>
        <h3 >Document</h3>
        {
            isPDF ?
            (
             <iframe src={data?.fileUrl} frameborder="0"></iframe>
            )
            :
            isImage ? 
            (
                <img src={data?.fileUrl} alt="Report Preview" className="w-full max-w-xs rounded-lg shadow-md mt-2" />
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
      <View close={close} formContenten = {formContent} header='Report Details'/>
    </div>
  )
}

export default ViewReport

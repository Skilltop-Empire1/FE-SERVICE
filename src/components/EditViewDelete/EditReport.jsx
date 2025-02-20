import Edit from '../../features/reusables/EditViewDelete/Edit'
import React, { useState, useEffect } from 'react'
import OutlinedButton from '../../features/reusables/Buttons/OutlinedButton'
import FilledButton from '../../features/reusables/Buttons/FilledButton'
import style from '../../features/reusables/EditViewDelete/editStyle.module.css'
import {
  useEditResourceMutation,
  useFetchResourceQuery,
} from '../../redux/api/generalApi'

const EditReport = ({ close, data }) => {
  const [formData, setFormData] = useState({})
  const [formError, setFormError] = useState()
  const [editResource, { isSuccess, isLoading, error }] =
    useEditResourceMutation()
  const {
    data: employeeData,
    isLoading: dataLoading,
    isError: dataError,
  } = useFetchResourceQuery('/employee/list')

  //handles file preview
  const isPDF = formData?.fileUrl?.name?.match(/\.pdf$/i)
  const isImage = formData?.fileUrl?.name?.match(/\.(jpeg|jpg|png|gif|webp)$/i)
  const isWordDoc = formData?.fileUrl?.name?.match(/\.(doc|docx)$/i)

  const handleSubmit = async (e) => {
    e.preventDefault()

    const reportData = {
      reportTitle: e.target.reportTitle.value,
      report: e.target.report.value,
      // serviceManager: e.target.serviceManager.value,
      dateRangeFrom: e.target.dateRangeFrom.value,
      dateRangeTo: e.target.dateRangeTo.value,
      reportType: e.target.reportType.value,
      fileUrl: e.target.fileUrl.value,
    }

    try {
      let result
      if (data?.reportId) {
        // console.log(formData.acctId)
        // Update existing account
        result = await editResource({
          url: `/report/update/${data.reportId}`,
          method: 'PUT',
          data: reportData,
        }).unwrap()
        // console.log('Account updated successfully:', result);
        setFormData(null)
        alert('Report updated successfully')
      } else {
        // Create new account
        result = await postResource({
          url: '/report/create',
          data: serviceData,
        }).unwrap()
        // console.log('Account created successfully:', result);
        alert('Report created successfully')
      }

      e.target.reset()
      window.location.reload()
      if (!keepOpen) {
        toggleForm()
      }
    } catch (error) {
      console.error('Error saving Report:')
      // alert(`Error saving client: ${error.message}`);
      if (error.data) {
        // If the error message is in the response
        const errorMessage = error.data.error
        setFormError(errorMessage)
      } else {
        // Generic fallback for other errors
        setFormError('An unexpected error occurred')
      }
    }
  }

  useEffect(() => {
    if (data) {
      setFormData({
        ...data,
      })
    }
  }, [data])

  //handles the inut change
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      fileUrl: e.target.files[0], // Store file separately
    }))
  }

  const formContent = (
    <form className={style.form} onSubmit={handleSubmit}>
      <span>
        <div>
          <label htmlFor="">Report Name</label>
          <input
            type="text"
            name="reportTitle"
            value={formData?.reportTitle}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="">Report Type</label>
          <input
            type="text"
            name="reportType"
            value={formData?.reportType}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="">Date From</label>
          <input
            type="date"
            name="dateRangeFrom"
            value={formData?.dateRangeFrom}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="">Date To</label>
          <input
            type="date"
            name="dateRangeTo"
            value={formData?.dateRangeTo?.slice(0, 10)}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="">Report Summary</label>
          <input
            type="number"
            name="report"
            value={formData?.report}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="">File</label>
          <input type="file" name="fileUrl" onChange={handleFileChange} />
          {isPDF ? (
            <iframe src={data?.fileUrl} frameborder="0"></iframe>
          ) : isImage ? (
            <img
              src={data?.fileUrl}
              alt="Report Preview"
              className=" max-w-xs h-[250px] w-[150px] rounded-lg shadow-md mt-2"
            />
          ) : isWordDoc ? (
            <a
              href={data?.fileUrl}
              download
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline mt-2 block"
            >
              Download Word Document
            </a>
          ) : (
            <p>No file to preview</p>
          )}
        </div>
      </span>
      <span className="flex gap-3 mt-10">
        <OutlinedButton content={'Cancel'} performAction={close} />
        <FilledButton content={'Update'} />
      </span>
    </form>
  )

  return (
    <div>
      <Edit
        close={close}
        formContenten={formContent}
        header="Edit Service Details"
      />
    </div>
  )
}

export default EditReport

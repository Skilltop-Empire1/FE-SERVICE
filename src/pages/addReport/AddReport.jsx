import React, { useState } from 'react';
import AddModal from '../../features/reusables/AddModal'
import { useNavigate } from 'react-router'
import { usePostResourceMutation, useFetchResourceQuery } from '../../redux/api/generalApi';
import OutlinedButton from '../../features/reusables/Buttons/OutlinedButton';
import FilledButton from '../../features/reusables/Buttons/FilledButton';

const AddReport = () => {
  const navigate = useNavigate()
  const [postResource, { isSuccess, isLoading, error }] = usePostResourceMutation();
  const { data: employeeData, isLoading: dataLoading, isError: dataError } = useFetchResourceQuery('/employee/list');
  const [formError, setFormError] = useState(null);
  const [file, setFile] = useState(null);
  const goBack = () =>   navigate('/app/reports')


  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Ensure the form is actually submitting data
    const form = document.getElementById("add-client-form");
    const formData = new FormData(form);
  
    console.log("Form data:", Object.fromEntries(formData.entries())); // Debugging
  
    const reportTitle = formData.get("reportTitle") || "";
    const serviceManager = formData.get("serviceManager") || "";
    const reportType = formData.get("reportType") || "";
    const dateRangeFrom = formData.get("dateRangeFrom") || "";
    const dateRangeTo = formData.get("dateRangeTo") || "";
    const report = formData.get("report") || "";
    const fileUrl = formData.get("file") || "";
  
    if (!reportTitle || !serviceManager || !reportType || !report || !dateRangeFrom || !dateRangeTo ) {
      setFormError("All fields are required.");
      return;
    }
  
    const payload = {
      reportTitle,
      serviceManager,
      reportType,
      dateRangeFrom,
      dateRangeTo,
      report,
      // fileUrl,
    };
  
    console.log("Submitting data:", payload);
  
    try {
      await postResource({
        url: "/report/create",
        headers: { "Content-Type": "multipart/form-data" },
        data: payload, // Send as JSON instead of FormData unless backend expects multipart/form-data
      }).unwrap();
  
      alert("Client added successfully");
      form.reset();
      goBack()
    } catch (error) {
      console.error("Error adding client:", error);
      setFormError(error.data?.error || "An unexpected error occurred");
    }
  };


  const formContent = 
  <form onSubmit={handleSubmit} id="add-client-form">
         <span className='md:grid grid-cols-2 gap-5'>
          <div >
            <label >Report Title</label>
            <input
              type=""
              required
              placeholder='Report Title'
              name='reportTitle'
            />
          </div>
          <div >
            <label >Created By</label>
            <select
              required
              name='serviceManager'
            >
              <option value="">Select Employee</option>
              {employeeData?.getEmployees?.map((data) => (
                <option key={data.userId} value={data.userId}>
                  {data.email}
                </option>
              ))}
            </select>
          </div>
          <div >
            <label >Date Range(from)</label>
            <input
              type="date"
              required
              placeholder=''
              name='dateRangeFrom'
            />
          </div>
          <div >
            <label >Date Range(To)</label>
            <input
              type="date"
              required
              placeholder=''
              name='dateRangeTo'
            />
          </div>
          <div >
            <label >Report Type</label>
            <input
              type="text"
              required
              placeholder=''
              name='reportType'
            />
          </div>
          <div >
          <label>Upload Report</label>
          <input type="file"  name="file" accept=".pdf,.doc,.docx,.png,.jpg,.jpeg" onChange={handleFileChange} />
          {file && <p className="mt-2 text-sm text-green-600">Selected: {file.name}</p>}
          </div>
          <div >
            <label >Report Summary</label>
            <input
              type="text"
              placeholder=''
              name='report'
            />
          </div>
         </span>
         <span className='grid-cols-2 md:grid sticky bg-[#fff] pt-2 border-t-2 md:border-t-0 lg:relative bottom-1 mt-10'>
                <span className="mt-8 flex items-center gap-4">
                  <input
                    type="checkbox"
                    name="check"
                  //   checked={addAnother}
                    // onChange={addAnother}
                    className={`flex items-center justify-center`}
                  />
                  <label htmlFor="check">{'Add another report'}</label>
                </span>

                <span className="mt-5 flex justify-around gap-2 px-2">
                  <OutlinedButton content={'Cancel'} performAction={goBack}/>
                  <FilledButton content={'Save'}/>
                </span>
        </span>
        {formError}
  </form>



  return (
    <div className='h-full'>
        {/* use the addAnother to implement the logic to remain on the page if checked */}
        <AddModal
          header={'Add Report'} 
          formContent={formContent} 
          close={goBack} 
          
        />
    </div>
  )
}

export default AddReport

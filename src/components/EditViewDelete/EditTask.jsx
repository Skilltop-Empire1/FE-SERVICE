import Edit from '../../features/reusables/EditViewDelete/Edit'
import React, { useState, useEffect }  from 'react'
import OutlinedButton from '../../features/reusables/Buttons/OutlinedButton';
import FilledButton from '../../features/reusables/Buttons/FilledButton';
import style from '../../features/reusables/EditViewDelete/editStyle.module.css'
import { useEditResourceMutation, useFetchResourceQuery } from '../../redux/api/generalApi';


const EditTask = ({close, data}) => {

  const [formData, setFormData] = useState({})
  const [formError, setFormError] = useState()
  const [editResource, { isSuccess, isLoading, error }] = useEditResourceMutation()
  const { data: employeeData, isLoading: employeeLoading, isError: employeeError } = useFetchResourceQuery('/employee/list');
  const { data: serviceData, isLoading: serviceLoading, isError: serviceError } = useFetchResourceQuery('/service/allServices');

  //handles file preview
  const isPDF = formData?.fileUrl?.name?.match(/\.pdf$/i);
  const isImage = formData?.fileUrl?.name?.match(/\.(jpeg|jpg|png|gif|webp)$/i);
  const isWordDoc = formData?.fileUrl?.name?.match(/\.(doc|docx)$/i);

  useEffect(() => {
    console.log("isSuccess:", isSuccess, "isLoading:", isLoading, "error:", error);
}, [isSuccess, isLoading, error]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const taskData = {
      taskTitle: e.target.taskTitle?.value,
      taskStatus: e.target.taskStatus?.value,
      serviceName: e.target.serviceName?.value,
      description: e.target.description?.value,
      priority: e.target.priority?.value,
      dueDate: e.target.dueDate?.value,
      email: 'super@gmail.com',
      // email:e.target.email?.value,
      fileUrl: e.target.fileUrl?.files?.[0],
    };

    try {
        let result;
        if (data?.taskId) {
            // console.log(formData.acctId)
            // Update existing account
            result = await editResource({
                url: `/task/${data.taskId}`,
                method: 'PUT',
                data: taskData,
      }).unwrap();
            // console.log('Account updated successfully:', result);
            setFormData(null)
            alert('Task updated successfully');
        } else {
            // Create new account
            result = await postResource({
                url: '/task/create',
                data: inventoryData,
            }).unwrap();
            // console.log('Account created successfully:', result);
            alert('Task created successfully');
        }

        e.target.reset();
        window.location.reload();
        if (!keepOpen) {
            toggleForm();
        }
    } catch (error) {
        console.error('Error saving Task:');
        // alert(`Error saving client: ${error.message}`);
        if ( error.data) {
            // If the error message is in the response
            const errorMessage = error.data.error;
            setFormError(errorMessage);
        } else {
            // Generic fallback for other errors
            setFormError("An unexpected error occurred");
        }
    }
  };

useEffect(() => {
  if (data) {
      setFormData({
          ...data,
      });
  }
}, [data]);


    //handles the inut change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
        ...prev,
        [name]: value,
    }));
};

const handleFileChange = (e) => {
  setFormData((prev) => ({
     ...prev,
     fileUrl: e.target.files[0], // Store file separately
  }));
};


  const formContent = 
  <form className={style.form} onSubmit={handleSubmit}>
  <span>
    <div>
      <label htmlFor="">Task Name</label>
       <input type="text" name='taskTitle' value={formData?.taskTitle} onChange={handleInputChange}/>
    </div>
    <div >
      <label >Service</label>
      <select 
      required
      name='serviceName'
      value={formData?.Service?.serviceName}
      onChange={handleInputChange}
      >
          <option value="">Select Service</option>
          {serviceData?.services?.map((data) => (
            <option value={data.serviceName}>
              {data.serviceName}
            </option>
          ))}
        </select>
    </div>
    <div >
      <label >Assigned To</label>
      <select
       required
       name='email'
       value={formData?.User?.userId}
       onChange={handleInputChange}
       >
          <option value="">Select Service Manager</option>
          {employeeData?.getEmployees?.map((data) => (
            <option key={data.userId} value={data.userId}>
              {data.email}
          </option>
          ))}
        </select>
    </div>
    <div >
      <label >Priority</label>
      <select
       name="priority" 
       required
       value={formData?.priority}
       onChange={handleInputChange}
       >
          <option value="">Select Priority Level</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
    </div>
    <div>
      <label htmlFor="">Due Date</label>
      <input type="date" name='dueDate' onChange={handleInputChange} value={formData?.dueDate} />
    </div>
    <div >
      <label >Task Status</label>
      <select 
        name="taskStatus"
        required
        onChange={handleInputChange}
        value={formData?.taskStatus}
       >
          <option value="">Select Status</option>
          <option value="To do">To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
          <option value="Cancelled">Cancelled</option>
        </select>
    </div>
    <div>
      <label htmlFor="">Description</label>
      <input type="text" name='description' value={formData?.description} onChange={handleInputChange}/>
    </div>
    <div>
      <label htmlFor="">File</label>    
      <input type="file" name='fileUrl' onChange={handleFileChange} />
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
        
    </div>
    </span>
    <span className='flex gap-3 mt-10'>
      <OutlinedButton content={'Cancel'} performAction={close}/>
      <FilledButton content={'Update'}/>
    </span>
    </form>

  return (
    <div>
      <Edit close={close} formContenten={formContent} header={'Edit Task Details'}/>
    </div>
  )
}

export default EditTask

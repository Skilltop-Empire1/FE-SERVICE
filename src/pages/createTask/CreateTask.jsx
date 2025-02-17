import React, { useState } from 'react';
import AddModal from '../../features/reusables/AddModal';
import { useNavigate } from 'react-router';
import { usePostResourceMutation, useFetchResourceQuery } from '../../redux/api/generalApi';
import OutlinedButton from '../../features/reusables/Buttons/OutlinedButton';
import FilledButton from '../../features/reusables/Buttons/FilledButton';

const CreateTask = () => {
  const navigate = useNavigate();
  const [postResource, { isSuccess, isLoading, error }] = usePostResourceMutation();
  const [formError, setFormError] = useState(null);

  const { data: fetchedData } = useFetchResourceQuery('/service/allServices');
  const { data: employeeData } = useFetchResourceQuery('/employee/list');

  const goBack = () => navigate('/app/task');

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Debugging: Log form elements
    console.log(e.target);  
  
    const taskTitle = e.target.taskTitle?.value || "";
    const taskStatus = e.target.taskStatus?.value || "";
    const serviceName = e.target.service?.value || "";
    const description = e.target.description?.value || "";
    // const email = e.target.email?.value || "";
    const priority = e.target.priority?.value || "";
    const dueDate = e.target.dueDate?.value || "";
    const assignedTo = e.target.assignedTo?.value || "";
    const file = e.target.fileName?.files?.[0] || null;
  
    if (!taskTitle || !taskStatus || !serviceName || !description || !priority || !dueDate || !assignedTo ) {
      setFormError("All fields except file upload are required.");
      return;
    }
  
    const formData = new FormData();
    formData.append("taskTitle", taskTitle);
    formData.append("taskStatus", taskStatus);
    formData.append("servName", serviceName);
    formData.append("description", description);
    formData.append("email", assignedTo);
    formData.append("priority", priority);
    formData.append("dueDate", dueDate);
    // formData.append("AssignTo", assignedTo);
    if (file) {
      formData.append("fileUrl", file);
    }
  
    try {
      await postResource({
        url: "/task/create",
        data: formData,
      }).unwrap();
  
      alert("Task created successfully");
      e.target.reset();
      goBack()
      window.location.reload();
    } catch (error) {
      console.error("Error creating task:", error);
      setFormError(error.data?.error || "An unexpected error occurred");
    }
  };
  

  const formContent = (
    <form onSubmit={handleSubmit} id="add-client-form" className=''>
     <span className='md:grid grid-cols-2 gap-5'>
     <div>
        <label>Task Title</label>
        <input type="text" required placeholder="Enter Task Title" name="taskTitle" />
      </div>
      <div>
        <label>Task Status</label>
        <select name="taskStatus" required>
          <option value="">Select Status</option>
          <option value="To do">To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>
      <div>
        <label>Service</label>
        <select name="service" required>
          <option value="">Select Service</option>
          {fetchedData?.services?.map((data) => (
            <option value={data.serviceName}>
              {data.serviceName}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Description</label>
        <input type="text" required placeholder="Enter Brief Description" name="description" />
      </div>
      {/* <div>
        <label>email</label>
        <input type="text" required placeholder="Enter email" name="email" />
      </div> */}
      <div>
        <label>Assigned To</label>
        <select name="assignedTo" required>
          <option value="">Select Service Manager</option>
          {employeeData?.getEmployees?.map((data) => (
            <option key={data.userId} value={data.email}>
              {data.email}
          </option>
          ))}
        </select>
      </div>
      <div>
        <label>Priority</label>
        <select name="priority" required>
          <option value="">Select Priority Level</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>
      <div>
        <label>Upload File</label>
        <input type="file" name="fileName" />
      </div>
      <div>
        <label>Due Date</label>
        <input type="date" required name="dueDate" />
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
                  <label htmlFor="check">{'Add another Client'}</label>
                </span>

                <span className="mt-5 flex justify-around gap-2 px-2">
                  <OutlinedButton content={'Cancel'} performAction={goBack}/>
                  <FilledButton content={'Save'}/>
                </span>
        </span>
    </form>
  );

  return (
    <div className="h-full">
      <AddModal
        header={'Add Task'}
        formContent={formContent}
        close={goBack}
        submit={handleSubmit}
        anotherContent={'Add another task'}
        save={isLoading ? 'Saving' : 'Save'}
        />
        {formError && <p className="text-red-500">{formError}</p>}
    </div>
  );
};

export default CreateTask;

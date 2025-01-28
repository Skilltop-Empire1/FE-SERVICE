import React from 'react'
import AddModal from '../../features/reusables/AddModal'
import { useNavigate } from 'react-router'
import { usePostResourceMutation } from '../../redux/api/generalApi'

const CreateTask = () => {
  const navigate = useNavigate()

  const goBack = () => [navigate('/app/task')]

  const formContent = (
    <>
      <div>
        <label>Task Title</label>
        <input
          type=""
          required
          placeholder="Enter Task Title"
          name="taskTitle"
        />
      </div>
      <div>
        <label>Task Status</label>
        <select required name="taskStatus">
          <option value="">Select Status</option>
          <option value="part_payment">To Do</option>
          <option value="full">In Progress</option>
          <option value="credit">Completed</option>
        </select>
      </div>
      <div>
        <label>Service</label>
        <select required name="service">
          <option value="">Select Service Manager</option>
          <option value="full">Full Payment</option>
          <option value="part_payment">Part Payment</option>
          <option value="credit">Credit Sales</option>
        </select>
      </div>
      <div>
        <label>Description</label>
        <input
          type="text"
          required
          placeholder="Enter Brief Description"
          name="description"
        />
      </div>
      <div>
        <label>Assigned To</label>
        <select required name="assignedTo">
          <option value="">Select Service Manager</option>
          <option value="full">Full Payment</option>
          <option value="part_payment">Part Payment</option>
          <option value="credit">Credit Sales</option>
        </select>
      </div>
      <div>
        <label>Priority</label>
        <select required name="priority">
          <option value="">Select Priority Level</option>
          <option value="full">Low</option>
          <option value="part_payment">Medium</option>
          <option value="credit">High</option>
        </select>
      </div>
      <div>
        <label>Upload File</label>
        <input
          type="file"
          required
          placeholder="Average TAT (Duration)"
          name="file"
        />
      </div>
      <div>
        <label>Due Date</label>
        <input type="date" required placeholder="Due Date" name="dueDate" />
      </div>
    </>
  )

  return (
    <div className="h-full">
      {/* use the addAnother to implement the logic to remain on the page if checked */}
      <AddModal
        header={'Add Task'}
        formContent={formContent}
        close={goBack}
        anotherContent={'Add another task'}
      />
    </div>
  )
}

export default CreateTask

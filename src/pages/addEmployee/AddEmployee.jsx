import EmployeeInviteForm from '@src/components/employee/EmployeeInviteForm'

function AddEmployee() {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="text-3xl font-bold">Employee Invite Settings</h1>
      </div>
      <div className="my-4">
        <EmployeeInviteForm />
      </div>
    </div>
  )
}

export default AddEmployee

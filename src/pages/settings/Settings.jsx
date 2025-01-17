import UserSettingsTable from '@src/components/settings/UserSettingsTable'

function Settings() {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="text-3xl font-bold">Owners Settings - Users</h1>
      </div>
      <div className="my-4">
        <UserSettingsTable />
      </div>
    </div>
  )
}

export default Settings

import SearchAndButtons from '../../features/searchAndButtons/SearchAndButtons'
import { Plus } from 'lucide-react'

function Dashboard() {
  return (
    <div>
      <SearchAndButtons
        SingleButtonIcon={Plus}
        buttonName="Create Task"
        pageName="Dashboard"
      />
      Dashboard
    </div>
  )
}

export default Dashboard

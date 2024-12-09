import SearchAndButtons from '../../features/searchAndButtons/SearchAndButtons'
import { Download, Plus } from 'lucide-react'
const buttons = [
  { label: 'Export', icon: Download },
  { label: 'Employee', icon: Plus },
]

function Employees() {
  return (
    <div>
      <SearchAndButtons buttonArray={buttons} pageName="Employee Directory" />
    </div>
  )
}

export default Employees

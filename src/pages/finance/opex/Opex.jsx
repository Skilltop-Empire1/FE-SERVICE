import React from 'react'
import SearchAndButtons from '../../../features/searchAndButtons/SearchAndButtons'
import { Plus } from 'lucide-react'
import Table from '../../../components/dataTable/Table'
import { headers, opexData } from '../../../components/dataTable/data'
import { useNavigate } from 'react-router'

function Opex() {
  const navigate = useNavigate()
  const handleView = (item) => {
    console.log('View:', item)
  }

  const handleEdit = (item) => {
    console.log('Edit:', item)
  }

  const handleDelete = (item) => {
    console.log('Delete:', item)
  }

  return (
    <>
      <header>
        <SearchAndButtons
          handleClick={() => navigate('/app/finance/opex/add-opex')}
          SingleButtonIcon={Plus}
          buttonName="Expense"
          pageName="OPEX Record"
        />
      </header>
      <main>
        <Table
          getId={(item) => item.id}
          headers={headers}
          data={opexData}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </main>
    </>
  )
}

export default Opex

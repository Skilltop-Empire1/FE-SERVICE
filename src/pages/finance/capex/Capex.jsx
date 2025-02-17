import React, { useMemo } from 'react'
import SearchAndButtons from '../../../features/searchAndButtons/SearchAndButtons'
import { Plus } from 'lucide-react'
import Table from '../../../components/dataTable/Table'
import { capexData, capexHeaders } from '../../../components/dataTable/data'
import { useGetCapexQuery } from '@src/redux/api/accountApi'
import { useSelector } from 'react-redux'

function Capex() {
  const { data: capex, isLoading, isError } = useGetCapexQuery()
  const { query } = useSelector((state) => state.search)

  console.log('capex initialized', capex)
  const handleView = (item) => {
    console.log('View:', item)
  }

  const handleEdit = (item) => {
    console.log('Edit:', item)
  }

  const handleDelete = (item) => {
    console.log('Delete:', item)
  }

  const renderRow = (item) => (
    <>
      <td>{item.capexCategory}</td>
      <td>{item.assetDescription}</td>
      <td>{`$${item.amount.toLocaleString()}`}</td>
      <td>{item.percentOfTotalCapex}%</td>
      <td>{item.dateOfExpenses}</td>
      <td>{item.expectedLifeSpan} years</td>
      <td>{item.depreciationRate}%</td>
    </>
  )

  const filteredData = useMemo(() => {
    if (!capexData) return []

    return capexData.filter(
      (item) =>
        item.capexCategory.toLowerCase().includes(query.toLowerCase()) ||
        item.assetDescription.toLocaleLowerCase().includes(query.toLowerCase()),
    )
  }, [query, capexData])

  console.log('filtered data', filteredData)

  return (
    <>
      <header>
        <SearchAndButtons
          SingleButtonIcon={Plus}
          buttonName="Expense"
          pageName="CAPEX Record"
        />
      </header>
      <main>
        <Table
          getId={(item) => item.id}
          headers={capexHeaders}
          data={filteredData}
          renderRow={renderRow}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </main>
    </>
  )
}

export default Capex

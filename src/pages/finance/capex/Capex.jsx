import React, { useMemo } from 'react'
import SearchAndButtons from '../../../features/searchAndButtons/SearchAndButtons'
import { Plus } from 'lucide-react'
import Table from '../../../components/dataTable/Table'
import { capexHeaders } from '../../../components/dataTable/data'
import { useGetCapexQuery } from '@src/redux/api/accountApi'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { openModal } from '@src/redux/slices/modalSlice'
import ModalManager from '@src/modals/expenseModal/modalManager'

function Capex() {
  const { data: capexData, isLoading, isError } = useGetCapexQuery()
  const { query } = useSelector((state) => state.search)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleView = (item) => {
    dispatch(openModal({ modalType: 'VIEW_CAPEX', modalProps: item || {} }))
    console.log('view capex data clicked', item)
  }

  const handleEdit = (item) => {
    dispatch(openModal({ modalType: 'EDIT_CAPEX', modalProps: { item } }))
    console.log('Edit:', item)
  }

  const handleDelete = (item) => {
    console.log('Delete:', item)
  }

  const totalExpense = capexData?.reduce(
    (total, item) => (total += item.amount),
    0,
  )
  const renderRow = (item) => {
    const percentOfTotal = totalExpense ? (item.amount / totalExpense) * 100 : 0
    const formattedDate = (dateString) => {
      return dateString
        ? new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          })
        : 'N/A'
    }
    return (
      <>
        <td>{item.capexCategory}</td>
        <td>{item.assetDescription}</td>
        <td>{`$${item.amount.toLocaleString()}`}</td>
        <td>{percentOfTotal.toFixed(2)}%</td>
        <td>{formattedDate}</td>
        <td>{item.expectedLifeSpan} years</td>
        <td>{item.depreciationRate}%</td>
      </>
    )
  }

  const filteredData = useMemo(() => {
    if (!capexData) return []

    return capexData.filter(
      (item) =>
        item?.capexCategory?.toLowerCase().includes(query.toLowerCase()) ||
        item?.assetDescription
          ?.toLocaleLowerCase()
          .includes(query.toLowerCase()) ||
        String(item?.amount).includes(query),
    )
  }, [query, capexData])

  console.log('filtered data', filteredData)

  return (
    <>
      <header>
        <SearchAndButtons
          handleClick={() => navigate('/app/finance/capex/add-capex')}
          SingleButtonIcon={Plus}
          buttonName="Expense"
          pageName="CAPEX Record"
        />
      </header>
      <main>
        <Table
          getId={(item) => item.financeId}
          headers={capexHeaders}
          data={filteredData}
          renderRow={renderRow}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </main>
      <ModalManager />
    </>
  )
}

export default Capex

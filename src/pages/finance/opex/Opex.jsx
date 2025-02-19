import React, { useMemo } from 'react'
import SearchAndButtons from '../../../features/searchAndButtons/SearchAndButtons'
import { Plus } from 'lucide-react'
import Table from '../../../components/dataTable/Table'
import { opexHeaders } from '../../../components/dataTable/data'
import { useGetOpexQuery } from '@src/redux/api/accountApi'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { openModal } from '@src/redux/slices/modalSlice'
import ModalManager from '@src/modals/expenseModal/modalManager'

function Opex() {
  const { data: opexData, isLoading, isError } = useGetOpexQuery()
  const { query } = useSelector((state) => state.search)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleView = (item) => {
    dispatch(openModal({ modalType: 'VIEW_OPEX', modalProp: item }))
    console.log('View OPEX data clicked', item)
  }

  const handleEdit = (item) => {
    dispatch(openModal({ modalType: 'EDIT_OPEX', modalProp: item }))
    console.log('Edit:', item)
  }

  const handleDelete = (item) => {
    console.log('Delete:', item)
  }

  const totalExpense = opexData?.reduce(
    (total, item) => (total += item.amount),
    0,
  )

  const renderRow = (item) => {
    const percentOfTotal = totalExpense ? (item.amount / totalExpense) * 100 : 0
    return (
      <>
        <td>{item.capexCategory}</td>
        <td>{item.assetDescription}</td>
        <td>{`$${item.amount.toLocaleString()}`}</td>
        <td>{percentOfTotal.toFixed(2)}%</td>
        <td>{item.paymentMethod}</td>
      </>
    )
  }

  const filteredData = useMemo(() => {
    if (!opexData) return []

    return opexData.filter(
      (item) =>
        item?.opexCategory?.toLowerCase().includes(query.toLowerCase()) ||
        item?.description?.toLowerCase().includes(query.toLowerCase()) ||
        String(item?.amount).includes(query),
    )
  }, [query, opexData])

  console.log('Filtered OPEX data:', filteredData)

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
          getId={(item) => item.financeId}
          headers={opexHeaders}
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

export default Opex

import React, { useState } from 'react'
import { Navigate, useNavigate } from 'react-router'
import Table from '../../features/reusables/Table'
import SearchAndButtons from '../../features/searchAndButtons/SearchAndButtons'
import EditContent from '../../components/EditViewDelete/EditInventory'
import ViewContent from '../../components/EditViewDelete/ViewInventory'
import Delete from '../../features/reusables/EditViewDelete/Delete'

const Inventory = () => {
  const navigate = useNavigate()

  const goTo = () => {
    navigate('/app/addInventory')
  }

  const [isModalVisible, setModalVisible] = useState(false)
  const [isViewVisible, setViewVisible] = useState(false)
  const [isDeleteVisible, setDeleteVisible] = useState(false)

  const toggleEdit = () => setModalVisible(!isModalVisible)
  const toggleView = () => setViewVisible(!isViewVisible)
  const toggleDelete = () => setDeleteVisible(!isDeleteVisible)

  const tableHead = [
    'Item ID',
    'Resource/Item Name',
    'Category',
    'Quantity',
    'Total Value',
    'Assigned To/Location',
    'Date Purchased',
    'Action',
  ]

  return (
    <div>
      <SearchAndButtons
        pageName={'Inventory'}
        buttonName={'+ Add Inventory'}
        handleClick={goTo}
      />
      <Table
        tableHead={tableHead}
        updated={toggleEdit}
        view={toggleView}
        deleted={toggleDelete}
      />
      {isModalVisible && <EditContent close={toggleEdit} />}
      {isViewVisible && <ViewContent close={toggleView} />}
      {isDeleteVisible && <Delete close={toggleDelete} page="Inventory" />}
    </div>
  )
}

export default Inventory

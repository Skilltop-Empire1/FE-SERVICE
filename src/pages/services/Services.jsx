import React, {useState} from 'react'
import SearchAndButtons from '../../features/searchAndButtons/SearchAndButtons'
import Table from '../../features/reusables/Table'
import { Navigate, useNavigate } from 'react-router'
// import EditContent from '@src/components/EditViewDelete/EditContent'
import EditContent from '../../components/EditViewDelete/EditService'
import ViewContent from '../../components/EditViewDelete/ViewService'
import Delete from '@src/features/reusables/EditViewDelete/Delete'

const Services = () => {
  const navigate = useNavigate()

  const goTo = () => {
    navigate('/app/addServices')
  }

  const [isModalVisible, setModalVisible] = useState(false)
  const [isViewVisible, setViewVisible] = useState(false)
  const [isDeleteVisible, setDeleteVisible] = useState(false)

  const toggleEdit = () => setModalVisible(!isModalVisible)
  const toggleView = () => setViewVisible(!isViewVisible)
  const toggleDelete = () => setDeleteVisible(!isDeleteVisible)

  const tableHead = ['Service Name','Price', 'Average TAT (Duration)', 'Service Manager', 'Phone Number', 'Date Added', 'Action']

  return (
    <div>
        <SearchAndButtons pageName={'Service'} buttonName={'+ Add Service'} handleClick={goTo}/>
        <Table  tableHead={tableHead} updated={toggleEdit} view={toggleView} deleted={toggleDelete}/>
        {isModalVisible && 
        (
          <EditContent close={toggleEdit}/>
        )
        }
        {isViewVisible && 
        (
          <ViewContent close={toggleView}/>
        )
        }
        {isDeleteVisible && 
        (
          <Delete close={toggleDelete} page='service'/>
        )
        }

    </div>
  )
}

export default Services

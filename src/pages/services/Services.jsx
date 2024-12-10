import React from 'react'
import SearchAndButtons from '../../features/searchAndButtons/SearchAndButtons'
import Table from '../../features/reusables/Table'
import { Navigate, useNavigate } from 'react-router'

const Services = () => {
  const navigate = useNavigate()

  const goTo = () => {
    navigate('/app/addServices')
  }

  const tableHead = ['Service Name','Price', 'Average TAT (Duration)', 'Service Manager', 'Phone Number', 'Date Added', 'Action']

  return (
    <div>
        <SearchAndButtons pageName={'Service'} buttonName={'+ Add Service'} handleClick={goTo}/>
        <Table  tableHead={tableHead}/>
    </div>
  )
}

export default Services

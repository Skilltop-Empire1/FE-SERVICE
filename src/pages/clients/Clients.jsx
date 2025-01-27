import React, { useState } from 'react'
import { Navigate, useNavigate } from 'react-router'
import Table from '../../features/reusables/Table'
import SearchAndButtons from '../../features/searchAndButtons/SearchAndButtons'
import EditContent from '../../components/EditViewDelete/EditClient'
import ViewContent from '../../components/EditViewDelete/ViewClient'
import Delete from '@src/features/reusables/EditViewDelete/Delete'
import { useFetchResourceQuery } from '@src/redux/api/generalApi'

const Clients = () => {

  const {
    data,
    isLoading: fetchedLoading,
    error: fetchedError
  } = useFetchResourceQuery('/getall')

  console.log(fetchedData)

  const navigate = useNavigate()

  const goTo = () => {
    navigate('/app/addClient')
  }

  const [isModalVisible, setModalVisible] = useState(false)
  const [isViewVisible, setViewVisible] = useState(false)
  const [isDeleteVisible, setDeleteVisible] = useState(false)

  const toggleEdit = () => setModalVisible(!isModalVisible)
  const toggleView = () => setViewVisible(!isViewVisible)
  const toggleDelete = () => setDeleteVisible(!isDeleteVisible)

  const tableHead = ['Client Name','Phone Number', 'Email Address', 'Address', 'Birthday', 'Category', 'Action']
  const tableContent =  
  data.map((product, idx) => (
    <tr key={product.saleId}>
      <td>hello</td>
      {/* <td>
      </td>
      <td>{product.Product.name}</td>
      <td>{product.paymentOption == 'full' ? 'Full Payment' : product.paymentOption == 'credit'? 'Credit' : product.paymentOption == 'part_payment'? 'Part Payment' : ''}</td>
      <td>{product.quantity}</td>
      <td>₦ {product.totalAmount}</td>
      <td>{product.Store.storeName}</td>
      <td>{product.soldDate?.substr(0, 10)}</td> */}
      <td>
        <div onClick={() => openAction(idx)} className={style.actionMama}>
          ...
        </div>
        {action[idx] && (
          <div className={`${style.action}`} ref={actionRef}>
            <p
              className="flex gap-3 text-sm "
              onClick={view}
            >
              <EyeIcon size={20} className={style.icon2} />
              View
            </p>
            <hr />
            <p
              onClick={updated}
              className="flex gap-3 text-sm "
            >
              <Edit2Icon size={20} className={style.icon2} />
              Edit
            </p>
            {/* <hr />
            <p className="flex gap-3 text-sm ">
              <Printer size={20} className={style.icon2} />
              Print
            </p> */}
            <hr />
            <p
              onClick={deleted}
              className="flex text-sm gap-3"
            >
              <Trash size={20} className={style.icon2} />
              Delete
            </p>
          </div>
        )}
      </td>
    </tr>



  ))

  return (
    <div>
      <SearchAndButtons pageName={'Clients'} buttonName={'+ Add Client'} handleClick={goTo}/>
      <Table  tableHead={tableHead} updated={toggleEdit} view={toggleView} deleted={toggleDelete} tableContent={tableContent}/>
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
          <Delete close={toggleDelete} page='client'/>
        )
        }
    </div>
  )
}

export default Clients


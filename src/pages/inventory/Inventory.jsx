import React, { useState, useRef, useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router'
import Table from '../../features/reusables/Table'
import SearchAndButtons from '../../features/searchAndButtons/SearchAndButtons'
import EditContent from '../../components/EditViewDelete/EditInventory'
import ViewContent from '../../components/EditViewDelete/ViewInventory'
import Delete from '../../features/reusables/EditViewDelete/Delete'
import { useFetchResourceQuery } from '../../redux/api/generalApi'
import { Trash, Edit2Icon, EyeIcon, Printer } from "lucide-react";

const Inventory = () => {

  const {
    data: fetchedData,
    error: accountError,
    isLoading: accountLoading,
  } = useFetchResourceQuery("/inventory/allInventory");

  const navigate = useNavigate()

  const goTo = () => {
    navigate('/app/createTask')
  }

  const [isModalVisible, setModalVisible] = useState(false)
  const [isViewVisible, setViewVisible] = useState(false)
  const [isDeleteVisible, setDeleteVisible] = useState(false)
  const [updateData, setUpdateData] = useState()
  const [viewData, setViewData] = useState()
  

  const toggleEdit = (record) => {
    setModalVisible(!isModalVisible)
    setUpdateData(record)
  }
  const toggleView = (record) => {
    setViewVisible(!isViewVisible)
    setViewData(record)
  }
  const toggleDelete = () => setDeleteVisible(!isDeleteVisible)









  //pagination
  const [action, setAction] = useState({});
  // const [selectedRows, setSelectedRows] = useState([]);
  const actionRef = useRef(null);

  // const itemsPerPage = 10;
  // const [currentPage, setCurrentPage] = useState(1);
  // const totalPages = Math.ceil(fetchedData.length / itemsPerPage);

  // const startIndex = (currentPage - 1) * itemsPerPage;
  // const endIndex = Math.min(startIndex + itemsPerPage, fetchedData.length);
  // const currentData = api.slice(startIndex, endIndex);









  //navigation
  const goToPage = (page) => {
    setCurrentPage(page);
  };







  //action buttons toggle
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (actionRef.current && !actionRef.current.contains(event.target)) {
        setAction({});
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const openAction = (index) => {
    setAction((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };







  //table content and table
  const tableHead = ['Client Name','Phone Number', 'Email Address', 'Address', 'Birthday', 'Category', 'Action']
  const tableContent =  
      <>
        {fetchedData?.map((product, idx) => (
          <tr> {/* Ensure the key is unique */}
          <td>{product.taskTitle}</td>
            <td>hello</td>
            <td>
              {product.taskStatus}
            </td>
            <td>{product.priority}</td>
            <td>{product.dueDate}</td>
            <td>
        <div onClick={() => openAction(idx)} className='relative text-center hover:cursor-pointer'>
          ...
        </div>
        {action[idx] && (
          <div className={`absolute bg-[#fff] p-[10px] h-[150px] w-[100px] text-center flex flex-col justify-around shadow-lg shadow-[rgba(168,162,162,0.75)]`} ref={actionRef}>
            <p
              className="flex gap-3 text-sm hover:cursor-pointer"
              onClick={() =>toggleView(product)}
            >
              <EyeIcon size={20} className='text-[250px]' />
              View
            </p>
            <hr />
            <p
              // onClick={updated}
              className="flex gap-3 text-sm hover:cursor-pointer"
            >
              <Edit2Icon size={20} className='text-[250px]' />
              Edit
            </p>
            {/* <hr />
            <p className="flex gap-3 text-sm ">
              <Printer size={20} className={style.icon2} />
              Print
            </p> */}
            <hr />
            <p
              // onClick={deleted}
              className="flex text-sm gap-3 hover:cursor-pointer"
            >
              <Trash size={20} className='text-[250px]' />
              Delete
            </p>
          </div>
        )}
      </td>
          </tr>
        ))}
    </>




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

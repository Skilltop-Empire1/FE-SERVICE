import React, { useState, useRef, useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router'
import Table from '../../features/reusables/Table'
import SearchAndButtons from '../../features/searchAndButtons/SearchAndButtons'
import EditContent from '../../components/EditViewDelete/EditTask'
import ViewContent from '../../components/EditViewDelete/ViewTask'
import Delete from '../../features/reusables/EditViewDelete/Delete'
import { useFetchResourceQuery, useDeleteResourceMutation } from '../../redux/api/generalApi'
import { Trash, Edit2Icon, EyeIcon, Printer } from "lucide-react";


const Task = () => {
  const {
    data: fetchedData,
    error: accountError,
    isLoading: accountLoading,
  } = useFetchResourceQuery('/task/list')
  const [deleteResource] = useDeleteResourceMutation();

  const navigate = useNavigate()

  const goTo = () => {
    navigate('/app/createTask')
  }

  const [isModalVisible, setModalVisible] = useState(false)
  const [isViewVisible, setViewVisible] = useState(false)
  const [isDeleteVisible, setDeleteVisible] = useState(false)
  const [updateData, setUpdateData] = useState()
  const [viewData, setViewData] = useState()
  const [deleteData, setDeleteData] = useState()
  const [filteredClients, setFilteredClients] = useState([]);

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
  const [action, setAction] = useState({})
  // const [selectedRows, setSelectedRows] = useState([]);
  const actionRef = useRef(null)

  // const itemsPerPage = 10;
  // const [currentPage, setCurrentPage] = useState(1);
  // const totalPages = Math.ceil(fetchedData.length / itemsPerPage);

  // const startIndex = (currentPage - 1) * itemsPerPage;
  // const endIndex = Math.min(startIndex + itemsPerPage, fetchedData.length);
  // const currentData = api.slice(startIndex, endIndex);

  //navigation
  const goToPage = (page) => {
    setCurrentPage(page)
  }

  //action buttons toggle
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (actionRef.current && !actionRef.current.contains(event.target)) {
        setAction({})
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const openAction = (index) => {
    setAction((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }))
  }

  //handle delete
  const handleAccountDelete = (id) => {
    setDeleteData(id);
    toggleDelete();
  };

  const handleDelete = async () => {
    try {
      await deleteResource(`/task/${deleteData}`).unwrap();
      alert("Task detail deleted successfully");
      toggleDelete();
      setFilteredClients(
        filteredClients.filter((service) => service.taskId !== deleteData)
      );
      window.location.reload()
    } catch (err) {
      console.error("Failed to delete task:", err);
    }
  };

  //table content and table
  const tableHead = [
    'Task Name',
    'Assign To',
    'Task Status',
    'Priority',
    'Due Date',
    'Action',
  ]
  const tableContent = (
    <>
      {fetchedData?.map((product, idx) => (
        <tr>
          {' '}
          {/* Ensure the key is unique */}
          <td>{product.taskTitle}</td>
          <td>{product.User?.firstName} {product?.User?.lastName}</td>
          <td className={`${ product.taskStatus === "To do" ? 'bg-blue-100 text-blue-400 border-blue-400 border-2 rounded-md py-3'  : product.taskStatus === 'Completed' ? 'bg-green-100 text-green-400 border-green-400 border-2 rounded-md'  : 'bg-yellow-100 text-yellow-400 border-yellow-400 border-2 rounded-md'} text-center `}><span>{product.taskStatus}</span></td>
          <td>{product.priority}</td>
          <td>{product.dueDate}</td>
          <td>
            <div
              onClick={() => openAction(idx)}
              className="relative text-center hover:cursor-pointer"
            >
              ...
            </div>
            {action[idx] && (
              <div
                className={`absolute bg-[#fff] z-10 p-[10px] h-[150px] w-[100px] text-center flex flex-col justify-around shadow-lg shadow-[rgba(168,162,162,0.75)]`}
                ref={actionRef}
              >
                <p
                  className="flex gap-3 text-sm hover:cursor-pointer"
                  onClick={() => toggleView(product)}
                >
                  <EyeIcon size={20} className="text-[250px]" />
                  View
                </p>
                <hr />
                <p
                  // onClick={updated}
                  className="flex gap-3 text-sm hover:cursor-pointer"
                  onClick={() =>toggleEdit(product)}
                >
                  <Edit2Icon size={20} className="text-[250px]" />
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
                  onClick={() => handleAccountDelete(product.taskId)}
                >
                  <Trash size={20} className="text-[250px]" />
                  Delete
                </p>
              </div>
            )}
          </td>
        </tr>
      ))}
    </>
  )

  return (
    <div>
      <SearchAndButtons
        pageName={'Tasks'}
        buttonName={'+ Add Task  '}
        handleClick={goTo}
      />
      <Table tableHead={tableHead} tableContent={tableContent} />
      {isModalVisible && <EditContent close={toggleEdit} data={updateData}/>}
      {isViewVisible && <ViewContent close={toggleView} data={viewData} />}
      {isDeleteVisible && <Delete close={toggleDelete} page="task" deleted={handleDelete}/>}
    </div>
  )
}

export default Task

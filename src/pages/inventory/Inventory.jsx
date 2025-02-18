import React, { useState, useRef, useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router'
import Table from '../../features/reusables/Table'
import SearchAndButtons from '../../features/searchAndButtons/SearchAndButtons2'
import EditContent from '../../components/EditViewDelete/EditInventory'
import ViewContent from '../../components/EditViewDelete/ViewInventory'
import Delete from '../../features/reusables/EditViewDelete/Delete'
import { useFetchResourceQuery, useDeleteResourceMutation } from '../../redux/api/generalApi'
import { Trash, Edit2Icon, EyeIcon, Printer } from "lucide-react";

const Inventory = () => {
  const {
    data: fetchedData,
    error: accountError,
    isLoading: accountLoading,
  } = useFetchResourceQuery('/inventory/allInventory')
  const [deleteResource] = useDeleteResourceMutation();

  const navigate = useNavigate()

  const goTo = () => {
    navigate('/app/addInventory')
  }

  const [isModalVisible, setModalVisible] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
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

  const handleSearch = (term) => {
    setSearchTerm(term.toLowerCase())
  }

      //filter
  // Use filtered items for table
    const filteredItems = fetchedData?.inventory?.filter((item) => {
      const matchesSearch = item?.itemName?.toLowerCase().includes(searchTerm);
      // const matchesCategory = filterCategory === 'all' || item?.paymentOption === filterCategory;
      return matchesSearch ;
    });

  //pagination
  const [action, setAction] = useState({})
  // const [selectedRows, setSelectedRows] = useState([]);
  const actionRef = useRef(null)

  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = filteredItems ? Math.ceil(filteredItems.length / itemsPerPage) : 0;


  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, filteredItems?.length);
  const currentData = filteredItems?.slice(startIndex, endIndex);

      //navigation
      const goToPage = (page) => {
        setCurrentPage(page);
      };

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
          await deleteResource(`/inventory/delete/${deleteData}`).unwrap();
          alert("Inventory detail deleted successfully");
          toggleDelete();
          setFilteredClients(
            filteredClients.filter((service) => service.inventoryId !== deleteData)
          );
          window.location.reload()
        } catch (err) {
          console.error("Failed to delete Inventory:", err);
        }
      };




  //table content and table
  const tableHead = ['Item ID','Resource/Item Name', 'Category', 'Quantity', 'Total Value', 'Assigned To','Date Added', 'Action']
  const tableContent = (
    <>
      {currentData?.map((product, idx) => (
        <tr>
          <td>{product.itemId}</td>
            <td>
              {product.itemName}
            </td>
            <td>{product.category}</td>
            <td>{product.quantity}</td>
            <td>{product.totalValue}</td>
            <td>{product.assignedTo}</td>
            <td>{product.datePurchased}</td>
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
                  onClick={() => handleAccountDelete(product.inventoryId)}
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
        pageName={'Inventory'}
        buttonName={'+ Add Inventory'}
        handleClick={goTo}
        handleSearch={handleSearch}
        searchTerm={searchTerm}
      />
      <Table
        tableHead={tableHead}
        tableContent={tableContent} 
        currentPage={currentPage}
         totalPages={totalPages}
         itemsPerPage={itemsPerPage}
         api={currentData}
         startIndex={startIndex}
      />
      {isModalVisible && <EditContent close={toggleEdit} data={updateData}/>}
      {isViewVisible && <ViewContent close={toggleView} data={viewData}/>}
      {isDeleteVisible && <Delete close={toggleDelete} page="Inventory" deleted={handleDelete}/>}
    </div>
  )
}

export default Inventory

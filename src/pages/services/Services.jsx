import React, {useState, useEffect, useRef} from 'react'
import SearchAndButtons from '../../features/searchAndButtons/SearchAndButtons'
import Table from '../../features/reusables/Table'
import { Navigate, useNavigate } from 'react-router'
// import EditContent from '@src/components/EditViewDelete/EditContent'
import EditContent from '../../components/EditViewDelete/EditService'
import ViewContent from '../../components/EditViewDelete/ViewService'
import Delete from '../../features/reusables/EditViewDelete/Delete'
import { useFetchResourceQuery, useDeleteResourceMutation } from '../../redux/api/generalApi'
import { Trash, Edit2Icon, EyeIcon, Printer } from "lucide-react";

const Services = () => {

  const {
    data: fetchedData,
    error: accountError,
    isLoading: accountLoading,
  } = useFetchResourceQuery("/service/allServices");
  const [deleteResource] = useDeleteResourceMutation();


  const navigate = useNavigate()

  const goTo = () => {
    navigate('/app/addServices')
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
    const filteredItems = fetchedData?.services?.filter((item) => {
      const matchesSearch = item?.serviceName?.toLowerCase().includes(searchTerm);
      // const matchesCategory = filterCategory === 'all' || item?.paymentOption === filterCategory;
      return matchesSearch ;
    });

    //pagination
    const [action, setAction] = useState({});
    // const [selectedRows, setSelectedRows] = useState([]);
    const actionRef = useRef(null);
  
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


    //handle delete
    const handleAccountDelete = (id) => {
      setDeleteData(id);
      toggleDelete();
    };
  
    const handleDelete = async () => {
      try {
        await deleteResource(`/service/delete/${deleteData}`).unwrap();
        alert("Service detail deleted successfully");
        toggleDelete();
        setFilteredClients(
          filteredClients.filter((service) => service.serviceId !== deleteData)
        );
        window.location.reload()
      } catch (err) {
        console.error("Failed to delete Service:", err);
      }
    };







  //table content and table
  const tableHead = ['Service Name','Price', 'Average TAT (Duration)', 'Service Manager', 'Phone Number', 'Date Added', 'Action']
  const tableContent =  
      <>
        {currentData.map((product, idx) => (
          <tr> {/* Ensure the key is unique */}
            <td>{product.serviceName}</td>
            <td>{product.price}</td>
            <td>
              {product.duration}
            </td>
            <td>{product.serviceManager}</td>
            <td>{product.phoneNumber == null ? 'NIL' : product.phoneNumber}</td>
            <td>{product.addedDate.slice(0,10)}</td>
            <td>
        <div onClick={() => openAction(idx)} className='relative text-center hover:cursor-pointer'>
          ...
        </div>
        {action[idx] && (
          <div className={`absolute bg-[#fff] z-10 p-[10px] h-[150px] w-[100px] text-center flex flex-col justify-around shadow-lg shadow-[rgba(168,162,162,0.75)]`} ref={actionRef}>
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
              onClick={() =>toggleEdit(product)}
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
              onClick={() => handleAccountDelete(product.serviceId)}
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
        <SearchAndButtons pageName={'Service'} buttonName={'+ Add Service'} handleClick={goTo} handleSearch={handleSearch} searchTerm={searchTerm}/>
        <Table 
         tableHead={tableHead} 
         tableContent={tableContent}
         currentPage={currentPage}
         totalPages={totalPages}
         itemsPerPage={itemsPerPage}
         api={currentData}
         startIndex={startIndex}
          />
        {isModalVisible && 
        (
          <EditContent close={toggleEdit} data={updateData}/>
        )
        }
        {isViewVisible && 
        (
          <ViewContent close={toggleView} data={viewData}/>
        )
        }
        {isDeleteVisible && 
        (
          <Delete close={toggleDelete} page='service' deleted={handleDelete}/>
        )
        }

    </div>
  )
}

export default Services

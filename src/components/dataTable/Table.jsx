import React, { useEffect, useState } from 'react'
import style from './Table.module.css'
import { Edit, Eye, MoreHorizontal, Trash } from 'lucide-react'

const ActionCell = ({ item, onView, onEdit, onDelete }) => (
  <ul className={style.buttonRow}>
    <li onClick={() => onView(item)}>
      <Eye className="w-4 h-4 mr-2" />
      <span>View</span>
    </li>
    <li onClick={() => onEdit(item)}>
      <Edit className="w-4 h-4 mr-2" />
      <span>Edit</span>
    </li>
    <li onClick={() => onDelete(item)}>
      <Trash className="w-4 h-4 mr-2" />
      <span>Delete</span>
    </li>
  </ul>
)

const Table = ({
  headers,
  data,
  itemsPerPage = 5,
  isLoading,
  error,
  renderRow,
  getId,
  refetch,
  onView,
  onEdit,
  onDelete,
}) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [activeActionCell, setActiveActionCell] = useState(null)

  const totalPages = Math.ceil(data?.length / itemsPerPage)
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = data?.slice(indexOfFirstItem, indexOfLastItem)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        !event.target.closest(`.${style.buttonRow}`) &&
        activeActionCell !== null
      ) {
        setActiveActionCell(null)
      }
    }
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [activeActionCell])

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber)
    }
  }

  return (
    <>
      {isLoading && <p>Loading ...</p>}
      {error && (
        <div className={style.errorContainer}>
          <p className={style.errorMessage}>
            There was an error loading the data.
          </p>
          <button onClick={refetch} type="button">
            Retry
          </button>
        </div>
      )}
      <table className={style.table}>
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={index}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item) => {
            const itemId = getId(item)
            return (
              <tr key={itemId}>
                {renderRow ? (
                  renderRow(item, {
                    onView,
                    onEdit,
                    onDelete,
                    activeActionCell,
                    setActiveActionCell,
                  })
                ) : (
                  <>
                    <td>{item.category}</td>
                    <td>{item.description}</td>
                    <td>{`$${item.amount.toLocaleString()}`}</td>
                    <td>{`${item.percentOfTotalExpense}%`}</td>
                    <td>{`${item.momChange}%`}</td>
                  </>
                )}
                <td>
                  <div
                    className={style.ActionCell}
                    onClick={() =>
                      setActiveActionCell(
                        activeActionCell === itemId ? null : itemId,
                      )
                    }
                    aria-label="More actions"
                    role="button"
                    tabIndex="0"
                  >
                    <span className="p-2 rounded-full hover:bg-gray-200">
                      <MoreHorizontal size={24} />
                    </span>
                    {activeActionCell === itemId && (
                      <ActionCell
                        item={item}
                        onView={onView}
                        onEdit={onEdit}
                        onDelete={onDelete}
                      />
                    )}
                  </div>
                </td>
              </tr>
            )
          })}
        </tbody>
        {data?.length === 0 && (
          <tbody className={style.noData}>No table data to display yet</tbody>
        )}
      </table>
      <div className={style.pageIndex}>
        <p>
          Showing {indexOfFirstItem + 1} to{' '}
          {Math.min(indexOfLastItem, data?.length)} of {data?.length} entries
        </p>
        <div className={style.pagination}>
          <button
            onClick={() => handlePageChange(1)}
            disabled={currentPage === 1}
          >
            &lt;&lt;
          </button>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            &lt;
          </button>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={
                currentPage === index + 1 ? style.activePageButton : ''
              }
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            &gt;
          </button>
          <button
            onClick={() => handlePageChange(totalPages)}
            disabled={currentPage === totalPages}
          >
            &gt;&gt;
          </button>
        </div>
      </div>
    </>
  )
}

export default Table

import { Search } from 'lucide-react'
import { useState } from 'react'
import styles from './SearchAndButtons.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { updateQuery } from '@src/redux/slices/searchSlice'

function SearchAndButtons({
  pageName,
  handleClick,
  buttonName,
  buttonArray,
  SingleButtonIcon,
}) {
  const { query } = useSelector((state) => state.search)

  const dispatch = useDispatch()

  return (
    <div className={styles.container}>
      <div>
        <h2 className={styles.pageName}>{pageName}</h2>
      </div>
      <div className={styles.searchAndButton}>
        <div className={styles.searchContainer}>
          <Search className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search by name"
            onChange={(e) => dispatch(updateQuery(e.target.value))}
            value={query}
            aria-label="Search by name"
            className={styles.searchInput}
          />
        </div>
        <div className={styles.buttonContainer}>
          {buttonArray && buttonArray.length > 0 ? (
            buttonArray.map((button, index) => (
              <button
                key={index}
                onClick={() => handleClick(button.value)}
                className={`${styles.button} ${styles[`button-${index}`]}`}
                title={button.label}
              >
                {button.icon && <button.icon className={styles.buttonIcon} />}
                {button.label}
              </button>
            ))
          ) : (
            <button
              onClick={handleClick}
              className={styles.button}
              title={buttonName}
            >
              {SingleButtonIcon && (
                <SingleButtonIcon className={styles.buttonIcon} />
              )}
              {buttonName}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default SearchAndButtons

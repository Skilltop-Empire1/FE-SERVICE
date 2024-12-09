import React from 'react'
import style from './addmodalStyle.module.css'

const AddModal = () => {
  return (
    <div>
       <div className="mt-8 flex items-center gap-4">
            <input
              type="checkbox"
              name="check"
            //   checked={addAnother}
              onChange={(e) => setAddAnother(e.target.checked)}
              className={`${style.check} flex items-center justify-center`}
            />
            <label htmlFor="check">Add another product</label>
          </div>

          <div className="mt-5">
            <button type="submit" className={style.submit} >
              {/* {isLoading ? 'Saving...' : saveMessage ? 'Saved' : 'Save product'} */}
              save
            </button>
          </div>
    </div>
  )
}

export default AddModal

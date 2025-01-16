import Edit from '../../features/reusables/EditViewDelete/Edit'
import React from 'react'

const EditContent = ({close}) => {

  const formContent = 
  <>
    <div>
      <label htmlFor="">Helloo</label>
       <input type="text" />
    </div>
    <div>
      <label htmlFor="">Helloo</label>
      <input type="text" />
    </div>
    <div>
      <label htmlFor="">Helloo</label>
      <input type="text" />
    </div>
  </>

  return (
    <div>
      <Edit close={close} formContenten={formContent}/>
    </div>
  )
}

export default EditContent

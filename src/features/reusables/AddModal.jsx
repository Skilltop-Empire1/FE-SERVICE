import React from 'react'
import style from './addmodalStyle.module.css'
import FilledButton from './Buttons/FilledButton'
import OutlinedButton from './Buttons/OutlinedButton'

const AddModal = ({header, formContent, close, submit, addAnother, anotherContent, save}) => {
  return (
    <div className={style.body}>

      <div className={style.top}>
        <h2 className={style.title}>{header}</h2>
      </div>
        {/* form content passed as a prop */}
      <div className={style.form}>
          {formContent}
      </div> 
    </div>
  )
}

export default AddModal

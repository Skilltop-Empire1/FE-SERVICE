import React from 'react'
import style from './addmodalStyle.module.css'
import FilledButton from './Buttons/FilledButton'
import OutlinedButton from './Buttons/OutlinedButton'

const AddModal = ({header, formContent, close, submit, addAnother, anotherContent}) => {
  return (
    <div className={style.body}>

      <div className={style.top}>
        <h2 className={style.title}>{header}</h2>
      </div>


       <form action="" >

        {/* form content passed as a prop */}
        <div className={style.form}>
          {formContent}
        </div>
        
        {/* button and checkbox to add another */}
        <div className='grid-cols-2 grid'>
            <div className="mt-8 flex items-center gap-4">
                  <input
                    type="checkbox"
                    name="check"
                  //   checked={addAnother}
                    onChange={addAnother}
                    className={`${style.check} flex items-center justify-center`}
                  />
                  <label htmlFor="check">{anotherContent}</label>
                </div>

                <div className="mt-5 flex gap-3">
                  <OutlinedButton content={'Cancel'} performAction={close}/>
                  <FilledButton content={'Save'} performAction={submit}/>
                </div>
        </div>
       </form>
    </div>
  )
}

export default AddModal

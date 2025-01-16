import React from 'react'
import ModalWrapper from '../../../components/common/ModalWrapper'
import FilledButton from '../Buttons/FilledButton'
import OutlinedButton from '../Buttons/OutlinedButton'
import style from './editStyle.module.css'

const Edit = ({formContenten, close}) => {
  return (
    <ModalWrapper onClose={close}>
        <div className='p-5 h-[60%]'>
            <form action="" className={style.form}>
              {formContenten}
              <span className='flex gap-3'>
                  <OutlinedButton content={'Cancel'} performAction={close}/>
                  <FilledButton content={'Update'}/>
              </span>
            </form>
        </div>
    </ModalWrapper>
  )
}

export default Edit

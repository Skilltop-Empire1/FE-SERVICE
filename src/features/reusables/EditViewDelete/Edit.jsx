import React from 'react'
import ModalWrapper from '../../../components/common/ModalWrapper'
import FilledButton from '../Buttons/FilledButton'
import OutlinedButton from '../Buttons/OutlinedButton'
import style from './editStyle.module.css'

const Edit = ({formContenten, close, header}) => {
  return (
    <ModalWrapper onClose={close}>
        <div className='p-5 h-[60%]'>
            <h3 className='text-xl font-bold'>{header}</h3>    
              {formContenten}
        </div>
    </ModalWrapper>
  )
}

export default Edit

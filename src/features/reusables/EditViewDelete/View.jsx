import React from 'react'
import ModalWrapper from '../../../components/common/ModalWrapper'
import FilledButton from '../Buttons/FilledButton'
import OutlinedButton from '../Buttons/OutlinedButton'
import style from './viewStyle.module.css'

const View = ({formContenten, close, header}) => {
  return (
    <ModalWrapper onClose={close}>
        <div className='p-5 h-[60%]'>
              <h3 className='text-2xl font-bold'>{header}</h3>
              <div className={style.content}>
              {formContenten}   
              </div>
              <span className='flex gap-3 mt-8'>
                  <OutlinedButton content={'Cancel'} performAction={close}/>
                  <FilledButton content={'Update'}/>
              </span>
        </div>
    </ModalWrapper>
  )
}

export default View

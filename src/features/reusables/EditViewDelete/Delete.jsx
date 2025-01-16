import React from 'react'
import ModalWrapper from '@src/components/common/ModalWrapper'

const Delete = ({close, page}) => {
  return (
    <ModalWrapper onClose={close}>
        <div className=''>
            <h2 className='my-10 text-lg justify-center flex'>Are you sure you want to delete this {page} details</h2>
            <div className='flex justify-center gap-5'>
                <button className='bg-serviceBlue text-white w-[170px] h-[50px] rounded-md' onClick={close}>Close</button>
                <button className='bg-serviceRed text-white w-[170px] h-[50px] rounded-md   '>Delete</button>
            </div>
        </div>
    </ModalWrapper>
  )
}

export default Delete

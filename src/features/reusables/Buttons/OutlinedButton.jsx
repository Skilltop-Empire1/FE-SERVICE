import React from 'react'

const OutlinedButton = ({content, performAction}) => {
  return (
    <button onClick={performAction} className='w-[300px] h-[55px]  border-[#2563EB] border-[2px] text-[#2563EB] flex justify-center items-center rounded-[12px] cursor-pointer'>
        {content}
    </button>
  )
}

export default OutlinedButton

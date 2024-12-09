import React from 'react'

const FilledButton = ({content, performAction}) => {
  return (
    <div onClick={performAction} className='w-[300px] h-[55px] bg-[#2563EB] text-white flex justify-center items-center rounded-[12px] cursor-pointer'>
        {content}
    </div>
  )
}

export default FilledButton

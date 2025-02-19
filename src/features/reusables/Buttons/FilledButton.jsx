import React from 'react'

const FilledButton = ({content, performAction}) => {
  return (
    <button onClick={performAction} type='submit' className='w-[300px] h-[55px] bg-[#2563EB] text-white flex justify-center items-center rounded-[12px] cursor-pointer'>
        {content}
    </button>
  )
}

export default FilledButton

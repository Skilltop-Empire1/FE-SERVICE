import React, { useState } from 'react'
import ModalWrapper from '../common/ModalWrapper'

const ModalExample = () => {
  const [isModalVisible, setModalVisible] = useState(false)

  const toggleModal = () => setModalVisible(!isModalVisible)

  return (
    <div>
      <button onClick={toggleModal} className="btn-primary">
        Open Modal
      </button>
      {isModalVisible && (
        <ModalWrapper onClose={toggleModal} position="center">
          <div className="p-4">
            <h2 className="text-lg font-bold">Modal Content</h2>
            <p>This is an example of reusable modal content.</p>
            <button onClick={toggleModal} className="btn-secondary mt-4">
              Close Modal
            </button>
          </div>
        </ModalWrapper>
      )}
    </div>
  )
}

export default ModalExample

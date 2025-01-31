import React, { ReactNode } from 'react'
import clsx from 'clsx'

const ModalWrapper = ({
  children,
  onClose,
  contentMaxWidth = 'max-w-lg',
  closeButtonPosition = 'right',
  position = 'center',
  showCloseButton = true,
  overlayClassName = 'bg-black opacity-70',
  containerClassName = '',
}) => {
  return (
    <div
      id="modal"
      tabIndex={-1}
      aria-hidden="true"
      className={clsx(
        'fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto',
        containerClassName,
      )}
    >
      {/* Overlay */}
      <div
        className={clsx('absolute inset-0', overlayClassName)}
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div
        className={clsx(
          'relative z-10 w-full bg-white rounded-lg p-4 max-h-[85%] overflow-y-auto',
          contentMaxWidth,
          {
            'mx-auto': position === 'center',
            'ml-auto': position === 'right',
          },
        )}
      >
        {/* Close Button */}
        {showCloseButton && (
          <button
            type="button"
            onClick={onClose}
            className={clsx(
              'absolute top-2 z-10 inline-flex h-8 w-8 items-center justify-center rounded-full text-sm text-gray-400 hover:text-gray-900',
              {
                'right-2': closeButtonPosition === 'right',
                'left-2': closeButtonPosition === 'left',
              },
            )}
          >
            <svg
              className="h-3 w-3"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
              aria-hidden="true"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1l6 6m0 0l6 6M7 7l6-6M7 7L1 13"
              />
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
        )}
        {children}
      </div>
    </div>
  )
}

export default ModalWrapper

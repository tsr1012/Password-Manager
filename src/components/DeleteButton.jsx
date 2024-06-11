import React from 'react'

const DeleteButton = ({handleClick}) => {
  return (
    <button onClick={handleClick} className='relative inline-flex items-center hover-info after:content-["Delete"]'>
      <lord-icon
        style={{ width: 24, height: 24 }}
        src="https://cdn.lordicon.com/skkahier.json"
        colors="primary:#ffffff"
        trigger="hover">
      </lord-icon>
    </button>
  )
}

export default DeleteButton
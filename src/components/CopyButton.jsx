import React from 'react'

const CopyButton = ({handleClick}) => {
  return (
    <button onClick={handleClick} className='relative inline-flex items-center hover-info after:content-["Copy"]'>
      <lord-icon
        style={{ width: 24, height: 24 }}
        src="https://cdn.lordicon.com/iykgtsbt.json"
        colors="primary:#ffffff"
        trigger="hover">
      </lord-icon>
    </button>
  )
}

export default CopyButton
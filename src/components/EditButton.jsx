import React from 'react'

const EditButton = ({handleClick}) => {
  return (
    <button onClick={handleClick} className='relative inline-flex items-center hover-info after:content-["Edit"]'>
      <lord-icon
        style={{ width: 24, height: 24 }}
        src="https://cdn.lordicon.com/gwlusjdu.json"
        colors="primary:#ffffff"
        trigger="hover">
      </lord-icon>
    </button>
  )
}

export default EditButton
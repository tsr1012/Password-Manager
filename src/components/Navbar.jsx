import React from 'react'
import Github01Icon from '../assets/github-01-stroke-rounded'
import Linkedin01Icon from '../assets/linkedin-01-stroke-rounded'

const Navbar = () => {
  return (
    <nav className='bg-gray-900 text-white py-2'>
      <div className='flex justify-between container m-auto'>
        <div>
          <a className="logo font-bold text-2xl" href='/'><span>🔒Key</span><span className='text-[#f9c23c]'>Keep</span></a>
        </div>
        <div className='flex gap-5'>
          <a className='flex items-center hover:drop-shadow-[0_0px_3px_#b3ad00]' href="https://github.com/tsr1012/" target='_blank'>
            <Github01Icon />
          </a>
          <a className='flex items-center hover:drop-shadow-[0_0px_3px_#b3ad00]' href="https://www.linkedin.com/in/tsrvish/" target='_blank'>
            <Linkedin01Icon />
          </a>
        </div>
      </div>
    </nav>
  )
}

export default Navbar

import React from 'react'
import { Link } from 'react-router-dom'

function Header() {
  return (
    <div>
      <div className='flex gap-3 justify-center items-center p-1 mt-5 bg-slate-500'>
        <Link to="/" className='font-bold hover:bg-green-800 cursor-pointer p-1'>Home</Link>
        <Link to="/about" className='font-bold hover:bg-green-800 cursor-pointer p-1'>About</Link>
        <Link to="/contact" className='font-bold hover:bg-green-800 cursor-pointer p-1'>Contact</Link>
      </div>
    </div>
  )
}

export default Header

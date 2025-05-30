import React from 'react'

const Navbar = () => {
  return (
    <nav className='flex justify-between bg-indigo-900 text-white py-2'>
        <div className="logo">
            <span className='font-bold text-xl mx-8'>Todo List</span>
        </div>
        <ul className='flex gap-9 mx-9'>
            <li className='cursor-pointer hover:font-bold transition-all'>Home</li>
            <li className='cursor-pointer hover:font-bold transition-all'>Docs</li>
            <li className='cursor-pointer hover:font-bold transition-all'>Contact Us</li>
        </ul>
    </nav>
  )
}

export default Navbar

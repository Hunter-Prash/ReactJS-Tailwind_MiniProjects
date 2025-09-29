import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {
const [formData, setFormData] = useState(() => {
  const saved = sessionStorage.getItem('personal info')
  if (saved) {
    return JSON.parse(saved)         
  } else {
    return { name: '', email: '', phone: '' }
  }
})

  const navigate=useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,          // keep existing values
      [name]: value     // update only the changed field
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(formData) // contains { name, email, phone }
    sessionStorage.setItem('personal info',JSON.stringify({
        name:formData.name,
        email:formData.email,
        phone:formData.phone
    }))
    navigate('/address')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-full max-w-md flex flex-col gap-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">User Info</h2>

        <input 
          type='text' 
          name='name'
          value={formData.name}
          onChange={handleChange}
          placeholder='Enter name...' 
          className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input 
          type='email' 
          name='email'
          value={formData.email}
          onChange={handleChange}
          placeholder='Enter email' 
          className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input 
          type='number' 
          name='phone'
          value={formData.phone}
          onChange={handleChange}
          placeholder='Enter phone no.' 
          className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <button type='submit' className="bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600 transition-colors">
          Next
        </button>
      </form>
    </div>
  )
}

export default Home

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Address = () => {
  const navigate = useNavigate();
  const [formData,setFormData]=useState(()=>{
    const saved=sessionStorage.getItem('address')
    if(saved)return JSON.parse(saved)
    else return {city:'',country:'',zip:''}
  })


  const handleChange=(e)=>{
    const {name,value}=e.target
    setFormData(prev=>({
        ...prev,
        [name]:value
    }))
  }

  const handlePrev = () => {
    navigate('/');
  };

const handleSubmit=(e)=>{
    e.preventDefault()
    sessionStorage.setItem('address',JSON.stringify({
        city:formData.city,
        country:formData.country,
        zip:formData.zip
    }))
    navigate('/preferences')
}

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-6">Address Details</h1>
      <form className="bg-white p-6 rounded shadow-md w-80" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="city" className="block text-sm font-medium text-gray-700">
            City
          </label>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="country" className="block text-sm font-medium text-gray-700">
            Country
          </label>
          <input
            type="text"
            id="country"
            name="country"
            value={formData.country}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="zip" className="block text-sm font-medium text-gray-700">
            ZIP Code
          </label>
          <input
            type="text"
            id="zip"
            name="zip"
            value={formData.zip}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="flex justify-between">
          <button
            type="button"
            onClick={handlePrev}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
          >
            Previous
          </button>
          <button
            type="submit"
            
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );
};

export default Address;

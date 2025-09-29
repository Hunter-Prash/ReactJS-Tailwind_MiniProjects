import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Pref = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(()=>{
    const saved=sessionStorage.getItem('preferences')
    if(saved)return JSON.parse(saved)
    else {return {
    news: false,
    notifications: false,
    sms: false,
  }}
  });

  const handleChange = (e) => {
    const { name, checked } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sessionStorage.setItem('preferences', JSON.stringify(data));
    navigate('/review'); // Navigate to the review page
  };

  const handlePrev = () => {
    navigate('/address'); // Navigate back to the address page
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-6">Preferences</h1>
      <form className="bg-white p-6 rounded shadow-md w-80" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              name="news"
              checked={data.news}
              onChange={handleChange}
              className="mr-2"
            />
            Subscribe to News Letter
          </label>
        </div>
        <div className="mb-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              name="notifications"
              checked={data.notifications}
              onChange={handleChange}
              className="mr-2"
            />
            Enable Push Notifications
          </label>
        </div>
        <div className="mb-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              name="sms"
              checked={data.sms}
              onChange={handleChange}
              className="mr-2"
            />
            Receive SMS
          </label>
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
            Review Details
          </button>
        </div>
      </form>
    </div>
  );
};

export default Pref;

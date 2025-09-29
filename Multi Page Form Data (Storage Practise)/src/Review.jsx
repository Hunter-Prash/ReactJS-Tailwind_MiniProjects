import React from 'react';
import { useNavigate } from 'react-router-dom';

const Review = () => {
  const navigate = useNavigate();

  // Retrieve data from sessionStorage
  const personalInfo = JSON.parse(sessionStorage.getItem('personal info')) || {};
  const address = JSON.parse(sessionStorage.getItem('address')) || {};
  const preferences = JSON.parse(sessionStorage.getItem('preferences')) || {};

  const handlePrev = () => {
    navigate('/preferences'); 
  };

  const handleSubmit = () => {
    alert('Form submitted successfully!');
    sessionStorage.clear(); 
    navigate('/'); 
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-6">Review Your Details</h1>
      <div className="bg-white p-6 rounded shadow-md w-80">
        <h2 className="text-lg font-semibold mb-4">Personal Info</h2>
        <p><strong>Name:</strong> {personalInfo.name || 'N/A'}</p>
        <p><strong>Email:</strong> {personalInfo.email || 'N/A'}</p>
        <p><strong>Phone:</strong> {personalInfo.phone || 'N/A'}</p>

        <h2 className="text-lg font-semibold mt-6 mb-4">Address</h2>
        <p><strong>City:</strong> {address.city || 'N/A'}</p>
        <p><strong>Country:</strong> {address.country || 'N/A'}</p>
        <p><strong>ZIP Code:</strong> {address.zip || 'N/A'}</p>

        <h2 className="text-lg font-semibold mt-6 mb-4">Preferences</h2>
        <p><strong>News:</strong> {preferences.news ? 'Yes' : 'No'}</p>
        <p><strong>Notifications:</strong> {preferences.notifications ? 'Yes' : 'No'}</p>
        <p><strong>SMS:</strong> {preferences.sms ? 'Yes' : 'No'}</p>

        <div className="flex justify-between mt-6">
          <button
            type="button"
            onClick={handlePrev}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
          >
            Previous
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Review;

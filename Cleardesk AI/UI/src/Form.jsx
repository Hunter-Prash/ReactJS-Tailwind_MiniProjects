import React, { useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

const Form = ({ theme }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    phone: '',
    country: 'IN',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhoneChange = (value, country) => {
    setFormData((prev) => ({
      ...prev,
      phone: value,
      country: country.countryCode,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div
      className={`w-full max-w-md rounded-lg shadow-lg p-8 transition-colors duration-300 ${
        theme ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-900'
      }`}
    >
      <h2 className="text-2xl font-bold mb-6 text-center">
        Login
      </h2>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        {/* Email */}
        <label className="flex flex-col">
          <span className={`mb-1 ${theme ? 'text-gray-200' : 'text-gray-700'}`}>Email</span>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            className={`p-3 rounded border ${
              theme
                ? 'border-gray-600 bg-gray-700 text-gray-100 focus:ring-blue-500'
                : 'border-gray-300 bg-gray-50 text-gray-900 focus:ring-blue-500'
            } focus:outline-none focus:ring-2 transition-colors duration-300`}
            required
          />
        </label>

        {/* Password */}
        <label className="flex flex-col">
          <span className={`mb-1 ${theme ? 'text-gray-200' : 'text-gray-700'}`}>Password</span>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            className={`p-3 rounded border ${
              theme
                ? 'border-gray-600 bg-gray-700 text-gray-100 focus:ring-blue-500'
                : 'border-gray-300 bg-gray-50 text-gray-900 focus:ring-blue-500'
            } focus:outline-none focus:ring-2 transition-colors duration-300`}
            required
          />
        </label>

        {/* Phone */}
        <label className="flex flex-col">
          <span className={`mb-1 ${theme ? 'text-gray-200' : 'text-gray-700'}`}>Phone Number</span>
          <PhoneInput
            country={formData.country.toLowerCase()}
            value={formData.phone}
            onChange={handlePhoneChange}
            inputProps={{
              name: 'phone',
              required: true,
              autoFocus: false,
              className: `w-full p-3 rounded border ${
                theme
                  ? 'border-gray-600 bg-gray-700 text-gray-100 focus:ring-blue-500'
                  : 'border-gray-300 bg-gray-50 text-gray-900 focus:ring-blue-500'
              } focus:outline-none focus:ring-2 transition-colors duration-300`,
            }}
            containerClass="w-full"
          />
        </label>

        {/* Country */}
        <label className="flex flex-col">
          <span className={`mb-1 ${theme ? 'text-gray-200' : 'text-gray-700'}`}>Country</span>
          <select
            name="country"
            value={formData.country}
            onChange={handleChange}
            className={`p-3 rounded border ${
              theme
                ? 'border-gray-600 bg-gray-700 text-gray-100 focus:ring-blue-500'
                : 'border-gray-300 bg-gray-50 text-gray-900 focus:ring-blue-500'
            } focus:outline-none focus:ring-2 transition-colors duration-300`}
          >
            <option value="IN">India (+91)</option>
            <option value="US">United States (+1)</option>
            <option value="GB">United Kingdom (+44)</option>
            {/* Add more countries as needed */}
          </select>
        </label>

        <button
          type="submit"
          className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-4 rounded transition-colors duration-300"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Form;

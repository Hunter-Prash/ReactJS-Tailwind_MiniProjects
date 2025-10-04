import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginForm = ({ theme }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const navigate = useNavigate()

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let response = await axios.post(`http://localhost:5000/api/login`, {
                email: formData.email,
                password: formData.password
            })

            if (response.message === "Request failed with status code 404") {
                alert('Incorrect email or password')
                return
            }


            if (response.data.jwt) {
                localStorage.setItem('user', JSON.stringify(response.data.user.email))
                localStorage.setItem('JWT', JSON.stringify(response.data.jwt))
                navigate('/dashboard')
            }
            console.log(response.data)
        } catch (err) {
            // Error handling here
            if (err.response && err.response.data) {
                alert(err.response.data.message || "Login failed");
            } else {
                alert("Something went wrong, please try again.");
            }
            console.log("Login error:", err);
        }
    };

    return (
        <div
            className={`w-full max-w-md rounded-lg shadow-lg p-8 transition-colors duration-300 ${theme ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-900'
                }`}
        >
            <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                {/* Email */}
                <label className="flex flex-col">
                    <span
                        className={`mb-1 ${theme ? 'text-gray-200' : 'text-gray-700'}`}
                    >
                        Email
                    </span>
                    <input
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className={`p-3 rounded border ${theme
                            ? 'border-gray-600 bg-gray-700 text-gray-100 focus:ring-blue-500'
                            : 'border-gray-300 bg-gray-50 text-gray-900 focus:ring-blue-500'
                            } focus:outline-none focus:ring-2 transition-colors duration-300`}
                    />
                </label>

                {/* Password */}
                <label className="flex flex-col">
                    <span
                        className={`mb-1 ${theme ? 'text-gray-200' : 'text-gray-700'}`}
                    >
                        Password
                    </span>
                    <input
                        type="password"
                        name="password"
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className={`p-3 rounded border ${theme
                            ? 'border-gray-600 bg-gray-700 text-gray-100 focus:ring-blue-500'
                            : 'border-gray-300 bg-gray-50 text-gray-900 focus:ring-blue-500'
                            } focus:outline-none focus:ring-2 transition-colors duration-300`}
                    />
                </label>

                <button
                    type="submit"
                    className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-4 rounded transition-colors duration-300"
                >
                    Login
                </button>
            </form>
        </div>
    );
};

export default LoginForm;

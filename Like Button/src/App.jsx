import { useState } from 'react';
import axios from 'axios';
import { CiHeart } from 'react-icons/ci';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

const BASE_URL = 'https://jsonplaceholder.typicode.com/todos';

function YourComponent() {
  const [toggle, setToggle] = useState(false);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null); // New state to track error

  const fetchApi = async () => {
    setIsLoading(true);
    setError(null); // Reset error state before fetching
    try {
      const resp = await axios.get(BASE_URL);
      const arr = resp.data.slice(0, 100);
      console.log(arr);
      setData(arr);
      setToggle(!toggle);
    } catch (error) {
      setError('Failed to fetch data. Please try again.'); // Set error message if API request fails
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className='flex gap-1 m-1 p-1'>
        {isLoading ? (
          <button className='border-2 border-black m-1 p-2 rounded-xl flex items-center gap-1 text-gray-700 font-bold'>
            Fetching Data <AiOutlineLoading3Quarters className='animate-spin' />
          </button>
        ) : error ? ( // Display error message if there's an error
          <div className='text-red-600'>{error}</div>
        ) : (
          toggle === false ? (
            <button className='border-2 border-black m-1 p-2 rounded-xl flex items-center gap-1 text-gray-700 font-bold hover:text-red-600 hover:border-red-600' onClick={fetchApi}>
              Like <CiHeart />
            </button>
          ) : (
            <button className='bg-red-600 m-1 p-2 rounded-xl text-white font-bold  flex items-center gap-1'>
              Like <CiHeart />
            </button>
          )
        )}
      </div>
    </>
  );
}

export default YourComponent;

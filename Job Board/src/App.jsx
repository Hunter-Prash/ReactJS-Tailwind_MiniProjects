import React, { useEffect, useState } from 'react';
import fetchData from './globalApi'; // Correct import path

function App() {
  const [ids, setIds] = useState([]);
  const [details, setDetails] = useState([]);
  const [old, setOld] = useState(0);
  const [next, setNext] = useState(6);
  const [showAdditional, setShowAdditional] = useState(false);

  useEffect(() => {
    const fetchDataAndSetDetails = async () => {
      try {
        const jobIds = await fetchData('/jobstories.json');
        setIds(jobIds);

        const detailsArr = [];
        for (let i = 0; i < jobIds.length; i++) {
          const id = jobIds[i];
          const data1 = await fetchData(`/item/${id}.json`);
          detailsArr.push(data1);
        }
        setDetails(detailsArr);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchDataAndSetDetails();
  }, []);

  const handleClick = () => {
    setOld(old => old + 6);
    setNext(next => next + 6);
    setShowAdditional(true);
  };

  return (
    <div className='wrapper'>
      <div className=' bg-slate-300 rounded-xl flex flex-col gap-2 p-2'>

        <h2 className='font-bold m-1 p-1'>JOB openings...</h2>
        
        {details.slice(old, next).map((detail, index) => (
          <div key={index} className='border-black bg-white rounded-md p-2 font-bold w-[50%] h-16'>{detail.title}</div>
        ))}

        {showAdditional && details.slice(old, next).map((detail, index) => (
          <div key={index} className='border-black bg-white rounded-md p-2 font-bold w-[50%] h-16'>{detail.title}</div>
        ))}

        {details.length > next && (
          <button className="bg-orange-500 text-white font-bold py-2 px-4 rounded w-[10%] hover:bg-blue-500" onClick={handleClick}>Load More</button>
        )}

      </div>
    </div>
  );
}

export default App;

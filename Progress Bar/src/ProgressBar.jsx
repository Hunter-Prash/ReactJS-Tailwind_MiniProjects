// Child component
import React from 'react';

function ProgressBar({ progress }) {
  return (
    <div className='flex flex-col gap-2 p-2 w-[40%] ml-[400px] '>
      <h2 className='font-bold text-[30px] ml-[250px]'>P-Bar</h2>
      <div className="bg-gray-200 rounded-xl">
        <div className="bg-lime-500 rounded-xl p-1" style={{ width: `${progress}%` }}>     
         <h2 className=' ml-[250px] font-bold'>{`${progress}%`}</h2>
        </div>
      </div>
    </div>
  );
}

export default ProgressBar;

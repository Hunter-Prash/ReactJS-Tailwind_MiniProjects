import React from 'react';

function WeatherComponent({ data }) {
  const { temp, temp_min, temp_max, humidity } = data;

  return (
    <>
      {temp !== undefined ? (
        <h2 className='absolute ml-[40%] mt-[15%] font-bold text-2xl'>{(temp - 273).toFixed(1)} C</h2>
      ) : null}

      <div className=' absolute flex gap-2 p-2 ml-[35%] mt-[25%] bg-blue-200 rounded-md'>

      
        <div className='flex flex-col align-middle items-center'>
          <h2 className='font-bold'>Min temp</h2>
          {temp_min !== undefined ? <h2>{(temp_min - 273).toFixed(1)} C</h2> : null}
        </div>

        <div className='flex flex-col align-middle items-center'>
          <h2 className='font-bold'>Max temp</h2>
          {temp_max !== undefined ? <h2>{(temp_max - 273).toFixed(1)} C</h2> : null}
        </div>

        <div className='flex flex-col align-middle items-center'>
          <h2 className='font-bold'>Humidity</h2>
          { humidity !== undefined ? <h2>{humidity}</h2> : null}
        </div>
      </div>
    </>
  );
}

export default WeatherComponent;

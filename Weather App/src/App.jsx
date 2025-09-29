import { useEffect, useState } from 'react'

import './App.css'
import axios from 'axios'
import fetchApi from './GlobalApi'
import Weather_component from './Weather_component';

function App() {

  const [name,setName]=useState('');
  const [search,setSearch]=useState('');
  const [weatherData,setweatherData]=useState([]);

  const handleChange=(e)=>{
    setName(e.target.value);
  }
  const handleClick=(name)=>{
    const fetchData=async()=>{
      const response=await fetchApi(name);
      console.log(response.data.main);
      setSearch(name);
      setweatherData(response.data.main);
     
    }
    fetchData();
  }

  return (
    <div>

      <div className='flex items-center gap-2'>
        <input type='text' placeholder='Enter city' className='border border-black m-2 p-2 rounded-md ml-[35%]'  onChange={handleChange} value={name}
        ></input>

        <button className='bg-blue-500 p-2 rounded-md font-bold hover:bg-lime-500' onClick={()=>handleClick(name)}>Search</button>
      </div>

       <h2 className=' absolute font-bold ml-[40%] m-1 p-1 mt-[10%] text-2xl'>{search}</h2>

       <Weather_component  data={weatherData} />
       
    </div>
  )
}

export default App

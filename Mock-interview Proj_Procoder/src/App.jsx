import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios'

function App() {
  
  const BASE_URL='https://jsonplaceholder.typicode.com/users';
  const [data,setData]=useState([]);

  useEffect(()=>{
    const fetchData=async()=>{
      const resp=await axios.get(BASE_URL);
      console.log(resp.data);
      setData(resp.data);
   }

   fetchData();
  },[])
  

  return (
    <div className='parent'>
      
        {
          data.map((item,i)=>(
            <div className='content'>
              <h2>{item.name}</h2>
              <h2>{item.email}</h2>
            </div> 
          ))
        }
    </div>
  )
}

export default App

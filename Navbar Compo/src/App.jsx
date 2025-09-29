import React, { useState } from 'react'

const App = () => {
  const [toggle,setToggle]=useState(false)
  const [count,setCount]=useState(0)

  const handleClick=()=>{
    const temp=!toggle
    if(temp){
      let id=setInterval(()=>{
          setCount(prev=>{
            if(prev===5)clearInterval(id)
            prev=prev+1
            return prev
          })
      },1000)
    }
  }
  return (
    <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",height:"100vh",background:"#f4f4f4"}}>
        <h2 style={{fontSize:"2rem",color:"#333",marginBottom:"20px"}}>{count}</h2>
        <button 
          onClick={handleClick} 
          style={{padding:"10px 20px",fontSize:"1rem",fontWeight:"bold",border:"none",borderRadius:"8px",background:"#007bff",color:"white",cursor:"pointer"}}
        >
          Click
        </button>      
    </div>
  )
}

export default App

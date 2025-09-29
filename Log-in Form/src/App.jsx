import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const [err, setErr] = useState(false);//Error for username
  const [err1,setErr1]=useState(false);//Error for password

  const handleForm = (e) => {
    e.preventDefault();
    
    // form submission logic
    if(user.length<3 || pass.length<3)
    {
      alert("Pls enter correct values")
    }
    else{
      alert("Successfully Submitted");
    }
{/*If the interviewer asked to send the user data via a post request, then the code for that is given below*/}

    {/* fetch('dummy api',{
      method:'POST',
      headers;{
        'Content-Type: 'application/json'
      },
      body:JSON.stringify(user)
    })
    .then((val1)=>{return val1.json()
    })
    .then((val2)=>{
      console.log(val2)
    })
  */}
  }

  const handleUser = (e) => {
    let x = e.target.value;
    if (x.length < 3) {
      setErr(true);
    } else {
      setErr(false);
    }
    setUser(x);
  }

  const handlePass = (e) => {
    let x=e.target.value;
    if(x.length <3)
    {
      setErr1(true);
    }
    else 
    {
      setErr1(false);
    }
    setPass(x);
  }

  return (
    <>
      <form onSubmit={handleForm} className='flex flex-col w-[350px] justify-between align-middle'>

        <h1 className='m-1 p-2 font-bold'>Form Validations</h1>

        <input type='text' placeholder='Enter Usename' className='p-2 m-2 border border-gray-700' onChange={handleUser} value={user}/>
        {err ? <span className='text-red-500'>Invalid Username</span> : null}

        <input type='password' placeholder='enter password' className='p-2 m-2 border border-gray-700' onChange={handlePass} value={pass}/>
        {err1 ? <span className='text-red-500'>Invalid Password</span> :null}

        <button type='submit' className='p-1 border border-gray-700 w-[80px] ml-11'>Submit</button>

      </form>
      
    </>
  )
}

export default App

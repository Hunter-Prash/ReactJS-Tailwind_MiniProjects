import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {

  const [length,setLength]=useState(4);
  const [pass,setPass]=useState('');

  const [checkboxData, setCheckboxData] = useState([
    { title: "Include Uppercase Letters", state: false },
    { title: "Include Lowercase Letters", state: false },
    { title: "Include Numbers", state: false },
    { title: "Include Symbols", state: false }
  ]);

  const handleCheck=(index)=>{
    const updatedCheckboxData = [...checkboxData];
    updatedCheckboxData[index].state = !updatedCheckboxData[index].state;
    setCheckboxData(updatedCheckboxData);
  }

 let char=""
 const handlePass = () => {
  const UC = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const LC = "abcdefghijklmnopqrstuvwxyz";
  const nos = "0123456789";
  const symbol = "!@#$%^&*()_+{}|[];:<>,.?/";

  if (checkboxData[0].state) char += UC;
  if (checkboxData[1].state) char += LC;
  if (checkboxData[2].state) char += nos;
  if (checkboxData[3].state) char += symbol;

  let finalPass = "";
  for (let i = 0; i < length; i++) {
    const random_idx = Math.floor(Math.random() * char.length);//technique used to generate a random index within the bounds of the char string.
    finalPass += char[random_idx];
  }
  setPass(finalPass);
};

const [copy,setCopy]=useState(false);
  const handleCopy=()=>{
    navigator.clipboard.writeText(pass);//way to copy text to clipboard
    setCopy(true);
  }

  return (
    <div className='container'>

      <div className='header'>
        <div className='title'>{pass}</div>
        <button className='copyBtn' onClick={handleCopy}>{copy ? 'Copied' : 'copy'}</button>
      </div>

      <div className="charlength">
        <span id='xyz'>
          <label>Character Length</label>
          <label>{length}</label>
        </span>
        <input
          type="range"
          min="4"
          max="20"
          value={length}
          onChange={(e)=>{setLength(e.target.value)}}
        />
      </div>

      <div className="checkboxes">
        {checkboxData.map((checkbox,index)=>(
          <div key={index}>
            <input type='checkbox' checked={checkbox.state}       onChange={()=>handleCheck(index)}/>
            
            <label>{checkbox.title}</label>
          </div>
        ))}
      </div>

      <button className='generateBtn' onClick={handlePass}>Generate</button>
      
    </div>
  )
}

export default App

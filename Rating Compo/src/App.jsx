import React, { useState } from 'react';

function App() {
  const [click, setClick] = useState(-1);
  const [toggle,setToggle]=useState(false);

  // Function to handle button click
  const handleClick = (index) => {
    setClick(index);
    
  };

  // Array of HTML buttons
  const buttons = [
    <button key="button1" className="border-2 border-black m-1 p-2" >Button 1</button>,
    <button key="button2" className="border-2 border-black m-1 p-2" >Button 2</button>,
    <button key="button3" className="border-2 border-black m-1 p-2" >Button 3</button>,
    <button key="button3" className="border-2 border-black m-1 p-2" >Button 4</button>,
    <button key="button3" className="border-2 border-black m-1 p-2" >Button 5</button>
    
  ];

  // Render the array of buttons
  return (
    <>
      {buttons.map((button, index) => (
        <button
          key={index}
          className={`border-2 border-black m-1 p-2 ${index <= click ? 'bg-yellow-300' : ''}`}
          onClick={() => handleClick(index)}
        >
          {`Button ${index + 1}`}
        </button>
      ))}
    </>
  );
}

export default App;

import React, { useState } from 'react';
import og from './list.json';

const App = () => {
  const [list, setList] = useState(og);

  const [theme, setTheme] = useState(() => {
    const saved = JSON.parse(sessionStorage.getItem('theme'));
    return saved ? saved : false; 
  });
  const handleClick = () => {
    sessionStorage.setItem('theme', JSON.stringify(!theme));
    setTheme(!theme);
  };

const handleRadioChange = (i) => {
  let original = { ...list };
  let temp = list.sizes;

  // loop through each size
  for (let index = 0; index < temp.length; index++) {
    if (index === i) {
      temp[index] = { ...temp[index], selected: true }; // select clicked
    } else {
      temp[index] = { ...temp[index], selected: false }; // deselect others
    }
  }

  original = { ...original, sizes: temp };
  setList(original);
};

const calcPrice=()=>{
  let price = 0;
list.sizes.forEach((item) => {
  if (item.selected) price += item.price;
});
list.toppings.forEach((item) => {
  if (item.selected) price += item.price;
});
return price
}

  const handleCheckboxChange=(j)=>{
    let original={...list}
    let temp=list.toppings
    temp[j]={
      ...temp[j],
      selected:!temp[j].selected
    }
    original={...original,temp}
    setList(original)
  }

  return (
    <div
      className={`flex flex-col items-center p-6 gap-8 min-h-screen transition-colors duration-300 ${
        theme ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-800'
      }`}
    >
      <div className="w-full max-w-md flex justify-between items-center">
        <h2 className="text-3xl font-bold">Build Your Pizza</h2>
        <button
          onClick={handleClick}
          className={`px-4 py-2 rounded-lg font-semibold transition-colors duration-300 ${
            theme
              ? 'bg-white text-gray-900 hover:bg-gray-300'
              : 'bg-gray-800 text-white hover:bg-gray-700'
          }`}
        >
          {theme ? 'Light Mode' : 'Dark Mode'}
        </button>
      </div>

      
      <div
        className={`w-full max-w-md p-4 rounded-xl shadow-md transition-colors duration-300 ${
          theme ? 'bg-gray-800' : 'bg-white'
        }`}
      >
        <h3 className="text-xl font-semibold mb-3">Sizes</h3>
        <div className="flex flex-col gap-2">
          {list.sizes.map((item, i) => (
            <label
              key={i}
              className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-colors duration-300 ${
                theme ? 'hover:bg-gray-700' : 'hover:bg-red-50'
              }`}
            >
              <input
                type="radio"
                name="size"
                checked={item.selected}
                onChange={()=>handleRadioChange(i)}
                className="w-5 h-5 accent-red-500"
              />
              <span>{item.label}</span>
            </label>
          ))}
        </div>
      </div>

      
      <div
        className={`w-full max-w-md p-4 rounded-xl shadow-md transition-colors duration-300 ${
          theme ? 'bg-gray-800' : 'bg-white'
        }`}
      >
        <h3 className="text-xl font-semibold mb-3">Toppings</h3>
        <div className="flex flex-col gap-2">
          {list.toppings.map((item, j) => (
            <label
              key={j}
              className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-colors duration-300 ${
                theme ? 'hover:bg-gray-700' : 'hover:bg-green-50'
              }`}
            >
              <input
                type="checkbox"
                className="w-5 h-5 accent-green-500"
                checked={item.selected}
                onChange={()=>handleCheckboxChange(j)}
              />
              <span>{item.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Final Price */}
      <h3
        className={`text-2xl font-bold transition-colors duration-300 ${
          theme ? 'text-yellow-400' : 'text-gray-900'
        }`}
      >
        {`Final Price: ${calcPrice()}`}
      </h3>
    </div>
  );
};

export default App;

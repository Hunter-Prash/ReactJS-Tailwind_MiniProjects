// Parent component
import React, { useState, useEffect } from 'react';
import ProgressBar from './ProgressBar';

function App() {
  const [progressValue, setProgressValue] = useState(0);

  useEffect(() => {
    const progress = () => {
      let c = 0;
      const intervalId = setInterval(() => {
        if (c >= 100) {
          clearInterval(intervalId); // Stop the interval when progress reaches 100%
        } else {
          c++;
          setProgressValue(c); // Update progress value
        }
      }, 100);
    };
    progress(); // Start the progress
  }, []); // Empty dependency array ensures the effect runs only once on component mount

  return (
    <>
      <ProgressBar progress={progressValue} />{/*Instead of passing the entire function as a prope, we can only send the variable we require as a state And as react renders only when the state changes*/}
    </>
  );
}

export default App;

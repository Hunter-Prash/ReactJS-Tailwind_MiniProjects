
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Details from './Details';
import SearchDetails from './SearchDetails';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/details/:id" element={<Details />} />
        <Route path='/search' element={<SearchDetails/>}/>
      </Routes>
    </Router>
  );
};

export default App;


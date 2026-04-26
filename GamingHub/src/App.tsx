
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Home from './pages/Home'
import GameDetails from './pages/GameDetails'

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/details' element={<GameDetails/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

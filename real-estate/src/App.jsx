import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './Components/Header/Header'
import Home from "./Components/Home/Home"
import About from "./Components/About/About"


const App = () => {
  return <BrowserRouter>
  <Header/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='about' element={<About/>}/>
     
      
    </Routes>
  </BrowserRouter>
}

export default App

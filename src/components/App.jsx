// import './App.css'
import { Routes, Route } from 'react-router-dom'
import Header from './Navigation/Navigation'
import NotFoundPage from '../pages/NotFoundPage/NotFoundPage'
import HomePage from '../pages/HomePage/HomePage'
import MoviesPage from '../pages/MoviesPage/MoviesPage'


function App() {
  return (
    <div>
      <Header/>
      <Routes>
        <Route path='/' element={<h2>{<HomePage/>}</h2>}/>
        <Route path='/movies' element={<h2>{<MoviesPage/>}</h2>}/>
        <Route path='*' element={<h2>{<NotFoundPage/>}</h2>}/>
      </Routes>
    </div>
  )
}

export default App

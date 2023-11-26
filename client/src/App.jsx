import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom'

import SearchBox from './components/SearchBox/SearchBox'
import SearchResults from './components/SearchResults/SearchResults'
import ProductDetails from './components/ProductDetails/ProductDetails'

import './App.css'

function App() {
  return (
    <>
      <Router>
        <SearchBox />
        <Routes>
          <Route path='/' element={<Outlet />} />
          <Route path='/items' element={<SearchResults />} />
          <Route path='/items/:id' element={<ProductDetails />} />
        </Routes>
      </Router>
    </>
  )
}

export default App

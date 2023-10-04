import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Topup from './pages/Topup'
import Transfer from './pages/Transfer'
import Games from './pages/Games'
import PageNotFound from './pages/PageNotFound'
import Login from './pages/Login'
import Register from './pages/Register'


function App() {

  return (
    <>
      <Routes>
        <Route index path='/' element={<Home />} />
        <Route path='/topup' element={<Topup />} />
        <Route path='/transfer' element={<Transfer />} />
        <Route path='/games' element={<Games />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </>
  )
}

export default App

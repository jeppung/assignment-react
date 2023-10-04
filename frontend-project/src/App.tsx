import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Topup from './pages/Topup'
import Transfer from './pages/Transfer'
import Games from './pages/Games'
import PageNotFound from './pages/PageNotFound'
import Login from './pages/Login'
import Register from './pages/Register'
import Protected from './pages/Protected'
import ProtectedAuth from './pages/ProtectedAuth'


function App() {

  return (
    <>
      <Routes>
        <Route element={<ProtectedAuth />}>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Route>
        <Route path='*' element={<PageNotFound />} />
        <Route element={<Protected />}>
          <Route index path='/' element={<Home />} />
          <Route path='/topup' element={<Topup />} />
          <Route path='/transfer' element={<Transfer />} />
          <Route path='/games' element={<Games />} />
        </Route>
      </Routes>
    </>
  )
}

export default App

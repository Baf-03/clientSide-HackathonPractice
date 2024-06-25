import { Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import AuthRoute from './routes/authRoutes'
import ProtectedRoute from './routes/ProtectedRoutes'
import Dashboard from './pages/Dashboard'
function App() {

  return (
    <>
    <ToastContainer />
      <Routes>
          
          <Route element={<AuthRoute/>}>
              <Route path='/auth/login' element={<Login/>}/>
              <Route path='/auth/register' element={<Register/>}/>
          </Route>
          <Route element={<ProtectedRoute/>}>
            <Route index element={<Dashboard/>}/>
          </Route>
          
      </Routes>
    </>
  )
}

export default App

import { Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import AuthRoute from './routes/authRoutes'
import ProtectedRoute from './routes/ProtectedRoutes'
import Dashboard from './pages/Dashboard'
import Navbar from './components/Navbar'
import OtpVerifyPage from './pages/auth/OtpVerify'
// import { NavbarDefault } from './components/NavbarCheck'
function App() {

  return (
    <>
    <ToastContainer />
    {/* <NavbarDefault/> */}
    {/* <Navbar/> */}

      <Routes>

          <Route element={<AuthRoute/>}>
              <Route path='/auth/login' element={<Login/>}/>
              <Route path='/auth/register' element={<Register/>}/>

          </Route>

          <Route element={<ProtectedRoute/>}>
            <Route index element={<Dashboard/>}/>
            <Route path='/auth/otp-verify' element={<OtpVerifyPage/>}/>
          </Route>
          
      </Routes>
    </>
  )
}

export default App

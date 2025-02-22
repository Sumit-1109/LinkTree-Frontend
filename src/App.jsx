import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastProvider } from './context/ToastContext';
import LandingPage from './pages/LandingPage/LandingPage';
import SignupPage from './pages/UserAuth/SignupPage/SignupPage';
import SigninPage from './pages/UserAuth/SigninPage/SigninPage';
import UserInfo from './pages/UserAuth/UserInfo/UserInfo';

function App() {

  return (
    <ToastProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path='/signin' element={<SigninPage/>} />
          <Route path='/userinfo' element={<UserInfo/>} />
          <Route></Route>
        </Routes>
      </Router>
    </ToastProvider>
  )
}

export default App

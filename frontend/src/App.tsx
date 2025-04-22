import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Feed from './pages/Feed';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App

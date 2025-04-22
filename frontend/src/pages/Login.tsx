import React from 'react'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import AuthContext from '../context/AuthContext'
import axios from 'axios'

function Login() {
  const { login } = useContext(AuthContext)
  const [username, setUsername] = React.useState(null)
  const [password, setPassword] = React.useState(null)

  const fetchUserDetails = async (username) => {
      try {
          const response = await axios.get(`http://localhost:3000/user/username/${username}`);
          if (response.status !== 200) {
              throw new Error('Network response was not ok');
          }
          const data = await response.data.id;
          return data;
      }
      catch (error) {
          console.error('Error fetching user details:', error);
          return null;
      }
  };

  const handleLogin = () => {
    const userId = fetchUserDetails(username)
    .then((userId) => {
      if (userId) {
        login(userId);
      }
    });
  }
  return (
    <div>
      <h1 className="text-3xl font-bold">Login Page</h1>
        <input value={username} onChange={(event) => setUsername(event.target.value)}  type="text" placeholder="Username" className="border p-2 rounded" />
        <input value={password} onChange={(e)=>{setPassword(e.target.value)}} type="password" placeholder="Password" className="border p-2 rounded" />
        <button onClick={handleLogin} className="bg-blue-500 text-white p-2 rounded">Login</button>
      <p className="mt-4">Don't have an account? <Link to="/signup" className="text-blue-500">Register</Link></p>
    </div>
  )
}

export default Login
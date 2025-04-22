import React from 'react'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import AuthContext from '../context/AuthContext'
import axios from 'axios'

function Signup() {
  const { login } = useContext(AuthContext)
  const [username, setUsername] = React.useState(null)
  const [email, setEmail] = React.useState(null)
  const [password, setPassword] = React.useState(null)

  const handleRegister = async () => {
    const response = await axios.post('http://localhost:3000/signup', {
      username: username,
      email: email,
      password: password
    });
    if (response.status !== 200) {
      throw new Error('Network response was not ok');
    }
    const data = await response.data;
    login(data.id);
    console.log(localStorage.getItem('user'));
  }
  
  return (
    <div>
      <h1 className="text-3xl font-bold">Login Page</h1>
        <input value={username} onChange={(event) => setUsername(event.target.value)}  type="text" placeholder="Username" className="border p-2 rounded" />
        <input value={email} onChange={(event) => setEmail(event.target.value)}  type="email" placeholder="Email" className="border p-2 rounded" />
        <input value={password} onChange={(e)=>{setPassword(e.target.value)}} type="password" placeholder="Password" className="border p-2 rounded" />
        <button onClick={handleRegister} className="bg-blue-500 text-white p-2 rounded">Signup</button>
      <p className="mt-4">Already have an account? <Link to="/login" className="text-blue-500">Login</Link></p>
    </div>
  )
}

export default Signup
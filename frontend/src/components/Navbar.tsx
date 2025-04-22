import { Link } from "react-router-dom";
import { useContext,useState } from "react";
import AuthContext from "../context/AuthContext";
import axios from "axios";

const Navbar = () => {

    const { user, logout } = useContext(AuthContext);

    const [username, setUsername] = useState(null);

    const fetchUserDetails = async (userId) => {
        try {
            const response = await axios.get(`http://localhost:3000/user/${userId}`);
            if (response.status !== 200) {
                throw new Error('Network response was not ok');
            }
            const data = await response.data.username;
            return data;
        }
        catch (error) {
            console.error('Error fetching user details:', error);
            return null;
        }
    };

    if(user){
        fetchUserDetails(user.id).then((username) => {
            if (username) {
                console.log(`Username: ${username}`);
                setUsername(username);
            } else {
                console.log('Failed to fetch username');
            }
        });
    }

    return (
        <nav className="flex justify-between items-center p-4 space-x-4 text-white">
            <Link to="/">Home</Link>
            <Link to="/feed">Feed</Link>
            <Link to="/profile">Profile</Link>
            {user ? (
                <button onClick={logout} className="bg-red-500 text-white px-4 py-2 rounded">Logout</button>
            ) : (
                <Link to="/login" className="bg-blue-500 text-white px-4 py-2 rounded">Login</Link>
            )}
            {user && <span className="text-white">Welcome, {username}</span>}
        </nav>
    );
};

export default Navbar;
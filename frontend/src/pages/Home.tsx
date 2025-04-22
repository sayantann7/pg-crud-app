import {React,useState,useEffect} from 'react'
import axios from 'axios';
import PostCard from '../components/PostCard';
import Navbar from '../components/Navbar';

function Home() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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

    const fetchPosts = async () => {
        try {
            const response = await axios.get('http://localhost:3000/tweets');
            if (response.status !== 200) {
                throw new Error('Network response was not ok');
            }
            let data = await response.data;
            data = data.map((post) => ({
                ...post,
                created_at: new Date(post.created_at).toLocaleString(),
                username: fetchUserDetails(post.user_id),
            }));
            setPosts(data);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);


    return (
        <div className="home bg-gray-100 min-h-screen flex flex-col items-center justify-center">
            <Navbar />
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error.message}</p>}
            {!loading && !error && (
                <div className="flex flex-col items-center justify-center w-full">
                    {posts.map((post) => (
                        <PostCard tweet={post} />
                    ))}
                </div>
            )}
        </div>
    )
}

export default Home
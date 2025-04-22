import { Link } from "react-router-dom";
import { useContext } from "react";

const Navbar = () => {

    return (
        <nav className="flex justify-between items-center p-4 space-x-4 text-white">
            <Link to="/">Home</Link>
            <Link to="/feed">Feed</Link>
        </nav>
    );
};

export default Navbar;
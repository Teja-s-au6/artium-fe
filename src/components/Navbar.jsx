import { Link } from "react-router-dom";
import "../styles/Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1>Movie List</h1>
      <Link to="/">Home</Link>
    </nav>
  );
};

export default Navbar;

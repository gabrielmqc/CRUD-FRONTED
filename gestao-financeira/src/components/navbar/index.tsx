import { Link } from 'react-router-dom';
import './style.css';

function Navbar() {
    return (
        <nav className='navbar'>
            <Link to="/home" className="navbar-brand">NavBar</Link>
            <div className="navbar-menu">
                <Link to="/login" className="navbar-item">Login</Link>
                <Link to="/home" className="navbar-item">Home</Link>
                <Link to="/dashboard" className="navbar-item">Dashboard</Link>
                <Link to="/sobre" className="navbar-item">Sobre</Link>
            </div>
        </nav>
    )
}

export default Navbar;

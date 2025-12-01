// src/components/Header.jsx

import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="main-header">
      <nav>
         <ul className="nav-links">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
        </ul>
        
         <div className="search-bar">
          <input type="text" placeholder="Search products..." />
          <button>Search</button>
        </div>

         <ul className="auth-links">
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
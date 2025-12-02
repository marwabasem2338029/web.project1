
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="main-header">
      
       <div className="header-top-bar">
        <div className="logo-name">
          <h1>My Library</h1>
        </div>

        <nav>
          <ul className="auth-links">
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </ul>
        </nav>
      </div>

       <div className="header-bottom-bar">
        <nav>
          <ul className="nav-links">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
              
          </ul>
        </nav>

        <div className="search-bar">
          <input type="text" placeholder="Search books by title or author..." />
          <button>🔍</button>
        </div>
      </div>
    </header>
  );
}

export default Header;
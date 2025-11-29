import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="main-header">
      <nav>
        <ul>
          <li>
            {/* عند الضغط على هذا الرابط، يذهب للمسار الرئيسي / */}
            <Link to="/">Home</Link>
          </li>
          <li>
            {/* عند الضغط على هذا الرابط، يذهب لمسار /about */}
            <Link to="/about">About</Link>
          </li>
          <li>
            {/* عند الضغط على هذا الرابط، يذهب لمسار /login */}
            <Link to="/login">Login</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
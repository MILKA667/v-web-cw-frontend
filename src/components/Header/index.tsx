import { Link } from "react-router-dom";
import './style.css'

function Header() {
  return (
    <header className="header">
      <div className="header_inner">
        <Link to="/">
          <button className="animated-button">
            <span>Главная</span>
            <span></span>
          </button>
        </Link>
      </div>
    </header>
  );
}

export default Header;

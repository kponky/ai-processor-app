/* eslint-disable react/prop-types */
import { IoSunnyOutline } from "react-icons/io5";
import { IoMoonOutline } from "react-icons/io5";
import "./styles.css"; // Import the CSS file

function Header({ darkMode, setDarkMode }) {
  function handleMode() {
    setDarkMode((d) => !d);
  }

  return (
    <div className={`header ${darkMode ? "dark" : ""}`}>
      <nav className="nav">
        <h2>ChatHNG</h2>
        <div className="mode-toggle" onClick={handleMode}>
          <span>{darkMode ? <IoSunnyOutline /> : <IoMoonOutline />}</span>
        </div>
      </nav>
    </div>
  );
}

export default Header;
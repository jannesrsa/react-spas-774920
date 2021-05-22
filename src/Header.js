import { useState } from "react";

const Header = ({ onChangeUser }) => {
  const [user, setUser] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();

    onChangeUser(user);
  };

  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="/">
          Navbar
        </a>

        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <a className="nav-link" href="/">
              Home <span className="sr-only">(current)</span>
            </a>
          </li>
        </ul>

        <form className="form-inline" onSubmit={onSubmit}>
          <div className="d-flex flex-row bd-highlight">
            <input
              type="text"
              placeholder="User name"
              value={user}
              onChange={(e) => setUser(e.target.value)}
              aria-label="Search"
            />

            <button className="btn btn-outline-success" type="submit">
              Login
            </button>
          </div>
        </form>
      </nav>
    </header>
  );
};

export default Header;

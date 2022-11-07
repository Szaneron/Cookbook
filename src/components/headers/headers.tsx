import { Link, useNavigate } from 'react-router-dom';

export function Header() {
  const navigate = useNavigate();
  const userInfo = localStorage.getItem('user-info');
  const user = userInfo ? JSON.parse(userInfo) : '';

  function logOut() {
    localStorage.clear();
    navigate('/recipes');
  }

  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark ps-4 pe-4">
      <Link className="navbar-brand mb-0 h1" to="/">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-book-half"
          viewBox="0 0 16 16">
          <path d="M8.5 2.687c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492V2.687zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783z" />
        </svg>
        <span className="ps-2">Cookbook</span>
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          {localStorage.getItem('user-info') ? (
            <>
              <li className="nav-item active">
                <Link className="nav-link active" to="/recipes">
                  Przepisy
                </Link>
              </li>
              <li className="nav-item active">
                <Link className="nav-link active" to="/products">
                  Produkty
                </Link>
              </li>
              <li className="nav-item active">
                <Link className="nav-link active" to="/recipe/create">
                  Dodaj przepis
                </Link>
              </li>
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle active"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  to="/recipe/create">
                  {user.data.email}
                </Link>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li className="dropdown-item" onClick={logOut}>
                    Logout
                  </li>
                </ul>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item active">
                <Link className="nav-link active" to="/recipes">
                  Przepisy
                </Link>
              </li>
              <li className="nav-item active">
                <Link className="nav-link active" to="/products">
                  Produkty
                </Link>
              </li>
              <li className="nav-item active">
                <Link className="nav-link active" to="/auth/sign_up">
                  Zarejestruj
                </Link>
              </li>
              <li className="nav-item active">
                <Link className="nav-link active" to="/auth/sign_in">
                  Zaloguj
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

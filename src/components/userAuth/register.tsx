import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('user-info')) {
      navigate('/');
    }
  }, []);

  async function signUp() {
    const item = { email, password };

    let result = await fetch(
      'https://cookbook-docs.herokuapp.com/api/v1/auth',
      {
        method: 'POST',
        body: JSON.stringify(item),
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      }
    );
    result = await result.json();
    localStorage.setItem('user-info', JSON.stringify(result));
    navigate('/');
  }
  return (
    <div className="container mt-3 bg-dark p-3 text-center">
      <h1>Rejestracja</h1>
      <div className="row justify-content-md-center mt-2">
        <div className="col col-lg-4">
          <span>Email:</span>
          <input
            type="text"
            value={email}
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
            className="form-control text-center"
          />
        </div>
      </div>
      <div className="row justify-content-md-center mt-2">
        <div className="col col-lg-4">
          <span>Hasło:</span>
          <input
            type="password"
            value={password}
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
            className="form-control text-center"
          />
        </div>
      </div>
      <button
        onClick={signUp}
        type="button"
        className="btn btn-outline-primary mt-4">
        Zarejestruj
      </button>
    </div>
  );
};

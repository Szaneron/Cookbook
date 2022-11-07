import './auth.scss';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('user-info')) {
      navigate('/');
    }
  }, []);

  async function login() {
    if (email.length >= 5 && email.includes('@')) {
      if (password.length >= 5) {
        const item = { email, password };
        const result = await fetch(
          'https://cookbook-docs.herokuapp.com/api/v1/auth/sign_in',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
            },
            body: JSON.stringify(item),
          }
        );
        const result2 = await result.json();
        localStorage.setItem('user-info', JSON.stringify(result2));
        localStorage.setItem(
          'access-token',
          result.headers.get('Access-Token') || ''
        );
        localStorage.setItem('expiry', result.headers.get('Expiry') || '');
        localStorage.setItem('client', result.headers.get('Client') || '');
        localStorage.setItem('uid', result.headers.get('Uid') || '');

        navigate('/');
      } else {
        alert('Hasło musi zawierać co najmniej 5 znaków!');
      }
    } else {
      alert(
        'Email musi zawierać co najmniej 5 znaków, musi ponadto zawierać znak @.'
      );
    }
  }

  return (
    <div className="container mt-3 bg-dark p-3 text-center">
      <h1>Logowanie</h1>
      <div className="row justify-content-md-center mt-2">
        <div className="col col-lg-4">
          <span>Email:</span>
          <input
            type="text"
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
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
            className="form-control text-center"
          />
        </div>
      </div>
      <button
        onClick={login}
        type="button"
        className="btn btn-outline-primary mt-4">
        Zaloguj
      </button>
    </div>
  );
};

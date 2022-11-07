import { Outlet } from 'react-router-dom';
import './app.scss';
import { Header } from './headers/headers';

export const App = () => {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
};

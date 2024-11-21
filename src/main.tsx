import './index.css';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import LoginPage from './LoginPage';
import MainPage from './MainPage';

// 컴포넌트 정의
const Home = () => <div>Home</div>;

const routesConfig = [
  {
    path: '/',
    element: <Home />, // JSX 컴포넌트를 전달합니다.
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/main',
    element: <MainPage />,
  }
];

const router = createBrowserRouter(routesConfig);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);

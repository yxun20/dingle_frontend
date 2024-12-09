import './index.css';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import LoginPage from '@/pages/LoginPage.tsx';
import MainPage from '@/pages/MainPage.tsx';

import MonitorPosePage from '@/pages/MonitorPosePage.tsx';
import MonitorFrequencyPage from '@/pages/MonitorFrequncyPage.tsx';
import Dashboard from '@/pages/Dashboard.tsx';
import ScanPage from '@/pages/ScanPage.tsx';
import InsitePage from '@/pages/InsightPage';
import MyPage from '@/pages/MyPage';
import Alerts from '@/pages/Alerts';

const routesConfig = [
  {
    path: '/',
    element: <MainPage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/monitor-pose',
    element: <MonitorPosePage />,
  },
  {
    path: '/monitor-frequency',
    element: <MonitorFrequencyPage />,
  },
  {
    path: '/dash',
    element: <Dashboard />,
  },
  {
    path: '/scan',
    element: <ScanPage />,
  },
  {
    path: '/insight',
    element: <InsitePage />,
  },
  {
    path: '/mypage',
    element: <MyPage />,
  },
  {
    path: '/alerts',
    element: <Alerts />,
  },
];

const router = createBrowserRouter(routesConfig);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);

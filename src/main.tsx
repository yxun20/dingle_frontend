import './index.css';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import LoginPage from '@/pages/LoginPage.tsx';
import MainPage from '@/pages/MainPage.tsx';

import MonitorFrequencyPage from '@/pages/MonitorFrequncyPage.tsx';
import Dashboard from '@/pages/Dashboard.tsx';
import ScanPage from '@/pages/ScanPage.tsx';
import InsitePage from '@/pages/InsightPage';
import MyPage from '@/pages/MyPage';
import SignupForm from '@/pages/SignupForm';
import Onboarding from '@/pages/Onboarding.tsx';
import StartSignupForm from '@/pages/StartSignupForm.tsx';
import MonitorPosePage from './pages/MonitorPosePage';
import AudioPage from '@/pages/AudioPage.tsx';
import { ToastContainer } from 'react-toastify';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';


const queryClient = new QueryClient();


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
    path: '/sign',
    element: <SignupForm />,
  },
  {
    path: '/onboarding',
    element: <Onboarding />,
  },
  {
    path: 'monitor-pose',
    element: <MonitorPosePage />,
  },
  {
    path: '/StartSignupForm',
    element: <StartSignupForm />,
  },
  {
    path: '/audio',
    element: <AudioPage />,
  },
];

const router = createBrowserRouter(routesConfig);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ToastContainer />
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>
);

import './index.css';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const routesConfig = [
  {
    path: '',
    element: '<div>Home</div>',
  },
];

const router = createBrowserRouter(
  routesConfig.map(route => ({
    path: route.path,
    element: route.element,
  }))
);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);

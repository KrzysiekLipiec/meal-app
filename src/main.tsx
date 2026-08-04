import { StrictMode } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import { Today } from './pages/Today';
import { Meals } from './pages/Meals';
import { Kitchen } from './pages/Kitchen';
import { Plan } from './pages/Plan';
import Layout from './components/layout/Layout';
import './index.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />, // This acts as the Layout
    children: [
      {
        path: '/',
        element: <Today />,
      },
      {
        path: '/Kitchen',
        element: <Kitchen />,
      },
      {
        path: '/Plan',
        element: <Plan />,
      },
      {
        path: '/Meals',
        element: <Meals />,
      },
      {
        path: '*',
        // TODO: replace with proper 404 error component
        element: <h1>404 - Page Not Found</h1>,
      },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);

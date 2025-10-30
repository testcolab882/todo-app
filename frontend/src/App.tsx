import { createBrowserRouter, RouterProvider } from 'react-router';

import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AuthRedirect from './components/AuthRedirect';
import ProtectedRoute from './components/ProtectedRoute';
import Loading from './components/Loading';


const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true, element: <ProtectedRoute>
          <HomePage />
        </ProtectedRoute>
      },
      {
        path: 'login', element: <AuthRedirect>
          <LoginPage />
        </AuthRedirect>
      },
      {
        path: 'register', element: <AuthRedirect>
          <RegisterPage />
        </AuthRedirect>
      },
    ],
  },
]);

function App() {

  return (
    <>
      <RouterProvider router={router} />
      <Loading />
    </>
  )
}

export default App

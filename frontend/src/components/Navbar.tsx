import React from 'react';
import useAuthStore from '../stores/authStore';
import { Link } from 'react-router';

const Navbar: React.FC = () => {
  const { isAuthenticated, logout, email } = useAuthStore();

  return (
    <nav className="bg-gray-800 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">Todo App</Link>
        <div>
          {isAuthenticated ? (
            <div className="flex items-center">
              <span className="mr-4">Welcome, {email}</span>
              <button onClick={logout} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                Logout
              </button>
            </div>
          ) : (
            <div>
              <Link to="/login" className="mr-4">Login</Link>
              <Link to="/register">Register</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

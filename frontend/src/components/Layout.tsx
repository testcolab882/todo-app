import React from 'react';
import Navbar from './Navbar';
import { Outlet } from 'react-router';

const Layout: React.FC = () => {
  return (
    <div>
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;

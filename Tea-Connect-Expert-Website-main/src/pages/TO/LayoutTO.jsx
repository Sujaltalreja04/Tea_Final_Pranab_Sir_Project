import React from 'react';
import { Outlet } from 'react-router-dom';
import NavbarTO from '../../components/TO/NavbarTO';
import SidebarTO from '../../components/TO/SidebarTO';

const LayoutTO = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <NavbarTO />
      <div className="flex">
        <SidebarTO />
        <main className="flex-1 p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default LayoutTO;
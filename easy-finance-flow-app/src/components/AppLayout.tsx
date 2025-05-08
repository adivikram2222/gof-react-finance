
import React from 'react';
import { Outlet } from 'react-router-dom';
import DrawerNavigation from './DrawerNavigation';
import { useAuth } from '../contexts/AuthContext';
import { useIsMobile } from '../hooks/use-mobile';

const AppLayout: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const isMobile = useIsMobile();
  
  if (!isAuthenticated) {
    return <Outlet />;
  }

  return (
    <div className="relative">
      <DrawerNavigation />
      <div className={`${isMobile ? '' : 'md:pl-64'}`}>
        <Outlet />
      </div>
    </div>
  );
};

export default AppLayout;

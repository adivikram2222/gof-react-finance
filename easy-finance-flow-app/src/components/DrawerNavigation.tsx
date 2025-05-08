
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '../contexts/AuthContext';
import { useIsMobile } from '../hooks/use-mobile';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Home,
  ReceiptText,
  ArrowDownToLine,
  LogOut,
  Menu,
  BanknoteIcon,
} from 'lucide-react';

const DrawerNavigation: React.FC = () => {
  const location = useLocation();
  const { user, logout } = useAuth();
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(false);
  
  const menuItems = [
    { icon: <Home size={20} />, label: "Home", path: "/" },
    { icon: <BanknoteIcon size={20} />, label: "Deposit", path: "/deposit" },
    { icon: <ReceiptText size={20} />, label: "Transaction", path: "/transaction" },
    { icon: <ArrowDownToLine size={20} />, label: "Withdraw", path: "/withdraw" },
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const handleLogout = () => {
    logout();
  };

  const NavigationContent = () => (
    <div className="mt-6 flex flex-col gap-3 h-full">
      <div className="flex items-center mb-6 px-4">
        <div className="w-10 h-10 rounded-full bg-purple-light flex items-center justify-center text-white font-bold mr-3">
          {user?.name?.charAt(0) || 'U'}
        </div>
        <div>
          <h3 className="font-medium">{user?.name || 'User'}</h3>
          <p className="text-xs text-gray-500">{user?.email}</p>
        </div>
      </div>
      
      {menuItems.map((item, index) => {
  const active = isActive(item.path);
  return (
    <Link to={item.path} key={index} onClick={() => isMobile && setIsOpen(false)}>
      <Button
        variant={active ? "default" : "ghost"}
        className={`w-full justify-start font-medium ${
          active ? 'bg-purple-DEFAULT text-white' : 'text-gray-800 hover:bg-gray-100'
        }`}
      >
        <span className="mr-2">{item.icon}</span>
        {item.label}
      </Button>
    </Link>
    );
  })}
      
      <Button 
        variant="ghost" 
        className="w-full justify-start text-red-500 mt-auto"
        onClick={handleLogout}
      >
        <span className="mr-2"><LogOut size={20} /></span>
        Logout
      </Button>
    </div>
  );

  // Mobile drawer navigation
  if (isMobile) {
    return (
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
        <Button
  variant="ghost"
  size="icon"
  className="absolute top-4 right-8 z-50 text-white"
>
  <Menu />
</Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64">
          <SheetHeader>
            <SheetTitle>Finance App</SheetTitle>
            <SheetDescription>
              {user ? `Welcome, ${user.name}` : 'Welcome to Finance App'}
            </SheetDescription>
          </SheetHeader>
          <NavigationContent />
        </SheetContent>
      </Sheet>
    );
  }
  
  // Desktop permanent sidebar
  return (
    <div className="hidden md:flex flex-col h-screen w-64 fixed left-0 top-0 bg-white border-r border-gray-200 p-4">
      <div className="flex items-center mb-8">
        <h2 className="text-xl font-bold text-purple-DEFAULT">Finance App</h2>
      </div>
      <NavigationContent />
    </div>
  );
};

export default DrawerNavigation;
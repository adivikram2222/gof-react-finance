import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '../contexts/AuthContext';
import { useIsMobile } from '../hooks/use-mobile';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet";
import {
  Avatar,
  AvatarFallback,
  AvatarImage
} from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {
  Home,
  ReceiptText,
  ArrowDownToLine,
  LogOut,
  Menu,
  BanknoteIcon,
  User,
  Settings,
  HelpCircle,
  Bell,
  Wallet,
  BarChart3,
  Zap,
  Shield,
  Gift
} from 'lucide-react';
import { Badge } from "@/components/ui/badge";

const DrawerNavigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(false);
  
  // Enhanced user data with Indian name
  const userData = {
    name: user?.name || 'Arjun Kumar',
    email: user?.email || 'arjun.kumar@gmail.com',
    balance: user?.balance || '₹1,24,500.00',
    avatar: user?.avatar || "https://plus.unsplash.com/premium_photo-1671656349322-41de944d259b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bWFufGVufDB8fDB8fHww",
    notifications: user?.notifications || 3,
    plan: user?.plan || 'Premium',
    kycStatus: user?.kycStatus || 'Verified'
  };
  
  // Navigation menu items with improved icons
  const menuItems = [
    { icon: <Home size={20} />, label: "Home", path: "/" },
    { icon: <BanknoteIcon size={20} />, label: "Deposit", path: "/deposit" },
    { icon: <ReceiptText size={20} />, label: "Transactions", path: "/transaction" },
    { icon: <ArrowDownToLine size={20} />, label: "Withdraw", path: "/withdraw" },
  ];

  // Additional menu items for more functionality
  const extraMenuItems = [
    { icon: <BarChart3 size={20} />, label: "Analytics", path: "/analytics" },
    { icon: <Wallet size={20} />, label: "Cards", path: "/cards" },
    { icon: <Zap size={20} />, label: "Utilities", path: "/utilities" },
  ];

  // Helper functions
  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    // Close drawer before logout to prevent UI issues
    setIsOpen(false);
    // Add a small delay for smooth transition
    setTimeout(() => {
      logout();
      navigate('/login');
    }, 150);
  };

  const navigateToProfile = () => {
    setIsOpen(false);
    navigate('/profile');
  };

  // Animation utility function
  const animateElement = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.classList.add('scale-animation');
      setTimeout(() => {
        element.classList.remove('scale-animation');
      }, 300);
    }
  };

  // Close drawer when route changes (for mobile)
  useEffect(() => {
    if (isMobile && isOpen) {
      setIsOpen(false);
    }
  }, [location.pathname, isMobile]);

  // User profile component with enhanced design
  const UserProfile = ({ minimal = false }) => (
    <div className={`flex items-center ${minimal ? 'px-2' : 'p-4 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl border border-purple-100'}`}>
      <Avatar className="h-10 w-10 border-2 border-purple-100 ring-2 ring-white ring-opacity-60">
        <AvatarImage src={userData.avatar} alt={userData.name} />
        <AvatarFallback className="bg-purple-100 text-purple-700">
          {userData.name.charAt(0).toUpperCase()}
        </AvatarFallback>
      </Avatar>
      
      {!minimal && (
        <div className="ml-3 flex-1 overflow-hidden">
          <div className="flex items-center">
            <h3 className="font-medium text-gray-900 truncate">{userData.name}</h3>
            {userData.kycStatus === 'Verified' && (
              <Badge variant="outline" className="ml-2 bg-green-50 text-green-600 border-green-200 text-xs">
                ✓ Verified
              </Badge>
            )}
          </div>
          <p className="text-xs text-gray-500 truncate">{userData.email}</p>
          <div className="mt-1">
            <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
              {userData.plan}
            </Badge>
          </div>
        </div>
      )}
    </div>
  );

  // Navigation content (shared between mobile and desktop)
  const NavigationContent = ({ closeOnClick = false }) => (
    <div className="flex flex-col h-full">
      {/* App Logo */}
      <div className="p-4 border-b border-gray-200 flex items-center justify-center">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center text-white font-bold mr-2">
            F
          </div>
          <h2 className="text-xl font-bold text-purple-600">OrgaPay</h2>
        </div>
      </div>
      
      {/* User account summary */}
      <div className="mb-6 mt-4 px-3">
        <UserProfile />
        <div className="mt-3 grid grid-cols-1 gap-2">
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-4 rounded-xl border border-purple-700 shadow-md text-white">
            <div className="flex justify-between items-center">
              <p className="text-xs text-white/80">Available Balance</p>
              <Wallet size={16} className="text-white/80" />
            </div>
            <p className="text-lg font-semibold mt-1">{userData.balance}</p>
            <div className="mt-2 flex justify-between">
              <button 
                className="text-xs bg-white/20 hover:bg-white/30 py-1 px-3 rounded-full transition-colors duration-300"
                id="add-money-btn"
                onClick={() => {
                  animateElement('add-money-btn');
                  if (closeOnClick) setIsOpen(false);
                  navigate('/deposit');
                }}
              >
                Add Money
              </button>
              <button 
                className="text-xs bg-white/20 hover:bg-white/30 py-1 px-3 rounded-full transition-colors duration-300"
                id="send-money-btn"
                onClick={() => {
                  animateElement('send-money-btn');
                  if (closeOnClick) setIsOpen(false);
                  navigate('/withdraw');
                }}
              >
                Send Money
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Navigation links */}
      <div className="px-3 py-2">
        <p className="text-xs font-medium text-gray-500 mb-2 px-3">MAIN MENU</p>
        {menuItems.map((item, index) => {
          const active = isActive(item.path);
          return (
            <Link 
              to={item.path} 
              key={index} 
              onClick={() => closeOnClick && setIsOpen(false)}
              className="block"
            >
              <Button
                variant={active ? "default" : "ghost"}
                className={`w-full justify-start font-medium mb-1.5 transition-all ${
                  active 
                    ? 'bg-purple-600 text-white hover:bg-purple-700' 
                    : 'text-gray-700 hover:bg-gray-100 hover:text-purple-600'
                }`}
                id={`nav-item-${index}`}
                onClick={() => animateElement(`nav-item-${index}`)}
              >
                <span className="mr-3">{item.icon}</span>
                {item.label}
              </Button>
            </Link>
          );
        })}
      </div>
      
      {/* Extra menu items */}
      <div className="px-3 py-2">
        <p className="text-xs font-medium text-gray-500 mb-2 px-3">FEATURES</p>
        {extraMenuItems.map((item, index) => {
          const active = isActive(item.path);
          return (
            <Link 
              to={item.path} 
              key={index} 
              onClick={() => closeOnClick && setIsOpen(false)}
              className="block"
            >
              <Button
                variant={active ? "default" : "ghost"}
                className={`w-full justify-start font-medium mb-1.5 transition-all ${
                  active 
                    ? 'bg-purple-600 text-white hover:bg-purple-700' 
                    : 'text-gray-700 hover:bg-gray-100 hover:text-purple-600'
                }`}
                id={`extra-nav-item-${index}`}
                onClick={() => animateElement(`extra-nav-item-${index}`)}
              >
                <span className="mr-3">{item.icon}</span>
                {item.label}
              </Button>
            </Link>
          );
        })}
      </div>
      
      {/* Settings section */}
      <div className="mt-4 px-3 py-2">
        <p className="text-xs font-medium text-gray-500 mb-2 px-3">SETTINGS</p>
        <Button 
          variant="ghost" 
          className="w-full justify-start font-medium mb-1.5 text-gray-700 hover:bg-gray-100 hover:text-purple-600"
          onClick={() => {
            animateElement('profile-btn');
            if (closeOnClick) setIsOpen(false);
            navigate('/profile');
          }}
          id="profile-btn"
        >
          <span className="mr-3"><User size={20} /></span>
          Profile
        </Button>
        <Button 
          variant="ghost" 
          className="w-full justify-start font-medium mb-1.5 text-gray-700 hover:bg-gray-100 hover:text-purple-600"
          onClick={() => {
            animateElement('settings-btn');
            if (closeOnClick) setIsOpen(false);
            navigate('/settings');
          }}
          id="settings-btn"
        >
          <span className="mr-3"><Settings size={20} /></span>
          Settings
        </Button>
        <Button 
          variant="ghost" 
          className="w-full justify-start font-medium mb-1.5 text-gray-700 hover:bg-gray-100 hover:text-purple-600"
          onClick={() => {
            animateElement('refer-btn');
            if (closeOnClick) setIsOpen(false);
            navigate('/refer');
          }}
          id="refer-btn"
        >
          <span className="mr-3"><Gift size={20} /></span>
          Refer & Earn
        </Button>
        <Button 
          variant="ghost" 
          className="w-full justify-start font-medium mb-1.5 text-gray-700 hover:bg-gray-100 hover:text-purple-600"
          onClick={() => {
            animateElement('help-btn');
            if (closeOnClick) setIsOpen(false);
            navigate('/help');
          }}
          id="help-btn"
        >
          <span className="mr-3"><HelpCircle size={20} /></span>
          Help Center
        </Button>
      </div>
      
      {/* Logout button at the bottom */}
      <div className="mt-auto px-3 py-4 border-t border-gray-200">
        <Button 
          variant="outline" 
          className="w-full justify-start font-medium text-red-500 hover:text-red-600 hover:bg-red-50 border-red-100"
          onClick={handleLogout}
          id="logout-btn"
        >
          <span className="mr-3"><LogOut size={20} /></span>
          Logout
        </Button>
      </div>
    </div>
  );

  // Mobile navigation with sheet/drawer
  if (isMobile) {
    return (
      <>
        {/* Header for mobile */}
        <div className="flex justify-between items-center bg-gradient-to-r from-purple-700 via-purple-600 to-indigo-700 px-4 py-3 fixed top-0 left-0 right-0 z-10">
          <h2 className="text-lg font-bold text-white">OrgaPay</h2>
          
          <div className="flex items-center space-x-3">
            {/* Notifications */}
            <Button
  variant="ghost"
  size="icon"
  className="text-white relative bg-white/10 hover:bg-white/20"
  onClick={() => navigate('/notifications')}
>
  <Bell size={20} />
  {userData.notifications > 0 && (
    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
      {userData.notifications}
    </span>
  )}
</Button>
            {/* User profile dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full overflow-hidden p-0 border-2 border-purple-400">
                  <UserProfile minimal={true} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="px-3 py-2">
                  <p className="font-medium">{userData.name}</p>
                  <p className="text-xs text-gray-500">{userData.email}</p>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={navigateToProfile} className="py-2 cursor-pointer">
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/settings')} className="py-2 cursor-pointer">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/security')} className="py-2 cursor-pointer">
                  <Shield className="mr-2 h-4 w-4" />
                  <span>Security</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-red-500 py-2 cursor-pointer">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            {/* Menu toggle */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-white bg-white/10 hover:bg-white/20">
                  <Menu size={20} />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-72 p-0 overflow-y-auto border-r border-purple-100">
                <NavigationContent closeOnClick={true} />
              </SheetContent>
            </Sheet>
          </div>
        </div>
        
        {/* Page content padding to account for fixed header */}
        <div className="pt-14"></div>
      </>
    );
  }
  
  // Desktop permanent sidebar
  return (
    <>
      <div className="hidden md:flex flex-col h-screen w-72 fixed left-0 top-0 bg-white border-r border-gray-200 overflow-y-auto shadow-sm">
        <NavigationContent />
      </div>
      
      {/* Main content padding to account for sidebar */}
      <div className="hidden md:block md:pl-72"></div>

      {/* CSS for animations */}
      <style jsx>{`
        @keyframes scale {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }
        
        .scale-animation {
          animation: scale 0.3s ease-in-out;
        }
      `}</style>
    </>
  );
};

export default DrawerNavigation;
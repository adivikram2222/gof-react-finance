import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  BanknoteIcon, 
  CreditCard, 
  QrCode, 
  Coins,
  Home, 
  ShoppingBag, 
  Plus, 
  User,
  PieChart,
  Menu,
  X,
  ReceiptText,
  ArrowDownToLine,
  Bell
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from "@/components/ui/card";
import OnlineDeposit from '@/components/deposit/OnlineDeposit';
import CodeDeposit from '@/components/deposit/CodeDeposit';
import BankDeposit from '@/components/deposit/BankDeposit';
import CashDeposit from '@/components/deposit/CashDeposit';
import CryptoDeposit from '@/components/deposit/CryptoDeposit';

const Deposit = () => {
  // Get the navigate function for routing
  const navigate = useNavigate();
  const location = useLocation();
  
  // Determine active page based on current path
  const getActivePage = () => {
    const path = location.pathname;
    if (path === '/') return 'home';
    if (path === '/transaction') return 'transaction';
    if (path === '/deposit') return 'add';
    if (path === '/analytics') return 'analytics';
    if (path === '/profile') return 'profile';
    return 'add'; // Default to 'add' when on deposit page
  };
  
  const [activePage, setActivePage] = useState(getActivePage());
  // Detect if we're on mobile
  const isMobile = true; // For demo purposes, or use your useIsMobile hook
  
  // State for the sidebar
  const [showSidebar, setShowSidebar] = useState(false);
  
  // Menu items for navigation
  const menuItems = [
    { icon: <Home size={20} />, label: "Home", path: "/" },
    { icon: <BanknoteIcon size={20} />, label: "Deposit", path: "/deposit" },
    { icon: <ReceiptText size={20} />, label: "Transaction", path: "/transaction" },
    { icon: <ArrowDownToLine size={20} />, label: "Withdraw", path: "/withdraw" },
  ];
  
  // Side drawer navigation
  const SideDrawer = () => (
    <div className={`fixed inset-0 z-50 ${showSidebar ? 'visible' : 'invisible'}`}>
      {/* Backdrop */}
      <div 
        className={`absolute inset-0 bg-black transition-opacity duration-300 ${showSidebar ? 'opacity-50' : 'opacity-0'}`}
        onClick={() => setShowSidebar(false)}
      ></div>
      
      {/* Drawer panel */}
      <div className={`absolute top-0 right-0 w-64 h-full bg-white shadow-lg transform transition-transform duration-300 ${showSidebar ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="font-bold text-lg">Menu</h2>
          <button 
            className="p-2 rounded-full hover:bg-gray-100"
            onClick={() => setShowSidebar(false)}
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="p-4">
          <div className="space-y-4">
            {menuItems.map((item, index) => (
              <button 
                key={index}
                className="flex items-center gap-3 w-full p-2 rounded-lg hover:bg-gray-100"
                onClick={() => {
                  navigate(item.path);
                  setShowSidebar(false);
                }}
              >
                <div className="text-purple-500">
                  {item.icon}
                </div>
                <span>{item.label}</span>
              </button>
            ))}
            <button className="flex items-center gap-3 w-full p-2 rounded-lg hover:bg-gray-100">
              <PieChart size={20} className="text-amber-500" />
              <span>Analytics</span>
            </button>
            <button className="flex items-center gap-3 w-full p-2 rounded-lg hover:bg-gray-100">
              <User size={20} className="text-red-500" />
              <span>Profile</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
  
  // Bottom navigation with working functionality (integrated from HomeComponent)
  const BottomNavigation = () => {
    // Define pages with their routes and icons
    const tabs = [
      { id: 'home', path: '/', icon: <Home size={24} />, label: 'Home' },
      { id: 'transactions', path: '/transaction', icon: <ShoppingBag size={24} />, label: 'Transaction' },
      { id: 'add', path: '/deposit', icon: <Plus size={24} />, label: 'Add' },
      { id: 'analytics', path: '/analytics', icon: <PieChart size={24} />, label: 'Analytics' },
      { id: 'profile', path: '/profile', icon: <User size={24} />, label: 'Profile' }
    ];
    
    // Handle navigation
    const handleNavigation = (path, tabId) => {
      setActivePage(tabId);
      navigate(path);
    };
    
    return (
      <div className="fixed bottom-0 left-0 right-0 flex justify-around items-center py-2 px-1 bg-white border-t border-gray-200 shadow-lg z-40">
        {tabs.map(tab => (
          <button 
            key={tab.id}
            className={`flex flex-col items-center justify-center py-1 px-3 rounded-lg ${activePage === tab.id ? 'text-purple-600' : 'text-gray-600'}`}
            onClick={() => handleNavigation(tab.path, tab.id)}
          >
            {tab.id === 'add' ? (
              <div className="bg-purple-500 text-white p-3 rounded-full shadow-md hover:bg-purple-600 -mt-5 mb-1 transition-transform transform hover:scale-110">
                {tab.icon}
              </div>
            ) : (
              <div className={`${activePage === tab.id ? 'text-purple-600' : 'text-gray-500'}`}>
                {tab.icon}
              </div>
            )}
            <span className={`text-xs mt-1 font-medium ${activePage === tab.id ? 'text-purple-600' : 'text-gray-500'}`}>
              {tab.label}
            </span>
          </button>
        ))}
      </div>
    );
  };

  // Custom button component
  const Button = ({ children, className, variant, size, onClick }) => {
    const variantClasses = {
      default: "bg-purple-500 text-white hover:bg-purple-600 active:bg-purple-700",
      outline: "bg-white text-gray-700 border border-gray-200 hover:bg-gray-100 active:bg-gray-200",
      ghost: "hover:bg-gray-100 active:bg-gray-200"
    };
    
    const sizeClasses = {
      default: "py-2 px-4",
      sm: "py-1 px-2 text-sm",
      xs: "py-0.5 px-1.5 text-xs",
      icon: "p-1.5"
    };
    
    return (
      <button 
        className={`rounded-lg font-medium transition-all duration-200 ${variantClasses[variant || 'default']} ${sizeClasses[size || 'default']} ${className || ''}`}
        onClick={onClick}
      >
        {children}
      </button>
    );
  };

  return (
    <div className="flex-1 flex flex-col w-full pb-24">
      {/* Header with gradient background */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-500 p-4 pt-6 pb-6">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold text-white">Deposit Funds</h1>
          <div className="flex gap-2">
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-white bg-white/10 backdrop-blur-md"
            >
              <Bell size={20} />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-white bg-white/10 backdrop-blur-md"
              onClick={() => setShowSidebar(true)}
            >
              <Menu size={20} />
            </Button>
          </div>
        </div>
      </div>
      
      {/* Main content */}
      <div className="container px-4 py-6 max-w-6xl mx-auto">
        <Tabs defaultValue="online" className="w-full">
          <TabsList className="grid grid-cols-5 mb-8">
            <TabsTrigger value="online" className="flex flex-col items-center gap-2 py-3">
              <CreditCard size={24} />
              <span>Online</span>
            </TabsTrigger>
            <TabsTrigger value="code" className="flex flex-col items-center gap-2 py-3">
              <QrCode size={24} />
              <span>Code</span>
            </TabsTrigger>
            <TabsTrigger value="bank" className="flex flex-col items-center gap-2 py-3">
              <BanknoteIcon size={24} />
              <span>Bank</span>
            </TabsTrigger>
            <TabsTrigger value="cash" className="flex flex-col items-center gap-2 py-3">
              <BanknoteIcon size={24} />
              <span>Cash</span>
            </TabsTrigger>
            <TabsTrigger value="crypto" className="flex flex-col items-center gap-2 py-3">
              <Coins size={24} />
              <span>Crypto</span>
            </TabsTrigger>
          </TabsList>
          
          <Card>
            <CardContent className="pt-6">
              <TabsContent value="online" className="mt-0">
                <OnlineDeposit />
              </TabsContent>
              
              <TabsContent value="code" className="mt-0">
                <CodeDeposit />
              </TabsContent>
              
              <TabsContent value="bank" className="mt-0">
                <BankDeposit />
              </TabsContent>
              
              <TabsContent value="cash" className="mt-0">
                <CashDeposit />
              </TabsContent>
              
              <TabsContent value="crypto" className="mt-0">
                <CryptoDeposit />
              </TabsContent>
            </CardContent>
          </Card>
        </Tabs>
      </div>
      
      {/* Bottom navigation */}
      {isMobile && <BottomNavigation />}
      
      {/* Side drawer (menu) */}
      <SideDrawer />
    </div>
  );
};

export default Deposit;

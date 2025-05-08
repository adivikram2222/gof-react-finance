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
  Bell,
  Wallet,
  Shield,
  ArrowRight,
  ChevronRight,
  Clock
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
  
  // Recent deposits data
  const recentDeposits = [
    {
      method: "Bank Transfer",
      amount: "$2,500",
      date: "Today, 10:30 AM",
      status: "completed",
      icon: <BanknoteIcon size={16} />
    },
    {
      method: "Credit Card",
      amount: "$750",
      date: "Yesterday, 2:45 PM",
      status: "completed",
      icon: <CreditCard size={16} />
    },
    {
      method: "Crypto",
      amount: "$1,200",
      date: "May 05, 2023",
      status: "pending",
      icon: <Coins size={16} />
    }
  ];

  // Custom button component
  const Button = ({ children, className, variant, size, onClick }) => {
    const variantClasses = {
      default: "bg-purple-600 text-white hover:bg-purple-700 active:bg-purple-800",
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
  
  // Side drawer navigation - only for mobile, appears from right side
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
          <div className="mb-8">
            <div className="bg-purple-50 rounded-lg p-4 mb-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-gray-500">Available Balance</p>
                <Shield size={16} className="text-purple-600" />
              </div>
              <p className="text-xl font-bold text-gray-800">$8,246.57</p>
              <div className="mt-3 flex justify-between items-center">
                <Button variant="outline" size="xs" className="text-purple-600 border-purple-200">
                  <Wallet size={14} className="mr-1" />
                  Add Money
                </Button>
                <ArrowRight size={16} className="text-purple-600" />
              </div>
            </div>
          </div>
          
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
                <div className="text-purple-600">
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
              <div className="bg-purple-600 text-white p-3 rounded-full shadow-md hover:bg-purple-700 -mt-5 mb-1 transition-transform transform hover:scale-110">
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

  return (
    <div className="flex-1 flex flex-col w-full pb-24 bg-gray-50">
      {/* Header with gradient background */}
      <div className="bg-gradient-to-r from-purple-700 via-purple-600 to-indigo-700 p-4 pt-6 pb-6 relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute top-0 right-0 opacity-10">
          <svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="100" cy="100" r="80" stroke="white" strokeWidth="6"/>
            <circle cx="100" cy="100" r="40" stroke="white" strokeWidth="6"/>
          </svg>
        </div>
        
        <div className="flex justify-between items-center relative z-10 mb-4">
          <h1 className="text-xl font-bold text-white">Deposit Funds</h1>
          <div className="flex gap-2">
            {/* <Button 
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
            </Button> */}
          </div>
        </div>
        
        {/* Security notice in header */}
        <div className="flex items-center gap-2 bg-white/10 rounded-lg p-2 backdrop-blur-sm">
          <Shield size={18} className="text-green-300" />
          <p className="text-xs text-white">Secure transactions with 256-bit encryption and fraud protection</p>
        </div>
      </div>
      
      {/* Balance Card - positioned to overlap with header */}
      <div className="px-4 -mt-5 mb-6 relative z-20">
        <Card className="bg-white shadow-md border-0">
          <CardContent className="p-4">
            <div className="flex justify-between items-center mb-2">
              <div>
                <p className="text-sm text-gray-500">Available Balance</p>
                <p className="text-2xl font-bold">$8,246.57</p>
              </div>
              <Button variant="outline" className="text-purple-600 font-medium border-purple-200 flex items-center gap-1">
                <Clock size={14} />
                <span>History</span>
              </Button>
            </div>
            
            <div className="mt-3 flex justify-between items-center">
              <div className="flex gap-1">
                <span className="text-xs px-1.5 py-0.5 bg-blue-100 text-blue-600 rounded">Topup balance: $3,420</span>
                <span className="text-xs px-1.5 py-0.5 bg-green-100 text-green-600 rounded">Checking: $4,826</span>
              </div>
              <span className="text-xs text-gray-500">Updated just now</span>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Main content */}
      <div className="container px-4 flex-1">
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-800 mb-3">Select Deposit Method</h2>
          <p className="text-sm text-gray-500 mb-4">Choose how you'd like to add funds to your account</p>
          
          <Tabs defaultValue="online" className="w-full">
            <TabsList className="grid grid-cols-5 mb-8 bg-gray-100 p-1">
              <TabsTrigger value="online" className="flex flex-col items-center gap-2 py-3 data-[state=active]:bg-white data-[state=active]:text-purple-600">
                <CreditCard size={20} />
                <span className="text-xs">Online</span>
              </TabsTrigger>
              <TabsTrigger value="code" className="flex flex-col items-center gap-2 py-3 data-[state=active]:bg-white data-[state=active]:text-purple-600">
                <QrCode size={20} />
                <span className="text-xs">Code</span>
              </TabsTrigger>
              <TabsTrigger value="bank" className="flex flex-col items-center gap-2 py-3 data-[state=active]:bg-white data-[state=active]:text-purple-600">
                <BanknoteIcon size={20} />
                <span className="text-xs">Bank</span>
              </TabsTrigger>
              <TabsTrigger value="cash" className="flex flex-col items-center gap-2 py-3 data-[state=active]:bg-white data-[state=active]:text-purple-600">
                <BanknoteIcon size={20} />
                <span className="text-xs">Cash</span>
              </TabsTrigger>
              <TabsTrigger value="crypto" className="flex flex-col items-center gap-2 py-3 data-[state=active]:bg-white data-[state=active]:text-purple-600">
                <Coins size={20} />
                <span className="text-xs">Crypto</span>
              </TabsTrigger>
            </TabsList>
            
            <Card className="border-0 shadow-md mb-6">
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
        
        {/* Recent Deposits */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-gray-800">Recent Deposits</h2>
            <Button variant="ghost" size="sm" className="text-purple-600 flex items-center">
              View All
              <ChevronRight size={16} />
            </Button>
          </div>
          
          <div className="space-y-3">
            {recentDeposits.map((deposit, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                    {deposit.icon}
                  </div>
                  <div>
                    <p className="font-medium">{deposit.method}</p>
                    <p className="text-xs text-gray-500">{deposit.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-800">{deposit.amount}</p>
                  <span className={`text-xs px-1.5 py-0.5 rounded ${
                    deposit.status === 'completed' ? 'bg-green-100 text-green-600' : 'bg-amber-100 text-amber-600'
                  }`}>
                    {deposit.status === 'completed' ? 'Completed' : 'Pending'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Help & Support Section */}
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-5 mb-10">
          <h3 className="font-bold text-gray-800 mb-2">Need Help?</h3>
          <p className="text-sm text-gray-600 mb-3">Our support team is available 24/7 to assist with your deposit</p>
          <div className="flex gap-2">
            <Button variant="outline" className="text-purple-600 border-purple-200 flex-1">FAQ</Button>
            <Button className="flex-1">Contact Support</Button>
          </div>
        </div>
      </div>
      
      {/* Bottom navigation */}
      {isMobile && <BottomNavigation />}
      
      {/* Side drawer (menu) */}
      <SideDrawer />
    </div>
  );
};

export default Deposit;
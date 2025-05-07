import React, { useState } from 'react';
import Homes from "./Home";
import Transactions from './Transaction';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';
import {
  Home,
  ShoppingBag,
  Plus,
  PieChart,
  User,
  CreditCard,
  Building,
  Wallet,
  Check,
  Coins,
  Menu,
  X,
  Bell,
  BanknoteIcon,
  ReceiptText,
  ArrowDownToLine
} from 'lucide-react';

const Withdraw = () => {
  const [amount, setAmount] = useState("");
  const [selectedMethod, setSelectedMethod] = useState("bank-card");
  // Use true for mobile view in this demo
  const isMobile = true;
  // Added activePage state similar to the home component
  const [activePage, setActivePage] = useState('withdraw');
  // State for the sidebar
  const [showSidebar, setShowSidebar] = useState(false);
  
  // Menu items for navigation
  const menuItems = [
    { icon: <Home size={20} />, label: "Home", path: "/" },
    { icon: <BanknoteIcon size={20} />, label: "Deposit", path: "/deposit" },
    { icon: <ReceiptText size={20} />, label: "Transaction", path: "/transaction" },
    { icon: <ArrowDownToLine size={20} />, label: "Withdraw", path: "/withdraw" },
  ];
  
  const quickAmounts = [50, 100, 200, 500];
  
  const handleWithdraw = () => {
    if (!amount || parseFloat(amount) <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }
    
    toast.success(`Withdrawal of $${amount} initiated via ${getMethodName(selectedMethod)}`);
    // Reset the form after submission
    setAmount("");
  };

  const getMethodName = (method) => {
    const methods = {
      "bank-card": "Bank Card",
      "bank-account": "Bank Account",
      "usdt": "USDT",
      "wallet": "Digital Wallet",
      "check": "Check"
    };
    return methods[method] || method;
  };

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
                  window.location.href = item.path;
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

  // Bottom navigation with working functionality, same as in HomeComponent
  const BottomNavigation = () => {
    const tabs = [
      { id: 'home', icon: <Home size={24} />, label: 'Home' },
      { id: 'transactions', icon: <ShoppingBag size={24} />, label: 'Transactions' },
      { id: 'withdraw', icon: <Plus size={24} />, label: 'Withdraw' },
      { id: 'analytics', icon: <PieChart size={24} />, label: 'Analytics' },
      { id: 'profile', icon: <User size={24} />, label: 'Profile' }
    ];
    
    return (
      <div className="fixed bottom-0 left-0 right-0 flex justify-around items-center py-2 px-1 bg-white border-t border-gray-200 shadow-lg z-40">
        {tabs.map(tab => (
          <button 
            key={tab.id}
            className={`flex flex-col items-center justify-center py-1 px-3 rounded-lg ${activePage === tab.id ? 'text-purple-600' : 'text-gray-600'}`}
            onClick={() => setActivePage(tab.id)}
          >
            {tab.id === 'withdraw' ? (
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

  // HomePage Component (simplified)
  const HomePage = () => (
    <div className="flex flex-col items-center justify-center h-64 text-center">
      <div className="bg-purple-100 p-4 rounded-full mb-4">
        <Home size={32} className="text-purple-500" />
      </div>
      <h2 className="text-xl font-bold mb-2">Home Page</h2>
      <p className="text-gray-500">Return to home screen</p>
    </div>
  );

  // TransactionsPage Component (simplified)
  const TransactionsPage = () => (
    <div className="flex flex-col items-center justify-center h-64 text-center">
      <div className="bg-blue-100 p-4 rounded-full mb-4">
        <ShoppingBag size={32} className="text-blue-500" />
      </div>
      <h2 className="text-xl font-bold mb-2">Transactions</h2>
      <p className="text-gray-500">View your transaction history</p>
    </div>
  );

  // AnalyticsPage Component (simplified)
  const AnalyticsPage = () => (
    <div className="flex flex-col items-center justify-center h-64 text-center">
      <div className="bg-blue-100 p-4 rounded-full mb-4">
        <PieChart size={32} className="text-blue-500" />
      </div>
      <h2 className="text-xl font-bold mb-2">Analytics</h2>
      <p className="text-gray-500">View your spending analytics</p>
    </div>
  );

  // ProfilePage Component (simplified)
  const ProfilePage = () => (
    <div className="flex flex-col items-center justify-center h-64 text-center">
      <div className="bg-green-100 p-4 rounded-full mb-4">
        <User size={32} className="text-green-500" />
      </div>
      <h2 className="text-xl font-bold mb-2">User Profile</h2>
      <p className="text-gray-500">Manage your account settings</p>
    </div>
  );

  // WithdrawPage Component
  const WithdrawPage = () => (
    <>
      {/* Balance card */}
      <div className="p-4 bg-gradient-to-b from-purple-50 to-white">
        <Card className="bg-gradient-to-r from-indigo-700 to-purple-600 text-white hover:shadow-lg transition-shadow border-none">
          <CardContent className="p-6">
            <p className="text-sm opacity-80">Available Balance</p>
            <h2 className="text-3xl font-bold">$450.54</h2>
            <div className="flex justify-between mt-4">
              <p className="text-xs opacity-70">Withdraw to your preferred method</p>
              <p className="text-xs font-semibold bg-purple-300 bg-opacity-30 px-2 py-1 rounded-full">
                24h Limit: $5,000
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Transaction History Summary */}
      <div className="px-4 py-2 bg-white">
        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-600">Last withdrawal: 3 days ago</p>
          <Button variant="link" className="text-indigo-700 p-0 h-auto text-sm">
            View History
          </Button>
        </div>
      </div>

      {/* Withdraw form */}
      <div className="flex-1 p-4 bg-gray-50">
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2 text-gray-700">Amount to Withdraw</label>
          <Input
            type="number"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="text-lg border-2 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
          />
          
          <div className="mt-1 text-xs text-gray-500 flex justify-between">
            <span>Min: $10.00</span>
            <span>Max: $5,000.00</span>
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-6">
          {quickAmounts.map((amt) => (
            <Button
              key={amt}
              variant="outline"
              onClick={() => setAmount(amt.toString())}
              className={`text-sm transition-colors ${amount === amt.toString() ? 'bg-indigo-700 text-white' : 'hover:bg-indigo-100'}`}
            >
              ${amt}
            </Button>
          ))}
        </div>
        
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2 text-gray-700">Select Withdrawal Method</label>
          <div className="space-y-3">
            {withdrawalMethods.map((method) => (
              <Card 
                key={method.id}
                className={`hover:shadow-md transition-shadow cursor-pointer ${
                  selectedMethod === method.id ? 'border-2 border-indigo-600' : ''
                }`}
                onClick={() => setSelectedMethod(method.id)}
              >
                <CardContent className="p-4 flex items-center">
                  <div className={`w-10 h-10 rounded-full ${method.bgColor} flex items-center justify-center mr-3`}>
                    {method.icon}
                  </div>
                  <div>
                    <p className="font-medium">{method.title}</p>
                    <p className="text-xs text-gray-500">{method.description}</p>
                  </div>
                  {selectedMethod === method.id && (
                    <div className="ml-auto">
                      <div className="w-6 h-6 rounded-full bg-indigo-600 flex items-center justify-center">
                        <Check size={16} className="text-white" />
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        
        {/* Additional info based on selected method */}
        {selectedMethod === "usdt" && (
          <Card className="mb-6 bg-yellow-50">
            <CardContent className="p-3 text-sm">
              <p className="font-medium">Important USDT Information</p>
              <p className="text-xs mt-1">Withdrawals typically process within 30-60 minutes. Network fees may apply.</p>
            </CardContent>
          </Card>
        )}
        
        {selectedMethod === "check" && (
          <Card className="mb-6 bg-red-50">
            <CardContent className="p-3 text-sm">
              <p className="font-medium">Check Delivery</p>
              <p className="text-xs mt-1">Physical checks may take 7-10 business days to arrive via mail.</p>
            </CardContent>
          </Card>
        )}
        
        <Button 
          onClick={handleWithdraw}
          className="w-full bg-gradient-to-r from-indigo-700 to-purple-600 hover:from-indigo-800 hover:to-purple-700 text-white font-medium py-3 transition-colors"
          disabled={!amount}
        >
          Withdraw Funds
        </Button>
        
        <p className="text-xs text-center text-gray-500 mt-4">
          Withdrawals processed Monday-Friday. Weekend requests will be processed on the next business day.
        </p>
      </div>
    </>
  );

  const withdrawalMethods = [
    {
      id: "bank-card",
      icon: <CreditCard size={20} />,
      title: "Bank Card",
      description: "Withdraw to your linked card",
      bgColor: "bg-blue-100"
    },
    {
      id: "bank-account",
      icon: <Building size={20} />,
      title: "Bank Account",
      description: "Transfer to your bank account",
      bgColor: "bg-purple-100"
    },
    {
      id: "usdt",
      icon: <Coins size={20} />,
      title: "USDT",
      description: "Withdraw to USDT wallet",
      bgColor: "bg-yellow-100"
    },
    {
      id: "wallet",
      icon: <Wallet size={20} />,
      title: "Digital Wallet",
      description: "Send to your digital wallet",
      bgColor: "bg-green-100"
    },
    {
      id: "check",
      icon: <Check size={20} />,
      title: "Check",
      description: "Request a physical check",
      bgColor: "bg-red-100"
    }
  ];

  // Content to render based on active page
  const renderContent = () => {
    switch (activePage) {
      case 'home':
        return <Homes />;
      case 'transactions':
        return <Transactions/>;
      case 'withdraw':
        return <WithdrawPage />;
      case 'analytics':
        return <AnalyticsPage />;
      case 'profile':
        return <ProfilePage />;
      default:
        return <WithdrawPage />;
    }
  };

  return (
    <div className={`${isMobile ? 'w-full' : 'flex-1 max-w-5xl mx-auto'} pb-24 bg-gray-50`}>      
      <div className="flex-1 flex flex-col h-full">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-900 to-purple-800 p-4 pt-6 pb-6">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-bold text-white">
              {activePage === 'home' ? 'Home' : 
               activePage === 'transactions' ? 'Transactions' :
               activePage === 'withdraw' ? 'Withdraw Funds' :
               activePage === 'analytics' ? 'Analytics' :
               activePage === 'profile' ? 'Profile' : 'Withdraw Funds'}
            </h1>
            <div className="flex gap-2">
              <Button 
                variant="ghost" 
                size="sm"
                className="text-white bg-white/10 backdrop-blur-md p-2"
                onClick={() => setShowSidebar(true)}
              >
                <Menu size={20} />
              </Button>
            </div>
          </div>
        </div>

        {/* Main content area - dynamic based on selected page */}
        <div className="flex-1">
          {renderContent()}
        </div>

        {/* Bottom navigation - same as in HomeComponent */}
        {isMobile && <BottomNavigation />}
        
        {/* Side drawer (menu) */}
        <SideDrawer />
      </div>
    </div>
  );
};

export default Withdraw;

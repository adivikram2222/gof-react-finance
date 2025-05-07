import React, { useState } from 'react';
import {
  Wallet,
  Send,
  MessageSquare,
  History,
  Wifi,
  Zap,
  Ticket,
  Shield,
  CreditCard,
  Receipt,
  ShoppingCart,
  Grid3X3,
  Home,
  ShoppingBag,
  Plus,
  PieChart,
  User,
  TrendingUp,
  ArrowUpRight,
  ArrowDownLeft,
  Repeat,
  Menu,
  Bell,
  ChevronRight
} from 'lucide-react';

const HomeComponent = () => {
  const [user] = useState({ name: 'Jessica', avatar: "https://plus.unsplash.com/premium_photo-1671656349322-41de944d259b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bWFufGVufDB8fDB8fHww" });
  const isMobile = true; // For demo purposes

  // Account balances
  const balances = [
    { type: "Earning", amount: "$785.42", color: "bg-green-500", textColor: "text-green-500", bgColor: "bg-green-100" },
    { type: "Topup", amount: "$450.54", color: "bg-purple-500", textColor: "text-purple-500", bgColor: "bg-purple-100" },
    { type: "Credit", amount: "$1,200.00", color: "bg-blue-500", textColor: "text-blue-500", bgColor: "bg-blue-100" }
  ];

  const quickActions = [
    { icon: <Wallet size={20} />, label: "Top Up", href: "#", color: "text-purple-500", bg: "bg-purple-100" },
    { icon: <Send size={20} />, label: "Send", href: "#", color: "text-blue-500", bg: "bg-blue-100" },
    { icon: <MessageSquare size={20} />, label: "Request", href: "#", color: "text-green-500", bg: "bg-green-100" },
    { icon: <History size={20} />, label: "History", href: "#", color: "text-amber-500", bg: "bg-amber-100" },
  ];

  const paymentOptions = [
    { icon: <Wifi size={18} />, label: "Internet", color: "bg-red-400" },
    { icon: <Zap size={18} />, label: "Electricity", color: "bg-blue-400" },
    { icon: <Ticket size={18} />, label: "Voucher", color: "bg-green-400" },
    { icon: <Shield size={18} />, label: "Assurance", color: "bg-cyan-400" },
    { icon: <CreditCard size={18} />, label: "M Card", color: "bg-purple-400" },
    { icon: <Receipt size={18} />, label: "Bill", color: "bg-blue-500" },
    { icon: <ShoppingCart size={18} />, label: "Merchant", color: "bg-pink-400" },
    { icon: <Grid3X3 size={18} />, label: "More", color: "bg-indigo-400" },
  ];

  // Recent transactions data
  const recentTransactions = [
    { type: "income", title: "Earning Received", amount: "+$120.00", date: "Today, 14:30", icon: <ArrowUpRight size={16} className="text-green-500" /> },
    { type: "expense", title: "Shopping Payment", amount: "-$45.80", date: "Yesterday, 09:15", icon: <ArrowDownLeft size={16} className="text-red-500" /> },
    { type: "transfer", title: "Topup Balance", amount: "-$250.00", date: "May 05, 2025", icon: <Repeat size={16} className="text-blue-500" /> },
  ];

  const Button = ({ children, className, variant, size, onClick }) => {
    const variantClasses = {
      default: "bg-purple-500 text-white hover:bg-purple-600 active:bg-purple-700",
      outline: "bg-purple-50 text-purple-500 border border-purple-200 hover:bg-purple-100 active:bg-purple-150",
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

  const SectionHeader = ({ title, actionText, onClick }) => (
    <div className="flex justify-between items-center mb-4">
      <h2 className="font-bold text-lg text-gray-800">{title}</h2>
      {actionText && (
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-purple-500 flex items-center gap-1" 
          onClick={onClick}
        >
          <span className="text-sm">{actionText}</span>
          <ChevronRight size={16} />
        </Button>
      )}
    </div>
  );

  // Navigation Tab component
  const NavTab = ({ icon, isActive, label }) => (
    <div className={`flex flex-col items-center justify-center ${isActive ? 'text-purple-500' : 'text-gray-500'}`}>
      <div className={`${isActive ? 'bg-purple-100' : ''} p-2 rounded-full transition-colors duration-200`}>
        {icon}
      </div>
      <span className="text-xs mt-1 font-medium">{label}</span>
    </div>
  );

  // Bottom navigation with reusable component for other pages
  const BottomNavigation = () => {
    const [activeTab, setActiveTab] = useState('home');
    
    const tabs = [
      { id: 'home', icon: <Home size={24} />, label: 'Home' },
      { id: 'transactions', icon: <ShoppingBag size={24} />, label: 'Transactions' },
      { id: 'add', icon: <Plus size={24} />, label: 'Add' },
      { id: 'analytics', icon: <PieChart size={24} />, label: 'Analytics' },
      { id: 'profile', icon: <User size={24} />, label: 'Profile' }
    ];
    
    return (
      <div className="fixed bottom-0 left-0 right-0 flex justify-around items-center py-2 px-1 bg-white border-t border-gray-200 shadow-lg">
        {tabs.map(tab => (
          <button 
            key={tab.id}
            className={`flex flex-col items-center justify-center py-1 px-3 rounded-lg ${activeTab === tab.id ? 'text-purple-600' : 'text-gray-600'}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.id === 'add' ? (
              <div className="bg-purple-500 text-white p-3 rounded-full shadow-md hover:bg-purple-600 -mt-5 mb-1 transition-transform transform hover:scale-110">
                {tab.icon}
              </div>
            ) : (
              <div className={`${activeTab === tab.id ? 'text-purple-600' : 'text-gray-500'}`}>
                {tab.icon}
              </div>
            )}
            <span className={`text-xs mt-1 font-medium ${activeTab === tab.id ? 'text-purple-600' : 'text-gray-500'}`}>
              {tab.label}
            </span>
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className={`${isMobile ? 'w-full' : 'flex-1 max-w-5xl mx-auto'} pb-20 bg-gray-50`}>
      <div className="flex-1 flex flex-col w-full">
        {/* Header with avatar, menu icon and balances */}
        <div className="bg-gradient-to-r from-purple-600 to-purple-500 p-4 pt-6 pb-6 w-full relative overflow-hidden">
          {/* Background pattern */}
          <div className="absolute top-0 right-0 opacity-10">
            <svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="100" cy="100" r="80" stroke="white" strokeWidth="6"/>
              <circle cx="100" cy="100" r="40" stroke="white" strokeWidth="6"/>
            </svg>
          </div>
          
          <div className="flex justify-between items-center mb-5 relative z-10">
            <div className="flex items-center gap-3">
              <div className="relative">
                <img
                  src={user.avatar}
                  alt="Avatar"
                  className="w-10 h-10 rounded-full object-cover border-2 border-white/30"
                />
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
              </div>
              <div className="text-white">
                <p className="font-medium text-white/80 text-sm">Hello,</p>
                <p className="font-bold">{user?.name || 'User'}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="ghost" size="icon" className="text-white bg-white/10 backdrop-blur-md">
                <Bell size={20} />
              </Button>
              <Button variant="ghost" size="icon" className="text-white bg-white/10 backdrop-blur-md">
                <Menu size={20} />
              </Button>
            </div>
          </div>
        </div>

        {/* Balance cards - positioned to overlap with header */}
        <div className="px-4 -mt-5 mb-6 relative z-20">
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {balances.map((balance, idx) => (
              <div key={idx} className={`rounded-2xl shadow-md p-4 min-w-[150px] flex-1 bg-white`}>
                <div className={`${balance.bgColor} w-10 h-10 rounded-full flex items-center justify-center mb-2`}>
                  <Wallet size={20} className={balance.textColor} />
                </div>
                <p className="text-sm text-gray-500">{balance.type} Balance</p>
                <p className="text-xl font-bold mt-1">{balance.amount}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Main content area */}
        <div className="flex-1 px-4 space-y-6">
          {/* Quick actions */}
          <div className="bg-white rounded-2xl shadow-sm p-4">
            <SectionHeader title="Quick Actions" />
            <div className="grid grid-cols-4 gap-2">
              {quickActions.map((action, index) => (
                <div 
                  key={index} 
                  className="flex flex-col items-center justify-center hover:bg-gray-50 p-2 rounded-lg cursor-pointer transition-all duration-200 hover:shadow-sm"
                >
                  <div className={`w-12 h-12 ${action.bg} rounded-xl flex items-center justify-center mb-2 ${action.color} shadow-sm`}>
                    {action.icon}
                  </div>
                  <span className="text-xs font-medium">{action.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Transaction Card */}
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <div className="p-4">
              <SectionHeader title="Transaction Overview" actionText="See all" />

              <div className="grid grid-cols-3 gap-3 mb-5">
                <div className="bg-gradient-to-br from-purple-50 to-purple-100/60 rounded-xl p-3.5 relative overflow-hidden">
                  <div className="absolute -right-2 -top-2 bg-purple-500/10 w-12 h-12 rounded-full"></div>
                  <div className="bg-white w-10 h-10 rounded-full flex items-center justify-center mb-2 shadow-sm">
                    <TrendingUp size={18} className="text-purple-500" />
                  </div>
                  <p className="text-xs text-gray-500">Income</p>
                  <p className="font-bold text-sm mt-1">$1,240</p>
                </div>
                <div className="bg-gradient-to-br from-red-50 to-red-100/60 rounded-xl p-3.5 relative overflow-hidden">
                  <div className="absolute -right-2 -top-2 bg-red-500/10 w-12 h-12 rounded-full"></div>
                  <div className="bg-white w-10 h-10 rounded-full flex items-center justify-center mb-2 shadow-sm">
                    <ArrowDownLeft size={18} className="text-red-500" />
                  </div>
                  <p className="text-xs text-gray-500">Expense</p>
                  <p className="font-bold text-sm mt-1">$789.50</p>
                </div>
                <div className="bg-gradient-to-br from-blue-50 to-blue-100/60 rounded-xl p-3.5 relative overflow-hidden">
                  <div className="absolute -right-2 -top-2 bg-blue-500/10 w-12 h-12 rounded-full"></div>
                  <div className="bg-white w-10 h-10 rounded-full flex items-center justify-center mb-2 shadow-sm">
                    <Repeat size={18} className="text-blue-500" />
                  </div>
                  <p className="text-xs text-gray-500">Transfers</p>
                  <p className="font-bold text-sm mt-1">$350</p>
                </div>
              </div>
            </div>
            
            <div className="border-t border-gray-100">
              <div className="p-4">
                <SectionHeader title="Recent Transactions" actionText="View all" />
                <div className="space-y-4">
                  {recentTransactions.map((transaction, idx) => (
                    <div key={idx} className="flex items-center justify-between hover:bg-gray-50 p-2 rounded-lg transition-colors">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          transaction.type === 'income' ? 'bg-green-100' : 
                          transaction.type === 'expense' ? 'bg-red-100' : 'bg-blue-100'
                        }`}>
                          {transaction.icon}
                        </div>
                        <div>
                          <p className="font-medium text-sm">{transaction.title}</p>
                          <p className="text-xs text-gray-500">{transaction.date}</p>
                        </div>
                      </div>
                      <p className={`font-semibold ${
                        transaction.type === 'income' ? 'text-green-500' : 
                        transaction.type === 'expense' ? 'text-red-500' : 'text-blue-500'
                      }`}>
                        {transaction.amount}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Payment list */}
          <div className="bg-white rounded-2xl shadow-sm p-4 mb-6">
            <SectionHeader title="Payment Options" actionText="More" />
            <div className="grid grid-cols-4 gap-4">
              {paymentOptions.slice(0, 8).map((option, index) => (
                <div 
                  key={index} 
                  className="flex flex-col items-center cursor-pointer group"
                >
                  <div className={`w-12 h-12 ${option.color} rounded-xl flex items-center justify-center mb-2 text-white shadow-sm group-hover:shadow-md group-hover:scale-105 transition-all duration-200`}>
                    {option.icon}
                  </div>
                  <span className="text-xs text-center">{option.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom navigation */}
        {isMobile && <BottomNavigation />}
      </div>
    </div>
  );
};

export default HomeComponent;
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
  Repeat
} from 'lucide-react';

const HomeComponent = () => {
  const [user] = useState({ name: 'Jessica' });
  const isMobile = true; // For demo purposes

  const quickActions = [
    { icon: <Wallet size={18} />, label: "Top Up", href: "#" },
    { icon: <Send size={18} />, label: "Send", href: "#" },
    { icon: <MessageSquare size={18} />, label: "Request", href: "#" },
    { icon: <History size={18} />, label: "History", href: "#" },
  ];

  const paymentOptions = [
    { icon: <Wifi size={18} />, label: "Internet", color: "bg-red-400" },
    { icon: <Zap size={18} />, label: "Electricity", color: "bg-blue-400" },
    { icon: <Ticket size={18} />, label: "Voucher", color: "bg-green-400" },
    { icon: <Shield size={18} />, label: "Assurance", color: "bg-cyan-400" },
    { icon: <CreditCard size={18} />, label: "M Card", color: "bg-purple-300" },
    { icon: <Receipt size={18} />, label: "Bill", color: "bg-blue-500" },
    { icon: <ShoppingCart size={18} />, label: "Merchant", color: "bg-pink-400" },
    { icon: <Grid3X3 size={18} />, label: "More", color: "bg-indigo-400" },
  ];

  // Recent transactions data
  const recentTransactions = [
    { type: "income", title: "Earning Received", amount: "+$120.00", date: "Today, 14:30", icon: <ArrowUpRight size={16} className="text-green-500" /> },
    { type: "expense", title: "income", amount: "-$45.80", date: "Yesterday, 09:15", icon: <ArrowDownLeft size={16} className="text-red-500" /> },
    { type: "transfer", title: "popup Balance", amount: "-$250.00", date: "May 05, 2025", icon: <Repeat size={16} className="text-blue-500" /> },
  ];

  const Button = ({ children, className, variant, size }) => {
    const variantClasses = {
      default: "bg-purple-500 text-white hover:bg-purple-600",
      outline: "bg-purple-100 text-purple-500 border border-purple-200",
      ghost: "hover:bg-gray-100"
    };
    
    const sizeClasses = {
      default: "py-2 px-4",
      sm: "py-1 px-2 text-sm",
      icon: "p-1"
    };
    
    return (
      <button 
        className={`rounded-md font-medium transition-colors ${variantClasses[variant || 'default']} ${sizeClasses[size || 'default']} ${className || ''}`}
      >
        {children}
      </button>
    );
  };

  const BottomNavigation = () => (
    <div className="fixed bottom-0 left-0 right-0 flex justify-around items-center py-3 bg-white border-t">
      <Button variant="ghost" className="flex flex-col text-purple-500">
        <Home size={24} />
      </Button>
      <Button variant="ghost">
        <ShoppingBag size={24} />
      </Button>
      <Button variant="outline" className="rounded-full bg-purple-100 text-purple-500">
        <Plus size={24} />
      </Button>
      <Button variant="ghost">
        <PieChart size={24} />
      </Button>
      <Button variant="ghost">
        <User size={24} />
      </Button>
    </div>
  );

  return (
    <div className={`${isMobile ? 'w-full' : 'flex-1 max-w-5xl mx-auto'} pb-20`}>
      <div className="flex-1 flex flex-col w-full">
        {/* Header with avatar and balance */}
        <div className="bg-purple-500 p-4 pb-20 w-full">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <img
                src="https://plus.unsplash.com/premium_photo-1671656349322-41de944d259b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bWFufGVufDB8fDB8fHww"
                alt="Avatar"
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="text-white">
                <p className="font-medium">Hello,</p>
                <p className="font-bold">{user?.name || 'User'}</p>
              </div>
            </div>
            <div>
              <Button variant="ghost" size="icon" className="text-white">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-bell">
                  <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"></path>
                  <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"></path>
                </svg>
              </Button>
            </div>
          </div>
          
          <div className="mt-4 text-white">
            <p className="text-sm opacity-80">Available Balance</p>
            <h1 className="text-3xl font-bold">$450.54</h1>
          </div>
        </div>

        {/* Main content area */}
        <div className="flex-1 bg-gray-50 -mt-16 rounded-t-3xl w-full">
          {/* Transaction Card */}
          <div className="px-4">
            <div className="bg-white rounded-2xl shadow-lg p-4 mb-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-bold text-lg">Transaction Overview</h2>
                <Button variant="ghost" size="sm" className="text-purple-500 flex items-center gap-1">
                  <span className="text-sm">See all</span>
                  <ArrowUpRight size={16} />
                </Button>
              </div>

              <div className="grid grid-cols-3 gap-2 mb-4">
                <div className="bg-purple-50 rounded-xl p-3 text-center">
                  <div className="bg-purple-100 w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-1">
                    <TrendingUp size={16} className="text-purple-500" />
                  </div>
                  <p className="text-xs text-gray-600">Income</p>
                  <p className="font-bold text-sm">$1,240</p>
                </div>
                <div className="bg-red-50 rounded-xl p-3 text-center">
                  <div className="bg-red-100 w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-1">
                    <ArrowDownLeft size={16} className="text-red-500" />
                  </div>
                  <p className="text-xs text-gray-600">Expense</p>
                  <p className="font-bold text-sm">$789.50</p>
                </div>
                <div className="bg-blue-50 rounded-xl p-3 text-center">
                  <div className="bg-blue-100 w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-1">
                    <Repeat size={16} className="text-blue-500" />
                  </div>
                  <p className="text-xs text-gray-600">Transfers</p>
                  <p className="font-bold text-sm">$350</p>
                </div>
              </div>

              <div className="space-y-3">
                <p className="font-medium text-sm">Recent Transactions</p>
                {recentTransactions.map((transaction, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2 border-b border-gray-100 last:border-0">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
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
                    <p className={`font-medium ${
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

          {/* Quick actions */}
          <div className="px-4 mb-6">
            <div className="grid grid-cols-4 bg-white rounded-2xl shadow-md p-4">
              {quickActions.map((action, index) => (
                <div key={index} className="flex flex-col items-center justify-center hover:bg-gray-50 p-2 rounded-lg cursor-pointer">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mb-2 text-purple-500">{action.icon}</div>
                  <span className="text-xs font-medium">{action.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Payment list */}
          <div className="px-4 mb-6">
            <h2 className="font-bold text-lg mb-4">Payment List</h2>
            
            <div className="grid grid-cols-4 gap-4">
              {paymentOptions.map((option, index) => (
                <div key={index} className="flex flex-col items-center hover:scale-105 transition-transform cursor-pointer">
                  <div className={`w-12 h-12 ${option.color} rounded-xl flex items-center justify-center mb-2 text-white shadow-sm`}>
                    {option.icon}
                  </div>
                  <span className="text-xs">{option.label}</span>
                </div>
              ))}
            </div>
          </div>



          {/* Bottom navigation only for mobile */}
          {isMobile && <BottomNavigation />}
        </div>
      </div>
    </div>
  );
};

export default HomeComponent;
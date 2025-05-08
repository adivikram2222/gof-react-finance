import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Wallet,
  Send,
  MessageSquare,
  Wifi,
  Zap,
  Ticket,
  Shield,
  CreditCard,
  Receipt,
  ShoppingCart,
  Grid3X3,
  TrendingUp,
  ArrowUpRight,
  ArrowDownLeft,
  Repeat,
  ChevronRight,
  BadgeIndianRupee,
  BanknoteIcon,
  Bell,
  Menu
} from 'lucide-react';
// Import BottomNavigation component
import BottomNavigation from '../components/BottomNavigation';

const HomeComponent = () => {
  const navigate = useNavigate();
  
  // User data with Indian name
  const [user] = useState({ 
    name: 'Arjun Kumar', 
    avatar: "https://plus.unsplash.com/premium_photo-1671656349322-41de944d259b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bWFufGVufDB8fDB8fHww",
    email: "arjun.kumar@gmail.com",
    phone: "+91 9876543210",
    location: "Mumbai, Maharashtra",
    joinDate: "March 2023",
    notifications: 3
  });
  
  // Account balances
  const balances = [
    { type: "Earnings", amount: "₹56,785.42", color: "bg-green-500", textColor: "text-green-500", bgColor: "bg-green-100", icon: <BadgeIndianRupee size={20} /> },
    { type: "Topup balance", amount: "₹24,450.54", color: "bg-purple-500", textColor: "text-purple-500", bgColor: "bg-purple-100", icon: <BanknoteIcon size={20} /> },
    { type: "Credit", amount: "₹75,200.00", color: "bg-blue-500", textColor: "text-blue-500", bgColor: "bg-blue-100", icon: <CreditCard size={20} /> }
  ];

  // Modified quick actions with utilities and withdrawal
  const quickActions = [
    { icon: <Wallet size={20} />, label: "Top Up", href: "/deposit", color: "text-purple-500", bg: "bg-purple-100" },
    { icon: <Send size={20} />, label: "Send", href: "#", color: "text-blue-500", bg: "bg-blue-100" },
    { icon: <BanknoteIcon size={20} />, label: "Withdraw", href: "/withdraw", color: "text-red-500", bg: "bg-red-100" },
    { icon: <Zap size={20} />, label: "Utilities", href: "#", color: "text-yellow-500", bg: "bg-yellow-100" },
  ];

  const paymentOptions = [
    { icon: <Wifi size={18} />, label: "Internet", color: "bg-indigo-400" },
    { icon: <Zap size={18} />, label: "Electricity", color: "bg-blue-400" },
    { icon: <MessageSquare size={18} />, label: "Mobile", color: "bg-green-400" },
    { icon: <Ticket size={18} />, label: "Voucher", color: "bg-violet-400" },
    { icon: <Shield size={18} />, label: "Insurance", color: "bg-cyan-400" },
    { icon: <Receipt size={18} />, label: "Tax", color: "bg-amber-400" },
    { icon: <CreditCard size={18} />, label: "Cards", color: "bg-pink-400" },
    { icon: <Grid3X3 size={18} />, label: "More", color: "bg-gray-400" },
  ];

  // Recent transactions data with Indian context
  const recentTransactions = [
    { type: "income", title: "Salary Credited", amount: "+₹45,000.00", date: "Today, 14:30", icon: <ArrowUpRight size={16} className="text-green-500" /> },
    { type: "expense", title: "BigBasket Order", amount: "-₹2,450.80", date: "Yesterday, 09:15", icon: <ArrowDownLeft size={16} className="text-red-500" /> },
    { type: "transfer", title: "HDFC Card Bill", amount: "-₹12,250.00", date: "May 05, 2025", icon: <Repeat size={16} className="text-blue-500" /> },
    { type: "income", title: "Freelance Payment", amount: "+₹24,500.00", date: "May 03, 2025", icon: <ArrowUpRight size={16} className="text-green-500" /> },
    { type: "expense", title: "Swiggy Order", amount: "-₹867.25", date: "May 02, 2025", icon: <ArrowDownLeft size={16} className="text-red-500" /> },
    { type: "expense", title: "Jio Recharge", amount: "-₹999.00", date: "May 01, 2025", icon: <ArrowDownLeft size={16} className="text-red-500" /> },
  ];

  // Animation utility functions
  const animateElement = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.classList.add('scale-animation');
      setTimeout(() => {
        element.classList.remove('scale-animation');
      }, 300);
    }
  };

  return (
    <div className="w-full pb-20">
      {/* Header with avatar, menu icon and balances */}
      <div className="bg-gradient-to-r from-purple-700 via-purple-600 to-indigo-700 p-4 pt-6 pb-28 relative overflow-hidden">
        {/* Background patterns with reduced opacity */}
        <div className="absolute top-0 right-0 opacity-5">
          <svg width="250" height="250" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="100" cy="100" r="80" stroke="white" strokeWidth="8"/>
            <circle cx="100" cy="100" r="40" stroke="white" strokeWidth="8"/>
          </svg>
        </div>
        <div className="absolute -bottom-10 -left-10 opacity-5">
          <svg width="150" height="150" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M50 0 L100 50 L50 100 L0 50 Z" stroke="white" strokeWidth="8" />
          </svg>
        </div>
        
        {/* Profile avatar, name and notification icons */}
        <div className="flex justify-between items-center mb-5 relative z-10">
          <div 
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => {
              animateElement('profile-avatar');
              navigate('/profile');
            }}
          >
            <div className="relative">
              <div 
                id="profile-avatar"
                className="w-11 h-11 rounded-full overflow-hidden border-2 border-white/30 group-hover:border-white/60 transition-all duration-300"
                style={{
                  background: 'rgba(255, 255, 255, 0.15)',
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)'
                }}
              >
                <img
                  src={user.avatar}
                  alt="Avatar"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
            </div>
            <div className="text-white">
              <p className="font-medium text-white/80 text-sm">Namaste,</p>
              <p className="font-bold group-hover:text-white transition-colors duration-300">{user.name}</p>
            </div>
          </div>
          
          {/* <div className="flex gap-3">
            <button 
              className="relative text-white p-2 rounded-full hover:bg-white/15 transition-all duration-300 group"
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)'
              }}
              id="notification-btn"
              onClick={() => animateElement('notification-btn')}
            >
              <Bell size={20} className="group-hover:scale-110 transition-transform duration-300" />
              {user.notifications > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {user.notifications}
                </span>
              )}
            </button>
            <button 
              className="text-white p-2 rounded-full hover:bg-white/15 transition-all duration-300 group"
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)'
              }}
              id="menu-btn"
              onClick={() => animateElement('menu-btn')}
            >
              <Menu size={20} className="group-hover:scale-110 transition-transform duration-300" />
            </button>
          </div> */}
        </div>
        
        {/* Total Earnings Section */}
        <div className="mt-6 mb-2 relative z-10">
          <p className="text-white/80 text-sm font-medium">Total Earnings</p>
          <h2 className="text-white text-3xl font-bold">₹1,25,500.42</h2>
          <p className="text-green-300 text-sm mt-1 flex items-center">
            <ArrowUpRight size={16} className="mr-1" />
            +₹12,450 this month
          </p>
        </div>
      </div>

      {/* Balance cards - with subtle glassmorphism effect */}
<div className="px-4 -mt-20 mb-8 relative z-20">
  <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
    {balances.map((balance, idx) => (
      <div 
        key={idx} 
        className="bg-white/30 backdrop-blur-sm border border-white/20 rounded-2xl shadow-sm min-w-[160px] flex-1 p-4 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
        style={{
          backdropFilter: 'blur(6px)',
          WebkitBackdropFilter: 'blur(6px)',
        }}
        onClick={() => animateElement(`balance-${idx}`)}
      >
        <div className={`${balance.bgColor} w-12 h-12 rounded-full flex items-center justify-center mb-3 shadow ${balance.textColor}`}>
          {balance.icon}
        </div>
        <p className="text-gray-700 font-medium">{balance.type}</p>
        <p id={`balance-${idx}`} className="text-xl font-bold mt-1 text-gray-900 transition-transform">
          {balance.amount}
        </p>
      </div>
    ))}
  </div>
</div>


      {/* Main content area */}
      <div className="flex-1 px-4 space-y-6">
        {/* Quick actions */}
        <div className="bg-white rounded-2xl shadow-sm p-5 hover:shadow-md transition-all duration-300">
          <SectionHeader title="Quick Actions" />
          <div className="grid grid-cols-4 gap-3">
            {quickActions.map((action, index) => (
              <div 
                key={index} 
                className="flex flex-col items-center justify-center hover:bg-gray-50 p-2 rounded-xl cursor-pointer transition-all duration-300 hover:shadow-md transform hover:-translate-y-1"
                onClick={() => {
                  animateElement(`action-${index}`);
                  if (action.href) navigate(action.href);
                }}
              >
                <div id={`action-${index}`} className={`w-14 h-14 ${action.bg} rounded-2xl flex items-center justify-center mb-2 ${action.color} shadow-sm transition-transform`}>
                  {action.icon}
                </div>
                <span className="text-xs font-medium">{action.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Transaction Card */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition-all duration-300">
          <div className="p-5">
            <SectionHeader 
              title="Transaction Overview" 
              actionText="See all" 
              onClick={() => navigate('/transaction')} 
            />

            <div className="grid grid-cols-3 gap-3 mb-5">
              <div className="bg-gradient-to-br from-purple-50 to-purple-100/60 rounded-xl p-4 relative overflow-hidden hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
                <div className="absolute -right-2 -top-2 bg-purple-500/10 w-12 h-12 rounded-full"></div>
                <div className="bg-white w-12 h-12 rounded-full flex items-center justify-center mb-2 shadow-sm">
                  <TrendingUp size={20} className="text-purple-500" />
                </div>
                <p className="text-xs text-gray-500">Income</p>
                <p className="font-bold text-base mt-1">₹69,500</p>
              </div>
              <div className="bg-gradient-to-br from-red-50 to-red-100/60 rounded-xl p-4 relative overflow-hidden hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
                <div className="absolute -right-2 -top-2 bg-red-500/10 w-12 h-12 rounded-full"></div>
                <div className="bg-white w-12 h-12 rounded-full flex items-center justify-center mb-2 shadow-sm">
                  <ArrowDownLeft size={20} className="text-red-500" />
                </div>
                <p className="text-xs text-gray-500">Expense</p>
                <p className="font-bold text-base mt-1">₹16,567</p>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-blue-100/60 rounded-xl p-4 relative overflow-hidden hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
                <div className="absolute -right-2 -top-2 bg-blue-500/10 w-12 h-12 rounded-full"></div>
                <div className="bg-white w-12 h-12 rounded-full flex items-center justify-center mb-2 shadow-sm">
                  <Repeat size={20} className="text-blue-500" />
                </div>
                <p className="text-xs text-gray-500">Transfers</p>
                <p className="font-bold text-base mt-1">₹12,250</p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-100">
            <div className="p-5">
              <SectionHeader 
                title="Recent Transactions" 
                actionText="View all" 
                onClick={() => navigate('/transaction')} 
              />
              <div className="space-y-4">
                {recentTransactions.slice(0, 3).map((transaction, idx) => (
                  <div 
                    key={idx} 
                    className="flex items-center justify-between hover:bg-gray-50 p-3 rounded-xl transition-all duration-300 hover:shadow-sm transform hover:scale-102"
                    onClick={() => animateElement(`transaction-${idx}`)}
                  >
                    <div className="flex items-center gap-3">
                      <div id={`transaction-${idx}`} className={`w-12 h-12 rounded-full flex items-center justify-center transition-transform ${
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
        <div className="bg-white rounded-2xl shadow-sm p-5 mb-6 hover:shadow-md transition-all duration-300">
          <SectionHeader title="Bill Payments" actionText="More" />
          <div className="grid grid-cols-4 gap-4">
            {paymentOptions.slice(0, 8).map((option, index) => (
              <div 
                key={index} 
                className="flex flex-col items-center cursor-pointer group"
                onClick={() => animateElement(`payment-${index}`)}
              >
                <div id={`payment-${index}`} className={`w-12 h-12 ${option.color} rounded-xl flex items-center justify-center mb-2 text-white shadow-sm group-hover:shadow-lg group-hover:scale-110 transition-all duration-300`}>
                  {option.icon}
                </div>
                <span className="text-xs text-center font-medium">{option.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation />

      {/* CSS for animations */}
      <style jsx>{`
        @keyframes scale {
          0% { transform: scale(1); }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }
        
        .scale-animation {
          animation: scale 0.3s ease-in-out;
        }
        
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        
        .hover\\:scale-102:hover {
          transform: scale(1.02);
        }
        
        .hover\\:scale-110:hover {
          transform: scale(1.1);
        }
        
        .hover\\:-translate-y-1:hover {
          transform: translateY(-0.25rem);
        }
      `}</style>
    </div>
  );
};

// Section Header Component
const SectionHeader = ({ title, actionText, onClick }) => (
  <div className="flex justify-between items-center mb-4">
    <h2 className="font-bold text-lg text-gray-800">{title}</h2>
    {actionText && (
      <button 
        className="text-purple-500 flex items-center gap-1 text-sm font-medium hover:text-purple-600 transition-colors duration-300" 
        onClick={onClick}
      >
        <span>{actionText}</span>
        <ChevronRight size={16} />
      </button>
    )}
  </div>
);

export default HomeComponent;
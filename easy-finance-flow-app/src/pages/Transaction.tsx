import React, { useState } from 'react';
import Homes from "./Home";
import { 
  Home, 
  ShoppingBag, 
  Plus, 
  User,
  Search,
  ArrowDownCircle,
  ArrowUpCircle,
  Calendar,
  Filter,
  Download,
  Wallet,
  Clock,
  ChevronRight,
  Banknote,
  LogOut,
  PieChart,
  CreditCard,
  Bell,
  Menu,
  X,
  BanknoteIcon,
  ReceiptText,
  ArrowDownToLine
} from 'lucide-react';
import _ from 'lodash';

const Transaction = () => {
  const isMobile = true; // For demo purposes
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [activePage, setActivePage] = useState('transactions');
  const [showSidebar, setShowSidebar] = useState(false);
  
  // Menu items for navigation
  const menuItems = [
    { icon: <Home size={20} />, label: "Home", path: "/" },
    { icon: <BanknoteIcon size={20} />, label: "Deposit", path: "/deposit" },
    { icon: <ReceiptText size={20} />, label: "Transaction", path: "/transaction" },
    { icon: <ArrowDownToLine size={20} />, label: "Withdraw", path: "/withdraw" },
  ];
  
  // Sample transaction data - expanded version
  const transactions = [
    {
      id: 1,
      type: "payment",
      title: "Netflix Subscription",
      date: "Today, 10:30 AM",
      amount: -15.99,
      icon: "📺",
      category: "Entertainment",
      status: "completed"
    },
    {
      id: 2,
      type: "received",
      title: "John Smith",
      date: "Yesterday, 2:45 PM",
      amount: 50.00,
      icon: "💸",
      category: "Transfer",
      status: "completed"
    },
    {
      id: 3,
      type: "payment",
      title: "Electricity Bill",
      date: "Oct 15, 2023",
      amount: -45.67,
      icon: "⚡",
      category: "Utilities",
      status: "completed"
    },
    {
      id: 4,
      type: "transfer",
      title: "Savings Account",
      date: "Oct 12, 2023",
      amount: -200.00,
      icon: "🏦",
      category: "Savings",
      status: "pending"
    },
    {
      id: 5,
      type: "received",
      title: "Salary",
      date: "Oct 1, 2023",
      amount: 2500.00,
      icon: "💼",
      category: "Income",
      status: "completed"
    },
    {
      id: 6,
      type: "payment",
      title: "Grocery Store",
      date: "Today, 3:15 PM",
      amount: -85.43,
      icon: "🛒",
      category: "Shopping",
      status: "completed"
    },
    {
      id: 7,
      type: "payment",
      title: "Uber Ride",
      date: "Yesterday, 8:30 PM",
      amount: -12.50,
      icon: "🚗",
      category: "Transport",
      status: "completed"
    },
    {
      id: 8,
      type: "received",
      title: "Freelance Work",
      date: "Oct 10, 2023",
      amount: 350.00,
      icon: "💻",
      category: "Income",
      status: "completed"
    },
    {
      id: 9,
      type: "payment",
      title: "Phone Bill",
      date: "Oct 5, 2023",
      amount: -60.00,
      icon: "📱",
      category: "Utilities",
      status: "completed"
    },
    {
      id: 10,
      type: "transfer",
      title: "Investment Account",
      date: "Oct 3, 2023",
      amount: -500.00,
      icon: "📈",
      category: "Investment",
      status: "completed"
    }
  ];

  // Filter transactions
  const filteredTransactions = transactions.filter(tx => {
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      if (!tx.title.toLowerCase().includes(query) && 
          !tx.category.toLowerCase().includes(query)) {
        return false;
      }
    }
    
    // Apply type filter
    if (filter === 'income' && tx.amount <= 0) return false;
    if (filter === 'expense' && tx.amount > 0) return false;
    if (filter === 'pending' && tx.status !== 'pending') return false;
    
    return true;
  });

  // Group transactions by date
  const groupedTransactions = _.groupBy(filteredTransactions, transaction => {
    return transaction.date.includes('Today') ? 'Today' : 
           transaction.date.includes('Yesterday') ? 'Yesterday' : 
           transaction.date.split(',')[0];
  });

  // Calculate total income and expenses
  const totals = transactions.reduce((acc, tx) => {
    if (tx.amount > 0) {
      acc.income += tx.amount;
    } else {
      acc.expenses += Math.abs(tx.amount);
    }
    return acc;
  }, { income: 0, expenses: 0 });

  // Button component
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

  // Bottom navigation with working functionality
  const BottomNavigation = () => {
    const tabs = [
      { id: 'home', icon: <Home size={24} />, label: 'Home' },
      { id: 'transactions', icon: <ShoppingBag size={24} />, label: 'Transactions' },
      { id: 'add', icon: <Plus size={24} />, label: 'Add' },
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

  // Transaction Tab Content
  const TransactionsContent = () => (
    <div className="flex-1 flex flex-col h-full">
      {/* Transaction filters */}
      <div className="bg-white p-3 flex justify-between items-center">
        <div className="flex space-x-2 overflow-x-auto">
          <Button 
            variant={filter === 'all' ? "outline" : "ghost"} 
            className={`rounded-full text-sm whitespace-nowrap ${filter === 'all' ? 'border-purple-600 text-purple-700' : ''}`}
            onClick={() => setFilter('all')}
          >
            All
          </Button>
          <Button 
            variant={filter === 'income' ? "outline" : "ghost"} 
            className={`rounded-full text-sm whitespace-nowrap ${filter === 'income' ? 'border-purple-600 text-purple-700' : ''}`}
            onClick={() => setFilter('income')}
          >
            <ArrowDownCircle size={14} className="mr-1 text-green-500" />
            Income
          </Button>
          <Button 
            variant={filter === 'expense' ? "outline" : "ghost"} 
            className={`rounded-full text-sm whitespace-nowrap ${filter === 'expense' ? 'border-purple-600 text-purple-700' : ''}`}
            onClick={() => setFilter('expense')}
          >
            <ArrowUpCircle size={14} className="mr-1 text-red-500" />
            Expense
          </Button>
          <Button 
            variant={filter === 'pending' ? "outline" : "ghost"} 
            className={`rounded-full text-sm whitespace-nowrap ${filter === 'pending' ? 'border-purple-600 text-purple-700' : ''}`}
            onClick={() => setFilter('pending')}
          >
            <Clock size={14} className="mr-1 text-orange-500" />
            Pending
          </Button>
        </div>
        
        <div className="flex space-x-1">
          <Button variant="ghost" size="icon" className="rounded-full text-gray-500">
            <Calendar size={18} />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full text-gray-500">
            <Filter size={18} />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full text-gray-500">
            <Download size={18} />
          </Button>
        </div>
      </div>

      {/* Transaction Analysis Card */}
      <div className="bg-white px-4 py-3 border-b border-gray-100">
        <div className="bg-gradient-to-r from-purple-50 to-purple-100/60 rounded-xl p-3 relative overflow-hidden shadow-sm">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-medium text-sm text-gray-700">Spending Analysis</h3>
            <Button variant="ghost" className="text-purple-600 p-0 h-auto text-xs">View Details</Button>
          </div>
          
          <div className="flex justify-between text-xs text-gray-600 mb-1">
            <span>Entertainment</span>
            <span>$15.99</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-1.5 mb-2">
            <div className="bg-purple-500 h-1.5 rounded-full" style={{ width: '10%' }}></div>
          </div>
          
          <div className="flex justify-between text-xs text-gray-600 mb-1">
            <span>Utilities</span>
            <span>$105.67</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-1.5 mb-2">
            <div className="bg-purple-500 h-1.5 rounded-full" style={{ width: '35%' }}></div>
          </div>
          
          <div className="flex justify-between text-xs text-gray-600 mb-1">
            <span>Shopping</span>
            <span>$85.43</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-1.5">
            <div className="bg-purple-500 h-1.5 rounded-full" style={{ width: '25%' }}></div>
          </div>
        </div>
      </div>

      {/* Transaction list */}
      <div className="flex-1 bg-gray-50 px-4 py-2 overflow-y-auto pb-24">
        {Object.keys(groupedTransactions).length > 0 ? (
          Object.entries(groupedTransactions).map(([date, txs]) => (
            <div key={date} className="mb-4">
              <h2 className="text-gray-500 text-sm mb-2 sticky top-0 bg-gray-50 py-1">{date}</h2>
              
              <div className="space-y-3">
                {txs.map(transaction => (
                  <div key={transaction.id} className="bg-white hover:shadow-md transition-shadow cursor-pointer border-l-4 border-l-transparent hover:border-l-purple-500 rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="mr-3 text-2xl">{transaction.icon}</div>
                        <div>
                          <p className="font-medium">{transaction.title}</p>
                          <div className="flex items-center">
                            <p className="text-xs text-gray-500 mr-2">{transaction.date}</p>
                            <span className="text-xs px-1.5 py-0.5 bg-gray-100 rounded text-gray-600">{transaction.category}</span>
                            {transaction.status === 'pending' && (
                              <span className="ml-1 text-xs px-1.5 py-0.5 bg-orange-100 rounded text-orange-600">Pending</span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <div className={transaction.amount > 0 ? "text-green-500 font-medium text-right" : "text-red-500 font-medium text-right"}>
                          {transaction.amount > 0 ? `+$${transaction.amount.toFixed(2)}` : `-$${Math.abs(transaction.amount).toFixed(2)}`}
                          <p className="text-xs text-gray-400 font-normal">
                            {transaction.type === 'payment' ? 'Payment' : 
                            transaction.type === 'transfer' ? 'Transfer' : 'Received'}
                          </p>
                        </div>
                        <ChevronRight size={16} className="text-gray-400 ml-2" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-10">
            <Wallet size={48} className="mx-auto text-gray-300 mb-3" />
            <p className="text-gray-500">No transactions found</p>
            <p className="text-gray-400 text-sm">Try changing your filters</p>
          </div>
        )}
      </div>
    </div>
  );

  // Deposit Tab Content
  const DepositContent = () => (
    <div className="bg-gray-50 px-4 py-6 flex flex-col items-center justify-center h-full">
      <div className="bg-white rounded-xl p-6 shadow-md w-full max-w-md">
        <h2 className="text-xl font-bold text-center mb-6">Deposit Funds</h2>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500">$</span>
            </div>
            <input className="w-full py-2 pl-8 pr-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" placeholder="0.00" type="number" />
          </div>
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Select Method</label>
          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" className="flex flex-col items-center justify-center h-24 border-2 border-purple-100 hover:border-purple-500">
              <CreditCard className="h-8 w-8 mb-2 text-purple-600" />
              <span className="text-sm">Credit Card</span>
            </Button>
            <Button variant="outline" className="flex flex-col items-center justify-center h-24 border-2 border-purple-100 hover:border-purple-500">
              <Wallet className="h-8 w-8 mb-2 text-purple-600" />
              <span className="text-sm">Bank Transfer</span>
            </Button>
          </div>
        </div>
        
        <Button className="w-full">
          Continue
        </Button>
      </div>
    </div>
  );

  // Withdraw Tab Content
  const WithdrawContent = () => (
    <div className="bg-gray-50 px-4 py-6 flex flex-col items-center justify-center h-full">
      <div className="bg-white rounded-xl p-6 shadow-md w-full max-w-md">
        <h2 className="text-xl font-bold text-center mb-6">Withdraw Funds</h2>
        
        <div className="mb-4">
          <div className="bg-gray-50 p-3 rounded-lg mb-4">
            <p className="text-sm text-gray-500">Available Balance</p>
            <p className="text-2xl font-bold">${(totals.income - totals.expenses).toFixed(2)}</p>
          </div>
          
          <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500">$</span>
            </div>
            <input className="w-full py-2 pl-8 pr-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" placeholder="0.00" type="number" />
          </div>
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Withdraw To</label>
          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" className="flex flex-col items-center justify-center h-24 border-2 border-purple-100 hover:border-purple-500">
              <Wallet className="h-8 w-8 mb-2 text-purple-600" />
              <span className="text-sm">Bank Account</span>
            </Button>
            <Button variant="outline" className="flex flex-col items-center justify-center h-24 border-2 border-purple-100 hover:border-purple-500">
              <LogOut className="h-8 w-8 mb-2 text-purple-600" />
              <span className="text-sm">Other Wallet</span>
            </Button>
          </div>
        </div>
        
        <Button className="w-full">
          Withdraw Now
        </Button>
      </div>
    </div>
  );

  // Analytics Tab Content
  const AnalyticsContent = () => (
    <div className="flex flex-col items-center justify-center h-64 text-center">
      <div className="bg-blue-100 p-4 rounded-full mb-4">
        <PieChart size={32} className="text-blue-500" />
      </div>
      <h2 className="text-xl font-bold mb-2">Analytics</h2>
      <p className="text-gray-500">This feature is coming soon</p>
    </div>
  );

  // Profile Tab Content
  const ProfileContent = () => (
    <div className="flex flex-col items-center justify-center h-64 text-center">
      <div className="bg-green-100 p-4 rounded-full mb-4">
        <User size={32} className="text-green-500" />
      </div>
      <h2 className="text-xl font-bold mb-2">User Profile</h2>
      <p className="text-gray-500">This feature is coming soon</p>
    </div>
  );

  // Home Tab Content
  const HomeContent = () => (
    <div className="flex flex-col items-center justify-center h-64 text-center">
      <div className="bg-purple-100 p-4 rounded-full mb-4">
        <Home size={32} className="text-purple-500" />
      </div>
      <h2 className="text-xl font-bold mb-2">Home</h2>
      <p className="text-gray-500">Go back to Home Page</p>
    </div>
  );

  // Content to render based on active page
  const renderContent = () => {
    switch (activePage) {
      case 'home':
        return <Homes />;
      case 'transactions':
        return <TransactionsContent />;
      case 'add':
        return (
          <div className="flex flex-col items-center justify-center h-64 text-center">
            <div className="bg-purple-100 p-4 rounded-full mb-4">
              <Plus size={32} className="text-purple-500" />
            </div>
            <h2 className="text-xl font-bold mb-2">Add Transaction</h2>
            <p className="text-gray-500">Choose transaction type below</p>
            <div className="mt-4 flex gap-4">
              <Button variant="outline" className="flex items-center gap-2">
                <ArrowDownCircle size={16} className="text-green-500" />
                <span>Income</span>
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                <ArrowUpCircle size={16} className="text-red-500" />
                <span>Expense</span>
              </Button>
            </div>
          </div>
        );
      case 'analytics':
        return <AnalyticsContent />;
      case 'profile':
        return <ProfileContent />;
      default:
        return <TransactionsContent />;
    }
  };

  return (
    <div className={`${isMobile ? 'w-full' : 'flex-1 max-w-5xl mx-auto'} pb-24 bg-gray-50`}>
      <div className="flex-1 flex flex-col w-full">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-purple-500 p-4">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-3">
              <h1 className="text-xl font-bold text-white">Finances</h1>
            </div>
            <div className="flex gap-2">
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-white bg-white/10 backdrop-blur-md"
                onClick={() => setShowSearch(!showSearch)}
              >
                <Search size={20} />
              </Button>
              <Button variant="ghost" size="icon" className="text-white bg-white/10 backdrop-blur-md">
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
          
          {showSearch && (
            <div className="bg-white/20 rounded-lg p-2 mb-3">
              <input
                placeholder="Search transactions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full border-0 bg-transparent text-white placeholder:text-white/60 focus:outline-none"
              />
            </div>
          )}
          
          {/* Summary Cards */}
          <div className="flex space-x-3 overflow-x-auto pb-2">
            <div className="min-w-[150px] bg-white/20 rounded-lg p-3 hover:bg-white/30 transition-all cursor-pointer">
              <div className="flex items-center mb-1">
                <ArrowDownCircle size={16} className="text-green-300 mr-1" />
                <p className="text-xs text-white/80">Income</p>
              </div>
              <p className="text-white font-bold">${totals.income.toFixed(2)}</p>
            </div>
            
            <div className="min-w-[150px] bg-white/20 rounded-lg p-3 hover:bg-white/30 transition-all cursor-pointer">
              <div className="flex items-center mb-1">
                <ArrowUpCircle size={16} className="text-red-300 mr-1" />
                <p className="text-xs text-white/80">Expenses</p>
              </div>
              <p className="text-white font-bold">${totals.expenses.toFixed(2)}</p>
            </div>
            
            <div className="min-w-[150px] bg-white/20 rounded-lg p-3 hover:bg-white/30 transition-all cursor-pointer">
              <div className="flex items-center mb-1">
                <Wallet size={16} className="text-blue-300 mr-1" />
                <p className="text-xs text-white/80">Balance</p>
              </div>
              <p className="text-white font-bold">${(totals.income - totals.expenses).toFixed(2)}</p>
            </div>
          </div>
        </div>

        {/* Main content area - dynamic based on selected page */}
        <div className="flex-1">
          {renderContent()}
        </div>

        {/* Floating Action Button */}
        <div className="fixed right-4 bottom-20 z-10">
          <Button className="rounded-full w-12 h-12 shadow-lg">
            <Plus size={24} />
          </Button>
        </div>

        {/* Bottom navigation */}
        {isMobile && <BottomNavigation />}
        
        {/* Side drawer (menu) */}
        <SideDrawer />
      </div>
    </div>
  );
};

export default Transaction;

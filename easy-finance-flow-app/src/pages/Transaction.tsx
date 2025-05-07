import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useIsMobile } from '../hooks/use-mobile';
import { 
  Home, 
  ShoppingBag, 
  Plus, 
  PieChart, 
  User,
  Search,
  ArrowDownCircle,
  ArrowUpCircle,
  Calendar,
  Filter,
  Download,
  Wallet,
  CreditCard,
  DollarSign,
  Clock,
  ChevronRight
} from 'lucide-react';
import { Input } from '@/components/ui/input';

const Transaction = () => {
  const isMobile = useIsMobile();
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  
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
  const groupedTransactions = filteredTransactions.reduce((groups, transaction) => {
    const date = transaction.date.includes('Today') ? 'Today' : 
                 transaction.date.includes('Yesterday') ? 'Yesterday' : 
                 transaction.date.split(',')[0];
    
    if (!groups[date]) {
      groups[date] = [];
    }
    
    groups[date].push(transaction);
    return groups;
  }, {});

  // Calculate total income and expenses
  const totals = transactions.reduce((acc, tx) => {
    if (tx.amount > 0) {
      acc.income += tx.amount;
    } else {
      acc.expenses += Math.abs(tx.amount);
    }
    return acc;
  }, { income: 0, expenses: 0 });

  const BottomNavigation = () => (
    <div className="fixed bottom-0 left-0 right-0 flex justify-around items-center py-3 bg-gradient-to-r from-indigo-900 to-purple-800 border-t text-white">
      <Button variant="ghost" className="text-white">
        <Home size={24} />
      </Button>
      <Button variant="ghost" className="text-white">
        <ShoppingBag size={24} />
      </Button>
      <Button variant="outline" className="rounded-full bg-purple-400 text-white border-white">
        <Plus size={24} />
      </Button>
      <Button variant="ghost" className="text-white">
        <PieChart size={24} />
      </Button>
      <Button variant="ghost" className="text-white">
        <User size={24} />
      </Button>
    </div>
  );

  return (
    <div className={`${isMobile ? 'mobile-container' : 'flex-1 max-w-5xl mx-auto pb-10'}`}>
      <div className="flex-1 flex flex-col h-full">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-900 to-purple-800 p-4">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-xl font-bold text-white">Transactions</h1>
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-white"
              onClick={() => setShowSearch(!showSearch)}
            >
              <Search size={20} />
            </Button>
          </div>
          
          {showSearch && (
            <div className="bg-white bg-opacity-20 rounded-lg p-2 mb-3">
              <Input
                placeholder="Search transactions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="border-0 bg-transparent text-white placeholder:text-white placeholder:text-opacity-60 focus:ring-0"
              />
            </div>
          )}
          
          {/* Summary Cards */}
          <div className="flex space-x-3 overflow-x-auto pb-2">
            <Card className="min-w-[150px] bg-white bg-opacity-20 border-0 hover:bg-opacity-30 transition-all cursor-pointer">
              <CardContent className="p-3">
                <div className="flex items-center mb-1">
                  <ArrowDownCircle size={16} className="text-green-300 mr-1" />
                  <p className="text-xs text-white text-opacity-80">Income</p>
                </div>
                <p className="text-white font-bold">${totals.income.toFixed(2)}</p>
              </CardContent>
            </Card>
            
            <Card className="min-w-[150px] bg-white bg-opacity-20 border-0 hover:bg-opacity-30 transition-all cursor-pointer">
              <CardContent className="p-3">
                <div className="flex items-center mb-1">
                  <ArrowUpCircle size={16} className="text-red-300 mr-1" />
                  <p className="text-xs text-white text-opacity-80">Expenses</p>
                </div>
                <p className="text-white font-bold">${totals.expenses.toFixed(2)}</p>
              </CardContent>
            </Card>
            
            <Card className="min-w-[150px] bg-white bg-opacity-20 border-0 hover:bg-opacity-30 transition-all cursor-pointer">
              <CardContent className="p-3">
                <div className="flex items-center mb-1">
                  <Wallet size={16} className="text-blue-300 mr-1" />
                  <p className="text-xs text-white text-opacity-80">Balance</p>
                </div>
                <p className="text-white font-bold">${(totals.income - totals.expenses).toFixed(2)}</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Transaction filters */}
        <div className="bg-white p-3 flex justify-between items-center">
          <div className="flex space-x-2 overflow-x-auto">
            <Button 
              variant={filter === 'all' ? "outline" : "ghost"} 
              className={`rounded-full text-sm whitespace-nowrap ${filter === 'all' ? 'border-indigo-600 text-indigo-700' : ''}`}
              onClick={() => setFilter('all')}
            >
              All
            </Button>
            <Button 
              variant={filter === 'income' ? "outline" : "ghost"} 
              className={`rounded-full text-sm whitespace-nowrap ${filter === 'income' ? 'border-indigo-600 text-indigo-700' : ''}`}
              onClick={() => setFilter('income')}
            >
              <ArrowDownCircle size={14} className="mr-1 text-green-500" />
              Income
            </Button>
            <Button 
              variant={filter === 'expense' ? "outline" : "ghost"} 
              className={`rounded-full text-sm whitespace-nowrap ${filter === 'expense' ? 'border-indigo-600 text-indigo-700' : ''}`}
              onClick={() => setFilter('expense')}
            >
              <ArrowUpCircle size={14} className="mr-1 text-red-500" />
              Expense
            </Button>
            <Button 
              variant={filter === 'pending' ? "outline" : "ghost"} 
              className={`rounded-full text-sm whitespace-nowrap ${filter === 'pending' ? 'border-indigo-600 text-indigo-700' : ''}`}
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
          <Card className="bg-gradient-to-r from-indigo-50 to-purple-50 border-0">
            <CardContent className="p-3">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-medium text-sm text-gray-700">Spending Analysis</h3>
                <Button variant="link" className="text-indigo-600 p-0 h-auto text-xs">View Details</Button>
              </div>
              
              <div className="flex justify-between text-xs text-gray-600 mb-1">
                <span>Entertainment</span>
                <span>$15.99</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1.5 mb-2">
                <div className="bg-indigo-500 h-1.5 rounded-full" style={{ width: '10%' }}></div>
              </div>
              
              <div className="flex justify-between text-xs text-gray-600 mb-1">
                <span>Utilities</span>
                <span>$105.67</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1.5 mb-2">
                <div className="bg-indigo-500 h-1.5 rounded-full" style={{ width: '35%' }}></div>
              </div>
              
              <div className="flex justify-between text-xs text-gray-600 mb-1">
                <span>Shopping</span>
                <span>$85.43</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1.5">
                <div className="bg-indigo-500 h-1.5 rounded-full" style={{ width: '25%' }}></div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Transaction list */}
        <div className="flex-1 bg-gray-50 px-4 py-2 overflow-y-auto mb-20">
          {Object.keys(groupedTransactions).length > 0 ? (
            Object.entries(groupedTransactions).map(([date, txs]) => (
              <div key={date} className="mb-4">
                <h2 className="text-gray-500 text-sm mb-2 sticky top-0 bg-gray-50 py-1">{date}</h2>
                
                <div className="space-y-3">
                  {txs.map(transaction => (
                    <Card key={transaction.id} className="hover:shadow-md transition-shadow cursor-pointer border-l-4 border-l-transparent hover:border-l-indigo-500">
                      <CardContent className="p-4 flex justify-between items-center">
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
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-10">
              <DollarSign size={48} className="mx-auto text-gray-300 mb-3" />
              <p className="text-gray-500">No transactions found</p>
              <p className="text-gray-400 text-sm">Try changing your filters</p>
            </div>
          )}
        </div>

        {/* Floating Action Button */}
        <div className="fixed right-4 bottom-20 z-10">
          <Button className="rounded-full w-12 h-12 bg-gradient-to-r from-indigo-700 to-purple-600 hover:from-indigo-800 hover:to-purple-700 shadow-lg">
            <Plus size={24} />
          </Button>
        </div>

        {/* Bottom navigation only on mobile */}
        {isMobile && <BottomNavigation />}
      </div>
    </div>
  );
};

export default Transaction;
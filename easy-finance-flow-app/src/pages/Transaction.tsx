import React from 'react';
import BottomNavigation from '../components/BottomNavigation';
import { Wallet, ArrowUpCircle, ArrowDownCircle, BadgeIndianRupee } from 'lucide-react';

const Transaction = () => {
  // Sample data - extremely simple
  const transactions = [
    {
      id: 1,
      title: "Salary Deposit",
      date: "Today, 10:30 AM",
      amount: 45000,
      type: "income",
      category: "Bank Deposit"
    },
    {
      id: 2,
      title: "ATM Withdrawal",
      date: "Yesterday, 2:45 PM",
      amount: -10000,
      type: "expense",
      category: "Withdrawal"
    },
    {
      id: 3,
      title: "Electricity Bill",
      date: "May 05, 2025",
      amount: -2450,
      type: "expense",
      category: "Utilities"
    },
    {
      id: 4,
      title: "Swiggy Order",
      date: "April 25, 2025",
      amount: -450,
      type: "expense",
      category: "Food"
    }
  ];

  // Calculate totals
  const income = transactions.reduce((sum, tx) => tx.amount > 0 ? sum + tx.amount : sum, 0);
  const expenses = transactions.reduce((sum, tx) => tx.amount < 0 ? sum + Math.abs(tx.amount) : sum, 0);
  const balance = income - expenses;

  return (
    <div className="w-full pb-20 bg-gray-50">
      {/* Header */}
      <div className="bg-purple-600 p-4 pt-8 pb-6">
        <h1 className="text-xl font-bold text-white mb-4">Transactions</h1>
        
        {/* Summary Cards */}
        <div className="flex space-x-3 overflow-x-auto pb-2">
          <div className="min-w-[150px] bg-white/15 rounded-xl p-3">
            <div className="flex items-center mb-1">
              <ArrowDownCircle size={16} className="text-green-300 mr-1" />
              <p className="text-xs text-white/80">Income</p>
            </div>
            <p className="text-white font-bold">₹{income.toLocaleString()}</p>
          </div>
          
          <div className="min-w-[150px] bg-white/15 rounded-xl p-3">
            <div className="flex items-center mb-1">
              <ArrowUpCircle size={16} className="text-red-300 mr-1" />
              <p className="text-xs text-white/80">Expenses</p>
            </div>
            <p className="text-white font-bold">₹{expenses.toLocaleString()}</p>
          </div>
          
          <div className="min-w-[150px] bg-white/15 rounded-xl p-3">
            <div className="flex items-center mb-1">
              <BadgeIndianRupee size={16} className="text-blue-300 mr-1" />
              <p className="text-xs text-white/80">Balance</p>
            </div>
            <p className="text-white font-bold">₹{balance.toLocaleString()}</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200 flex justify-around">
        <button className="py-3 px-6 text-purple-600 border-b-2 border-purple-600 font-medium">
          Transactions
        </button>
        <button className="py-3 px-6 text-gray-600 border-b-2 border-transparent font-medium">
          Statistics
        </button>
      </div>

      {/* Search bar - simplified */}
      <div className="bg-white p-4 border-b border-gray-100">
        <div className="relative bg-gray-100 rounded-xl p-3">
          <input
            type="text"
            placeholder="Search transactions..."
            className="w-full bg-transparent border-0 p-0 focus:outline-none"
          />
        </div>
      </div>

      {/* Simple transaction list */}
      <div className="p-4">
        <h2 className="text-gray-500 text-sm font-medium mb-2">Recent Transactions</h2>
        
        <div className="space-y-3">
          {transactions.map((transaction) => (
            <div 
              key={transaction.id} 
              className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm"
            >
              <div className="flex justify-between">
                <div>
                  <p className="font-medium">{transaction.title}</p>
                  <p className="text-xs text-gray-500">{transaction.date}</p>
                  <p className="text-xs text-gray-500">{transaction.category}</p>
                </div>
                <div className={transaction.amount > 0 ? "text-green-600 font-medium text-right" : "text-red-600 font-medium text-right"}>
                  {transaction.amount > 0 ? `+₹${transaction.amount.toLocaleString()}` : `-₹${Math.abs(transaction.amount).toLocaleString()}`}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Floating Action Button - very simple */}
      <div className="fixed right-4 bottom-20 z-10">
        <button className="w-12 h-12 rounded-full bg-purple-600 text-white flex items-center justify-center shadow-lg">
          <BadgeIndianRupee size={22} />
        </button>
      </div>

      {/* Bottom navigation */}
      <BottomNavigation />
    </div>
  );
};

export default Transaction;
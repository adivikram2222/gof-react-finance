import React, { useState, useEffect } from 'react';
import Homes from "./Home";
import Transactions from './Transaction';
import BottomNavigation from '../components/BottomNavigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';
import {
  CreditCard,
  Building,
  Wallet,
  Check,
  Coins,
  ChevronLeft,
  BadgeIndianRupee,
  AlertCircle,
  Clock,
  ArrowUpRight,
  PieChart,
  ArrowDownLeft,
  Repeat,
  User,
  Home,
  ShoppingBag,
  Plus,
  Shield,
  Receipt,
  Info
} from 'lucide-react';

const Withdraw = () => {
  const [amount, setAmount] = useState("");
  const [selectedMethod, setSelectedMethod] = useState("bank-card");
  const [activePage, setActivePage] = useState('withdraw');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  const quickAmounts = [500, 1000, 2500, 5000];
  
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
  
  const handleWithdraw = () => {
    if (!amount || parseFloat(amount) <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }
    
    setIsProcessing(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsProcessing(false);
      setShowSuccess(true);
      toast.success(`Withdrawal of ₹${amount} initiated via ${getMethodName(selectedMethod)}`);
      
      // Reset after showing success
      setTimeout(() => {
        setShowSuccess(false);
        setAmount("");
      }, 3000);
    }, 1500);
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
  
  // Recent transactions data
  const recentWithdrawals = [
    { type: "withdrawal", title: "Bank Withdrawal", amount: "-₹25,000.00", date: "Yesterday, 14:30", icon: <ArrowDownLeft size={16} className="text-red-500" /> },
    { type: "withdrawal", title: "HDFC Card", amount: "-₹10,000.00", date: "Apr 22, 2025", icon: <ArrowDownLeft size={16} className="text-red-500" /> },
    { type: "transfer", title: "To Topup balance", amount: "-₹5,000.00", date: "Apr 15, 2025", icon: <Repeat size={16} className="text-blue-500" /> },
  ];
  
  const withdrawalMethods = [
    {
      id: "bank-card",
      icon: <CreditCard size={22} className="text-blue-600" />,
      title: "Bank Card",
      description: "Instant transfer to your linked card",
      bgColor: "bg-blue-100",
      processingTime: "Instant to 2 hours",
      fee: "₹0 (Free)"
    },
    {
      id: "bank-account",
      icon: <Building size={22} className="text-purple-600" />,
      title: "Bank Account",
      description: "Transfer to your bank account",
      bgColor: "bg-purple-100",
      processingTime: "1-2 business days",
      fee: "₹0 (Free)"
    },
    {
      id: "usdt",
      icon: <Coins size={22} className="text-yellow-600" />,
      title: "USDT",
      description: "Withdraw to USDT wallet",
      bgColor: "bg-yellow-100",
      processingTime: "30-60 minutes",
      fee: "Network fee applies"
    },
    {
      id: "wallet",
      icon: <Wallet size={22} className="text-green-600" />,
      title: "Digital Wallet",
      description: "Send to your digital wallet",
      bgColor: "bg-green-100",
      processingTime: "Instant",
      fee: "₹0 (Free)"
    },
    {
      id: "check",
      icon: <Check size={22} className="text-red-600" />,
      title: "Check",
      description: "Request a physical check",
      bgColor: "bg-red-100",
      processingTime: "7-10 business days",
      fee: "₹100 delivery fee"
    }
  ];
  
  // Get currently selected method details
  const selectedMethodDetails = withdrawalMethods.find(method => method.id === selectedMethod);
  
  // Content to render based on active page
  const renderContent = () => {
    switch (activePage) {
      case 'home':
        return <Homes />;
      case 'transactions':
        return <Transactions />;
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
  
  // WithdrawPage Component
  const WithdrawPage = () => (
    <>
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-700 via-purple-600 to-indigo-700 p-4 pt-10 pb-6 relative overflow-hidden">
        {/* Background patterns with reduced opacity */}
        <div className="absolute top-0 right-0 opacity-5">
          <svg width="250" height="250" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="100" cy="100" r="80" stroke="white" strokeWidth="8"/>
            <circle cx="100" cy="100" r="40" stroke="white" strokeWidth="8"/>
          </svg>
        </div>
        
        
      </div>
      
      {/* Balance card */}
      <div className="px-4 -mt-12 relative z-20 mb-4">
        <Card className="backdrop-blur-md bg-white/90 rounded-2xl shadow-xl overflow-hidden border-0"
          style={{
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)'
          }}>
          <CardContent className="p-5">
            <div className="flex justify-between items-center mb-2">
              <p className="text-sm text-gray-600">Available Balance</p>
              <div className="bg-green-100 text-green-600 text-xs px-2 py-1 rounded-full font-medium flex items-center">
                <BadgeIndianRupee size={12} className="mr-1" />
                <span>Instant Withdraw</span>
              </div>
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">₹1,25,500.42</h2>
            <div className="flex justify-between items-center">
              <div className="bg-purple-50 text-purple-600 px-3 py-1.5 rounded-lg text-xs font-medium">
                24h Limit: ₹50,000
              </div>
              <div className="text-gray-600 flex items-center text-sm">
                <Clock size={14} className="mr-1" />
                <span>Processed in 10 minutes</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Previous withdrawals */}
      <div className="px-4 mb-4">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-bold text-gray-800">Recent Withdrawals</h3>
          <Button variant="link" className="text-purple-600 p-0 h-auto text-sm font-medium">
            View All
          </Button>
        </div>
        
        <div className="space-y-2">
          {recentWithdrawals.map((transaction, idx) => (
            <div 
              key={idx} 
              className="flex items-center justify-between p-3 bg-white rounded-xl hover:bg-gray-50 transition-all duration-300 shadow-sm"
              id={`withdraw-${idx}`}
              onClick={() => animateElement(`withdraw-${idx}`)}
            >
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  transaction.type === 'withdrawal' ? 'bg-red-100' : 'bg-blue-100'
                }`}>
                  {transaction.icon}
                </div>
                <div>
                  <p className="font-medium text-sm">{transaction.title}</p>
                  <p className="text-xs text-gray-500">{transaction.date}</p>
                </div>
              </div>
              <p className="font-semibold text-red-500">
                {transaction.amount}
              </p>
            </div>
          ))}
        </div>
      </div>
      
      {/* Withdraw form */}
      <div className="px-4 pt-2 pb-6">
        <Card className="bg-white shadow-md rounded-2xl border-0">
          <CardContent className="p-5">
            {showSuccess ? (
              <div className="flex flex-col items-center justify-center py-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4 animate-pulse">
                  <Check size={30} className="text-green-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">Withdrawal Initiated!</h3>
                <p className="text-gray-600 text-center mb-4">Your withdrawal of ₹{amount} is being processed</p>
                <p className="text-sm text-gray-500 flex items-center">
                  <Clock size={14} className="mr-1" /> 
                  Estimated completion: {selectedMethodDetails?.processingTime}
                </p>
              </div>
            ) : (
              <>
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2 text-gray-700">Amount to Withdraw</label>
                  <div className="relative">
                    <div className="absolute left-4 top-3 text-gray-500 font-medium">₹</div>
                    <Input
                      type="number"
                      placeholder="0.00"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="pl-8 text-lg py-6 border-2 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 font-medium"
                    />
                  </div>
                  
                  <div className="mt-1 text-xs text-gray-500 flex justify-between">
                    <span>Min: ₹500.00</span>
                    <span>Max: ₹50,000.00</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-4 gap-2 mb-6">
                  {quickAmounts.map((amt, index) => (
                    <Button
                      key={amt}
                      variant="outline"
                      onClick={() => {
                        setAmount(amt.toString());
                        animateElement(`quick-amount-${index}`);
                      }}
                      id={`quick-amount-${index}`}
                      className={`py-5 text-sm transition-all ${
                        amount === amt.toString() 
                          ? 'bg-purple-600 text-white border-purple-600 shadow-md' 
                          : 'hover:bg-purple-50 border-gray-200'
                      }`}
                    >
                      ₹{amt.toLocaleString()}
                    </Button>
                  ))}
                </div>
                
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-3 text-gray-700">Select Withdrawal Method</label>
                  <div className="space-y-3">
                    {withdrawalMethods.map((method, index) => (
                      <Card 
                        key={method.id}
                        id={`method-${index}`}
                        className={`hover:shadow-md transition-all cursor-pointer transform hover:-translate-y-1 ${
                          selectedMethod === method.id 
                            ? 'border-2 border-purple-600 shadow-md' 
                            : 'border border-gray-200'
                        }`}
                        onClick={() => {
                          setSelectedMethod(method.id);
                          animateElement(`method-${index}`);
                        }}
                      >
                        <CardContent className="p-4 flex items-center">
                          <div className={`w-12 h-12 rounded-full ${method.bgColor} flex items-center justify-center mr-3 shadow-sm`}>
                            {method.icon}
                          </div>
                          <div className="flex-1">
                            <p className="font-medium">{method.title}</p>
                            <p className="text-xs text-gray-500">{method.description}</p>
                          </div>
                          {selectedMethod === method.id ? (
                            <div className="w-6 h-6 rounded-full bg-purple-600 flex items-center justify-center">
                              <Check size={16} className="text-white" />
                            </div>
                          ) : (
                            <div className="w-6 h-6 rounded-full border-2 border-gray-200"></div>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
                
                {/* Processing information */}
                <Card className="mb-6 bg-purple-50 border-0">
                  <CardContent className="p-4">
                    <div className="flex items-start">
                      <Info size={18} className="text-purple-600 mr-3 mt-0.5" />
                      <div>
                        <p className="font-medium text-sm text-gray-800">Withdrawal Information</p>
                        <div className="grid grid-cols-2 gap-2 mt-2">
                          <div>
                            <p className="text-xs text-gray-500">Processing Time</p>
                            <p className="text-sm font-medium">{selectedMethodDetails?.processingTime}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Fee</p>
                            <p className="text-sm font-medium">{selectedMethodDetails?.fee}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Additional info based on selected method */}
                {selectedMethod === "usdt" && (
                  <Card className="mb-6 bg-yellow-50 border-0">
                    <CardContent className="p-4 flex items-start">
                      <AlertCircle size={18} className="text-yellow-600 mr-3 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-sm">Important USDT Information</p>
                        <p className="text-xs mt-1 text-gray-600">Please double-check your wallet address. Transactions cannot be reversed once initiated.</p>
                      </div>
                    </CardContent>
                  </Card>
                )}
                
                {selectedMethod === "check" && (
                  <Card className="mb-6 bg-red-50 border-0">
                    <CardContent className="p-4 flex items-start">
                      <AlertCircle size={18} className="text-red-600 mr-3 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-sm">Check Delivery Information</p>
                        <p className="text-xs mt-1 text-gray-600">Physical checks are delivered by courier and require signature confirmation. Additional ₹100 fee applies.</p>
                      </div>
                    </CardContent>
                  </Card>
                )}
                
                <Button 
                  onClick={handleWithdraw}
                  className="w-full py-6 font-medium text-base shadow-lg transition-all hover:shadow-xl"
                  disabled={!amount || isProcessing}
                  id="withdraw-btn"
                >
                  {isProcessing ? (
                    <div className="flex items-center">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Processing...
                    </div>
                  ) : (
                    `Withdraw ₹${amount ? parseFloat(amount).toLocaleString() : '0'}`
                  )}
                </Button>
              </>
            )}
          </CardContent>
        </Card>
        
        <p className="text-xs text-center text-gray-500 mt-4">
          Withdrawals processed Monday-Friday. Weekend requests will be processed on the next business day.
        </p>
      </div>
    </>
  );
  
  // Simplified placeholder components for other pages
  const AnalyticsPage = () => (
    <div className="flex flex-col items-center justify-center h-64 text-center mt-16">
      <div className="bg-blue-100 p-4 rounded-full mb-4">
        <PieChart size={32} className="text-blue-500" />
      </div>
      <h2 className="text-xl font-bold mb-2">Analytics</h2>
      <p className="text-gray-500">View your spending analytics</p>
    </div>
  );
  
  const ProfilePage = () => (
    <div className="flex flex-col items-center justify-center h-64 text-center mt-16">
      <div className="bg-green-100 p-4 rounded-full mb-4">
        <User size={32} className="text-green-500" />
      </div>
      <h2 className="text-xl font-bold mb-2">User Profile</h2>
      <p className="text-gray-500">Manage your account settings</p>
    </div>
  );
  
  return (
    <div className="w-full pb-20 bg-gray-50">
      <div className="flex-1 flex flex-col h-full">
        {/* Main content area - dynamic based on selected page */}
        <div className="flex-1">
          {renderContent()}
        </div>
        
        {/* Import Bottom Navigation component */}
        <BottomNavigation />
      </div>
      
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
    </div>
  );
};

export default Withdraw;
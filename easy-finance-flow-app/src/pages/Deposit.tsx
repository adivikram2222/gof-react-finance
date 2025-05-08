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
  Clock,
  BadgeIndianRupee,
  Users,
  MapPin,
  Calendar
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import BottomNavigation from '../components/BottomNavigation';
import OnlineDeposit from '@/components/deposit/OnlineDeposit';
import CodeDeposit from '@/components/deposit/CodeDeposit';
import BankDeposit from '@/components/deposit/BankDeposit';
import CryptoDeposit from '@/components/deposit/CryptoDeposit';

// Enhanced CashDeposit component with 5 agents and time selection
const EnhancedCashDeposit = () => {
  const [depositTime, setDepositTime] = useState("6");
  const [selectedAgent, setSelectedAgent] = useState("");
  
  // List of cash deposit agents
  const cashAgents = [
    { id: "agent-a", name: "Raj Kumar", location: "Mumbai Central", rating: 4.9, transactions: 520 },
    { id: "agent-b", name: "Priya Singh", location: "Delhi NCR", rating: 4.8, transactions: 412 },
    { id: "agent-c", name: "Vikram Patel", location: "Bangalore East", rating: 4.7, transactions: 356 },
    { id: "agent-d", name: "Anjali Sharma", location: "Chennai City", rating: 4.9, transactions: 490 },
    { id: "agent-e", name: "Arjun Reddy", location: "Hyderabad", rating: 4.8, transactions: 380 }
  ];
  
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
    <div className="space-y-4">
      <div className="flex items-center p-4 bg-amber-50 rounded-lg">
        <Users className="text-amber-500 mr-3" size={20} />
        <p className="text-sm text-amber-700">Cash deposits are verified by authorized agents in your area</p>
      </div>
      
      <div>
        <Label>Select Cash Deposit Agent</Label>
        <RadioGroup className="mt-2 space-y-3" value={selectedAgent} onValueChange={setSelectedAgent}>
          {cashAgents.map((agent) => (
            <div 
              key={agent.id} 
              className="flex items-start space-x-2 bg-white p-3 rounded-lg border border-gray-200 hover:border-purple-200 transition-colors"
              id={`agent-${agent.id}`}
              onClick={() => animateElement(`agent-${agent.id}`)}
            >
              <RadioGroupItem value={agent.id} id={agent.id} className="mt-1" />
              <Label htmlFor={agent.id} className="flex-1 cursor-pointer">
                <div>
                  <div className="flex justify-between">
                    <span className="font-medium">{agent.name}</span>
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                      ★ {agent.rating}
                    </span>
                  </div>
                  <div className="flex items-center text-xs text-gray-500 mt-1">
                    <MapPin size={12} className="mr-1" />
                    {agent.location}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {agent.transactions}+ transactions
                  </div>
                </div>
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>
      
      <div className="space-y-2 mt-4">
        <Label>When did you make this deposit?</Label>
        <Select defaultValue="6" onValueChange={setDepositTime}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select time" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="6">About 6 hours ago</SelectItem>
            <SelectItem value="12">About 12 hours ago</SelectItem>
            <SelectItem value="24">About 24 hours ago</SelectItem>
            <SelectItem value="48">About 48 hours ago</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

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
  
  // Menu items for navigation
  const menuItems = [
    { icon: <Home size={20} />, label: "Home", path: "/" },
    { icon: <BanknoteIcon size={20} />, label: "Deposit", path: "/deposit" },
    { icon: <ReceiptText size={20} />, label: "Transaction", path: "/transaction" },
    { icon: <ArrowDownToLine size={20} />, label: "Withdraw", path: "/withdraw" },
  ];
  
  // Enhanced recent deposits data with time indicators
  const recentDeposits = [
    {
      method: "Bank Transfer",
      amount: "₹25,000",
      date: "Today, 10:30 AM",
      status: "completed",
      icon: <BanknoteIcon size={16} />,
      time: "6 hours ago",
      bank: "HDFC Bank",
      bgColor: "bg-blue-100",
      textColor: "text-blue-600"
    },
    {
      method: "Credit Card",
      amount: "₹7,500",
      date: "Yesterday, 2:45 PM",
      status: "completed",
      icon: <CreditCard size={16} />,
      time: "24 hours ago",
      bank: "ICICI Bank",
      bgColor: "bg-purple-100",
      textColor: "text-purple-600"
    },
    {
      method: "Cash Deposit",
      amount: "₹10,000",
      date: "May 05, 2023",
      status: "pending",
      icon: <BanknoteIcon size={16} />,
      time: "12 hours ago",
      bank: "Agent: Raj Kumar",
      bgColor: "bg-amber-100",
      textColor: "text-amber-600"
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
      <div className={`absolute top-0 right-0 w-72 h-full bg-white shadow-lg transform transition-transform duration-300 ${showSidebar ? 'translate-x-0' : 'translate-x-full'}`}>
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
            <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg p-4 mb-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-gray-500">Available Balance</p>
                <Shield size={16} className="text-purple-600" />
              </div>
              <p className="text-xl font-bold text-gray-800">₹82,465.57</p>
              <div className="mt-3 flex justify-between items-center">
                <Button 
                  variant="outline" 
                  size="xs" 
                  className="text-purple-600 border-purple-200"
                  id="add-money-sidebar"
                  onClick={() => animateElement("add-money-sidebar")}
                >
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
                id={`sidebar-menu-${index}`}
                className="flex items-center gap-3 w-full p-2 rounded-lg hover:bg-gray-100 transition-all duration-300"
                onClick={() => {
                  animateElement(`sidebar-menu-${index}`);
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
            <button 
              className="flex items-center gap-3 w-full p-2 rounded-lg hover:bg-gray-100 transition-all duration-300"
              id="sidebar-analytics"
              onClick={() => animateElement("sidebar-analytics")}
            >
              <PieChart size={20} className="text-amber-500" />
              <span>Analytics</span>
            </button>
            <button 
              className="flex items-center gap-3 w-full p-2 rounded-lg hover:bg-gray-100 transition-all duration-300"
              id="sidebar-profile"
              onClick={() => animateElement("sidebar-profile")}
            >
              <User size={20} className="text-green-500" />
              <span>Profile</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex-1 flex flex-col w-full pb-24 bg-gray-50">
      {/* Header with gradient background */}
      <div className="bg-gradient-to-r from-purple-700 via-purple-600 to-indigo-700 p-4 pt-10 pb-10 relative overflow-hidden">
        {/* Background pattern */}
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
        
        <div className="flex justify-between items-center relative z-10 mb-4">
          <h1 className="text-2xl font-bold text-white">Deposit Funds</h1>
          <div className="flex gap-2">
            <button 
              className="relative text-white bg-white/15 backdrop-blur-lg p-2 rounded-full hover:bg-white/25 transition-all duration-300"
              id="notification-btn"
              onClick={() => animateElement("notification-btn")}
            >
              <Bell size={22} />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">3</span>
            </button>
            <button 
              className="text-white bg-white/15 backdrop-blur-lg p-2 rounded-full hover:bg-white/25 transition-all duration-300"
              onClick={() => setShowSidebar(true)}
              id="menu-btn"
              onClick={() => {
                animateElement("menu-btn");
                setShowSidebar(true);
              }}
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
        
        {/* Security notice in header */}
        <div className="flex items-center gap-2 bg-white/15 rounded-lg p-3 backdrop-blur-sm mt-4">
          <Shield size={20} className="text-green-300" />
          <div>
            <p className="text-sm text-white font-medium">100% Secure Transactions</p>
            <p className="text-xs text-white/80 mt-0.5">All deposits are protected with 256-bit encryption</p>
          </div>
        </div>
      </div>
      
      {/* Balance Card - positioned to overlap with header */}
      <div className="px-4 -mt-6 mb-6 relative z-20">
        <Card className="backdrop-blur-md bg-white/90 rounded-2xl shadow-xl overflow-hidden border-0"
          style={{
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)'
          }}>
          <CardContent className="p-5">
            <div className="flex justify-between items-center mb-2">
              <div>
                <p className="text-sm text-gray-600">Available Balance</p>
                <p className="text-2xl font-bold text-gray-800">₹82,465.57</p>
              </div>
              <Button 
                variant="outline" 
                className="text-purple-600 font-medium border-purple-200 flex items-center gap-1"
                id="history-btn"
                onClick={() => animateElement("history-btn")}
              >
                <Clock size={14} />
                <span>History</span>
              </Button>
            </div>
            
            <div className="mt-3 flex justify-between items-center">
              <div className="flex gap-1.5 flex-wrap">
                <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full">UPI: ₹32,420</span>
                <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full">Bank: ₹48,260</span>
                <span className="text-xs px-2 py-1 bg-purple-100 text-purple-700 rounded-full">Reward: ₹1,785</span>
              </div>
              <span className="text-xs text-gray-500 flex items-center">
                <Clock size={12} className="mr-1" />
                Updated just now
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Main content */}
      <div className="container px-4 flex-1 max-w-2xl mx-auto">
        <div className="mb-6">
          <div className="flex justify-between items-center mb-3">
            <div>
              <h2 className="text-xl font-bold text-gray-800">Select Deposit Method</h2>
              <p className="text-sm text-gray-500">Choose your preferred way to add funds</p>
            </div>
            <div className="bg-purple-100 text-purple-700 text-xs px-2 py-1 rounded-full">
              <BadgeIndianRupee size={12} className="inline mr-1" />
              ₹ Indian Rupee
            </div>
          </div>
          
          <Tabs defaultValue="online" className="w-full">
            <TabsList className="grid grid-cols-5 mb-8 bg-gray-100 p-1 rounded-lg">
              <TabsTrigger value="online" className="flex flex-col items-center gap-2 py-3 data-[state=active]:bg-white data-[state=active]:text-purple-600 data-[state=active]:shadow-sm rounded-md">
                <CreditCard size={18} />
                <span className="text-xs">Online</span>
              </TabsTrigger>
              <TabsTrigger value="code" className="flex flex-col items-center gap-2 py-3 data-[state=active]:bg-white data-[state=active]:text-purple-600 data-[state=active]:shadow-sm rounded-md">
                <QrCode size={18} />
                <span className="text-xs">Code</span>
              </TabsTrigger>
              <TabsTrigger value="bank" className="flex flex-col items-center gap-2 py-3 data-[state=active]:bg-white data-[state=active]:text-purple-600 data-[state=active]:shadow-sm rounded-md">
                <BanknoteIcon size={18} />
                <span className="text-xs">Bank</span>
              </TabsTrigger>
              <TabsTrigger value="cash" className="flex flex-col items-center gap-2 py-3 data-[state=active]:bg-white data-[state=active]:text-purple-600 data-[state=active]:shadow-sm rounded-md">
                <BanknoteIcon size={18} />
                <span className="text-xs">Cash</span>
              </TabsTrigger>
              <TabsTrigger value="crypto" className="flex flex-col items-center gap-2 py-3 data-[state=active]:bg-white data-[state=active]:text-purple-600 data-[state=active]:shadow-sm rounded-md">
                <Coins size={18} />
                <span className="text-xs">Crypto</span>
              </TabsTrigger>
            </TabsList>
            
            <Card className="border-0 shadow-lg mb-6 overflow-hidden">
              <CardContent className="pt-6">
                <TabsContent value="online" className="mt-0">
                  <div className="space-y-4">
                    {/* Time selection added to OnlineDeposit */}
                    <div>
                      <Label>When did you make this deposit?</Label>
                      <Select defaultValue="6">
                        <SelectTrigger className="w-full mt-1.5">
                          <SelectValue placeholder="Select time" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="6">About 6 hours ago</SelectItem>
                          <SelectItem value="12">About 12 hours ago</SelectItem>
                          <SelectItem value="24">About 24 hours ago</SelectItem>
                          <SelectItem value="48">About 48 hours ago</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <OnlineDeposit />
                  </div>
                </TabsContent>
                
                <TabsContent value="code" className="mt-0">
                  <div className="space-y-4">
                    {/* Time selection added to CodeDeposit */}
                    <div>
                      <Label>When did you receive this code?</Label>
                      <Select defaultValue="6">
                        <SelectTrigger className="w-full mt-1.5">
                          <SelectValue placeholder="Select time" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="6">About 6 hours ago</SelectItem>
                          <SelectItem value="12">About 12 hours ago</SelectItem>
                          <SelectItem value="24">About 24 hours ago</SelectItem>
                          <SelectItem value="48">About 48 hours ago</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <CodeDeposit />
                  </div>
                </TabsContent>
                
                <TabsContent value="bank" className="mt-0">
                  <div className="space-y-4">
                    {/* Time selection added to BankDeposit */}
                    <div>
                      <Label>When did you make this transfer?</Label>
                      <Select defaultValue="6">
                        <SelectTrigger className="w-full mt-1.5">
                          <SelectValue placeholder="Select time" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="6">About 6 hours ago</SelectItem>
                          <SelectItem value="12">About 12 hours ago</SelectItem>
                          <SelectItem value="24">About 24 hours ago</SelectItem>
                          <SelectItem value="48">About 48 hours ago</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <BankDeposit />
                  </div>
                </TabsContent>
                
                <TabsContent value="cash" className="mt-0">
                  <EnhancedCashDeposit />
                </TabsContent>
                
                <TabsContent value="crypto" className="mt-0">
                  <div className="space-y-4">
                    {/* Time selection added to CryptoDeposit */}
                    <div>
                      <Label>When did you make this transaction?</Label>
                      <Select defaultValue="6">
                        <SelectTrigger className="w-full mt-1.5">
                          <SelectValue placeholder="Select time" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="6">About 6 hours ago</SelectItem>
                          <SelectItem value="12">About 12 hours ago</SelectItem>
                          <SelectItem value="24">About 24 hours ago</SelectItem>
                          <SelectItem value="48">About 48 hours ago</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <CryptoDeposit />
                  </div>
                </TabsContent>
              </CardContent>
            </Card>
          </Tabs>
        </div>
        
        {/* Recent Deposits - Enhanced with better design */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">Recent Deposits</h2>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-purple-600 flex items-center gap-1 hover:bg-purple-50"
              id="view-all-btn"
              onClick={() => animateElement("view-all-btn")}
            >
              View All
              <ChevronRight size={16} />
            </Button>
          </div>
          
          <div className="space-y-3">
            {recentDeposits.map((deposit, index) => (
              <div 
                key={index} 
                id={`deposit-${index}`}
                className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md hover:border-purple-200 transition-all transform hover:-translate-y-0.5"
                onClick={() => animateElement(`deposit-${index}`)}
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full ${deposit.bgColor} flex items-center justify-center ${deposit.textColor}`}>
                      {deposit.icon}
                    </div>
                    <div>
                      <p className="font-medium">{deposit.method}</p>
                      <div className="flex items-center">
                        <p className="text-xs text-gray-500 mr-2">{deposit.date}</p>
                        <span className="text-xs bg-gray-100 px-1.5 py-0.5 rounded-full text-gray-600">{deposit.bank}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-800">{deposit.amount}</p>
                    <div className="flex items-center justify-end gap-1.5">
                      <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                        deposit.status === 'completed' ? 'bg-green-100 text-green-600' : 'bg-amber-100 text-amber-600'
                      }`}>
                        {deposit.status === 'completed' ? 'Completed' : 'Pending'}
                      </span>
                      <span className="text-xs text-gray-500">{deposit.time}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Help & Support Section */}
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-5 mb-10 border border-purple-100">
          <h3 className="font-bold text-gray-800 mb-2">Need Help?</h3>
          <p className="text-sm text-gray-600 mb-3">Our support team is available 24/7 to assist with your deposit</p>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              className="text-purple-600 border-purple-200 flex-1 hover:bg-purple-50"
              id="faq-btn"
              onClick={() => animateElement("faq-btn")}
            >
              FAQ
            </Button>
            <Button 
              className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
              id="support-btn"
              onClick={() => animateElement("support-btn")}
            >
              Contact Support
            </Button>
          </div>
        </div>
      </div>
      
      {/* Bottom navigation - imported from external component */}
      {isMobile && <BottomNavigation />}
      
      {/* Side drawer (menu) */}
      <SideDrawer />
      
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

export default Deposit;
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
  PieChart
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
      <div className="fixed bottom-0 left-0 right-0 flex justify-around items-center py-2 px-1 bg-white border-t border-gray-200 shadow-lg">
        {tabs.map(tab => (
          <button 
            key={tab.id}
            className={`flex flex-col items-center justify-center py-1 px-3 rounded-lg ${activePage === tab.id ? 'text-purple-600' : 'text-gray-600'}`}
            onClick={() => handleNavigation(tab.path, tab.id)}
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

  return (
    <div className="container px-4 py-6 md:py-10 max-w-6xl mx-auto pb-20">
      <h1 className="text-2xl md:text-3xl font-bold mb-6">Deposit Funds</h1>
      
      <Tabs defaultValue="online" className="w-full">
        <TabsList className="grid grid-cols-5 mb-8">
          <TabsTrigger value="online" className="flex flex-col items-center gap-2 py-3">
            <CreditCard size={24} />
            <span>Online</span>
          </TabsTrigger>
          <TabsTrigger value="code" className="flex flex-col items-center gap-2 py-3">
            <QrCode size={24} />
            <span>Code</span>
          </TabsTrigger>
          <TabsTrigger value="bank" className="flex flex-col items-center gap-2 py-3">
            <BanknoteIcon size={24} />
            <span>Bank</span>
          </TabsTrigger>
          <TabsTrigger value="cash" className="flex flex-col items-center gap-2 py-3">
            <BanknoteIcon size={24} />
            <span>Cash</span>
          </TabsTrigger>
          <TabsTrigger value="crypto" className="flex flex-col items-center gap-2 py-3">
            <Coins size={24} />
            <span>Crypto</span>
          </TabsTrigger>
        </TabsList>
        
        <Card>
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
      
      {/* Bottom navigation - only showing on mobile */}
      {isMobile && <BottomNavigation />}
    </div>
  );
};

export default Deposit;
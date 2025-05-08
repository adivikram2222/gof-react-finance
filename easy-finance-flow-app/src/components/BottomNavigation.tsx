import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Home,
  ShoppingBag,
  Plus,
  PieChart,
  User
} from 'lucide-react';

const BottomNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Define tabs with their routes
  const tabs = [
    { id: 'home', icon: <Home size={24} />, label: 'Home', path: '/' },
    { id: 'transactions', icon: <ShoppingBag size={24} />, label: 'Transactions', path: '/transaction' },
    { id: 'add', icon: <Plus size={24} />, label: 'deposit', path: '/deposit' },
    { id: 'analytics', icon: <PieChart size={24} />, label: 'Withdraw', path: '/withdraw' },
    { id: 'profile', icon: <User size={24} />, label: 'Profile', path: '/profile' }
  ];
  
  // Helper function to determine active tab
  const isActive = (path) => {
    // For home path, check exact match
    if (path === '/') {
      return location.pathname === path;
    }
    // For other paths, check if the pathname starts with the path
    return location.pathname.startsWith(path);
  };
  
  // Animation utility
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
    <div className="fixed bottom-0 left-0 right-0 flex justify-around items-center py-2 px-1 bg-white border-t border-gray-200 shadow-lg z-50">
      {tabs.map(tab => (
        <button 
          key={tab.id}
          className={`flex flex-col items-center justify-center py-1 px-3 rounded-lg transition-all duration-300 ${
            isActive(tab.path) 
              ? 'text-purple-600 transform scale-110' 
              : 'text-gray-600 hover:text-purple-500'
          }`}
          onClick={() => {
            animateElement(`tab-${tab.id}`);
            navigate(tab.path);
          }}
          id={`tab-${tab.id}`}
        >
          {tab.id === 'add' ? (
            <div className="bg-gradient-to-r from-purple-600 to-purple-500 text-white p-3 rounded-full shadow-lg hover:shadow-purple-200 -mt-5 mb-1 transition-transform transform hover:scale-110">
              {tab.icon}
            </div>
          ) : (
            <div className={`${isActive(tab.path) ? 'text-purple-600' : 'text-gray-500'}`}>
              {tab.icon}
            </div>
          )}
          <span className={`text-xs mt-1 font-medium ${
            isActive(tab.path) ? 'text-purple-600' : 'text-gray-500'
          }`}>
            {tab.label}
          </span>
        </button>
      ))}

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
      `}</style>
    </div>
  );
};

export default BottomNavigation;
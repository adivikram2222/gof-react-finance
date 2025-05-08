import React, { useState } from 'react';
import BottomNavigation from '../components/BottomNavigation';
import DrawerNavigation from '../components/DrawerNavigation';
import { 
  BellRing, 
  ArrowUpRight, 
  ArrowDownLeft, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  InfoIcon, 
  Settings, 
  Trash2, 
  CheckCheck,
  BarChart4,
  CreditCard,
  Shield,
  Gift,
  Calendar,
  BadgePercent,
  Wallet,
  BadgeIndianRupee
} from 'lucide-react';

const NotificationsPage = () => {
  const [selectedTab, setSelectedTab] = useState('all');

  // Sample notification data
  const notificationsData = [
    {
      id: 1,
      type: 'transaction',
      title: 'Salary Credited',
      message: 'Your account has been credited with ₹45,000 from XYZ Company.',
      time: '10 minutes ago',
      amount: '+₹45,000',
      isPositive: true,
      isRead: false,
      category: 'alert',
      icon: <ArrowUpRight size={18} />,
      iconBg: 'bg-green-100',
      iconColor: 'text-green-500'
    },
    {
      id: 2,
      type: 'transaction',
      title: 'Bill Payment Successful',
      message: 'Your electricity bill payment of ₹2,450 was successful.',
      time: '2 hours ago',
      amount: '-₹2,450',
      isPositive: false,
      isRead: false,
      category: 'alert',
      icon: <ArrowDownLeft size={18} />,
      iconBg: 'bg-red-100',
      iconColor: 'text-red-500'
    },
    {
      id: 3,
      type: 'security',
      title: 'Suspicious Login Attempt',
      message: 'We detected a login attempt from a new device. Please verify if it was you.',
      time: 'Yesterday',
      isRead: false,
      category: 'alert',
      icon: <Shield size={18} />,
      iconBg: 'bg-orange-100',
      iconColor: 'text-orange-500'
    },
    {
      id: 4,
      type: 'offer',
      title: 'Special Cashback Offer',
      message: 'Get 5% cashback on all UPI transactions till end of this month.',
      time: '2 days ago',
      isRead: true,
      category: 'promotion',
      icon: <BadgePercent size={18} />,
      iconBg: 'bg-purple-100',
      iconColor: 'text-purple-500'
    },
    {
      id: 5,
      type: 'account',
      title: 'KYC Update Required',
      message: 'Please update your KYC details before June 30, 2025 to avoid service interruption.',
      time: '3 days ago',
      isRead: true,
      category: 'info',
      icon: <InfoIcon size={18} />,
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-500'
    },
    {
      id: 6,
      type: 'transaction',
      title: 'Credit Card Bill Due',
      message: 'Your HDFC credit card bill of ₹12,500 is due in 3 days.',
      time: '4 days ago',
      amount: '₹12,500',
      isPositive: false,
      isRead: true,
      category: 'alert',
      icon: <CreditCard size={18} />,
      iconBg: 'bg-yellow-100',
      iconColor: 'text-yellow-600'
    },
    {
      id: 7,
      type: 'investment',
      title: 'Investment Performance Update',
      message: 'Your mutual fund portfolio has grown by 8.5% this quarter.',
      time: '5 days ago',
      isRead: true,
      category: 'info',
      icon: <BarChart4 size={18} />,
      iconBg: 'bg-indigo-100',
      iconColor: 'text-indigo-500'
    },
    {
      id: 8,
      type: 'offer',
      title: 'Loyalty Points Earned',
      message: 'You earned 250 loyalty points from your recent transactions. Check rewards catalog.',
      time: '1 week ago',
      isRead: true,
      category: 'promotion',
      icon: <Gift size={18} />,
      iconBg: 'bg-pink-100',
      iconColor: 'text-pink-500'
    },
    {
      id: 9,
      type: 'reminder',
      title: 'SIP Investment Tomorrow',
      message: 'Your scheduled monthly SIP investment of ₹5,000 is due tomorrow.',
      time: '1 week ago',
      amount: '₹5,000',
      isRead: true,
      category: 'info',
      icon: <Calendar size={18} />,
      iconBg: 'bg-teal-100',
      iconColor: 'text-teal-500'
    },
    {
      id: 10,
      type: 'account',
      title: 'Account Balance Low',
      message: 'Your account balance is below the minimum threshold of ₹1,000.',
      time: '2 weeks ago',
      isRead: true,
      category: 'alert',
      icon: <Wallet size={18} />,
      iconBg: 'bg-red-100',
      iconColor: 'text-red-500'
    }
  ];

  // Filter notifications based on selected tab
  const filteredNotifications = selectedTab === 'all' 
    ? notificationsData 
    : notificationsData.filter(notification => notification.type === selectedTab);

  // Count unread notifications
  const unreadCount = notificationsData.filter(notification => !notification.isRead).length;

  // Group notifications by date for better organization
  const todayNotifications = filteredNotifications.filter(n => 
    n.time.includes('minutes') || n.time.includes('hours') || n.time === 'Today');
  
  const yesterdayNotifications = filteredNotifications.filter(n => 
    n.time === 'Yesterday');
  
  const olderNotifications = filteredNotifications.filter(n => 
    !n.time.includes('minutes') && !n.time.includes('hours') && 
    n.time !== 'Today' && n.time !== 'Yesterday');

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Drawer Navigation Component */}
      <DrawerNavigation />
      
      {/* Main Content */}
      <div className="w-full min-h-screen pb-20 bg-gray-50">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-700 via-purple-600 to-indigo-600 p-5 pt-14 pb-8 relative overflow-hidden">
          {/* Decorative patterns */}
          <div className="absolute top-5 right-5 w-48 h-48 bg-white opacity-5 rounded-full blur-xl"></div>
          <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-white opacity-5 rounded-full blur-xl"></div>
          <div className="absolute bottom-10 right-10 w-24 h-24 bg-purple-300 opacity-10 rounded-full blur-lg"></div>
          
          <div className="flex justify-between items-center mb-4 relative z-10">
            <h1 className="text-2xl font-bold text-white">Notifications</h1>
            <div className="flex gap-3">
              <button className="p-2.5 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors backdrop-blur-sm">
                <CheckCheck size={20} />
              </button>
              <button className="p-2.5 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors backdrop-blur-sm">
                <Settings size={20} />
              </button>
            </div>
          </div>
          
          <div className="relative z-10 flex items-center">
            <div className="bg-purple-500/30 backdrop-blur-sm px-4 py-1.5 rounded-full text-white text-sm shadow-sm">
              <span className="font-medium">{unreadCount}</span> new notifications
            </div>
          </div>
        </div>

        {/* Notification Tabs */}
        <div className="px-5 -mt-4 mb-6 relative z-20">
          <div className="bg-white rounded-xl shadow-md p-1.5 flex gap-1 overflow-x-auto hide-scrollbar">
            <button 
              className={`py-2.5 px-4 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-300 flex-1 ${
                selectedTab === 'all' 
                  ? 'bg-purple-600 text-white shadow-sm' 
                  : 'hover:bg-purple-50 text-gray-700'
              }`}
              onClick={() => setSelectedTab('all')}
            >
              All
            </button>
            <button 
              className={`py-2.5 px-4 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-300 flex-1 ${
                selectedTab === 'transaction' 
                  ? 'bg-purple-600 text-white shadow-sm' 
                  : 'hover:bg-purple-50 text-gray-700'
              }`}
              onClick={() => setSelectedTab('transaction')}
            >
              Transactions
            </button>
            <button 
              className={`py-2.5 px-4 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-300 flex-1 ${
                selectedTab === 'offer' 
                  ? 'bg-purple-600 text-white shadow-sm' 
                  : 'hover:bg-purple-50 text-gray-700'
              }`}
              onClick={() => setSelectedTab('offer')}
            >
              Offers
            </button>
            <button 
              className={`py-2.5 px-4 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-300 flex-1 ${
                selectedTab === 'security' 
                  ? 'bg-purple-600 text-white shadow-sm' 
                  : 'hover:bg-purple-50 text-gray-700'
              }`}
              onClick={() => setSelectedTab('security')}
            >
              Security
            </button>
          </div>
        </div>

        {/* Notifications List */}
        <div className="px-5 pb-24">
          {filteredNotifications.length === 0 ? (
            <div className="bg-white rounded-xl shadow-sm p-8 text-center mt-4">
              <div className="w-20 h-20 mx-auto mb-5 rounded-full bg-purple-50 flex items-center justify-center">
                <BellRing size={36} className="text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No notifications</h3>
              <p className="text-gray-500 max-w-xs mx-auto">You don't have any notifications in this category yet.</p>
            </div>
          ) : (
            <>
              {/* Today's notifications */}
              {todayNotifications.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-sm text-gray-500 font-medium mb-4 pl-1">TODAY</h2>
                  <div className="space-y-4">
                    {todayNotifications.map(notification => (
                      <NotificationCard key={notification.id} notification={notification} />
                    ))}
                  </div>
                </div>
              )}
              
              {/* Yesterday's notifications */}
              {yesterdayNotifications.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-sm text-gray-500 font-medium mb-4 pl-1">YESTERDAY</h2>
                  <div className="space-y-4">
                    {yesterdayNotifications.map(notification => (
                      <NotificationCard key={notification.id} notification={notification} />
                    ))}
                  </div>
                </div>
              )}
              
              {/* Older notifications */}
              {olderNotifications.length > 0 && (
                <div>
                  <h2 className="text-sm text-gray-500 font-medium mb-4 pl-1">OLDER</h2>
                  <div className="space-y-4">
                    {olderNotifications.map(notification => (
                      <NotificationCard key={notification.id} notification={notification} />
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Bottom Navigation */}
        <BottomNavigation />
      </div>

      {/* CSS for effects and animations */}
      <style jsx>{`
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.6; }
        }
        
        .pulse-animation {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        .fade-in {
          animation: fadeIn 0.4s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

// Extract notification card as separate component for better organization
const NotificationCard = ({ notification }) => {
  return (
    <div 
      className={`relative bg-white rounded-xl p-5 shadow-sm border-l-4 hover:shadow-md transition-all duration-300 fade-in ${
        notification.category === 'alert' 
          ? 'border-red-500' 
          : notification.category === 'promotion' 
            ? 'border-purple-500' 
            : 'border-blue-500'
      } ${!notification.isRead ? 'bg-purple-50/40' : ''}`}
    >
      {!notification.isRead && (
        <div className="absolute top-5 right-5 w-3 h-3 rounded-full bg-purple-500 pulse-animation"></div>
      )}
      
      <div className="flex gap-4">
        <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${notification.iconBg}`}>
          <span className={notification.iconColor}>
            {notification.icon}
          </span>
        </div>
        
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <h3 className="font-semibold text-gray-900 text-base">{notification.title}</h3>
            <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
              <Clock size={12} />
              <span>{notification.time}</span>
            </div>
          </div>
          
          <p className="text-gray-600 text-sm mt-2 mb-3 leading-relaxed">{notification.message}</p>
          
          {notification.amount && (
            <div className={`inline-block py-1.5 px-4 rounded-full text-sm font-medium ${
              notification.isPositive 
                ? 'bg-green-100 text-green-600' 
                : 'bg-red-100 text-red-600'
            }`}>
              {notification.amount}
            </div>
          )}
          
          <div className="flex justify-between mt-4 pt-3 border-t border-gray-100">
            <button className="text-purple-600 text-sm font-medium hover:text-purple-700 transition-colors">
              View Details
            </button>
            <button className="text-gray-400 hover:text-gray-600 transition-colors p-1">
              <Trash2 size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationsPage;
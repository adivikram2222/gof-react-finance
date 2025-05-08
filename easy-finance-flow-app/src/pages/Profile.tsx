import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNavigation from '@/components/BottomNavigation';
import {
  Mail,
  Phone,
  MapPin,
  Calendar,
  Clock,
  Edit,
  CreditCard,
  Lock,
  Zap,
  Shield,
  Gift,
  HelpCircle,
  Settings,
  LogOut,
  ArrowRight,
  User,
  ChevronRight,
  Plus
} from 'lucide-react';

const ProfilePage = () => {
  const navigate = useNavigate();
  const [user] = useState({
    name: 'Arjun Kumar',
    avatar: "https://plus.unsplash.com/premium_photo-1671656349322-41de944d259b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bWFufGVufDB8fDB8fHww",
    email: "arjun.kumar@gmail.com",
    phone: "+91 9876543210",
    location: "Mumbai, Maharashtra",
    joinDate: "March 2023",
    dob: "12 August 1988",
    kycStatus: "Verified",
    accountType: "Premium",
    upiId: "arjun.kumar@upi",
    occupation: "Software Engineer",
    pan: "ABCTY1234D",
    aadhar: "XXXX-XXXX-7890",
    bankAccounts: [
      { bank: "HDFC Bank", accountNumber: "XXXX-XXXX-4578", type: "Topup balance", ifsc: "HDFC0001234" },
      { bank: "ICICI Bank", accountNumber: "XXXX-XXXX-3456", type: "Current", ifsc: "ICIC0005678" },
    ],
    cards: [
      { type: "Credit Card", bank: "HDFC Bank", number: "XXXX-XXXX-XXXX-4578", expiry: "09/26", variant: "Regalia" },
      { type: "Debit Card", bank: "ICICI Bank", number: "XXXX-XXXX-XXXX-8765", expiry: "05/27", variant: "Platinum" },
    ],
    rewards: 5420,
    referralCode: "ARJUN500",
    notificationPreferences: {
      transactions: true,
      promotions: false,
      accountUpdates: true,
      newServices: true
    },
    activityLog: [
      { action: "Password Changed", date: "April 15, 2025", time: "14:22" },
      { action: "New Device Login", date: "April 10, 2025", time: "09:35" },
      { action: "Profile Updated", date: "March 28, 2025", time: "17:45" },
    ]
  });

  const [activeTab, setActiveTab] = useState('personal');

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

  return (
    <div className="w-full pb-16">
      {/* Profile Header */}
      <div className="bg-gradient-to-r from-purple-700 via-purple-600 to-indigo-700 p-4 pt-10 pb-36 relative overflow-hidden">
        {/* Background Patterns - with reduced opacity */}
        <div className="absolute top-0 right-0 opacity-5">
          <svg width="250" height="250" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="100" cy="100" r="80" stroke="white" strokeWidth="8"/>
            <circle cx="100" cy="100" r="40" stroke="white" strokeWidth="8"/>
          </svg>
        </div>
        
        {/* Back Button and Title */}
        <div className="flex justify-between items-center mb-8 relative z-10">
          <button 
            className="text-white bg-white/15 backdrop-blur-lg p-2 rounded-full hover:bg-white/25 transition-all duration-300"
            onClick={() => navigate('/')}
          >
            <ArrowRight size={22} className="transform rotate-180" />
          </button>
          <h2 className="text-white text-lg font-bold">Profile</h2>
          <button className="text-white bg-white/15 backdrop-blur-lg p-2 rounded-full hover:bg-white/25 transition-all duration-300">
            <Settings size={22} />
          </button>
        </div>
        
        {/* Profile Picture and Basic Info */}
        <div className="flex flex-col items-center justify-center relative z-10">
          <div className="relative group">
            <img
              src={user.avatar}
              alt="Avatar"
              className="w-24 h-24 rounded-full object-cover border-4 border-white/30 shadow-xl"
            />
            <div className="absolute inset-0 rounded-full bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer">
              <Edit size={24} className="text-white" />
            </div>
          </div>
          
          <div className="mt-3 text-center">
            <h1 className="text-white text-2xl font-bold">{user.name}</h1>
            <p className="text-white/80 mt-1">{user.occupation}</p>
            <div className="mt-2 flex items-center justify-center">
              <span className="text-xs text-white/80 bg-white/15 rounded-full px-3 py-1 backdrop-blur-md">
                {user.kycStatus === "Verified" ? "✓ Verified" : "Verification Pending"}
              </span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Profile Content Card */}
      <div className="-mt-28 px-4 relative z-20">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Profile Tabs */}
          <div className="flex border-b border-gray-100">
            {['personal', 'banking', 'security', 'settings'].map((tab) => (
              <button
                key={tab}
                className={`flex-1 py-4 text-sm font-medium transition-colors duration-300 ${
                  activeTab === tab 
                    ? 'text-purple-600 border-b-2 border-purple-600' 
                    : 'text-gray-500 hover:text-purple-500'
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
          
          {/* Personal Info Tab */}
          {activeTab === 'personal' && (
            <div className="p-5">
              <div className="space-y-4">
                <ProfileInfoItem icon={<Mail size={18} />} label="Email" value={user.email} />
                <ProfileInfoItem icon={<Phone size={18} />} label="Phone" value={user.phone} />
                <ProfileInfoItem icon={<MapPin size={18} />} label="Location" value={user.location} />
                <ProfileInfoItem icon={<Calendar size={18} />} label="Date of Birth" value={user.dob} />
                <ProfileInfoItem icon={<Clock size={18} />} label="Member Since" value={user.joinDate} />
                
                <div className="mt-6">
                  <button 
                    className="w-full bg-purple-600 text-white py-3 rounded-xl font-medium hover:bg-purple-700 transition-colors duration-300 flex items-center justify-center gap-2 hover:shadow-md"
                    onClick={() => animateElement('edit-profile-btn')}
                    id="edit-profile-btn"
                  >
                    <Edit size={18} />
                    Edit Profile
                  </button>
                </div>
              </div>
            </div>
          )}
          
          {/* Banking Tab */}
          {activeTab === 'banking' && (
            <div className="p-5">
              <h3 className="font-semibold text-gray-800 mb-4">UPI ID</h3>
              <div className="bg-gray-50 p-3 rounded-xl flex justify-between items-center mb-5">
                <span className="font-medium">{user.upiId}</span>
                <button className="text-purple-600">
                  <Edit size={16} />
                </button>
              </div>
              
              <h3 className="font-semibold text-gray-800 mb-4">Linked Bank Accounts</h3>
              <div className="space-y-3 mb-5">
                {user.bankAccounts.map((account, idx) => (
                  <div 
                    key={idx} 
                    className="bg-gray-50 p-4 rounded-xl hover:bg-gray-100 transition-colors duration-300"
                    id={`bank-account-${idx}`}
                    onClick={() => animateElement(`bank-account-${idx}`)}
                  >
                    <div className="flex justify-between">
                      <span className="font-medium">{account.bank}</span>
                      <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full">{account.type}</span>
                    </div>
                    <div className="mt-2 text-sm text-gray-500">
                      <p>Acc: {account.accountNumber}</p>
                      <p>IFSC: {account.ifsc}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <h3 className="font-semibold text-gray-800 mb-4">Cards</h3>
              <div className="space-y-3">
                {user.cards.map((card, idx) => (
                  <div 
                    key={idx} 
                    className="relative bg-gradient-to-r from-purple-600 to-indigo-600 p-4 rounded-xl text-white overflow-hidden hover:shadow-lg transition-all duration-300"
                    id={`card-${idx}`}
                    onClick={() => animateElement(`card-${idx}`)}
                  >
                    <div className="absolute top-0 right-0 opacity-10">
                      <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="50" cy="50" r="40" stroke="white" strokeWidth="6"/>
                        <circle cx="50" cy="50" r="20" stroke="white" strokeWidth="6"/>
                      </svg>
                    </div>
                    
                    <div className="flex justify-between mb-4">
                      <span className="font-medium">{card.bank}</span>
                      <span className="text-xs bg-white/20 px-2 py-1 rounded-full">{card.variant}</span>
                    </div>
                    <p className="text-lg font-mono tracking-wider mb-3">{card.number}</p>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-xs text-white/70">EXPIRES</p>
                        <p className="font-medium">{card.expiry}</p>
                      </div>
                      <div>
                        <p className="text-xs text-white/70">TYPE</p>
                        <p className="font-medium">{card.type}</p>
                      </div>
                      <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                        <CreditCard size={24} className="text-white" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6">
                <button 
                  className="w-full border border-purple-200 text-purple-600 py-3 rounded-xl font-medium hover:bg-purple-50 transition-colors duration-300 flex items-center justify-center gap-2"
                  id="add-payment-btn"
                  onClick={() => animateElement('add-payment-btn')}
                >
                  <Plus size={18} />
                  Add New Payment Method
                </button>
              </div>
            </div>
          )}
          
          {/* Security Tab */}
          {activeTab === 'security' && (
            <div className="p-5">
              <h3 className="font-semibold text-gray-800 mb-4">Security Settings</h3>
              
              <div className="space-y-4 mb-6">
                <div 
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-300 cursor-pointer"
                  id="password-setting"
                  onClick={() => animateElement('password-setting')}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-500">
                      <Lock size={18} />
                    </div>
                    <div>
                      <p className="font-medium">Change Password</p>
                      <p className="text-xs text-gray-500">Last changed 30 days ago</p>
                    </div>
                  </div>
                  <ArrowRight size={18} className="text-gray-400" />
                </div>
                
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center text-purple-500">
                      <Zap size={18} />
                    </div>
                    <div>
                      <p className="font-medium">Two-Factor Authentication</p>
                      <p className="text-xs text-gray-500">Currently enabled</p>
                    </div>
                  </div>
                  <div className="w-11 h-6 bg-purple-100 rounded-full flex items-center p-1 cursor-pointer">
                    <div className="w-4 h-4 bg-purple-600 rounded-full ml-auto"></div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center text-red-500">
                      <Shield size={18} />
                    </div>
                    <div>
                      <p className="font-medium">Face ID Login</p>
                      <p className="text-xs text-gray-500">Secure and fast login</p>
                    </div>
                  </div>
                  <div className="w-11 h-6 bg-gray-200 rounded-full flex items-center p-1 cursor-pointer">
                    <div className="w-4 h-4 bg-gray-400 rounded-full"></div>
                  </div>
                </div>
              </div>
              
              <h3 className="font-semibold text-gray-800 mb-4">Recent Activity</h3>
              <div className="space-y-3">
                {user.activityLog.map((activity, idx) => (
                  <div 
                    key={idx} 
                    className="flex items-center justify-between p-3 border-b border-gray-100 hover:bg-gray-50 transition-colors duration-300 rounded-lg"
                    id={`activity-${idx}`}
                    onClick={() => animateElement(`activity-${idx}`)}
                  >
                    <div>
                      <p className="font-medium text-sm">{activity.action}</p>
                      <p className="text-xs text-gray-500">{activity.date}, {activity.time}</p>
                    </div>
                    <button className="text-xs text-purple-600">Details</button>
                  </div>
                ))}
              </div>
              
              <div className="mt-6">
                <button 
                  className="w-full border border-red-200 text-red-500 py-3 rounded-xl font-medium hover:bg-red-50 transition-colors duration-300"
                  id="security-checkup-btn"
                  onClick={() => animateElement('security-checkup-btn')}
                >
                  Security Checkup
                </button>
              </div>
            </div>
          )}
          
          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div className="p-5">
              <h3 className="font-semibold text-gray-800 mb-4">Notification Settings</h3>
              <div className="space-y-3 mb-6">
                {Object.entries(user.notificationPreferences).map(([key, value], idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 border-b border-gray-100">
                    <p className="font-medium capitalize">{key.replace(/([A-Z])/g, ' $1')}</p>
                    <div className={`w-11 h-6 ${value ? 'bg-purple-100' : 'bg-gray-200'} rounded-full flex items-center p-1 transition-colors duration-300 cursor-pointer`}>
                      <div className={`w-4 h-4 ${value ? 'bg-purple-600 ml-auto' : 'bg-gray-400'} rounded-full transition-all duration-300`}></div>
                    </div>
                  </div>
                ))}
              </div>
              
              <h3 className="font-semibold text-gray-800 mb-4">Account Settings</h3>
              <div className="space-y-3">
                <button 
                  className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-300"
                  id="refer-earn-btn"
                  onClick={() => animateElement('refer-earn-btn')}
                >
                  <div className="flex items-center gap-3">
                    <Gift size={18} className="text-purple-500" />
                    <span className="font-medium">Refer & Earn</span>
                  </div>
                  <ChevronRight size={18} className="text-gray-400" />
                </button>
                
                <button 
                  className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-300"
                  id="help-support-btn"
                  onClick={() => animateElement('help-support-btn')}
                >
                  <div className="flex items-center gap-3">
                    <HelpCircle size={18} className="text-purple-500" />
                    <span className="font-medium">Help & Support</span>
                  </div>
                  <ChevronRight size={18} className="text-gray-400" />
                </button>
                
                <button 
                  className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-300"
                  id="appearance-btn"
                  onClick={() => animateElement('appearance-btn')}
                >
                  <div className="flex items-center gap-3">
                    <Settings size={18} className="text-purple-500" />
                    <span className="font-medium">Appearance</span>
                  </div>
                  <ChevronRight size={18} className="text-gray-400" />
                </button>
              </div>
              
              <div className="mt-6">
                <button 
                  className="w-full bg-red-50 text-red-500 py-3 rounded-xl font-medium hover:bg-red-100 transition-colors duration-300 flex items-center justify-center gap-2"
                  id="logout-btn"
                  onClick={() => animateElement('logout-btn')}
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
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
       {/* Bottom Navigation */}
       <BottomNavigation />
    </div>
  );
};

// Profile info item component
const ProfileInfoItem = ({ icon, label, value }) => (
  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-300">
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center text-purple-500">
        {icon}
      </div>
      <div>
        <p className="text-xs text-gray-500">{label}</p>
        <p className="font-medium">{value}</p>
      </div>
    </div>
    <button className="text-purple-500 hover:text-purple-600 transition-colors duration-300">
      <Edit size={16} />
    </button>
  </div>
  
);

export default ProfilePage;
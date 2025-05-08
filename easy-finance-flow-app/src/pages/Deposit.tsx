import React, { useState, useEffect } from 'react';
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
  Calendar,
  Check,
  AlertTriangle,
  ChevronDown,
  Camera,
  Lock,
  Info,
  CheckCircle,
  Copy,
  Star,
  FileText
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import BottomNavigation from '../components/BottomNavigation';

// Custom button component
const Button = ({ 
  children, 
  className = '', 
  variant = 'default', 
  size = 'default', 
  onClick, 
  disabled = false,
  type = 'button',
  fullWidth = false,
  leftIcon = null,
  rightIcon = null
}) => {
  const variantClasses = {
    default: "bg-purple-600 hover:bg-purple-700 text-white",
    secondary: "bg-gray-100 hover:bg-gray-200 text-gray-700",
    outline: "bg-white text-gray-700 border border-gray-200 hover:bg-gray-100",
    ghost: "hover:bg-gray-100 text-gray-700",
    danger: "bg-red-600 hover:bg-red-700 text-white",
    success: "bg-emerald-600 hover:bg-emerald-700 text-white",
  };
  
  const sizeClasses = {
    xs: "text-xs py-1 px-2",
    sm: "text-sm py-1.5 px-3",
    default: "text-sm py-2 px-4",
    lg: "text-base py-2.5 px-5",
    xl: "text-lg py-3 px-6",
  };
  
  return (
    <button 
      type={type}
      className={`
        rounded-lg font-medium transition-all duration-200
        flex items-center justify-center gap-2
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${fullWidth ? 'w-full' : ''}
        ${disabled ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}
        ${className}
      `}
      onClick={onClick}
      disabled={disabled}
    >
      {leftIcon && <span className="flex-shrink-0">{leftIcon}</span>}
      {children}
      {rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
    </button>
  );
};

// Custom input component
const Input = ({ 
  label, 
  name,
  type = 'text', 
  placeholder, 
  value, 
  onChange, 
  error,
  required = false,
  icon = null,
  helper = null,
  className = ''
}) => (
  <div className="space-y-1.5">
    {label && (
      <Label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </Label>
    )}
    <div className="relative">
      {icon && (
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          {icon}
        </div>
      )}
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`
          w-full rounded-lg
          ${icon ? 'pl-10' : 'pl-4'}
          py-2.5 pr-4
          text-gray-900 bg-white
          border ${error ? 'border-red-300 ring-1 ring-red-300' : 'border-gray-300'}
          focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500
          transition-all duration-200
          ${className}
        `}
      />
    </div>
    {error && <p className="text-sm text-red-600">{error}</p>}
    {helper && !error && <p className="text-xs text-gray-500">{helper}</p>}
  </div>
);

// Custom textarea component
const Textarea = ({ 
  label, 
  name,
  placeholder, 
  value, 
  onChange, 
  error,
  required = false,
  rows = 3,
  helper = null,
  className = ''
}) => (
  <div className="space-y-1.5">
    {label && (
      <Label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </Label>
    )}
    <textarea
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={rows}
      className={`
        w-full rounded-lg
        py-2.5 px-4
        text-gray-900 bg-white
        border ${error ? 'border-red-300 ring-1 ring-red-300' : 'border-gray-300'}
        focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500
        transition-all duration-200
        ${className}
      `}
    />
    {error && <p className="text-sm text-red-600">{error}</p>}
    {helper && !error && <p className="text-xs text-gray-500">{helper}</p>}
  </div>
);

// Alert component
const Alert = ({ 
  variant = 'info', 
  title, 
  children,
  icon = null
}) => {
  const variantClasses = {
    info: 'bg-blue-50 text-blue-800 border-blue-100',
    success: 'bg-green-50 text-green-800 border-green-100',
    warning: 'bg-amber-50 text-amber-800 border-amber-100',
    error: 'bg-red-50 text-red-800 border-red-100',
    neutral: 'bg-gray-50 text-gray-800 border-gray-100'
  };

  const iconMap = {
    info: <Info className="h-5 w-5 text-blue-500" />,
    success: <CheckCircle className="h-5 w-5 text-green-500" />,
    warning: <AlertTriangle className="h-5 w-5 text-amber-500" />,
    error: <AlertTriangle className="h-5 w-5 text-red-500" />,
    neutral: <Info className="h-5 w-5 text-gray-500" />
  };

  return (
    <div className={`rounded-lg border p-3 ${variantClasses[variant]}`}>
      <div className="flex">
        <div className="flex-shrink-0">
          {icon || iconMap[variant]}
        </div>
        <div className="ml-3">
          {title && <h3 className="text-sm font-medium">{title}</h3>}
          <div className={`text-sm ${title ? 'mt-1' : ''}`}>{children}</div>
        </div>
      </div>
    </div>
  );
};

// Deposit Methods Components
const OnlineDepositMethod = ({ formData, setFormData, errors }) => {
  const paymentOptions = [
    { 
      id: 'upi', 
      name: 'UPI',
      icon: <img src="/upi-icon.svg" alt="UPI" className="h-8 w-8" />,
      description: 'Instant transfer using UPI apps' 
    },
    { 
      id: 'card', 
      name: 'Credit/Debit Card',
      icon: <CreditCard className="h-6 w-6 text-blue-500" />,
      description: 'Visa, Mastercard, RuPay & more' 
    },
    { 
      id: 'netbanking', 
      name: 'Net Banking',
      icon: <BanknoteIcon className="h-6 w-6 text-green-500" />,
      description: 'All major banks supported' 
    },
    { 
      id: 'wallet', 
      name: 'Mobile Wallet',
      icon: <Wallet className="h-6 w-6 text-purple-500" />,
      description: 'Paytm, PhonePe, MobiKwik & more' 
    }
  ];

  return (
    <div className="space-y-6">
      <Alert variant="info" title="Fast Processing">
        Online payments are processed instantly. Funds typically reflect within 15 minutes.
      </Alert>
      
      <div className="space-y-4">
        <Label className="block text-sm font-medium text-gray-700">
          Select Payment Method <span className="text-red-500">*</span>
        </Label>
        
        <RadioGroup 
          value={formData.paymentMethod || ""}
          onValueChange={(value) => setFormData({...formData, paymentMethod: value})}
          className="space-y-3"
        >
          {paymentOptions.map((option) => (
            <div 
              key={option.id}
              className={`
                flex items-start space-x-2 rounded-lg border p-3
                ${formData.paymentMethod === option.id 
                  ? 'border-purple-300 bg-purple-50 ring-1 ring-purple-500 ring-opacity-30' 
                  : 'border-gray-200 bg-white hover:border-purple-200'
                }
                transition-all duration-200 cursor-pointer
              `}
              onClick={() => setFormData({...formData, paymentMethod: option.id})}
            >
              <RadioGroupItem value={option.id} id={option.id} className="mt-1" />
              <Label htmlFor={option.id} className="flex-1 cursor-pointer">
                <div className="flex items-center">
                  <div className="mr-3">{option.icon}</div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">{option.name}</div>
                    <div className="text-xs text-gray-500">{option.description}</div>
                  </div>
                </div>
              </Label>
            </div>
          ))}
        </RadioGroup>
        {errors.paymentMethod && (
          <p className="text-sm text-red-600">{errors.paymentMethod}</p>
        )}
      </div>
      
      {formData.paymentMethod && (
        <div className="animate-fadeIn">
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-700">Payment Details</h3>
              <div className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full flex items-center">
                <Lock className="h-3 w-3 mr-1" />
                Secure Payment
              </div>
            </div>
            
            {formData.paymentMethod === 'upi' && (
              <div className="space-y-4">
                <Input
                  label="UPI ID"
                  name="upiId"
                  value={formData.upiId || ''}
                  onChange={(e) => setFormData({...formData, upiId: e.target.value})}
                  placeholder="username@bank"
                  required
                  error={errors.upiId}
                />
                <p className="text-xs text-gray-500">
                  Enter your UPI ID (e.g., yourname@okhdfcbank, 9876543210@ybl)
                </p>
              </div>
            )}
            
            {formData.paymentMethod === 'card' && (
              <div className="space-y-4">
                <Input
                  label="Card Number"
                  name="cardNumber"
                  value={formData.cardNumber || ''}
                  onChange={(e) => setFormData({...formData, cardNumber: e.target.value})}
                  placeholder="1234 5678 9012 3456"
                  required
                  error={errors.cardNumber}
                  icon={<CreditCard className="h-5 w-5 text-gray-400" />}
                />
                
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="Expiry Date"
                    name="expiryDate"
                    value={formData.expiryDate || ''}
                    onChange={(e) => setFormData({...formData, expiryDate: e.target.value})}
                    placeholder="MM/YY"
                    required
                    error={errors.expiryDate}
                  />
                  <Input
                    label="CVV"
                    name="cvv"
                    value={formData.cvv || ''}
                    onChange={(e) => setFormData({...formData, cvv: e.target.value})}
                    placeholder="123"
                    required
                    error={errors.cvv}
                  />
                </div>
                
                <Input
                  label="Name on Card"
                  name="nameOnCard"
                  value={formData.nameOnCard || ''}
                  onChange={(e) => setFormData({...formData, nameOnCard: e.target.value})}
                  placeholder="John Doe"
                  required
                  error={errors.nameOnCard}
                />
              </div>
            )}
            
            {formData.paymentMethod === 'netbanking' && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="bank">
                    Select Bank <span className="text-red-500">*</span>
                  </Label>
                  <Select 
                    value={formData.bank || ''}
                    onValueChange={(value) => setFormData({...formData, bank: value})}
                  >
                    <SelectTrigger className={`w-full mt-1.5 ${errors.bank ? 'border-red-300 ring-1 ring-red-300' : ''}`}>
                      <SelectValue placeholder="Select your bank" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hdfc">HDFC Bank</SelectItem>
                      <SelectItem value="sbi">State Bank of India</SelectItem>
                      <SelectItem value="icici">ICICI Bank</SelectItem>
                      <SelectItem value="axis">Axis Bank</SelectItem>
                      <SelectItem value="kotak">Kotak Mahindra Bank</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.bank && (
                    <p className="text-sm text-red-600 mt-1">{errors.bank}</p>
                  )}
                </div>
                <p className="text-xs text-gray-500">
                  You will be redirected to your bank's secure website to complete the payment.
                </p>
              </div>
            )}
            
            {formData.paymentMethod === 'wallet' && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="wallet">
                    Select Wallet <span className="text-red-500">*</span>
                  </Label>
                  <Select 
                    value={formData.wallet || ''}
                    onValueChange={(value) => setFormData({...formData, wallet: value})}
                  >
                    <SelectTrigger className={`w-full mt-1.5 ${errors.wallet ? 'border-red-300 ring-1 ring-red-300' : ''}`}>
                      <SelectValue placeholder="Select your wallet" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="paytm">Paytm</SelectItem>
                      <SelectItem value="phonepe">PhonePe</SelectItem>
                      <SelectItem value="mobikwik">MobiKwik</SelectItem>
                      <SelectItem value="amazonpay">Amazon Pay</SelectItem>
                      <SelectItem value="freecharge">Freecharge</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.wallet && (
                    <p className="text-sm text-red-600 mt-1">{errors.wallet}</p>
                  )}
                </div>
                <p className="text-xs text-gray-500">
                  You will be redirected to complete the payment through your chosen wallet.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const BankDepositMethod = ({ formData, setFormData, errors }) => {
  const banks = [
    { 
      id: 'hdfc', 
      name: 'HDFC Bank',
      accountNumber: 'XXXX XXXX 1234',
      ifsc: 'HDFC0000123',
    },
    { 
      id: 'icici', 
      name: 'ICICI Bank',
      accountNumber: 'XXXX XXXX 5678',
      ifsc: 'ICIC0000789',
    },
    { 
      id: 'sbi', 
      name: 'State Bank of India',
      accountNumber: 'XXXX XXXX 9012',
      ifsc: 'SBIN0000456',
    }
  ];

  return (
    <div className="space-y-6">
      <Alert variant="info">
        Bank transfers may take 1-24 hours to process depending on your bank and time of day.
      </Alert>
      
      <div className="space-y-4">
        <Label className="block text-sm font-medium text-gray-700">
          Select Bank Account <span className="text-red-500">*</span>
        </Label>
        
        <RadioGroup 
          value={formData.selectedBank || ""}
          onValueChange={(value) => setFormData({...formData, selectedBank: value})}
          className="space-y-3"
        >
          {banks.map((bank) => (
            <div
              key={bank.id}
              className={`
                flex items-start space-x-2 rounded-lg border p-3
                ${formData.selectedBank === bank.id 
                  ? 'border-purple-300 bg-purple-50 ring-1 ring-purple-500 ring-opacity-30' 
                  : 'border-gray-200 bg-white hover:border-purple-200'
                }
                transition-all duration-200 cursor-pointer
              `}
              onClick={() => setFormData({...formData, selectedBank: bank.id})}
            >
              <RadioGroupItem value={bank.id} id={bank.id} className="mt-1" />
              <Label htmlFor={bank.id} className="flex-1 cursor-pointer">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-8 h-8 mr-3 bg-gray-100 rounded-md flex items-center justify-center">
                      <span className="text-xs font-medium text-gray-700">{bank.name.charAt(0)}</span>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">{bank.name}</div>
                      <div className="text-xs text-gray-500">A/C: {bank.accountNumber}</div>
                    </div>
                  </div>
                </div>
              </Label>
            </div>
          ))}
        </RadioGroup>
        {errors.selectedBank && (
          <p className="text-sm text-red-600 mt-1">{errors.selectedBank}</p>
        )}
      </div>
      
      {formData.selectedBank && (
        <div className="animate-fadeIn space-y-6">
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            {/* Bank details */}
            <div className="mb-4 pb-4 border-b border-gray-200">
              <h3 className="text-sm font-medium text-gray-700 mb-3">Bank Account Details</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-xs text-gray-500">Account Name</div>
                  <div className="text-sm font-medium text-gray-800">ACME Financials Ltd.</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Account Number</div>
                  <div className="text-sm font-medium text-gray-800">
                    {banks.find(b => b.id === formData.selectedBank)?.accountNumber}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">IFSC Code</div>
                  <div className="text-sm font-medium text-gray-800">
                    {banks.find(b => b.id === formData.selectedBank)?.ifsc}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Account Type</div>
                  <div className="text-sm font-medium text-gray-800">Current Account</div>
                </div>
              </div>
              
              <div className="mt-3 flex">
                <Button 
                  variant="outline"
                  size="xs"
                  leftIcon={<Copy className="h-4 w-4" />}
                  className="text-purple-600 border-purple-200"
                >
                  Copy Details
                </Button>
              </div>
            </div>
            
            {/* Transaction details form */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-3">Transaction Details</h3>
              
              <div className="space-y-4">
                <Input
                  label="Transaction Reference Number"
                  name="transactionId"
                  value={formData.transactionId || ''}
                  onChange={(e) => setFormData({...formData, transactionId: e.target.value})}
                  placeholder="e.g., UTR Number, Transaction ID"
                  required
                  error={errors.transactionId}
                  helper="This helps us match your transfer with our bank statement"
                />
                
                <Input
                  label="Account Name Used for Transfer"
                  name="senderName"
                  value={formData.senderName || ''}
                  onChange={(e) => setFormData({...formData, senderName: e.target.value})}
                  placeholder="Name as it appears on your bank account"
                  required
                  error={errors.senderName}
                />
                
                <div>
                  <Label htmlFor="transferMethod">
                    Transfer Method <span className="text-red-500">*</span>
                  </Label>
                  <Select 
                    value={formData.transferMethod || ''}
                    onValueChange={(value) => setFormData({...formData, transferMethod: value})}
                  >
                    <SelectTrigger className={`w-full mt-1.5 ${errors.transferMethod ? 'border-red-300 ring-1 ring-red-300' : ''}`}>
                      <SelectValue placeholder="Select transfer method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="neft">NEFT</SelectItem>
                      <SelectItem value="rtgs">RTGS</SelectItem>
                      <SelectItem value="imps">IMPS</SelectItem>
                      <SelectItem value="upi">UPI</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.transferMethod && (
                    <p className="text-sm text-red-600 mt-1">{errors.transferMethod}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          <Alert 
            variant="warning" 
            icon={<AlertTriangle className="h-5 w-5 text-amber-500" />}
          >
            Make the transfer from your bank and then submit this form with the transaction details.
          </Alert>
        </div>
      )}
    </div>
  );
};

const CodeDepositMethod = ({ formData, setFormData, errors }) => {
  return (
    <div className="space-y-6">
      <Alert 
        variant="info" 
        icon={<QrCode className="h-5 w-5 text-blue-500" />}
        title="Scan QR Code to Deposit"
      >
        Scan this QR code to make a deposit, then fill in the details below.
      </Alert>
      
      {/* Company QR Code Display */}
      <div className="bg-white border border-gray-200 rounded-lg p-4 flex flex-col items-center">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-3">
          <div className="w-48 h-48 bg-gray-100 flex items-center justify-center relative">
            {/* Placeholder QR Code - replace with actual QR code image */}
            <img src="/company-qr-code.png" alt="Company QR Code" className="w-full h-full" 
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200"><rect width="200" height="200" fill="%23f0f0f0"/><text x="50%" y="50%" font-family="Arial" font-size="24" fill="%23888" text-anchor="middle" dominant-baseline="middle">QR Code</text></svg>';
              }}
            />
            <div className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md">
              <Shield className="h-4 w-4 text-green-500" />
            </div>
          </div>
        </div>
        <div className="text-center mb-2">
          <p className="text-sm font-medium text-gray-800">ACME Financial Services</p>
          <p className="text-xs text-gray-500">UPI ID: acme@hdfcbank</p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            leftIcon={<Copy className="h-4 w-4" />}
            className="text-purple-600 border-purple-200"
          >
            Copy UPI ID
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            leftIcon={<Camera className="h-4 w-4" />}
            className="text-purple-600 border-purple-200"
          >
            Save QR
          </Button>
        </div>
      </div>
      
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
        <h3 className="text-sm font-medium text-gray-700 mb-3">Deposit Details</h3>
        
        <div className="space-y-4">
          <Input
            label="Deposit Amount"
            name="amount"
            type="text"
            icon={<BadgeIndianRupee className="h-5 w-5 text-gray-400" />}
            value={formData.amount || ''}
            onChange={(e) => setFormData({...formData, amount: e.target.value})}
            placeholder="0.00"
            required
            error={errors.amount}
            className="text-lg"
          />
          
          <Input
            label="Transaction Reference ID / UTR Number"
            name="referenceId"
            value={formData.referenceId || ''}
            onChange={(e) => setFormData({...formData, referenceId: e.target.value})}
            placeholder="Enter transaction reference ID from your payment app"
            required
            error={errors.referenceId}
            helper="You can find this in your payment app confirmation"
          />
          
          <div>
            <Label htmlFor="paymentApp">
              Payment App Used <span className="text-red-500">*</span>
            </Label>
            <Select 
              value={formData.paymentApp || ''}
              onValueChange={(value) => setFormData({...formData, paymentApp: value})}
            >
              <SelectTrigger className={`w-full mt-1.5 ${errors.paymentApp ? 'border-red-300 ring-1 ring-red-300' : ''}`}>
                <SelectValue placeholder="Select payment app" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="gpay">Google Pay</SelectItem>
                <SelectItem value="phonepe">PhonePe</SelectItem>
                <SelectItem value="paytm">Paytm</SelectItem>
                <SelectItem value="amazonpay">Amazon Pay</SelectItem>
                <SelectItem value="bhim">BHIM UPI</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
            {errors.paymentApp && (
              <p className="text-sm text-red-600 mt-1">{errors.paymentApp}</p>
            )}
          </div>
          
          {formData.paymentApp === 'other' && (
            <Input
              label="Specify Payment App"
              name="otherPaymentApp"
              value={formData.otherPaymentApp || ''}
              onChange={(e) => setFormData({...formData, otherPaymentApp: e.target.value})}
              placeholder="Enter the name of the payment app"
              required
              error={errors.otherPaymentApp}
            />
          )}
          
          <div>
            <Label htmlFor="depositTime">
              When did you make this payment? <span className="text-red-500">*</span>
            </Label>
            <Select 
              value={formData.depositTime || ''}
              onValueChange={(value) => setFormData({...formData, depositTime: value})}
            >
              <SelectTrigger className={`w-full mt-1.5 ${errors.depositTime ? 'border-red-300 ring-1 ring-red-300' : ''}`}>
                <SelectValue placeholder="Select time" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="just-now">Just now</SelectItem>
                <SelectItem value="5min">About 5 minutes ago</SelectItem>
                <SelectItem value="30min">About 30 minutes ago</SelectItem>
                <SelectItem value="1hour">About 1 hour ago</SelectItem>
                <SelectItem value="3hours">About 3 hours ago</SelectItem>
                <SelectItem value="today">Earlier today</SelectItem>
                <SelectItem value="yesterday">Yesterday</SelectItem>
              </SelectContent>
            </Select>
            {errors.depositTime && (
              <p className="text-sm text-red-600 mt-1">{errors.depositTime}</p>
            )}
          </div>
          
          <Textarea
            label="Notes (Optional)"
            name="notes"
            value={formData.notes || ''}
            onChange={(e) => setFormData({...formData, notes: e.target.value})}
            placeholder="Add any additional information about this payment"
            rows={2}
          />
          
          {/* Screenshot Upload */}
          <div className="mt-2">
            <Label className="block text-sm font-medium text-gray-700 mb-2">
              Upload Payment Screenshot (Optional)
            </Label>
            <label htmlFor="payment-screenshot" className="flex flex-col items-center justify-center w-full h-32 border-2 border-purple-300 border-dashed rounded-lg cursor-pointer bg-purple-50 hover:bg-purple-100 transition-colors">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <FileText className="h-8 w-8 mb-3 text-purple-500" />
                <p className="mb-2 text-sm text-purple-700"><span className="font-medium">Click to upload screenshot</span> or drag and drop</p>
                <p className="text-xs text-purple-500">JPG, PNG (MAX. 5MB)</p>
              </div>
              <input 
                id="payment-screenshot" 
                type="file" 
                className="hidden"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    // Handle file upload
                    console.log("File selected:", e.target.files[0]);
                  }
                }}
                accept="image/jpeg,image/png"
              />
            </label>
          </div>
        </div>
      </div>
      
      <Alert variant="info">
        QR code payments are verified automatically. Your deposit will be processed within 5-15 minutes after confirmation.
      </Alert>
    </div>
  );
};

const CashDepositMethod = ({ formData, setFormData, errors }) => {
  // List of cash deposit agents
  const cashAgents = [
    { id: "agent-a", name: "Raj Kumar", location: "Mumbai Central", rating: 4.9, transactions: 520 },
    { id: "agent-b", name: "Priya Singh", location: "Delhi NCR", rating: 4.8, transactions: 412 },
    { id: "agent-c", name: "Vikram Patel", location: "Bangalore East", rating: 4.7, transactions: 356 },
    { id: "agent-d", name: "Anjali Sharma", location: "Chennai City", rating: 4.9, transactions: 490 },
    { id: "agent-e", name: "Arjun Reddy", location: "Hyderabad", rating: 4.8, transactions: 380 }
  ];
  
  const [uploadedFile, setUploadedFile] = useState(null);
  
  const handleFileUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFile(e.target.files[0]);
      setFormData({...formData, hasReceipt: true});
    }
  };
  
  const removeFile = () => {
    setUploadedFile(null);
    setFormData({...formData, hasReceipt: false});
  };
  
  return (
    <div className="space-y-6">
      <Alert 
        variant="info" 
        icon={<Users className="h-5 w-5 text-blue-500" />}
      >
        Cash deposits are verified by authorized agents in your area
      </Alert>
      
      {/* Amount Input Section */}
      <div className="space-y-2">
        <Input
          label="Deposit Amount"
          name="amount"
          type="text"
          icon={<BadgeIndianRupee className="h-5 w-5 text-gray-400" />}
          value={formData.amount || ''}
          onChange={(e) => setFormData({...formData, amount: e.target.value})}
          placeholder="0.00"
          required
          error={errors.amount}
          className="text-xl"
        />
        
        <div className="flex gap-2 mt-2">
          <Button 
            variant="outline" 
            size="sm"
            className="flex-1 border-gray-200"
            onClick={() => setFormData({...formData, amount: "1000"})}
          >
            ₹1,000
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            className="flex-1 border-gray-200"
            onClick={() => setFormData({...formData, amount: "5000"})}
          >
            ₹5,000
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            className="flex-1 border-gray-200"
            onClick={() => setFormData({...formData, amount: "10000"})}
          >
            ₹10,000
          </Button>
        </div>
      </div>
      
      {/* Agent Selection */}
      <div>
        <Label className="block text-sm font-medium text-gray-700 mb-2">
          Select Cash Deposit Agent <span className="text-red-500">*</span>
        </Label>
        
        <RadioGroup 
          value={formData.selectedAgent || ""}
          onValueChange={(value) => setFormData({...formData, selectedAgent: value})}
          className="space-y-3"
        >
          {cashAgents.map((agent) => (
            <div
              key={agent.id}
              className={`
                flex items-start space-x-2 rounded-lg border p-3
                ${formData.selectedAgent === agent.id 
                  ? 'border-purple-300 bg-purple-50 ring-1 ring-purple-500 ring-opacity-30' 
                  : 'border-gray-200 bg-white hover:border-purple-200'
                }
                transition-all duration-200 cursor-pointer
              `}
              onClick={() => setFormData({...formData, selectedAgent: agent.id})}
            >
              <RadioGroupItem value={agent.id} id={agent.id} className="mt-1" />
              <Label htmlFor={agent.id} className="flex-1 cursor-pointer">
                <div>
                  <div className="flex justify-between">
                    <span className="font-medium text-sm">{agent.name}</span>
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full flex items-center">
                      <Star className="h-3 w-3 mr-0.5 text-amber-500" />
                      {agent.rating}
                    </span>
                  </div>
                  <div className="flex items-center text-xs text-gray-500 mt-1">
                    <MapPin className="h-3 w-3 mr-1" />
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
        {errors.selectedAgent && (
          <p className="text-sm text-red-600 mt-1">{errors.selectedAgent}</p>
        )}
      </div>
      
      {/* Deposit Time */}
      <div>
        <Label htmlFor="depositTime">
          When did you make this deposit? <span className="text-red-500">*</span>
        </Label>
        <Select 
          value={formData.depositTime || ''}
          onValueChange={(value) => setFormData({...formData, depositTime: value})}
        >
          <SelectTrigger className={`w-full mt-1.5 ${errors.depositTime ? 'border-red-300 ring-1 ring-red-300' : ''}`}>
            <SelectValue placeholder="Select time" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="6">About 6 hours ago</SelectItem>
            <SelectItem value="12">About 12 hours ago</SelectItem>
            <SelectItem value="24">About 24 hours ago</SelectItem>
            <SelectItem value="48">About 48 hours ago</SelectItem>
          </SelectContent>
        </Select>
        {errors.depositTime && (
          <p className="text-sm text-red-600 mt-1">{errors.depositTime}</p>
        )}
      </div>
      
      {/* Transaction Reference ID */}
      <Input
        label="Transaction Reference ID"
        name="referenceId"
        value={formData.referenceId || ''}
        onChange={(e) => setFormData({...formData, referenceId: e.target.value})}
        placeholder="Enter transaction reference number"
        required
        error={errors.referenceId}
        helper="You can find this on your receipt or ask the agent for the reference ID"
      />
      
      {/* Notes (Optional) */}
      <Textarea
        label="Notes (Optional)"
        name="notes"
        value={formData.notes || ''}
        onChange={(e) => setFormData({...formData, notes: e.target.value})}
        placeholder="Add any additional notes about this transaction"
        rows={2}
      />
      
      {/* Receipt Upload */}
      <div className="space-y-2 border border-dashed border-gray-300 rounded-lg p-4 bg-gray-50">
        <div className="flex items-center mb-3">
          <Checkbox
            id="has-receipt"
            checked={formData.hasReceipt || false}
            onCheckedChange={(checked) => setFormData({...formData, hasReceipt: checked})}
          />
          <label htmlFor="has-receipt" className="ml-2 block text-sm text-gray-700 cursor-pointer">
            I have a receipt for this transaction
          </label>
        </div>
        
        {formData.hasReceipt && (
          <div className="mt-2">
            {!uploadedFile ? (
              <label htmlFor="receipt-upload" className="flex flex-col items-center justify-center w-full h-32 border-2 border-purple-300 border-dashed rounded-lg cursor-pointer bg-purple-50 hover:bg-purple-100 transition-colors">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <ReceiptText className="h-8 w-8 mb-3 text-purple-500" />
                  <p className="mb-2 text-sm text-purple-700"><span className="font-medium">Click to upload receipt</span> or drag and drop</p>
                  <p className="text-xs text-purple-500">JPG, PNG or PDF (MAX. 5MB)</p>
                </div>
                <input 
                  id="receipt-upload" 
                  type="file" 
                  className="hidden"
                  onChange={handleFileUpload}
                  accept="image/jpeg,image/png,application/pdf"
                />
              </label>
            ) : (
              <div className="bg-white rounded-lg border border-gray-200 p-3">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <FileText className="h-6 w-6 text-purple-500 mr-2" />
                    <div>
                      <p className="text-sm font-medium text-gray-800 truncate">
                        {uploadedFile.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {(uploadedFile.size / 1024).toFixed(2)} KB
                      </p>
                    </div>
                  </div>
                  <button 
                    type="button"
                    onClick={removeFile}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      
      {/* Terms and Conditions */}
      <div>
        <div className="flex items-center mb-1">
          <Checkbox
            id="terms"
            checked={formData.acceptTerms || false}
            onCheckedChange={(checked) => setFormData({...formData, acceptTerms: checked})}
            className={errors.acceptTerms ? 'border-red-500' : ''}
          />
          <label htmlFor="terms" className="ml-2 text-sm text-gray-700">
            I confirm that I have made this cash deposit with the selected agent and all information provided is accurate.
          </label>
        </div>
        {errors.acceptTerms && (
          <p className="text-sm text-red-600 mt-1">{errors.acceptTerms}</p>
        )}
      </div>
      
      {/* Transaction Safety Note */}
      <Alert variant="info" icon={<Shield className="h-5 w-5 text-blue-500" />}>
        For your security, cash deposits are verified by our team against agent records. Confirmation typically takes 15-30 minutes during business hours.
      </Alert>
    </div>
  );
};

const CryptoDepositMethod = ({ formData, setFormData, errors }) => {
  const cryptoOptions = [
    { id: 'btc', name: 'Bitcoin (BTC)', icon: 'BTC', address: '3FZbgi29cpjq2GjdwV8eyHuJJnkLtktZc5' },
    { id: 'eth', name: 'Ethereum (ETH)', icon: 'ETH', address: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e' },
    { id: 'usdt', name: 'Tether (USDT)', icon: 'USDT', address: 'TNPxvCeNKgmaFS5YJEdAJPQEbKNYTYp8ya' },
    { id: 'bnb', name: 'Binance Coin (BNB)', icon: 'BNB', address: 'bnb136ns6lfw4zs5hg4n85vdthaad7hq5m4gtkgf23' }
  ];

  return (
    <div className="space-y-6">
      <Alert variant="warning">
        <p className="font-medium">Important: Verification Required</p>
        <p className="text-sm mt-1">Crypto deposits require additional KYC verification. Please ensure your account is fully verified before proceeding.</p>
      </Alert>
      
      <div className="space-y-4">
        <Label className="block text-sm font-medium text-gray-700">
          Select Cryptocurrency <span className="text-red-500">*</span>
        </Label>
        
        <RadioGroup 
          value={formData.selectedCrypto || ""}
          onValueChange={(value) => setFormData({...formData, selectedCrypto: value})}
          className="space-y-3"
        >
          {cryptoOptions.map((crypto) => (
            <div
              key={crypto.id}
              className={`
                flex items-start space-x-2 rounded-lg border p-3
                ${formData.selectedCrypto === crypto.id 
                  ? 'border-purple-300 bg-purple-50 ring-1 ring-purple-500 ring-opacity-30' 
                  : 'border-gray-200 bg-white hover:border-purple-200'
                }
                transition-all duration-200 cursor-pointer
              `}
              onClick={() => setFormData({...formData, selectedCrypto: crypto.id})}
            >
              <RadioGroupItem value={crypto.id} id={crypto.id} className="mt-1" />
              <Label htmlFor={crypto.id} className="flex-1 cursor-pointer">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mr-3 text-gray-700 font-medium">
                    {crypto.icon}
                  </div>
                  <span className="text-sm font-medium">{crypto.name}</span>
                </div>
              </Label>
            </div>
          ))}
        </RadioGroup>
        {errors.selectedCrypto && (
          <p className="text-sm text-red-600 mt-1">{errors.selectedCrypto}</p>
        )}
      </div>
      
      {formData.selectedCrypto && (
        <div className="animate-fadeIn space-y-6">
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h3 className="text-sm font-medium text-gray-700 mb-3">Deposit Address</h3>
            
            <div className="border border-gray-200 bg-white rounded-lg p-3 mb-3">
              <div className="mb-2 flex justify-center">
                <div className="w-32 h-32 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
                  QR Code
                </div>
              </div>
              <div className="text-xs text-center text-gray-500 mb-3">
                Scan this QR code with your wallet app to deposit
              </div>
              <div className="relative">
                <input
                  type="text"
                  readOnly
                  value={cryptoOptions.find(c => c.id === formData.selectedCrypto)?.address}
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg py-2 px-3 text-xs text-gray-800 pr-20"
                />
                <button
                  type="button"
                  className="absolute right-1 top-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded px-2 py-1 text-xs flex items-center"
                >
                  <Copy className="h-3 w-3 mr-1" />
                  Copy
                </button>
              </div>
            </div>
            
            <Alert variant="warning" title="Important">
              <ul className="list-disc list-inside text-xs space-y-1">
                <li>Only send {formData.selectedCrypto?.toUpperCase()} to this address</li>
                <li>Sending any other cryptocurrency may result in permanent loss</li>
                <li>Minimum deposit: 0.001 BTC / 0.01 ETH / 10 USDT / 0.05 BNB</li>
              </ul>
            </Alert>
          </div>
          
          <div className="space-y-4">
            <Input
              label="Transaction Hash/ID"
              name="transactionHash"
              value={formData.transactionHash || ''}
              onChange={(e) => setFormData({...formData, transactionHash: e.target.value})}
              placeholder="Enter the transaction hash/ID from your wallet"
              required
              error={errors.transactionHash}
              helper="This helps us track your deposit on the blockchain"
            />
            
            <div>
              <Label htmlFor="cryptoDepositTime">
                When did you make this transaction? <span className="text-red-500">*</span>
              </Label>
              <Select 
                value={formData.cryptoDepositTime || ''}
                onValueChange={(value) => setFormData({...formData, cryptoDepositTime: value})}
              >
                <SelectTrigger className={`w-full mt-1.5 ${errors.cryptoDepositTime ? 'border-red-300 ring-1 ring-red-300' : ''}`}>
                  <SelectValue placeholder="Select time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="6">About 6 hours ago</SelectItem>
                  <SelectItem value="12">About 12 hours ago</SelectItem>
                  <SelectItem value="24">About 24 hours ago</SelectItem>
                  <SelectItem value="48">About 48 hours ago</SelectItem>
                </SelectContent>
              </Select>
              {errors.cryptoDepositTime && (
                <p className="text-sm text-red-600 mt-1">{errors.cryptoDepositTime}</p>
              )}
            </div>
            
            <Input
              label="Amount Sent"
              name="cryptoAmount"
              value={formData.cryptoAmount || ''}
              onChange={(e) => setFormData({...formData, cryptoAmount: e.target.value})}
              placeholder={`Amount in ${formData.selectedCrypto?.toUpperCase()}`}
              required
              error={errors.cryptoAmount}
            />
          </div>
        </div>
      )}
      
      <Alert variant="info">
        Crypto deposits typically require 2-6 network confirmations before being credited to your account. This usually takes 10-60 minutes depending on network conditions.
      </Alert>
    </div>
  );
};

// Main Deposit Page Component
const DepositPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('online');
  const [activePage, setActivePage] = useState('deposit');
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  
  // Get the active page based on current path
  useEffect(() => {
    const path = location.pathname;
    if (path === '/') setActivePage('home');
    else if (path === '/transaction') setActivePage('transaction');
    else if (path === '/deposit') setActivePage('deposit');
    else if (path === '/withdraw') setActivePage('withdraw');
    else if (path === '/profile') setActivePage('profile');
    else setActivePage('deposit');
  }, [location]);
  
  // Recent deposit transactions
  const recentDeposits = [
    {
      id: 'dep-001',
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
      id: 'dep-002',
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
      id: 'dep-003',
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
  
  // Form validation
  const validateForm = () => {
    const newErrors = {};
    
    // Common validations
    if (!formData.amount) {
      newErrors.amount = 'Amount is required';
    } else if (isNaN(formData.amount) || parseFloat(formData.amount) <= 0) {
      newErrors.amount = 'Please enter a valid amount';
    }
    
    // Tab-specific validations
    if (activeTab === 'online') {
      if (!formData.paymentMethod) newErrors.paymentMethod = 'Please select a payment method';
      if (formData.paymentMethod === 'upi' && !formData.upiId) {
        newErrors.upiId = 'UPI ID is required';
      }
      if (formData.paymentMethod === 'card') {
        if (!formData.cardNumber) newErrors.cardNumber = 'Card number is required';
        if (!formData.expiryDate) newErrors.expiryDate = 'Expiry date is required';
        if (!formData.cvv) newErrors.cvv = 'CVV is required';
        if (!formData.nameOnCard) newErrors.nameOnCard = 'Name is required';
      }
      if (formData.paymentMethod === 'netbanking' && !formData.bank) {
        newErrors.bank = 'Please select a bank';
      }
      if (formData.paymentMethod === 'wallet' && !formData.wallet) {
        newErrors.wallet = 'Please select a wallet';
      }
    } else if (activeTab === 'bank') {
      if (!formData.selectedBank) newErrors.selectedBank = 'Please select a bank';
      if (!formData.transactionId) newErrors.transactionId = 'Transaction reference is required';
      if (!formData.senderName) newErrors.senderName = 'Sender name is required';
      if (!formData.transferMethod) newErrors.transferMethod = 'Transfer method is required';
    } else if (activeTab === 'cash') {
      if (!formData.selectedAgent) newErrors.selectedAgent = 'Please select an agent';
      if (!formData.depositTime) newErrors.depositTime = 'Please select when deposit was made';
      if (!formData.referenceId) newErrors.referenceId = 'Reference ID is required';
      if (!formData.acceptTerms) newErrors.acceptTerms = 'You must accept the terms and conditions';
    } else if (activeTab === 'code') {
      if (!formData.referenceId) newErrors.referenceId = 'Transaction reference ID is required';
      if (!formData.paymentApp) newErrors.paymentApp = 'Please select payment app used';
      if (!formData.depositTime) newErrors.depositTime = 'Please select when you made the payment';
      if (formData.paymentApp === 'other' && !formData.otherPaymentApp) {
        newErrors.otherPaymentApp = 'Please specify the payment app';
      }
    } else if (activeTab === 'crypto') {
      if (!formData.selectedCrypto) newErrors.selectedCrypto = 'Please select a cryptocurrency';
      if (formData.selectedCrypto) {
        if (!formData.transactionHash) newErrors.transactionHash = 'Transaction hash is required';
        if (!formData.cryptoDepositTime) newErrors.cryptoDepositTime = 'Please select when you made the transaction';
        if (!formData.cryptoAmount) newErrors.cryptoAmount = 'Amount sent is required';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Handle form submission
  const handleSubmit = () => {
    if (validateForm()) {
      setIsSubmitting(true);
      
      // Simulate API call with timeout
      setTimeout(() => {
        setIsSubmitting(false);
        // Show success message
        alert(`${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} deposit request submitted successfully!`);
        
        // Reset form
        setFormData({});
      }, 1500);
    }
  };
  
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
  
  // Side drawer for mobile view
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
                  leftIcon={<Wallet size={14} />}
                >
                  Add Money
                </Button>
                <ArrowRight size={16} className="text-purple-600" />
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <button 
              className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-gray-100 transition-all duration-300"
              onClick={() => {
                navigate('/');
                setShowSidebar(false);
              }}
            >
              <Home className="h-5 w-5 text-purple-600" />
              <span>Home</span>
            </button>
            <button 
              className="flex items-center gap-3 w-full p-3 rounded-lg bg-purple-50 text-purple-700 transition-all duration-300"
            >
              <BanknoteIcon className="h-5 w-5 text-purple-600" />
              <span className="font-medium">Deposit</span>
            </button>
            <button 
              className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-gray-100 transition-all duration-300"
              onClick={() => {
                navigate('/withdraw');
                setShowSidebar(false);
              }}
            >
              <ArrowDownToLine className="h-5 w-5 text-purple-600" />
              <span>Withdraw</span>
            </button>
            <button 
              className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-gray-100 transition-all duration-300"
              onClick={() => {
                navigate('/transaction');
                setShowSidebar(false);
              }}
            >
              <ReceiptText className="h-5 w-5 text-purple-600" />
              <span>Transactions</span>
            </button>
            <button 
              className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-gray-100 transition-all duration-300"
              onClick={() => {
                navigate('/analytics');
                setShowSidebar(false);
              }}
            >
              <PieChart className="h-5 w-5 text-amber-500" />
              <span>Analytics</span>
            </button>
            <button 
              className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-gray-100 transition-all duration-300"
              onClick={() => {
                navigate('/profile');
                setShowSidebar(false);
              }}
            >
              <User className="h-5 w-5 text-green-500" />
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
                leftIcon={<Clock size={14} />}
              >
                History
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
          
          <Tabs defaultValue="online" className="w-full" value={activeTab} onValueChange={setActiveTab}>
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
                  <OnlineDepositMethod 
                    formData={formData} 
                    setFormData={setFormData} 
                    errors={errors} 
                  />
                </TabsContent>
                
                <TabsContent value="code" className="mt-0">
                  <CodeDepositMethod 
                    formData={formData} 
                    setFormData={setFormData} 
                    errors={errors} 
                  />
                </TabsContent>
                
                <TabsContent value="bank" className="mt-0">
                  <BankDepositMethod 
                    formData={formData} 
                    setFormData={setFormData} 
                    errors={errors} 
                  />
                </TabsContent>
                
                <TabsContent value="cash" className="mt-0">
                  <CashDepositMethod 
                    formData={formData} 
                    setFormData={setFormData} 
                    errors={errors} 
                  />
                </TabsContent>
                
                <TabsContent value="crypto" className="mt-0">
                  <CryptoDepositMethod 
                    formData={formData} 
                    setFormData={setFormData} 
                    errors={errors} 
                  />
                </TabsContent>
                
                {/* Submit button */}
                <div className="mt-6 px-1">
                  <Button
                    type="button"
                    variant="default"
                    size="xl"
                    fullWidth
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full"></div>
                        Processing...
                      </>
                    ) : (
                      <>Submit {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Deposit</>
                    )}
                  </Button>
                </div>
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
              rightIcon={<ChevronRight size={16} />}
            >
              View All
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
      {<BottomNavigation />}
      
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
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default DepositPage;
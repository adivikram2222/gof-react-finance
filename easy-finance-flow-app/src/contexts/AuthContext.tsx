import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isOtpVerified: boolean;
  isPasswordReset: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  verifyOtp: (otp: string) => Promise<boolean>;
  resetPassword: (password: string) => Promise<boolean>;
  completeSetup: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    // Check localStorage for existing user
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  
  // Authentication flow states
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [isPasswordReset, setIsPasswordReset] = useState(false);
  const [tempUserEmail, setTempUserEmail] = useState<string | null>(null);

  // Mock login functionality
  const login = async (email: string, password: string) => {
    // In test mode, accept any credentials
    setTempUserEmail(email);
    
    // For demo purposes, we'll still keep the original check but allow any credentials
    if (process.env.NODE_ENV === 'production') {
      if (email === "user@example.com" && password === "password") {
        // In a real app, you would not set the user here,
        // but wait until after OTP verification
        return true;
      }
      return false;
    }
    
    // In development/test mode, accept any credentials
    return true;
  };

  // Mock OTP verification
  const verifyOtp = async (otp: string) => {
    // For demo purposes, accept "123456" as valid OTP
    if (otp === "123456") {
      setIsOtpVerified(true);
      return true;
    }
    return false;
  };

  // Mock password reset
  const resetPassword = async (password: string) => {
    // In a real app, you would make an API call here
    setIsPasswordReset(true);
    return true;
  };

  // Complete the setup process and set the user
  const completeSetup = () => {
    if (isOtpVerified && isPasswordReset && tempUserEmail) {
      const newUser = {
        id: "1",
        name: tempUserEmail.split('@')[0], // Extract name from email
        email: tempUserEmail,
        avatar: "temp.png",
      };
      
      setUser(newUser);
      
      // Store in localStorage for persistence
      localStorage.setItem('user', JSON.stringify(newUser));
      
      // Reset flow states
      setIsOtpVerified(false);
      setIsPasswordReset(false);
      setTempUserEmail(null);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    setIsOtpVerified(false);
    setIsPasswordReset(false);
    setTempUserEmail(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isOtpVerified,
        isPasswordReset,
        login,
        verifyOtp,
        resetPassword,
        completeSetup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
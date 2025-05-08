import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { toast } from 'sonner';
import { Eye, EyeOff, Lock, KeyRound, ArrowRight, CheckCircle, AlertCircle } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

const NewPasswordSetup = () => {
  const navigate = useNavigate();
  const { resetPassword } = useAuth();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [passwordFeedback, setPasswordFeedback] = useState('');
  
  // Password requirements
  const requirements = [
    { label: 'At least 8 characters', test: (pwd: string) => pwd.length >= 8 },
    { label: 'At least one uppercase letter', test: (pwd: string) => /[A-Z]/.test(pwd) },
    { label: 'At least one lowercase letter', test: (pwd: string) => /[a-z]/.test(pwd) },
    { label: 'At least one number', test: (pwd: string) => /[0-9]/.test(pwd) },
    { label: 'At least one special character', test: (pwd: string) => /[^A-Za-z0-9]/.test(pwd) },
  ];
  
  // Calculate password strength and feedback
  useEffect(() => {
    if (password.length === 0) {
      setPasswordStrength(0);
      setPasswordFeedback('');
      return;
    }
    
    const passedRequirements = requirements.filter(req => req.test(password)).length;
    const strengthValue = Math.min(100, (passedRequirements / requirements.length) * 100);
    setPasswordStrength(strengthValue);
    
    if (strengthValue < 40) {
      setPasswordFeedback('Weak password');
    } else if (strengthValue < 70) {
      setPasswordFeedback('Moderate password');
    } else {
      setPasswordFeedback('Strong password');
    }
  }, [password]);

  const getPasswordStrengthColor = () => {
    if (passwordStrength < 40) return 'bg-red-500';
    if (passwordStrength < 70) return 'bg-yellow-500';
    return 'bg-green-500';
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast.error("Passwords don't match");
      return;
    }
    
    // Check if all requirements are met
    const allRequirementsMet = requirements.every(req => req.test(password));
    if (!allRequirementsMet) {
      toast.error("Please ensure all password requirements are met");
      return;
    }
    
    setLoading(true);
    
    try {
      const success = await resetPassword(password);
      if (success) {
        toast.success("New password set successfully!");
        navigate('/setup-success');
      } else {
        toast.error("Failed to set password. Please try again.");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-blue-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo or branding element */}
        <div className="mb-8 text-center">
          <div className="h-16 w-16 bg-white rounded-full mx-auto flex items-center justify-center shadow-lg">
            <KeyRound className="h-8 w-8 text-indigo-600" />
          </div>
          <h1 className="mt-4 text-2xl font-bold text-white">Create New Password</h1>
        </div>
        
        <Card className="border-0 shadow-xl">
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl font-bold text-center text-gray-800">
              Set New Password
            </CardTitle>
            <CardDescription className="text-center text-gray-500">
              Your new password must be different from previous passwords
            </CardDescription>
          </CardHeader>
          
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Password Field */}
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium text-gray-700 flex items-center gap-1">
                  <Lock className="h-4 w-4" />
                  New Password
                </label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your new password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-3 pr-10 py-2 border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 rounded-md shadow-sm"
                    required
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
                
                {/* Password strength indicator */}
                {password.length > 0 && (
                  <div className="space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-medium">Password strength:</span>
                      <span className={`text-xs font-medium ${
                        passwordStrength < 40 ? 'text-red-500' : 
                        passwordStrength < 70 ? 'text-yellow-500' : 'text-green-500'
                      }`}>{passwordFeedback}</span>
                    </div>
                    <Progress 
                      value={passwordStrength} 
                      className="h-1.5 bg-gray-200"
                    />
                  </div>
                )}
              </div>
              
              {/* Confirm Password Field */}
              <div className="space-y-2">
                <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700 flex items-center gap-1">
                  <Lock className="h-4 w-4" />
                  Confirm Password
                </label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className={`pl-3 pr-10 py-2 border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 rounded-md shadow-sm ${
                      confirmPassword && password !== confirmPassword ? 'border-red-500 ring-red-500' : ''
                    }`}
                    required
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
                {confirmPassword && password !== confirmPassword && (
                  <p className="text-xs text-red-500 mt-1">Passwords don't match</p>
                )}
              </div>
              
              {/* Password requirements */}
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-xs font-medium text-gray-700 mb-2">Password requirements:</p>
                <ul className="space-y-1">
                  {requirements.map((req, index) => (
                    <li key={index} className="flex items-center text-xs">
                      {password && req.test(password) ? (
                        <CheckCircle className="h-3.5 w-3.5 mr-2 text-green-500" />
                      ) : (
                        <AlertCircle className="h-3.5 w-3.5 mr-2 text-gray-400" />
                      )}
                      <span className={`${password && req.test(password) ? 'text-green-700' : 'text-gray-600'}`}>
                        {req.label}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <Button
                type="submit"
                className="w-full py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 flex items-center justify-center gap-2"
                disabled={loading || !password || !confirmPassword || password !== confirmPassword}
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Setting password...</span>
                  </div>
                ) : (
                  <>
                    <span>Set Password</span>
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
        
        <div className="mt-6 text-center text-xs text-indigo-200">
          <p>© 2025 Your Company. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default NewPasswordSetup;
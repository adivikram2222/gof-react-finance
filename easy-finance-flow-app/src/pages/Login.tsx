import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';
import { Eye, EyeOff, Lock, Fingerprint, ArrowRight, AlertTriangle } from 'lucide-react';

const Login = () => {
  const [gofId, setGofId] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  
  // Modified for testing - accepts any credentials
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const success = await login(gofId, password);
      if (success) {
        toast.success("Login successful", {
          description: "Verification required"
        });
        navigate('/verify-otp');
      } else {
        toast.error("Authentication failed", {
          description: "Please check your credentials and try again"
        });
      }
    } catch (error) {
      toast.error("System error", {
        description: "An unexpected error occurred. Please try again later."
      });
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-blue-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo or branding element */}
        <div className="mb-8 text-center">
          <div className="h-16 w-16 bg-white rounded-full mx-auto flex items-center justify-center shadow-lg">
            <Fingerprint className="h-8 w-8 text-indigo-600" />
          </div>
          <h1 className="mt-4 text-2xl font-bold text-white">Security Portal</h1>
        </div>
        
        <Card className="border-0 shadow-xl">
          <CardHeader className="pb-2">
            <Alert className="mb-4 bg-yellow-50 border border-yellow-200 text-yellow-800">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                Test Mode Active: Any ID and password will be accepted
              </AlertDescription>
            </Alert>
            
            <CardTitle className="text-2xl font-bold text-center text-gray-800">
              Authentication Required
            </CardTitle>
            <CardDescription className="text-center text-gray-500">
              Enter any credentials for testing
            </CardDescription>
          </CardHeader>
          
          <CardContent className="pt-4">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <label htmlFor="gofId" className="text-sm font-medium text-gray-700 flex items-center gap-1">
                  <Fingerprint className="h-4 w-4" />
                  GOF Unique ID
                </label>
                <div className="relative">
                  <Input
                    id="gofId"
                    type="text"
                    placeholder="Enter any ID (test mode)"
                    value={gofId}
                    onChange={(e) => setGofId(e.target.value)}
                    className="pl-3 pr-3 py-2 border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 rounded-md shadow-sm"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium text-gray-700 flex items-center gap-1">
                  <Lock className="h-4 w-4" />
                  Password
                </label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter any password (test mode)"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-3 pr-10 py-2 border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 rounded-md shadow-sm"
                    required
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Checkbox
                    id="remember-me"
                    checked={rememberMe}
                    onCheckedChange={setRememberMe}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                    Remember me
                  </label>
                </div>
                
                <div className="text-sm">
                  <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                    Forgot password?
                  </a>
                </div>
              </div>
              
              <Button
                type="submit"
                className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 flex items-center justify-center gap-2"
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Authenticating...</span>
                  </div>
                ) : (
                  <>
                    <span>Sign In (Test Mode)</span>
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </Button>
            </form>
          </CardContent>
          
          <CardFooter className="pt-0 pb-4 flex flex-col">
            <div className="w-full border-t border-gray-200 my-4"></div>
            <div className="text-center text-sm text-gray-500">
              <p>Testing mode: Enter any ID and password</p>
            </div>
          </CardFooter>
        </Card>
        
        <div className="mt-6 text-center text-xs text-indigo-200">
          <p>© 2025 Your Company. All rights reserved.</p>
          <p className="mt-1">v2.4.1 (Test Build)</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
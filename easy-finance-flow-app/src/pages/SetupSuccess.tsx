import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import { CheckCircle, ArrowRight } from 'lucide-react';

const SetupSuccess = () => {
  const navigate = useNavigate();
  const { completeSetup } = useAuth();
  
  useEffect(() => {
    // Complete the setup in AuthContext
    completeSetup();
    
    // Auto-redirect after 5 seconds
    const timer = setTimeout(() => {
      navigate('/');
    }, 5000);
    
    return () => clearTimeout(timer);
  }, [navigate, completeSetup]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-blue-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="border-0 shadow-xl">
          <CardContent className="pt-10 pb-8 flex flex-col items-center">
            <div className="bg-green-100 p-6 rounded-full mb-6">
              <CheckCircle className="h-16 w-16 text-green-500" />
            </div>
            
            <CardTitle className="text-2xl font-bold text-center text-gray-800 mb-3">
              Password Updated Successfully
            </CardTitle>
            
            <CardDescription className="text-center text-gray-500 mb-8 max-w-xs">
              Your password has been updated successfully. You will be redirected to the home screen in a few seconds.
            </CardDescription>
            
            <Button
              className="w-full py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 flex items-center justify-center gap-2"
              onClick={() => navigate('/')}
            >
              <span>Continue to Home</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
        
        <div className="mt-6 text-center text-xs text-indigo-200">
          <p>© 2025 Your Company. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default SetupSuccess;
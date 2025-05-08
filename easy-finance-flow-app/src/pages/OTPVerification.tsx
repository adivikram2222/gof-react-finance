import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from '@/components/ui/card';
import { toast } from 'sonner';
import { ArrowRight, ArrowLeft, Mail, Clock } from 'lucide-react';

const OTPVerification = () => {
  const navigate = useNavigate();
  const { verifyOtp } = useAuth();
  const [loading, setLoading] = useState(false);
  const [email] = useState("j***a@example.com"); // Masked email
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [resendTimer, setResendTimer] = useState(30);
  const [resendDisabled, setResendDisabled] = useState(true);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Auto-focus and move to next input
  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) {
      // If user pastes multiple digits, handle that
      const digits = value.split('').slice(0, 6);
      const newOtp = [...otp];
      
      digits.forEach((digit, i) => {
        if (index + i < 6) newOtp[index + i] = digit;
      });
      
      setOtp(newOtp);
      
      // Focus on the input after the last filled one
      const newIndex = Math.min(index + digits.length, 5);
      inputRefs.current[newIndex]?.focus();
    } else {
      // Normal single digit entry
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      
      // Move to next input if current one is filled
      if (value !== '' && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  // Handle backspace - move to previous input
  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && otp[index] === '' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  // Handle resend timer
  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => {
        setResendTimer(resendTimer - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setResendDisabled(false);
    }
  }, [resendTimer]);

  const handleResendOtp = () => {
    setResendDisabled(true);
    setResendTimer(30);
    toast.success("New OTP has been sent to your email");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const otpValue = otp.join('');
    
    try {
      const success = await verifyOtp(otpValue);
      if (success) {
        toast.success("OTP verified successfully");
        navigate('/set-password');
      } else {
        toast.error("Invalid OTP. Try 123456 for demo");
      }
    } catch (error) {
      toast.error("An error occurred during verification");
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
            <Mail className="h-8 w-8 text-indigo-600" />
          </div>
          <h1 className="mt-4 text-2xl font-bold text-white">Email Verification</h1>
        </div>
        
        <Card className="border-0 shadow-xl">
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl font-bold text-center text-gray-800">
              Enter Verification Code
            </CardTitle>
            <CardDescription className="text-center text-gray-500">
              We've sent a 6-digit code to {email}
            </CardDescription>
          </CardHeader>
          
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex justify-center gap-2">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={el => inputRefs.current[index] = el}
                    type="text"
                    value={digit}
                    onChange={e => handleOtpChange(index, e.target.value)}
                    onKeyDown={e => handleKeyDown(index, e)}
                    className="w-12 h-14 text-2xl font-bold text-center border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    maxLength={1}
                    inputMode="numeric"
                    pattern="[0-9]*"
                    autoComplete="one-time-code"
                  />
                ))}
              </div>
              
              <div className="flex justify-center">
                <p className="text-sm text-gray-500">
                  {resendDisabled 
                    ? `Resend code in ${resendTimer}s` 
                    : "Didn't receive the code?"}
                </p>
              </div>
              
              <div className="flex justify-center">
                <Button
                  type="button"
                  variant="link"
                  className="text-indigo-600 hover:text-indigo-800"
                  onClick={handleResendOtp}
                  disabled={resendDisabled}
                >
                  {resendDisabled ? (
                    <Clock className="mr-1 h-4 w-4" />
                  ) : null}
                  Resend code
                </Button>
              </div>
              
              <Button
                type="submit"
                className="w-full py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 flex items-center justify-center gap-2"
                disabled={loading || otp.some(digit => digit === '')}
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Verifying...</span>
                  </div>
                ) : (
                  <>
                    <span>Verify & Continue</span>
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </Button>
            </form>
          </CardContent>
          
          <CardFooter className="pt-0 pb-4 flex justify-center">
            <Button 
              variant="ghost" 
              className="text-gray-500 flex items-center gap-1"
              onClick={() => navigate('/login')}
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to login</span>
            </Button>
          </CardFooter>
        </Card>
        
        <div className="mt-6 text-center text-xs text-indigo-200">
          <p>Having trouble? Contact support@example.com</p>
        </div>
      </div>
    </div>
  );
};

export default OTPVerification;
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import AppLayout from "./components/AppLayout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import OTPVerification from "./pages/OTPVerification";
import NewPasswordSetup from "./pages/NewPasswordSetup";
import SetupSuccess from "./pages/SetupSuccess";
import Transaction from "./pages/Transaction";
import Withdraw from "./pages/Withdraw";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Protected Route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

// Public route that redirects authenticated users
const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  return !isAuthenticated ? <>{children}</> : <Navigate to="/" />;
};

const AppRoutes = () => {
  return (
    <Routes>
      {/* Application pages with layout */}
      <Route path="/" element={<AppLayout />}>
        <Route index element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="transaction" element={<ProtectedRoute><Transaction /></ProtectedRoute>} />
        <Route path="withdraw" element={<ProtectedRoute><Withdraw /></ProtectedRoute>} />
      </Route>
      
      {/* Authentication pages without layout */}
      <Route path="login" element={<PublicRoute><Login /></PublicRoute>} />
      <Route path="verify-otp" element={<PublicRoute><OTPVerification /></PublicRoute>} />
      <Route path="set-password" element={<PublicRoute><NewPasswordSetup /></PublicRoute>} />
      <Route path="setup-success" element={<PublicRoute><SetupSuccess /></PublicRoute>} />
      
      {/* 404 page */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
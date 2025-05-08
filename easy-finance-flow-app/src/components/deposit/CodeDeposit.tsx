import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { QrCode } from 'lucide-react';
import DepositForm from './DepositForm';
import { toast } from '@/hooks/use-toast';

const CodeDeposit = () => {
  const [depositCode, setDepositCode] = useState('');
  const [isCodeVerified, setIsCodeVerified] = useState(false);

  const handleVerifyCode = () => {
    if (depositCode.trim().toUpperCase().startsWith("DEP-")) {
      setIsCodeVerified(true);
      toast({
        title: "Code verified!",
        description: "Deposit code accepted. Proceed with submission.",
      });
    } else {
      toast({
        title: "Invalid code",
        description: "Please enter a valid deposit code starting with 'DEP-'",
        variant: "destructive",
      });
    }
  };

  const handleDownloadQRCode = () => {
    // Placeholder for real download logic
    toast({ title: "Download started", description: "QR code download not implemented." });
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Deposit via Code</h2>
      <p className="text-muted-foreground mb-6">
        Scan the QR code or enter the deposit code to make a payment.
      </p>

      <div className="flex flex-col md:flex-row gap-8 mb-8">
        <div className="flex-1 border rounded-lg p-6 flex flex-col items-center">
          <div className="bg-slate-100 p-8 rounded-lg mb-4">
            <QrCode className="h-40 w-40 mx-auto" />
          </div>
          <p className="text-sm text-center">Scan this QR code with your banking app</p>
          <Button variant="outline" className="mt-4" onClick={handleDownloadQRCode}>
            Download QR Code
          </Button>
        </div>

        <div className="flex-1 border rounded-lg p-6">
          <h3 className="font-medium mb-4">Have a deposit code?</h3>
          <div className="space-y-4">
            <div>
              <p className="text-sm mb-2">Enter your deposit code</p>
              <Input
                placeholder="Enter code (e.g. DEP-12345)"
                value={depositCode}
                onChange={(e) => setDepositCode(e.target.value)}
              />
            </div>
            <Button className="w-full" onClick={handleVerifyCode}>
              Verify Code
            </Button>
          </div>
        </div>
      </div>

      {isCodeVerified && (
        <div className="border-t pt-6">
          <h3 className="font-medium mb-4">After payment, submit your details</h3>
          <DepositForm method="code" title="Code Deposit" extraData={{ depositCode }} />
        </div>
      )}
    </div>
  );
};

export default CodeDeposit;

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { UserCheck } from 'lucide-react';
import DepositForm from './DepositForm';

const CashDeposit = () => {
  const [verificationStep, setVerificationStep] = useState(1);
  const [verifications, setVerifications] = useState<string[]>([]);
  const [currentMember, setCurrentMember] = useState('');

  const handleAddMember = () => {
    if (currentMember && verifications.length < 5) {
      setVerifications([...verifications, currentMember]);
      setCurrentMember('');
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h2 className="text-2xl font-bold mb-2">Cash Deposit</h2>
      <p className="text-muted-foreground text-sm mb-6">
        For cash deposits, verification by 5 members is required as per our security protocol.
      </p>

      {verificationStep === 1 ? (
        <Card className="p-6 sm:p-8 mb-10 shadow-sm border rounded-xl">
          <h3 className="text-lg font-semibold flex items-center gap-2 mb-6">
            <UserCheck className="h-5 w-5 text-purple-500" />
            Member Verification ({verifications.length}/5)
          </h3>

          <div className="space-y-5">
            <div className="space-y-4">
              {verifications.map((member, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-md">
                  <div className="flex items-center gap-3">
                    <div className="bg-green-100 h-8 w-8 rounded-full flex items-center justify-center">
                      <UserCheck className="h-4 w-4 text-green-600" />
                    </div>
                    <span className="text-sm">{member}</span>
                  </div>
                  <span className="text-sm text-green-600 font-medium">Verified</span>
                </div>
              ))}

              {verifications.length < 5 && (
                <div className="flex flex-col sm:flex-row gap-3">
                  <Input 
                    placeholder="Enter member ID or name"
                    value={currentMember}
                    onChange={(e) => setCurrentMember(e.target.value)}
                    className="flex-1"
                  />
                  <Button onClick={handleAddMember} className="w-full sm:w-auto">Add</Button>
                </div>
              )}
            </div>

            <Button
              className="w-full"
              disabled={verifications.length < 5}
              onClick={() => setVerificationStep(2)}
            >
              {verifications.length < 5
                ? `Add ${5 - verifications.length} more member(s)`
                : "Continue to deposit form"}
            </Button>
          </div>
        </Card>
      ) : (
        <div className="space-y-6">
          <Button
            variant="ghost"
            onClick={() => setVerificationStep(1)}
            className="text-sm"
          >
            ← Back to verification
          </Button>
          <h3 className="text-lg font-medium">Complete your cash deposit</h3>
          <div className="bg-white p-6 sm:p-8 border rounded-lg shadow-sm">
            <DepositForm method="cash" title="Cash Deposit" />
          </div>
        </div>
      )}
    </div>
  );
};

export default CashDeposit;

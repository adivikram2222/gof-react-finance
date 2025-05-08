import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight } from 'lucide-react';
import DepositForm from './DepositForm';

const OnlineDeposit = () => {
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);

  const paymentMethods = [
    { id: 'imps', name: 'IMPS', description: 'Immediate Payment Service' },
    { id: 'rtgs', name: 'RTGS', description: 'Real Time Gross Settlement' },
    { id: 'neft', name: 'NEFT', description: 'National Electronic Funds Transfer' },
    { id: 'upi', name: 'UPI', description: 'Unified Payment Interface' },
    { id: 'netbanking', name: 'Net Banking', description: 'Bank Online Transfer' },
  ];

  if (selectedMethod) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Button
          variant="ghost"
          onClick={() => setSelectedMethod(null)}
          className="mb-4 text-sm"
        >
          ← Back to payment methods
        </Button>
        <h3 className="text-lg font-medium mb-4">
          Complete your deposit via {paymentMethods.find(m => m.id === selectedMethod)?.name}
        </h3>
        <div className="bg-white p-6 sm:p-8 border rounded-lg shadow-sm">
          <DepositForm
            method={selectedMethod}
            title={paymentMethods.find(m => m.id === selectedMethod)?.name || selectedMethod}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h2 className="text-2xl font-bold mb-2">Online Deposit Methods</h2>
      <p className="text-muted-foreground text-sm mb-6">
        Please select a payment method to continue with your deposit.
      </p>

      <div className="grid gap-4">
        {paymentMethods.map((method) => (
          <div
            key={method.id}
            onClick={() => setSelectedMethod(method.id)}
            className="flex items-center justify-between p-4 border rounded-xl cursor-pointer hover:bg-slate-50 transition-colors shadow-sm"
          >
            <div>
              <h3 className="font-medium text-base">{method.name}</h3>
              <p className="text-sm text-muted-foreground">{method.description}</p>
            </div>
            <ArrowRight className="h-5 w-5 text-muted-foreground" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default OnlineDeposit;

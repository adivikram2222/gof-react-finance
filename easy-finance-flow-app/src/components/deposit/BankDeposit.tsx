import React from 'react';
import { Button } from "@/components/ui/button";
import { BanknoteIcon, Copy } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import DepositForm from './DepositForm';

const BankDeposit = () => {
  const bankDetails = [
    { label: 'Bank Name', value: 'National Bank Ltd' },
    { label: 'Account Name', value: 'OrgaPay Ltd' },
    { label: 'Account Number', value: '1234567890123456' },
    { label: 'IFSC Code', value: 'NATL0001234' },
    { label: 'Account Type', value: 'Current Account' },
    { label: 'Branch', value: 'Main Branch, Financial District' }
  ];

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: `${label} copied to clipboard`,
      duration: 2000,
    });
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h2 className="text-2xl font-bold mb-2">Bank Deposit</h2>
      <p className="text-muted-foreground text-sm mb-6">
        Transfer funds to our bank account using the details below.
      </p>

      <div className="bg-slate-50 p-6 sm:p-8 rounded-xl border shadow-sm mb-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-purple-100 p-2 rounded-full">
            <BanknoteIcon className="h-6 w-6 text-purple-600" />
          </div>
          <h3 className="text-lg font-semibold">Bank Account Details</h3>
        </div>

        <div className="space-y-5">
          {bankDetails.map((detail) => (
            <div key={detail.label} className="flex justify-between items-center border-b pb-2">
              <p className="text-sm text-muted-foreground">{detail.label}</p>
              <div className="flex items-center gap-2">
                <p className="font-medium text-sm">{detail.value}</p>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6"
                  onClick={() => copyToClipboard(detail.value, detail.label)}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-6 border-t">
        <h3 className="text-lg font-medium mb-4">After transferring, submit your details</h3>
        <div className="bg-white p-6 sm:p-8 border rounded-lg shadow-sm">
          <DepositForm method="bank" title="Bank Deposit" />
        </div>
      </div>
    </div>
  );
};

export default BankDeposit;

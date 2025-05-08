import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Copy, Coins } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import DepositForm from './DepositForm';

const cryptoOptions = [
  { id: 'btc', name: 'Bitcoin (BTC)', address: '3FZbgi29cpjq2GjdwV8eyHuJJnkLtktZc5' },
  { id: 'eth', name: 'Ethereum (ETH)', address: '0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7' },
  { id: 'usdt', name: 'Tether (USDT)', address: 'TYbiK8xgL5adyVJ9YcGVBJ9xbtXC9xHnhA' },
];

const CryptoDeposit = () => {
  const [selectedCrypto, setSelectedCrypto] = useState('btc');
  const currentCrypto = cryptoOptions.find(option => option.id === selectedCrypto)!;

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "Address copied!",
        description: "Wallet address copied to clipboard.",
        duration: 2000,
      });
    } catch {
      toast({
        title: "Copy failed",
        description: "Could not copy to clipboard. Please try manually.",
        variant: "destructive",
      });
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Crypto Deposit</h2>
      <p className="text-muted-foreground mb-6">
        Deposit cryptocurrency to our wallet addresses. Ensure you're sending the correct currency.
      </p>

      <Tabs value={selectedCrypto} onValueChange={setSelectedCrypto} className="mb-8">
        <TabsList className="mb-4">
          {cryptoOptions.map(crypto => (
            <TabsTrigger key={crypto.id} value={crypto.id}>
              {crypto.name}
            </TabsTrigger>
          ))}
        </TabsList>

        {cryptoOptions.map(crypto => (
          <TabsContent key={crypto.id} value={crypto.id}>
            <div className="border rounded-lg p-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="bg-purple-100 p-2 rounded-full">
                  <Coins className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="font-semibold">{crypto.name} Wallet</h3>
              </div>

              <div className="bg-slate-50 p-4 rounded-md flex items-center justify-between">
                <p className="text-sm font-mono break-all">{crypto.address}</p>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => copyToClipboard(crypto.address)}
                  aria-label={`Copy ${crypto.name} address`}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>

              <p className="text-sm text-muted-foreground">
                <strong>IMPORTANT:</strong> Only send <strong>{crypto.name}</strong> to this address. 
                Sending any other type of cryptocurrency may result in permanent loss.
              </p>
            </div>
          </TabsContent>
        ))}
      </Tabs>

      <div className="border-t pt-6">
        <h3 className="font-medium mb-4">After sending crypto, submit your details</h3>
        <DepositForm 
          method="crypto" 
          title={`${currentCrypto.name} Deposit`} 
          extraData={{ address: currentCrypto.address }}
        />
      </div>
    </div>
  );
};

export default CryptoDeposit;

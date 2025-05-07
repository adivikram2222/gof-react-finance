
import React from 'react';
import { Signal, Wifi, Battery } from 'lucide-react';

interface MobileStatusBarProps {
  time?: string;
  batteryLevel?: string;
}

const MobileStatusBar: React.FC<MobileStatusBarProps> = ({
  time = "9:41",
  batteryLevel = "100%",
}) => {
  return (
    <div className="mobile-status-bar bg-purple-dark flex justify-between items-center py-1 px-4 text-white text-xs">
      <div>{time}</div>
      <div className="flex items-center space-x-2">
        <Signal size={14} />
        <Wifi size={14} />
        <span>{batteryLevel}</span>
      </div>
    </div>
  );
};

export default MobileStatusBar;

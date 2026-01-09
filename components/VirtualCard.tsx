
import React, { useState } from 'react';
import { VirtualCard as IVirtualCard } from '../types';

interface VirtualCardProps {
  card: IVirtualCard;
}

const VirtualCard: React.FC<VirtualCardProps> = ({ card }) => {
  const [showDetails, setShowDetails] = useState(false);

  const maskCardNumber = (num: string) => {
    return showDetails ? num : `**** **** **** ${num.slice(-4)}`;
  };

  return (
    <div className="relative group perspective-1000">
      <div className={`w-full h-56 rounded-3xl card-glass p-8 flex flex-col justify-between transition-all duration-500 transform hover:scale-[1.02] shadow-2xl ${card.isFrozen ? 'opacity-50 grayscale' : ''}`}>
        
        {/* Top Section */}
        <div className="flex justify-between items-start">
          <div className="flex flex-col">
            <p className="text-xs font-medium text-white/50 tracking-widest uppercase">NexusPay Virtual</p>
            <h3 className="text-lg font-bold text-white mt-1">{card.type} Platinum</h3>
          </div>
          <div className="w-12 h-12 flex items-center justify-center">
             <i className={`fab fa-cc-${card.type.toLowerCase()} text-4xl text-white/80`}></i>
          </div>
        </div>

        {/* Chip Section */}
        <div className="flex items-center space-x-3 -mt-4">
            <div className="w-10 h-7 bg-yellow-500/20 rounded-md border border-yellow-500/40 flex items-center justify-center">
                <div className="w-6 h-4 border-t border-b border-yellow-500/50"></div>
            </div>
            <i className="fas fa-wifi text-white/40 rotate-90 text-sm"></i>
        </div>

        {/* Card Details */}
        <div className="mt-auto">
          <div className="flex justify-between items-end">
            <div>
              <p className="text-xl md:text-2xl font-mono tracking-[0.2em] text-white">
                {maskCardNumber(card.cardNumber)}
              </p>
              <div className="flex space-x-8 mt-4">
                <div>
                  <p className="text-[10px] text-white/40 uppercase tracking-tighter">Expiry</p>
                  <p className="text-sm font-semibold">{card.expiry}</p>
                </div>
                <div>
                  <p className="text-[10px] text-white/40 uppercase tracking-tighter">CVV</p>
                  <p className="text-sm font-semibold">{showDetails ? card.cvv : '***'}</p>
                </div>
                <div className="flex-1">
                   <p className="text-[10px] text-white/40 uppercase tracking-tighter">Card Holder</p>
                   <p className="text-sm font-semibold truncate">{card.holderName}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Toggle Button */}
        <button 
          onClick={() => setShowDetails(!showDetails)}
          className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors"
          title={showDetails ? "Hide Details" : "Show Details"}
        >
          <i className={`fas ${showDetails ? 'fa-eye-slash' : 'fa-eye'} text-xs`}></i>
        </button>
      </div>

      {card.isFrozen && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="bg-red-500 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest shadow-lg">
            Card Frozen
          </div>
        </div>
      )}
    </div>
  );
};

export default VirtualCard;

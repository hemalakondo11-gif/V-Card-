
import React, { useState } from 'react';
import { MOCK_CARD, MOCK_TRANSACTIONS, EXCHANGE_RATE } from '../services/mockBackend';
import VirtualCard from './VirtualCard';
import { Transaction, TransactionStatus, TransactionType } from '../types';

const Dashboard: React.FC = () => {
  const [bdtBalance, setBdtBalance] = useState(12450.75);
  const [usdBalance, setUsdBalance] = useState(245.50);
  const [isDepositing, setIsDepositing] = useState(false);
  const [isConverting, setIsConverting] = useState(false);

  return (
    <div className="min-h-screen bg-[#0a0a0b] text-white p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
              Welcome back, Rakibul
            </h1>
            <p className="text-white/50 text-sm">NexusPay Fintech Dashboard • Verified Account</p>
          </div>
          <div className="flex items-center space-x-3">
            <button className="glass p-2 px-4 rounded-xl flex items-center space-x-2 text-sm hover:bg-white/10 transition-colors">
              <i className="fas fa-bell"></i>
              <span>8</span>
            </button>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center border border-white/10">
              <span className="font-bold">RH</span>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Wallet & Cards */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Wallet Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="glass p-6 rounded-3xl relative overflow-hidden group">
                 <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity">
                    <i className="fas fa-wallet text-8xl"></i>
                 </div>
                 <div className="flex justify-between items-start mb-4">
                    <span className="text-white/40 text-sm font-medium">Local Wallet</span>
                    <span className="bg-green-500/20 text-green-400 text-[10px] px-2 py-0.5 rounded-full font-bold">BDT</span>
                 </div>
                 <h2 className="text-3xl font-bold mb-6">৳{bdtBalance.toLocaleString()}</h2>
                 <div className="flex space-x-2">
                    <button 
                        onClick={() => setIsDepositing(true)}
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl text-sm font-semibold transition-all"
                    >
                        Deposit
                    </button>
                    <button 
                        onClick={() => setIsConverting(true)}
                        className="flex-1 bg-white/5 hover:bg-white/10 border border-white/10 text-white py-2 rounded-xl text-sm font-semibold transition-all"
                    >
                        Convert
                    </button>
                 </div>
              </div>

              <div className="glass p-6 rounded-3xl relative overflow-hidden group border-indigo-500/20">
                 <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity">
                    <i className="fas fa-globe text-8xl"></i>
                 </div>
                 <div className="flex justify-between items-start mb-4">
                    <span className="text-white/40 text-sm font-medium">USD Balance</span>
                    <span className="bg-blue-500/20 text-blue-400 text-[10px] px-2 py-0.5 rounded-full font-bold">USD</span>
                 </div>
                 <h2 className="text-3xl font-bold mb-6">${usdBalance.toLocaleString()}</h2>
                 <div className="flex space-x-2">
                    <button className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-xl text-sm font-semibold transition-all">
                        Withdraw
                    </button>
                    <button className="flex-1 bg-white/5 hover:bg-white/10 border border-white/10 text-white py-2 rounded-xl text-sm font-semibold transition-all">
                        Cards
                    </button>
                 </div>
              </div>
            </div>

            {/* Virtual Cards Section */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold">My Virtual Cards</h3>
                <button className="text-blue-400 text-sm hover:underline flex items-center space-x-1">
                   <i className="fas fa-plus-circle"></i>
                   <span>Issue New Card</span>
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <VirtualCard card={MOCK_CARD} />
                 <div className="h-56 rounded-3xl border-2 border-dashed border-white/10 flex flex-col items-center justify-center text-white/30 hover:border-white/20 hover:text-white/50 cursor-pointer transition-all">
                    <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-3">
                        <i className="fas fa-plus"></i>
                    </div>
                    <p className="text-sm font-medium">Add New Card</p>
                 </div>
              </div>
            </div>
          </div>

          {/* Right Column: Transaction History */}
          <div className="space-y-6">
             <div className="glass p-6 rounded-3xl h-full">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-bold">Recent History</h3>
                    <button className="text-white/40 text-xs hover:text-white transition-colors">View All</button>
                </div>
                <div className="space-y-4">
                    {MOCK_TRANSACTIONS.map((txn) => (
                        <div key={txn.id} className="flex items-center space-x-4 group cursor-pointer p-2 hover:bg-white/5 rounded-2xl transition-all">
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                                txn.type === TransactionType.DEPOSIT ? 'bg-green-500/10 text-green-400' : 
                                txn.type === TransactionType.CARD_SPEND ? 'bg-red-500/10 text-red-400' : 
                                'bg-blue-500/10 text-blue-400'
                            }`}>
                                <i className={`fas ${
                                    txn.type === TransactionType.DEPOSIT ? 'fa-arrow-down' : 
                                    txn.type === TransactionType.CARD_SPEND ? 'fa-shopping-bag' : 
                                    'fa-exchange-alt'
                                }`}></i>
                            </div>
                            <div className="flex-1">
                                <p className="text-sm font-semibold">{txn.description}</p>
                                <p className="text-[10px] text-white/40">{txn.date}</p>
                            </div>
                            <div className="text-right">
                                <p className={`text-sm font-bold ${
                                    txn.type === TransactionType.DEPOSIT ? 'text-green-400' : 'text-white'
                                }`}>
                                    {txn.type === TransactionType.DEPOSIT ? '+' : '-'}
                                    {txn.currency === 'BDT' ? '৳' : '$'}{txn.amount}
                                </p>
                                <p className="text-[10px] text-white/40">{txn.status}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-8 p-4 bg-blue-600/10 border border-blue-500/20 rounded-2xl">
                    <div className="flex items-center space-x-3 mb-2">
                        <i className="fas fa-info-circle text-blue-400"></i>
                        <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">Exchange Rate</span>
                    </div>
                    <p className="text-sm text-white/70">
                        Today's rate: <span className="text-white font-bold">1 USD = {EXCHANGE_RATE} BDT</span>
                    </p>
                    <p className="text-[10px] text-white/40 mt-1">Rates are updated every hour based on international market.</p>
                </div>
             </div>
          </div>
        </div>
      </div>

      {/* Deposit Modal (bKash Simulation) */}
      {isDepositing && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="glass max-w-md w-full rounded-3xl p-8 animate-in fade-in zoom-in duration-300">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold">Deposit Money</h2>
                    <button onClick={() => setIsDepositing(false)} className="text-white/40 hover:text-white"><i className="fas fa-times"></i></button>
                </div>
                <div className="space-y-6">
                    <div className="grid grid-cols-3 gap-2">
                        {['bKash', 'Nagad', 'Rocket'].map(method => (
                            <button key={method} className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-pink-500 transition-all text-center">
                                <div className="text-xs font-bold">{method}</div>
                            </button>
                        ))}
                    </div>
                    <div>
                        <label className="text-xs text-white/40 block mb-2 font-medium">Enter Amount (BDT)</label>
                        <input type="number" placeholder="৳ 0.00" className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-xl font-bold outline-none focus:border-blue-500 transition-all" />
                    </div>
                    <button className="w-full bg-pink-600 hover:bg-pink-700 p-4 rounded-xl font-bold transition-all flex items-center justify-center space-x-2">
                        <span>Checkout via SSLCommerz</span>
                        <i className="fas fa-external-link-alt text-xs"></i>
                    </button>
                    <p className="text-[10px] text-center text-white/40 uppercase tracking-widest">Secure Bank Grade Encryption</p>
                </div>
            </div>
        </div>
      )}

      {/* Conversion Modal Simulation */}
      {isConverting && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="glass max-w-md w-full rounded-3xl p-8 animate-in fade-in zoom-in duration-300">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold">Convert Currency</h2>
                    <button onClick={() => setIsConverting(false)} className="text-white/40 hover:text-white"><i className="fas fa-times"></i></button>
                </div>
                <div className="space-y-4">
                    <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
                        <p className="text-[10px] text-white/40 uppercase font-bold mb-1">From (BDT)</p>
                        <div className="flex justify-between items-center">
                            <input type="number" defaultValue="1205" className="bg-transparent text-xl font-bold outline-none w-1/2" />
                            <span className="font-bold">৳ BDT</span>
                        </div>
                    </div>
                    <div className="flex justify-center -my-3 z-10">
                        <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center border-4 border-[#0a0a0b]">
                            <i className="fas fa-arrow-down text-xs"></i>
                        </div>
                    </div>
                    <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
                        <p className="text-[10px] text-white/40 uppercase font-bold mb-1">To (USD)</p>
                        <div className="flex justify-between items-center">
                            <input type="number" value="10.00" readOnly className="bg-transparent text-xl font-bold outline-none w-1/2 opacity-50" />
                            <span className="font-bold">$ USD</span>
                        </div>
                    </div>
                    <div className="py-2 text-center text-xs text-white/40">
                        Fee: 1% • 1 USD = {EXCHANGE_RATE} BDT
                    </div>
                    <button className="w-full bg-blue-600 hover:bg-blue-700 p-4 rounded-xl font-bold transition-all">
                        Confirm Conversion
                    </button>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;

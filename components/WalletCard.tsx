import React, { useState } from 'react';

interface WalletCardProps {
  balance: number;
  name: string;
  onAddFunds: () => void;
}

export const WalletCard: React.FC<WalletCardProps> = ({ balance, name, onAddFunds }) => {
  const [showBalance, setShowBalance] = useState(true);

  return (
    <div className="relative w-full max-w-md mx-auto h-60 bg-[#ccff00] rounded-2xl p-8 shadow-[0_0_40px_rgba(204,255,0,0.15)] overflow-hidden group">
      {/* Subtle Pattern */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/20 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
      
      <div className="relative h-full flex flex-col justify-between z-10">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 rounded-md bg-black flex items-center justify-center text-[#ccff00] font-bold text-xs border border-black/10">EH</div>
                <p className="text-black/60 text-xs font-bold tracking-widest uppercase">EventHorizon</p>
            </div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-black/10 flex items-center justify-center cursor-pointer hover:bg-black/20 transition-colors" onClick={() => setShowBalance(!showBalance)}>
             {showBalance ? (
                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-black">
                   <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                   <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                 </svg>
             ) : (
                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-black">
                   <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                 </svg>
             )}
          </div>
        </div>

        <div className="text-center">
             <p className="text-black/60 text-xs uppercase tracking-wider mb-2 font-bold">Saldo Total</p>
             <h2 className="text-5xl font-semibold text-black tracking-tight">
               {showBalance ? (
                   <>
                     <span className="text-black/40 text-3xl mr-2">R$</span>
                     {balance.toFixed(2)}
                   </>
               ) : (
                   <span className="tracking-widest">••••••</span>
               )}
             </h2>
        </div>

        <div className="flex justify-between items-end">
            <div>
                <p className="text-black/50 text-[10px] uppercase font-bold mb-1">Titular</p>
                <p className="text-black font-bold text-lg tracking-wide">{name}</p>
            </div>
            <div className="flex items-center gap-1">
                 <div className="w-8 h-5 bg-black/10 rounded ml-1"></div>
                 <span className="text-black font-bold italic">VISA</span>
            </div>
        </div>
      </div>
    </div>
  );
};
import React, { useState, useMemo } from 'react';
import { Event, TicketType } from '../types';

interface EventDetailsProps {
  event: Event;
  onBack: () => void;
  onBuy: (event: Event, purchases: { ticketType: TicketType, quantity: number }[]) => void;
}

export const EventDetails: React.FC<EventDetailsProps> = ({ event, onBack, onBuy }) => {
  const [showTicketModal, setShowTicketModal] = useState(false);
  const [ticketQuantities, setTicketQuantities] = useState<Record<string, number>>({});
  const [openCategory, setOpenCategory] = useState<string | null>(null);
  const [showCouponInput, setShowCouponInput] = useState(false);
  const [couponCode, setCouponCode] = useState('');

  const minPrice = Math.min(...event.ticketTypes.map(t => t.price));

  // Group tickets by category
  const groupedTickets = useMemo(() => {
    const groups: Record<string, TicketType[]> = {};
    event.ticketTypes.forEach(ticket => {
      if (!groups[ticket.category]) {
        groups[ticket.category] = [];
      }
      groups[ticket.category].push(ticket);
    });
    return groups;
  }, [event.ticketTypes]);

  // Set initial open category
  useState(() => {
      if (Object.keys(groupedTickets).length > 0) {
          setOpenCategory(Object.keys(groupedTickets)[0]);
      }
  });

  const handleUpdateQuantity = (ticketId: string, delta: number) => {
      setTicketQuantities(prev => {
          const currentQty = prev[ticketId] || 0;
          const newQty = currentQty + delta;

          if (newQty <= 0) {
              const { [ticketId]: _, ...rest } = prev;
              return rest;
          }
          if (newQty > 10) return prev; // Max limit

          return { ...prev, [ticketId]: newQty };
      });
  };

  const toggleCategory = (category: string) => {
    setOpenCategory(prev => prev === category ? null : category);
  };

  const calculateTotal = () => {
      let total = 0;
      event.ticketTypes.forEach(ticket => {
          const qty = ticketQuantities[ticket.id] || 0;
          if (qty > 0) {
              const price = ticket.price;
              const tax = price * 0.10;
              total += (price + tax) * qty;
          }
      });
      return total;
  };

  const totalAmount = calculateTotal();
  const hasSelection = Object.keys(ticketQuantities).length > 0;

  const handleConfirmPurchase = () => {
      const purchases = event.ticketTypes
          .filter(t => (ticketQuantities[t.id] || 0) > 0)
          .map(t => ({
              ticketType: t,
              quantity: ticketQuantities[t.id]
          }));
      
      onBuy(event, purchases);
      setShowTicketModal(false);
  };

  return (
    <div className="animate-in fade-in zoom-in duration-500 bg-black min-h-screen relative">
      
      {/* Immersive Hero Section (Full Bleed) */}
      <div className="relative w-full h-[60vh]">
          <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black"></div>
          
          {/* Top Navigation */}
          <div className="absolute top-0 left-0 right-0 p-6 pt-12 flex justify-between items-center z-50">
            <button 
                onClick={onBack}
                className="w-12 h-12 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-all"
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
            </button>
            <button className="w-12 h-12 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
                </svg>
            </button>
          </div>

          {/* Floating Title & Main Info */}
          <div className="absolute bottom-16 left-0 right-0 px-6 z-20">
               <div className="flex flex-wrap items-center gap-2 mb-4">
                  <span className="px-3 py-1 bg-[#ccff00] text-black text-xs font-bold uppercase tracking-wider rounded-lg">
                    {event.category}
                  </span>
                  <span className="px-3 py-1 bg-white/10 backdrop-blur text-white text-xs font-bold uppercase tracking-wider rounded-lg border border-white/10">
                    +18 Anos
                  </span>
                  <span className="px-3 py-1 bg-black/60 backdrop-blur text-[#ccff00] text-xs font-bold uppercase tracking-wider rounded-lg border border-[#ccff00]/20 flex items-center gap-1">
                    A partir de R${minPrice}
                  </span>
               </div>
               <h1 className="text-4xl md:text-5xl font-semibold text-white leading-tight drop-shadow-2xl mb-2">{event.title}</h1>
               <div className="flex items-center gap-2 text-gray-300">
                   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-[#ccff00]">
                     <path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                   </svg>
                   <span className="text-lg">{event.location}</span>
               </div>
          </div>
      </div>

      {/* Main Content Sheet */}
      <div className="relative -mt-10 rounded-t-[40px] bg-black z-30 min-h-screen pb-32 border-t border-white/10">
          <div className="w-12 h-1 bg-gray-800 rounded-full mx-auto mt-4 mb-8"></div>

          {/* Quick Stats Grid */}
          <div className="px-6 grid grid-cols-2 gap-4 mb-10">
              <div className="bg-[#1c1c1e] rounded-2xl p-4 border border-white/5 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#ccff00]/10 flex items-center justify-center text-[#ccff00]">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                    </svg>
                  </div>
                  <div>
                      <p className="text-gray-400 text-xs font-bold uppercase">Data</p>
                      <p className="text-white font-medium">{new Date(event.date).toLocaleDateString('pt-BR', {day: 'numeric', month: 'short'})}</p>
                  </div>
              </div>
              <div className="bg-[#1c1c1e] rounded-2xl p-4 border border-white/5 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#ccff00]/10 flex items-center justify-center text-[#ccff00]">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                      <p className="text-gray-400 text-xs font-bold uppercase">Hora</p>
                      <p className="text-white font-medium">{new Date(event.date).toLocaleTimeString('pt-BR', {hour: '2-digit', minute:'2-digit'})}</p>
                  </div>
              </div>
          </div>

          {/* Description Section */}
          <div className="px-6 mb-10">
              <h3 className="text-xl font-medium text-white mb-4">Sobre a Experiência</h3>
              <p className="text-gray-400 font-light leading-7 text-lg">{event.description} Prepare-se para uma imersão sensorial completa onde cada detalhe foi pensado para criar memórias inesquecíveis.</p>
          </div>

          {/* Location / Map Placeholder */}
          <div className="px-6 mb-10">
              <h3 className="text-xl font-medium text-white mb-4">Localização</h3>
              <div className="w-full h-48 bg-[#1c1c1e] rounded-3xl overflow-hidden relative border border-white/10 group">
                  <div className="absolute inset-0 opacity-40 bg-[url('https://api.mapbox.com/styles/v1/mapbox/dark-v10/static/-46.6333,23.5505,12,0/600x300@2x?access_token=MY_TOKEN')] bg-cover bg-center grayscale"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-12 h-12 bg-[#ccff00]/20 rounded-full flex items-center justify-center animate-pulse">
                          <div className="w-4 h-4 bg-[#ccff00] rounded-full shadow-[0_0_20px_#ccff00]"></div>
                      </div>
                  </div>
                  <div className="absolute bottom-4 left-4 bg-black/80 backdrop-blur px-4 py-2 rounded-xl border border-white/10">
                      <p className="text-white text-xs font-bold">{event.location}</p>
                  </div>
              </div>
          </div>

           {/* Organizer */}
           <div className="px-6 pb-6">
             <div className="flex items-center justify-between border-t border-white/10 pt-6">
                 <div className="flex items-center gap-4">
                     <div className="w-12 h-12 rounded-full overflow-hidden border border-white/20">
                         <img src="https://i.pravatar.cc/150?u=organizer" alt="Organizer" className="w-full h-full object-cover" />
                     </div>
                     <div>
                         <p className="text-xs text-gray-500 font-bold uppercase">Organizado por</p>
                         <p className="text-white font-medium">EventHorizon Official</p>
                     </div>
                 </div>
                 <button className="px-4 py-2 rounded-xl bg-[#1c1c1e] text-white text-xs font-bold border border-white/10 hover:bg-white/10 transition-colors">
                     Seguir
                 </button>
             </div>
          </div>
      </div>

      {/* Sticky Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 p-5 bg-[#000000] border-t border-white/10 z-40">
           <div className="max-w-2xl mx-auto">
               <button 
                    onClick={() => setShowTicketModal(true)}
                    className="w-full h-16 bg-[#ccff00] rounded-2xl flex items-center justify-between p-2 group cursor-pointer hover:bg-[#b3e600] active:scale-[0.98] transition-all shadow-[0_0_25px_rgba(204,255,0,0.25)]"
               >
                    <div className="w-12 h-12 bg-[#1c1c1e] text-[#ccff00] rounded-xl flex items-center justify-center shadow-md">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                        </svg>
                    </div>
                    <span className="text-base font-bold text-black uppercase tracking-widest flex-1 text-center pr-12">Garantir Ingresso</span>
               </button>
           </div>
      </div>

      {/* TICKET SELECTION MODAL (Sheet) */}
      {showTicketModal && (
        <div className="fixed inset-0 z-[60] flex items-end justify-center">
            {/* Backdrop */}
            <div 
                className="absolute inset-0 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300"
                onClick={() => setShowTicketModal(false)}
            ></div>

            {/* Modal Content */}
            <div className="relative w-full max-w-2xl bg-[#1c1c1e] rounded-t-3xl p-6 border-t border-white/10 animate-in slide-in-from-bottom duration-300 shadow-2xl flex flex-col max-h-[90vh]">
                <div className="w-12 h-1 bg-gray-600 rounded-full mx-auto mb-6 shrink-0"></div>
                
                <h3 className="text-2xl font-semibold text-white mb-6 shrink-0">Escolha seus Ingressos</h3>

                <div className="flex-1 overflow-y-auto no-scrollbar space-y-3 mb-4">
                    {Object.entries(groupedTickets).map(([category, tickets]) => (
                        <div key={category} className="rounded-2xl bg-black border border-white/10 overflow-hidden">
                            {/* Accordion Header */}
                            <button 
                                onClick={() => toggleCategory(category)}
                                className="w-full flex items-center justify-between p-4 bg-black/50 hover:bg-white/5 transition-colors"
                            >
                                <span className="font-bold text-lg text-white">{category}</span>
                                <svg 
                                    xmlns="http://www.w3.org/2000/svg" 
                                    fill="none" 
                                    viewBox="0 0 24 24" 
                                    strokeWidth={2} 
                                    stroke="currentColor" 
                                    className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${openCategory === category ? 'rotate-180' : ''}`}
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                </svg>
                            </button>

                            {/* Accordion Content */}
                            <div className={`transition-all duration-300 ease-in-out ${openCategory === category ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                                <div className="p-2 space-y-2">
                                    {tickets.map(ticket => {
                                        const currentQty = ticketQuantities[ticket.id] || 0;
                                        const isSelected = currentQty > 0;
                                        const tax = ticket.price * 0.10;

                                        return (
                                            <div 
                                                key={ticket.id}
                                                className={`p-4 rounded-xl border flex justify-between items-center transition-all ${
                                                    isSelected
                                                    ? 'bg-[#ccff00]/5 border-[#ccff00]/30 shadow-[0_0_10px_rgba(204,255,0,0.05)]' 
                                                    : 'bg-[#1c1c1e] border-transparent hover:border-white/10'
                                                }`}
                                            >
                                                {/* Left Info */}
                                                <div className="flex-1 pr-4">
                                                    <h4 className={`font-medium text-base ${isSelected ? 'text-[#ccff00]' : 'text-white'}`}>
                                                        {ticket.name}
                                                    </h4>
                                                    <p className="text-gray-500 text-xs mt-1 mb-2">{ticket.description}</p>
                                                    <div className="flex items-center gap-2">
                                                        <span className="font-bold text-lg text-white">R${ticket.price}</span>
                                                        <span className="text-[10px] text-[#ccff00]/80 bg-[#ccff00]/5 px-2 py-0.5 rounded border border-[#ccff00]/10 font-medium">
                                                            + R${tax.toFixed(2)} taxa
                                                        </span>
                                                    </div>
                                                </div>

                                                {/* Right Quantity Selector */}
                                                <div className="flex items-center gap-3 bg-black rounded-lg p-1 border border-white/10">
                                                    <button 
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleUpdateQuantity(ticket.id, -1);
                                                        }}
                                                        className={`w-8 h-8 flex items-center justify-center rounded-md transition-colors ${currentQty > 0 ? 'bg-[#1c1c1e] text-white hover:bg-white/10' : 'text-gray-600 cursor-not-allowed'}`}
                                                        disabled={currentQty === 0}
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M18 12H6" />
                                                        </svg>
                                                    </button>
                                                    
                                                    <span className={`text-lg font-bold w-4 text-center ${currentQty > 0 ? 'text-[#ccff00]' : 'text-gray-600'}`}>
                                                        {currentQty}
                                                    </span>
                                                    
                                                    <button 
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleUpdateQuantity(ticket.id, 1);
                                                        }}
                                                        className="w-8 h-8 flex items-center justify-center rounded-md bg-[#1c1c1e] text-white hover:bg-white/10 transition-colors"
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="border-t border-white/10 pt-4 shrink-0">
                    
                    {/* Total Info */}
                    <div className="flex justify-between items-center mb-6">
                        <span className="text-gray-400 text-base font-medium">Total a pagar</span>
                        <div className="text-right">
                           <span className="block text-2xl font-bold text-white">R${totalAmount.toFixed(2)}</span>
                           <span className="block text-xs text-gray-500 font-light">Inclui taxas de serviço</span>
                        </div>
                    </div>

                    {/* Coupon Section */}
                    <div className="mb-6 flex justify-center w-full">
                        {!showCouponInput ? (
                             <button 
                                onClick={() => setShowCouponInput(true)}
                                className="text-[#ccff00] text-sm font-medium hover:underline flex items-center gap-2 transition-all hover:scale-105"
                             >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z" />
                                </svg>
                                Possui cupom de desconto?
                             </button>
                        ) : (
                            <div className="w-full flex gap-2 animate-in fade-in slide-in-from-bottom-2">
                                <input 
                                    type="text" 
                                    placeholder="Digite o código" 
                                    value={couponCode}
                                    onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                                    className="flex-1 bg-black border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#ccff00] transition-colors uppercase tracking-wider"
                                />
                                <button className="bg-white/10 hover:bg-white/20 text-white font-bold px-4 rounded-xl text-xs transition-colors">
                                    Aplicar
                                </button>
                                <button 
                                    onClick={() => setShowCouponInput(false)}
                                    className="text-gray-500 hover:text-white px-2"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Buy Button */}
                    <button 
                        onClick={handleConfirmPurchase}
                        disabled={!hasSelection}
                        className="w-full bg-[#ccff00] hover:bg-[#b3e600] disabled:opacity-50 disabled:cursor-not-allowed text-black font-bold text-lg py-4 rounded-2xl shadow-lg transition-all active:scale-[0.98] text-center uppercase tracking-widest"
                    >
                        Comprar Ingressos
                    </button>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};
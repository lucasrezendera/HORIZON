import React, { useState, useEffect } from 'react';
import { Event, Ticket, Transaction, UserState, EventCategory, TicketType } from './types';
import { MOCK_EVENTS, INITIAL_TRANSACTIONS } from './constants';
import { FeaturedEventCard, CompactEventCard } from './components/EventCard';
import { EventDetails } from './components/EventDetails';
import { WalletCard } from './components/WalletCard';
import { Assistant } from './components/Assistant';

// View states
type View = 'events' | 'wallet' | 'tickets' | 'details' | 'profile';

// Category Icons Component
const CategoryIcon = ({ category, isAll }: { category?: EventCategory, isAll?: boolean }) => {
  if (isAll) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
        </svg>
    )
  }

  switch (category) {
    case EventCategory.MUSIC:
      return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z" />
        </svg>
      );
    case EventCategory.THEATER:
      return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" />
        </svg>
      );
    case EventCategory.SPORTS:
      return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0V5.625a2.625 2.625 0 11-5.25 0v2.875" />
        </svg>
      );
    case EventCategory.CONFERENCE:
      return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
        </svg>
      );
    case EventCategory.NIGHTLIFE:
      return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
    default:
      return null;
  }
};

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('events');
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  
  // App State
  const [user, setUser] = useState<UserState>({ balance: 250.00, name: 'Christian Johnson' });
  const [transactions, setTransactions] = useState<Transaction[]>([...INITIAL_TRANSACTIONS]);
  const [myTickets, setMyTickets] = useState<Ticket[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<EventCategory | 'Todos'>('Todos');
  
  // Notification State
  const [notification, setNotification] = useState<{msg: string, type: 'success' | 'error'} | null>(null);

  // Carousel State
  const [featuredIndex, setFeaturedIndex] = useState(0);
  const featuredEvents = MOCK_EVENTS.slice(0, 3); // Top 3 are featured

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  // Carousel Auto-scroll
  useEffect(() => {
    if (currentView === 'events') {
      const interval = setInterval(() => {
        setFeaturedIndex((prev) => (prev + 1) % featuredEvents.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [currentView, featuredEvents.length]);

  const showNotification = (msg: string, type: 'success' | 'error') => {
    setNotification({ msg, type });
  };

  const handleSelectEvent = (event: Event) => {
    setSelectedEvent(event);
    setCurrentView('details');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToEvents = () => {
    setSelectedEvent(null);
    setCurrentView('events');
  };

  const handleBuyTickets = (event: Event, purchases: { ticketType: TicketType, quantity: number }[]) => {
    // Calculate total including tax
    const TAX_RATE = 0.10;
    const totalPrice = purchases.reduce((acc, curr) => {
      const itemPrice = curr.ticketType.price;
      const itemTax = itemPrice * TAX_RATE;
      return acc + ((itemPrice + itemTax) * curr.quantity);
    }, 0);

    const totalQuantity = purchases.reduce((acc, curr) => acc + curr.quantity, 0);

    if (user.balance < totalPrice) {
      showNotification('Saldo insuficiente! Recarregue sua carteira.', 'error');
      setCurrentView('wallet');
      return;
    }

    if (window.confirm(`Confirmar compra de ${totalQuantity} ingressos para ${event.title} por R$${totalPrice.toFixed(2)}?`)) {
      
      const newTickets: Ticket[] = [];

      purchases.forEach(purchase => {
         for(let i=0; i<purchase.quantity; i++) {
            newTickets.push({
              id: Math.random().toString(36).substr(2, 9),
              eventId: event.id,
              ticketTypeId: purchase.ticketType.id,
              ticketTypeName: `${purchase.ticketType.category} - ${purchase.ticketType.name}`,
              pricePaid: purchase.ticketType.price, // Storing base price paid
              purchaseDate: new Date().toISOString(),
              qrCodeData: `TICKET-${event.id}-${purchase.ticketType.id}-${Math.random()}`,
              status: 'valid'
            });
         }
      });

      const newTransaction: Transaction = {
        id: Math.random().toString(36).substr(2, 9),
        type: 'purchase',
        amount: -totalPrice,
        date: new Date().toISOString(),
        description: `Ingressos (${totalQuantity}x): ${event.title}`
      };

      setUser(prev => ({ ...prev, balance: prev.balance - totalPrice }));
      setMyTickets(prev => [...prev, ...newTickets]);
      setTransactions(prev => [newTransaction, ...prev]);
      showNotification('Ingressos garantidos com sucesso!', 'success');
      setSelectedEvent(null);
      setCurrentView('tickets');
    }
  };

  const handleAddFunds = () => {
    const amount = 100; // Fixed for demo
    const newTransaction: Transaction = {
      id: Math.random().toString(36).substr(2, 9),
      type: 'deposit',
      amount: amount,
      date: new Date().toISOString(),
      description: 'Recarga de Carteira'
    };
    setUser(prev => ({ ...prev, balance: prev.balance + amount }));
    setTransactions(prev => [newTransaction, ...prev]);
    showNotification(`R$${amount} adicionados!`, 'success');
  };

  const filteredEvents = MOCK_EVENTS.filter(e => {
    const matchesSearch = e.title.toLowerCase().includes(searchQuery.toLowerCase()) || e.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'Todos' || e.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const otherEvents = filteredEvents.slice(1);

  // If in details view, we render full screen without main padding
  if (currentView === 'details' && selectedEvent) {
    return (
      <div className="min-h-screen bg-black text-white font-sans selection:bg-[#ccff00] selection:text-black">
         <EventDetails 
            event={selectedEvent} 
            onBack={handleBackToEvents} 
            onBuy={handleBuyTickets} 
          />
          {notification && (
            <div className={`fixed top-8 left-1/2 -translate-x-1/2 px-8 py-4 rounded-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] z-[60] flex items-center gap-3 animate-in slide-in-from-top fade-in duration-300 border border-white/10 ${
              notification.type === 'success' ? 'bg-[#1c1c1e] text-[#ccff00]' : 'bg-red-900 text-white'
            }`}>
              <span className="font-medium text-base">{notification.msg}</span>
            </div>
          )}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-[#ccff00] selection:text-black pb-32">
      
      {/* HEADER - Only visible on Home (events) view */}
      {currentView === 'events' && (
        <header className="pt-14 pb-4 px-6 flex justify-between items-center animate-in fade-in slide-in-from-top-4 duration-500">
          <div className="flex items-center gap-4">
             <div className="w-12 h-12 rounded-full border border-[#ccff00] p-0.5 relative group cursor-pointer">
               <div className="absolute inset-0 rounded-full bg-[#ccff00]/20 blur-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>
               <img src="https://i.pravatar.cc/150?u=alex" alt="Profile" className="w-full h-full rounded-full object-cover relative z-10" />
             </div>
             <div>
                <p className="text-gray-400 text-xs uppercase tracking-widest font-light mb-1">Bem-vindo de volta</p>
                <h2 className="text-xl font-medium text-white leading-tight">{user.name}</h2>
             </div>
          </div>
          <div className="flex gap-3">
             <button className="w-11 h-11 rounded-xl bg-[#1c1c1e] flex items-center justify-center text-[#ccff00] hover:bg-[#2c2c2e] hover:scale-105 transition-all border border-white/5 shadow-lg shadow-black">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H4.5a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 0114.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.503-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                </svg>
             </button>
             <button className="w-11 h-11 rounded-xl bg-[#1c1c1e] flex items-center justify-center text-gray-300 hover:text-white hover:bg-[#2c2c2e] hover:scale-105 transition-all border border-white/5 shadow-lg shadow-black">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
                </svg>
             </button>
          </div>
        </header>
      )}

      <main className="px-6 pb-6 pt-2">
        
        {/* VIEW: EVENTS */}
        {currentView === 'events' && (
          <div className="space-y-10 animate-in fade-in duration-500">
            
            {/* Search */}
            <div className="relative group">
              <svg xmlns="http://www.w3.org/2000/svg" className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-500 group-focus-within:text-[#ccff00] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input 
                type="text" 
                placeholder="Descobrir eventos..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#1c1c1e] rounded-2xl py-5 pl-16 pr-8 text-base text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#ccff00] border border-transparent focus:border-[#ccff00]/50 transition-all shadow-inner font-light"
              />
            </div>

            {/* Featured Event Carousel */}
            <div className="animate-in slide-in-from-bottom-4 duration-500">
              <div className="flex justify-between items-end mb-4 px-1">
                 <h2 className="text-2xl font-medium tracking-tight text-white">Eventos em Destaque</h2>
              </div>

              {featuredEvents.length > 0 && (
                <div className="relative">
                  {/* Using key to trigger animation on change */}
                  <div key={featuredIndex} className="animate-in fade-in slide-in-from-right-2 duration-500">
                     <FeaturedEventCard event={featuredEvents[featuredIndex]} onClick={handleSelectEvent} />
                  </div>
                  {/* Pagination Dots */}
                  <div className="flex justify-center gap-2 mt-4">
                    {featuredEvents.map((_, idx) => (
                      <button 
                        key={idx} 
                        onClick={() => setFeaturedIndex(idx)}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${idx === featuredIndex ? 'bg-[#ccff00] w-6' : 'bg-gray-600'}`} 
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Categories */}
            <div>
              <div className="flex justify-between items-end mb-5 px-1">
                <h3 className="text-xl font-medium tracking-tight text-white">Categorias</h3>
                <span className="text-sm text-gray-400 font-light hover:text-[#ccff00] cursor-pointer transition-colors">Ver todas</span>
              </div>
              <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2 pt-2 px-1">
                <button
                  onClick={() => setSelectedCategory('Todos')}
                  className={`flex items-center gap-2.5 whitespace-nowrap px-6 py-3.5 rounded-xl text-sm font-bold transition-all duration-300 ${
                    selectedCategory === 'Todos' 
                      ? 'bg-[#ccff00] text-black shadow-[0_0_20px_rgba(204,255,0,0.3)] scale-105' 
                      : 'bg-[#1c1c1e] text-gray-400 border border-white/5 hover:bg-[#2c2c2e] hover:text-white hover:scale-105'
                  }`}
                >
                  <CategoryIcon isAll />
                  Todos
                </button>
                {Object.values(EventCategory).map(cat => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`flex items-center gap-2.5 whitespace-nowrap px-6 py-3.5 rounded-xl text-sm font-bold transition-all duration-300 ${
                        selectedCategory === cat 
                          ? 'bg-[#ccff00] text-black shadow-[0_0_20px_rgba(204,255,0,0.3)] scale-105' 
                          : 'bg-[#1c1c1e] text-gray-400 border border-white/5 hover:bg-[#2c2c2e] hover:text-white hover:scale-105'
                      }`}
                    >
                      <CategoryIcon category={cat} />
                      {cat}
                    </button>
                ))}
              </div>
            </div>

            {/* Other Events Horizontal List */}
            {otherEvents.length > 0 && (
              <div className="animate-in slide-in-from-bottom-8 duration-700">
                <div className="flex justify-between items-end mb-5 px-1">
                  <h3 className="text-xl font-medium tracking-tight text-white">Em alta em São Paulo</h3>
                  <span className="text-sm text-gray-400 font-light hover:text-[#ccff00] cursor-pointer transition-colors">Ver todos</span>
                </div>
                <div className="flex gap-5 overflow-x-auto no-scrollbar pb-4 -mx-6 px-6">
                  {otherEvents.map(event => (
                    <div key={event.id} className="min-w-[180px] w-[180px]">
                      <CompactEventCard event={event} onClick={handleSelectEvent} />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* VIEW: WALLET */}
        {currentView === 'wallet' && (
           <div className="space-y-8 pt-12 animate-in fade-in slide-in-from-bottom-4 duration-300">
              <h2 className="text-3xl font-medium mb-2 pl-1">Minha Carteira</h2>
              
              <WalletCard balance={user.balance} name={user.name} onAddFunds={handleAddFunds} />
              
              {/* Wallet Actions - 3 Square Buttons */}
              <div className="grid grid-cols-3 gap-4">
                 <button 
                   onClick={handleAddFunds}
                   className="aspect-square rounded-2xl bg-[#1c1c1e] border border-white/5 flex flex-col items-center justify-center gap-3 hover:bg-[#2c2c2e] hover:scale-[1.02] transition-all"
                 >
                    <div className="w-12 h-12 rounded-full bg-[#ccff00]/10 flex items-center justify-center text-[#ccff00]">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                      </svg>
                    </div>
                    <span className="text-sm font-medium text-gray-300">Adicionar</span>
                 </button>

                 <button 
                   className="aspect-square rounded-2xl bg-[#1c1c1e] border border-white/5 flex flex-col items-center justify-center gap-3 hover:bg-[#2c2c2e] hover:scale-[1.02] transition-all"
                 >
                    <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-white">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
                      </svg>
                    </div>
                    <span className="text-sm font-medium text-gray-300">Pagar</span>
                 </button>

                 <button 
                   className="aspect-square rounded-2xl bg-[#1c1c1e] border border-white/5 flex flex-col items-center justify-center gap-3 hover:bg-[#2c2c2e] hover:scale-[1.02] transition-all"
                 >
                    <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-white">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
                      </svg>
                    </div>
                    <span className="text-sm font-medium text-gray-300">Reembolso</span>
                 </button>
              </div>

              <div className="space-y-4 pt-4">
                 <h3 className="text-lg font-medium mb-4 pl-1">Últimas Transações</h3>
                 {transactions.map(t => (
                   <div key={t.id} className="flex justify-between items-center p-6 bg-[#1c1c1e] rounded-xl border border-white/5 hover:border-[#ccff00]/20 transition-colors">
                     <div className="flex items-center gap-5">
                       <div className={`w-14 h-14 rounded-full flex items-center justify-center text-xl ${t.type === 'deposit' ? 'bg-[#ccff00]/10 text-[#ccff00]' : 'bg-red-500/10 text-red-400'}`}>
                          {t.type === 'deposit' ? '+' : '-'}
                       </div>
                       <div>
                         <p className="font-medium text-base text-white mb-1">{t.description}</p>
                         <p className="text-sm text-gray-500 font-light">{new Date(t.date).toLocaleDateString('pt-BR')}</p>
                       </div>
                     </div>
                     <span className={`font-mono text-base font-medium ${t.type === 'deposit' ? 'text-[#ccff00]' : 'text-white'}`}>
                       {t.type === 'deposit' ? '+' : ''}R${Math.abs(t.amount).toFixed(0)}
                     </span>
                   </div>
                 ))}
              </div>
           </div>
        )}

        {/* VIEW: TICKETS */}
        {currentView === 'tickets' && (
           <div className="pt-12 space-y-8 animate-in fade-in duration-300">
             <h2 className="text-3xl font-medium pl-1">Meus Ingressos</h2>
             {myTickets.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-24 opacity-50">
                   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={0.5} stroke="currentColor" className="w-24 h-24 mb-4 text-gray-700">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z" />
                   </svg>
                   <p className="font-light text-gray-500 text-lg">Você não tem ingressos ativos.</p>
                </div>
             ) : (
                myTickets.map(ticket => {
                  const event = MOCK_EVENTS.find(e => e.id === ticket.eventId);
                  if(!event) return null;
                  return (
                    <div key={ticket.id} className="relative bg-[#1c1c1e] rounded-2xl overflow-hidden group border border-white/5 hover:border-[#ccff00]/30 transition-colors">
                       <div className="absolute top-0 left-0 w-4 h-full bg-[#ccff00]"></div>
                       <div className="p-7 pl-10 flex justify-between items-center">
                          <div>
                             <h3 className="font-medium text-xl text-white mb-2">{event.title}</h3>
                             <p className="text-gray-400 text-base font-light mb-1">{event.location}</p>
                             <div className="flex items-center gap-2 mb-3">
                                 <span className="text-xs text-white bg-white/10 px-2 py-0.5 rounded">{ticket.ticketTypeName}</span>
                             </div>
                             <div className="inline-block px-3 py-1.5 bg-[#ccff00]/10 rounded-lg">
                                <p className="text-[#ccff00] text-xs uppercase font-bold tracking-wider">Válido • {new Date(event.date).toLocaleDateString('pt-BR')}</p>
                             </div>
                          </div>
                          <div className="bg-white p-3 rounded-xl shadow-lg">
                             <div className="w-12 h-12 bg-black pattern-grid-lg opacity-80"></div>
                          </div>
                       </div>
                    </div>
                  )
                })
             )}
           </div>
        )}

      </main>

      {/* Floating Bottom Navigation Island - Only visible if NOT in details view */}
      {currentView !== 'details' && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 animate-in slide-in-from-bottom-10 fade-in duration-500">
            <nav className="bg-[#1c1c1e]/90 backdrop-blur-xl border border-white/10 rounded-3xl px-3 py-2.5 shadow-[0_10px_30px_rgba(0,0,0,0.6)] flex items-center gap-2">
            
            {/* Home/Events */}
            <button onClick={() => setCurrentView('events')} className="group relative w-14 h-14 flex items-center justify-center">
                <div className={`absolute inset-0 bg-[#ccff00] rounded-2xl transition-all duration-300 ${currentView === 'events' ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}`}></div>
                <div className={`relative z-10 transition-colors duration-300 ${currentView === 'events' ? 'text-black' : 'text-gray-400 group-hover:text-white'}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
                    <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
                    <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
                    </svg>
                </div>
            </button>

            {/* Tickets */}
            <button onClick={() => setCurrentView('tickets')} className="group relative w-14 h-14 flex items-center justify-center">
                <div className={`absolute inset-0 bg-[#ccff00] rounded-2xl transition-all duration-300 ${currentView === 'tickets' ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}`}></div>
                <div className={`relative z-10 transition-colors duration-300 ${currentView === 'tickets' ? 'text-black' : 'text-gray-400 group-hover:text-white'}`}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
                    <path fillRule="evenodd" d="M1.5 6.375c0-1.036.84-1.875 1.875-1.875h17.25c1.035 0 1.875.84 1.875 1.875v3.026a.75.75 0 01-.375.65 2.249 2.249 0 000 3.898.75.75 0 01.375.65v3.026c0 1.035-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 011.5 17.625v-3.026a.75.75 0 01.374-.65 2.249 2.249 0 000-3.898.75.75 0 01-.374-.65V6.375zm1.5 2.999v2.252a3.75 3.75 0 010-2.252zm18 0a3.75 3.75 0 010 2.252V9.374zM4.5 6a.75.75 0 00-.75.75v10.5a.75.75 0 00.75.75h15a.75.75 0 00.75-.75V6.75a.75.75 0 00-.75-.75H4.5z" clipRule="evenodd" />
                </svg>
                </div>
            </button>

            {/* Wallet */}
            <button onClick={() => setCurrentView('wallet')} className="group relative w-14 h-14 flex items-center justify-center">
                <div className={`absolute inset-0 bg-[#ccff00] rounded-2xl transition-all duration-300 ${currentView === 'wallet' ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}`}></div>
                <div className={`relative z-10 transition-colors duration-300 ${currentView === 'wallet' ? 'text-black' : 'text-gray-400 group-hover:text-white'}`}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
                    <path d="M2.273 5.625A4.483 4.483 0 015.25 4.5h13.5c1.141 0 2.183.425 2.977 1.125A3 3 0 0018.75 3H5.25a3 3 0 00-2.977 2.625zM2.273 8.625A4.483 4.483 0 015.25 7.5h13.5c1.141 0 2.183.425 2.977 1.125A3 3 0 0018.75 6H5.25a3 3 0 00-2.977 2.625zM5.25 9a3 3 0 00-3 3v6a3 3 0 003 3h13.5a3 3 0 003-3v-6a3 3 0 00-3-3H5.25z" />
                </svg>
                </div>
            </button>
            
            {/* Profile */}
            <button onClick={() => setCurrentView('profile')} className="group relative w-14 h-14 flex items-center justify-center">
                <div className={`absolute inset-0 bg-[#ccff00] rounded-2xl transition-all duration-300 ${currentView === 'profile' ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}`}></div>
                <div className={`relative z-10 transition-colors duration-300 ${currentView === 'profile' ? 'text-black' : 'text-gray-400 group-hover:text-white'}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
                    <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
                    </svg>
                </div>
            </button>

            </nav>
        </div>
      )}

      {/* Notification Toast */}
      {notification && (
        <div className={`fixed top-8 left-1/2 -translate-x-1/2 px-8 py-4 rounded-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] z-[60] flex items-center gap-3 animate-in slide-in-from-top fade-in duration-300 border border-white/10 ${
          notification.type === 'success' ? 'bg-[#1c1c1e] text-[#ccff00]' : 'bg-red-900 text-white'
        }`}>
           <span className="font-medium text-base">{notification.msg}</span>
        </div>
      )}

      <Assistant />
    </div>
  );
};

export default App;
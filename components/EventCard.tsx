import React from 'react';
import { Event } from '../types';

interface EventCardProps {
  event: Event;
  onClick: (event: Event) => void;
}

export const FeaturedEventCard: React.FC<EventCardProps> = ({ event, onClick }) => {
  const dateObj = new Date(event.date);
  const month = dateObj.toLocaleDateString('pt-BR', { month: 'short' }).replace('.', '');
  const day = dateObj.getDate();

  // Find lowest price
  const minPrice = Math.min(...event.ticketTypes.map(t => t.price));

  return (
    <div 
      onClick={() => onClick(event)}
      className="relative w-full h-[450px] rounded-2xl overflow-hidden group cursor-pointer shadow-2xl bg-[#1c1c1e] border border-white/5 active:scale-[0.98] transition-all duration-300"
    >
      {/* Top Image Section */}
      <div className="relative h-3/5 overflow-hidden">
         <img 
            src={event.image} 
            alt={event.title} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
         />
         {/* Gradient to blend with bottom */}
         <div className="absolute inset-0 bg-gradient-to-t from-[#1c1c1e] via-[#1c1c1e]/20 to-transparent"></div>
         
         {/* Date Badge - Standardized Size, Less Rounded */}
         <div className="absolute top-5 left-5 w-14 h-14 bg-black/60 backdrop-blur-md rounded-xl border border-white/10 flex flex-col items-center justify-center text-white z-10 shadow-lg">
            <span className="text-[10px] uppercase font-bold text-gray-300 leading-none mb-0.5">{month}</span>
            <span className="text-xl font-bold leading-none">{day}</span>
         </div>

         {/* Heart Icon - Standardized Size, Less Rounded */}
         <div className="absolute top-5 right-5 w-14 h-14 bg-black/60 backdrop-blur-md rounded-xl border border-white/10 flex items-center justify-center text-white hover:bg-[#ccff00] hover:text-black transition-colors z-10 shadow-lg">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
               <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
            </svg>
         </div>
      </div>
      
      {/* Bottom Content Section */}
      <div className="absolute bottom-0 left-0 right-0 h-2/5 px-6 pb-6 pt-4 flex flex-col justify-between z-20 bg-gradient-to-t from-[#1c1c1e] via-[#1c1c1e] to-transparent">
         <div>
             <h2 className="text-3xl font-semibold text-white mb-2 leading-tight line-clamp-2">{event.title}</h2>
             <div className="flex items-center gap-2 text-gray-300 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-[#ccff00]">
                    <path fillRule="evenodd" d="M9.69 18.933l.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 00.281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 103 9c0 3.492 1.698 5.988 3.355 7.625a19.055 19.055 0 005.335 2.308zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <span className="text-sm font-medium truncate">{event.location}</span>
             </div>
         </div>

         {/* Action Row */}
         <div className="flex items-center justify-between gap-4 mt-2">
             <div className="flex flex-col">
                <span className="text-xs text-gray-500 font-medium uppercase">A partir de</span>
                <span className="text-2xl font-bold text-white">R${minPrice}</span>
             </div>

             <button className="bg-[#ccff00] hover:bg-[#b3e600] text-black font-bold text-sm px-8 py-3.5 rounded-xl shadow-[0_0_20px_rgba(204,255,0,0.2)] transition-all hover:scale-105 active:scale-95">
                 Comprar Agora
             </button>
         </div>
      </div>
    </div>
  );
};

export const CompactEventCard: React.FC<EventCardProps> = ({ event, onClick }) => {
    return (
        <div 
          onClick={() => onClick(event)}
          className="w-full flex flex-col gap-3 group cursor-pointer active:scale-95 transition-transform"
        >
            <div className="relative h-32 rounded-xl overflow-hidden shadow-md">
                <img src={event.image} alt={event.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 brightness-90 group-hover:brightness-100" />
                <div className="absolute top-2 right-2 w-8 h-8 rounded-lg bg-black/40 backdrop-blur text-white flex items-center justify-center hover:bg-[#ccff00] hover:text-black transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                    </svg>
                </div>
                <div className="absolute top-2 left-2 px-2 py-1 bg-[#ccff00] text-black text-[10px] font-bold rounded-md shadow-lg">
                    5.0 ★
                </div>
            </div>
            <div>
                <h3 className="text-white font-medium text-sm leading-snug line-clamp-1 group-hover:text-[#ccff00] transition-colors">{event.title}</h3>
                <p className="text-gray-500 font-medium text-xs mt-1">{new Date(event.date).toLocaleDateString('pt-BR', {weekday: 'short', day: 'numeric', month: 'short'})}</p>
            </div>
        </div>
    )
}
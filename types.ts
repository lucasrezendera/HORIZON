export enum EventCategory {
  MUSIC = 'Música',
  THEATER = 'Teatro',
  SPORTS = 'Esportes',
  CONFERENCE = 'Conferência',
  NIGHTLIFE = 'Vida Noturna'
}

export interface TicketType {
  id: string;
  category: string; // Ex: "Pista", "Camarote", "Area VIP"
  name: string;     // Ex: "Inteira", "Meia-Entrada", "Lote 1"
  price: number;
  description?: string;
  features?: string[];
}

export interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
  image: string;
  category: EventCategory;
  description: string;
  ticketTypes: TicketType[];
}

export interface Ticket {
  id: string;
  eventId: string;
  ticketTypeId: string;
  ticketTypeName: string;
  purchaseDate: string;
  qrCodeData: string;
  status: 'valid' | 'used' | 'expired';
  pricePaid: number;
}

export interface Transaction {
  id: string;
  type: 'deposit' | 'purchase' | 'refund';
  amount: number;
  date: string;
  description: string;
}

export interface UserState {
  balance: number;
  name: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isThinking?: boolean;
}
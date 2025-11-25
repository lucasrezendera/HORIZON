import { Event, EventCategory } from './types';

export const MOCK_EVENTS: Event[] = [
  {
    id: 'e1',
    title: 'Festival Noites de Neon',
    date: '2024-11-15T20:00:00',
    location: 'Arena Cyber, Centro',
    image: 'https://picsum.photos/800/600?random=1',
    category: EventCategory.MUSIC,
    description: 'Uma noite eletrizante de synthwave e música eletrônica com os melhores DJs globais. Prepare-se para uma experiência visual e sonora imersiva com lasers e batidas futuristas.',
    ticketTypes: [
      {
        id: 't1_pista_int',
        category: 'Pista Comum',
        name: 'Inteira - 1º Lote',
        price: 150,
        description: 'Acesso à área principal.',
      },
      {
        id: 't1_pista_meia',
        category: 'Pista Comum',
        name: 'Meia-Entrada - 1º Lote',
        price: 75,
        description: 'Estudantes e Idosos (Lei Federal).',
      },
      {
        id: 't1_vip_int',
        category: 'VIP Experience',
        name: 'Inteira',
        price: 350,
        description: 'Área elevada com vista privilegiada.',
      },
      {
        id: 't1_vip_meia',
        category: 'VIP Experience',
        name: 'Meia Social',
        price: 175,
        description: 'Mediante doação de 1kg de alimento.',
      },
      {
        id: 't1_back',
        category: 'Backstage',
        name: 'Full Access',
        price: 800,
        description: 'Acesso total e Open Bar.',
      }
    ]
  },
  {
    id: 'e2',
    title: 'Global Tech Summit 2024',
    date: '2024-12-05T09:00:00',
    location: 'Centro de Convenções Hall A',
    image: 'https://picsum.photos/800/600?random=2',
    category: EventCategory.CONFERENCE,
    description: 'Junte-se aos líderes da indústria para discutir o futuro da IA, Computação Quântica e Blockchain. Networking exclusivo e palestras inspiradoras.',
    ticketTypes: [
      {
        id: 't2_std',
        category: 'Acesso Geral',
        name: 'Passaporte 2 Dias',
        price: 499,
        description: 'Acesso a todas as palestras.',
      },
      {
        id: 't2_biz',
        category: 'VIP Business',
        name: 'Full Experience',
        price: 899,
        description: 'Networking exclusivo e jantar.',
      }
    ]
  },
  {
    id: 'e3',
    title: 'Finais do Campeonato',
    date: '2024-11-20T18:00:00',
    location: 'Estádio Monumental',
    image: 'https://picsum.photos/800/600?random=3',
    category: EventCategory.SPORTS,
    description: 'A maior partida da temporada. Testemunhe a história sendo feita com os dois maiores rivais se enfrentando pelo título nacional.',
    ticketTypes: [
      {
        id: 't3_arq_int',
        category: 'Arquibancada Norte',
        name: 'Inteira',
        price: 85,
        description: 'Setor popular atrás do gol.',
      },
      {
        id: 't3_arq_meia',
        category: 'Arquibancada Norte',
        name: 'Meia-Entrada',
        price: 42.50,
        description: 'Estudantes com carteirinha.',
      },
      {
        id: 't3_cad',
        category: 'Cadeira Inferior',
        name: 'Lote Único',
        price: 200,
        description: 'Mais conforto perto do campo.',
      },
      {
        id: 't3_cam',
        category: 'Camarote Premium',
        name: 'Individual',
        price: 500,
        description: 'Buffet e Open Bar incluídos.',
      }
    ]
  },
  {
    id: 'e4',
    title: 'Sinfonia Sob as Estrelas',
    date: '2024-11-10T19:30:00',
    location: 'Jardim Botânico',
    image: 'https://picsum.photos/800/600?random=4',
    category: EventCategory.THEATER,
    description: 'Uma noite mágica de obras-primas clássicas apresentadas ao ar livre. Traga seu vinho e aprecie Bach e Mozart sob o luar.',
    ticketTypes: [
      {
        id: 't4_gen',
        category: 'Gramado',
        name: 'Entrada Única',
        price: 60,
        description: 'Acomodação no gramado.',
      },
      {
        id: 't4_gen_meia',
        category: 'Gramado',
        name: 'Meia-Entrada',
        price: 30,
        description: 'Estudantes e idosos.',
      }
    ]
  },
  {
    id: 'e5',
    title: 'Clube de Comédia Underground',
    date: '2024-11-12T21:00:00',
    location: 'O Porão, Vila Madalena',
    image: 'https://picsum.photos/800/600?random=5',
    category: EventCategory.NIGHTLIFE,
    description: 'Stand-up comedy com as estrelas em ascensão mais engraçadas do circuito. Risadas garantidas e drinks especiais a noite toda.',
    ticketTypes: [
      {
        id: 't5_ent',
        category: 'Mesa Compartilhada',
        name: 'Individual',
        price: 25,
        description: 'Lugar em mesa compartilhada.',
      },
      {
        id: 't5_combo',
        category: 'Mesa Privada',
        name: 'Mesa para 4',
        price: 100,
        description: 'Mesa reservada para 4 pessoas.',
      }
    ]
  },
];

export const INITIAL_TRANSACTIONS = [
  { id: 't1', type: 'deposit', amount: 500, date: '2024-10-01', description: 'Depósito Inicial' },
  { id: 't2', type: 'purchase', amount: -25, date: '2024-10-05', description: 'Café @ Tech Meetup' },
  { id: 't3', type: 'purchase', amount: -150, date: '2024-10-10', description: 'Ingresso Noites de Neon' },
] as const;
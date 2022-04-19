import { Connection } from 'typeorm';
import { Ticket } from './entities/ticket.entity';

export const ticketsProviders = [
  {
    provide: 'TICKET_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(Ticket),
    inject: ['DATABASE_CONNECTION'],
  },
];

import { Module } from '@nestjs/common';

import { DatabaseModule } from '../database/database.module';
import { ticketsProviders } from './tickets.providers';
import { TicketsService } from './tickets.service';
import { TicketsResolver } from './tickets.resolver';

@Module({
  imports: [DatabaseModule],
  providers: [...ticketsProviders, TicketsResolver, TicketsService]
})
export class TicketsModule {}

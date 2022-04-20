import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TicketsService } from './tickets.service';
import { TicketsResolver } from './tickets.resolver';
import { Ticket } from './entities/ticket.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Ticket])],
  providers: [TicketsResolver, TicketsService],
})
export class TicketsModule {}

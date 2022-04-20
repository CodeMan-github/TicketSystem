import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateTicketInput } from './dto/create-ticket.input';
import { UpdateTicketInput } from './dto/update-ticket.input';
import { Ticket } from './entities/ticket.entity';

@Injectable()
export class TicketsService {
  constructor(
    @InjectRepository(Ticket)
    private ticketRepository: Repository<Ticket>,
  ) {}

  create(createTicketInput: CreateTicketInput) {
    const ticket = this.ticketRepository.create(createTicketInput);
    return this.ticketRepository.save(ticket);
  }

  findAll() {
    return this.ticketRepository.find();
  }

  findOne(id: number) {
    return this.ticketRepository.findOneOrFail(id);
  }

  update(updateTicketInput: UpdateTicketInput) {
    return this.ticketRepository.save(updateTicketInput);
  }

  async remove(id: number) {
    const ticket = await this.ticketRepository.findOneOrFail(id);
    return this.ticketRepository.remove(ticket);
  }
}

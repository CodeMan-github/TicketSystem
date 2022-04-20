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

  /**
  * Function that creates the Ticket(Create Action)
  * @param    {CreateTicketInput} createTicketInput   The ticket object which will be created
  * @return   {Ticket}                                Returns the created ticket object
  */
  create(createTicketInput: CreateTicketInput) {
    const ticket = this.ticketRepository.create(createTicketInput);
    return this.ticketRepository.save(ticket);
  }

  /**
  * Function that retrieves all Tickets(Read Action)
  * @return   {Ticket[]}    Returns all ticket objects
  */
  findAll() {
    return this.ticketRepository.find();
  }

  /**
  * Function that retrieves a Ticket(Read Action)
  * @param    {number} id     The ticket id to retrieve
  * @return   {Ticket}        Returns the ticket object with id
  */
  findOne(id: number) {
    return this.ticketRepository.findOneOrFail(id);
  }

  /**
  * Function that updates the Ticket(Update Action)
  * @param    {UpdateTicketInput} updateTicketInput     The ticket object which will be updated
  * @return   {Ticket}                                Returns the updated ticket object
  */
  update(updateTicketInput: UpdateTicketInput) {
    return this.ticketRepository.save(updateTicketInput);
  }

  /**
  * Function that removes the Ticket(Remove Action)
  * @param    {number} id     The ticket id which will be removed
  * @return   {Ticket}        Returns the removed ticket object
  */
  async remove(id: number) {
    const ticket = await this.ticketRepository.findOneOrFail(id);
    return this.ticketRepository.remove(ticket);
  }
}

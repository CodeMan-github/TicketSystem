import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';

import { TicketsService } from './tickets.service';
import { Ticket } from './entities/ticket.entity';
import { CreateTicketInput } from './dto/create-ticket.input';
import { UpdateTicketInput } from './dto/update-ticket.input';

@Resolver(() => Ticket)
export class TicketsResolver {
  constructor(private readonly ticketsService: TicketsService) {}

  /**
  * Function that creates the Ticket(Create Action)
  * @param    {CreateTicketInput} createTicketInput     The ticket object which will be created
  * @return   {Ticket}                                  Returns the created ticket object
  */
  @Mutation(() => Ticket)
  createTicket(@Args('createTicketInput') createTicketInput: CreateTicketInput) {
    return this.ticketsService.create(createTicketInput);
  }

  /**
  * Function that retrieves all Tickets(Read Action)
  * @return   {Ticket[]}    Returns all ticket objects
  */
  @Query(() => [Ticket], { name: 'tickets' })
  findAll() {
    return this.ticketsService.findAll();
  }

  /**
  * Function that retrieves a Ticket(Read Action)
  * @param    {number} id     The ticket id to retrieve
  * @return   {Ticket}        Returns the ticket object with id
  */
  @Query(() => Ticket, { name: 'ticket' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.ticketsService.findOne(id);
  }

  /**
  * Function that updates the Ticket(Update Action)
  * @param    {UpdateTicketInput} updateTicketInput   The ticket object which will be updated
  * @return   {Ticket}                                Returns the updated ticket object
  */
  @Mutation(() => Ticket)
  updateTicket(@Args('updateTicketInput') updateTicketInput: UpdateTicketInput) {
    return this.ticketsService.update(updateTicketInput);
  }

  /**
  * Function that removes the Ticket(Remove Action)
  * @param    {number} id     The ticket id which will be removed
  * @return   {Ticket}        Returns the removed ticket object
  */
  @Mutation(() => Ticket)
  removeTicket(@Args('id', { type: () => Int }) id: number) {
    return this.ticketsService.remove(id);
  }
}

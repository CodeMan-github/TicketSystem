import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { TicketsService } from './tickets.service';
import { Ticket } from './entities/ticket.entity';
import { CreateTicketInput } from './dto/create-ticket.input';
import { UpdateTicketInput } from './dto/update-ticket.input';

@Resolver(() => Ticket)
export class TicketsResolver {
  constructor(private readonly ticketsService: TicketsService) {}

  @Mutation(() => Ticket)
  createTicket(@Args('createTicketInput') createTicketInput: CreateTicketInput) {
    return this.ticketsService.create(createTicketInput);
  }

  @Query(() => [Ticket], { name: 'tickets' })
  findAll() {
    return this.ticketsService.findAll();
  }

  @Query(() => Ticket, { name: 'ticket' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.ticketsService.findOne(id);
  }

  @Mutation(() => Ticket)
  updateTicket(@Args('updateTicketInput') updateTicketInput: UpdateTicketInput) {
    return this.ticketsService.update(updateTicketInput);
  }

  @Mutation(() => Ticket)
  removeTicket(@Args('id', { type: () => Int }) id: number) {
    return this.ticketsService.remove(id);
  }
}

import { InputType, Field } from '@nestjs/graphql';
import { MaxLength } from 'class-validator';

import { Ticket } from 'src/tickets/entities/ticket.entity';

@InputType()
export class CreateUserInput {
  @Field()
  @MaxLength(30)
  firstName: string;

  @Field()
  @MaxLength(30)
  lastName: string;

  @Field()
  tickets: Ticket[];
}

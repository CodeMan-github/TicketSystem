import { InputType, Field, Int } from '@nestjs/graphql';
import { MaxLength } from 'class-validator';

import { Ticket } from '../../tickets/entities/ticket.entity';

@InputType()
export class CreatePlaneInput {
  @Field()
  @MaxLength(30)
  departureAirport: string;

  @Field()
  @MaxLength(30)
  arrivalAirport: string;

  @Field()
  departureTime: Date;

  @Field()
  arrivalTime: Date;

  @Field(type => [Int], { nullable: true })
  tickets: Ticket[];
}

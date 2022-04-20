import { InputType, Field, Int } from '@nestjs/graphql';

import { User } from '../../users/entities/user.entity';
import { Plane } from '../../planes/entities/plane.entity';

@InputType()
export class CreateTicketInput {
  @Field(type => Int, { nullable: true })
  user: User;

  @Field(type => Int, { nullable: true })
  plane: Plane;
}

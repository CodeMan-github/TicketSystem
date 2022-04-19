import { InputType, Int, Field } from '@nestjs/graphql';
import { User } from 'src/users/entities/user.entity';

@InputType()
export class CreateTicketInput {
  @Field()
  user: User;
}

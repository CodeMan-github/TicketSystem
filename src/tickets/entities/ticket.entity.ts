import { ObjectType, Field, Int } from '@nestjs/graphql';
import { PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';

import { User } from 'src/users/entities/user.entity';


@ObjectType()
export class Ticket {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.tickets)
  user: User;

  @Field()
  @CreateDateColumn()
  created_at: Date;

  @Field()
  @UpdateDateColumn()
  updated_at: Date;
}

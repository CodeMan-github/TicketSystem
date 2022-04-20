import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';

import { User } from '../../users/entities/user.entity';
import { Plane } from '../../planes/entities/plane.entity';

@ObjectType()
@Entity()
export class Ticket {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(type => User)
  @ManyToOne(type => User, user => user.tickets)
  user: User;

  @Field(type => Plane)
  @ManyToOne(type => Plane, plane => plane.tickets)
  plane: Plane;

  @Field()
  @CreateDateColumn()
  created_at: Date;

  @Field()
  @UpdateDateColumn()
  updated_at: Date;
}

import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';

import { Ticket } from '../../tickets/entities/ticket.entity';

@ObjectType()
@Entity()
export class Plane {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  departureAirport: string;

  @Field()
  @Column()
  arrivalAirport: string;

  @Field()
  @Column()
  departureTime: Date;

  @Field()
  @Column()
  arrivalTime: Date;

  @Field(type => [Ticket])
  @OneToMany(type => Ticket, ticket => ticket.plane)
  tickets: Ticket[];

  @Field()
  @CreateDateColumn()
  created_at: Date;

  @Field()
  @UpdateDateColumn()
  updated_at: Date;
}

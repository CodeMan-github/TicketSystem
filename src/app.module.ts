import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { TicketsModule } from './tickets/tickets.module';
import { PlanesModule } from './planes/planes.module';
import { User } from './users/entities/user.entity';
import { Ticket } from './tickets/entities/ticket.entity';
import { Plane } from './planes/entities/plane.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      synchronize: true,
      entities: [
        User,
        Ticket,
        Plane,
      ]
    }),
    UsersModule,
    TicketsModule,
    PlanesModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      playground: true,
      debug: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

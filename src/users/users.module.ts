import { Module } from '@nestjs/common';

import { DatabaseModule } from '../database/database.module';
import { usersProviders } from './users.providers';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';

@Module({
  imports: [DatabaseModule],
  providers: [...usersProviders, UsersResolver, UsersService]
})
export class UsersModule {}

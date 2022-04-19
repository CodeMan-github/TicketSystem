import { Test, TestingModule } from '@nestjs/testing';

import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';
import { usersProviders } from './users.providers';
import { databaseProviders } from '../database/database.providers';

describe('UsersResolver', () => {
  let resolver: UsersResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [...databaseProviders, ...usersProviders, UsersResolver, UsersService],
    }).compile();

    resolver = module.get<UsersResolver>(UsersResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});

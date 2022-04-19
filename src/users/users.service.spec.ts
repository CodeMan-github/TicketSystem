import { Test, TestingModule } from '@nestjs/testing';

import { UsersService } from './users.service';
import { usersProviders } from './users.providers';
import { databaseProviders } from '../database/database.providers';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [...databaseProviders, ...usersProviders, UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

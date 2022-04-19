import { Test, TestingModule } from '@nestjs/testing';

import { TicketsResolver } from './tickets.resolver';
import { TicketsService } from './tickets.service';
import { ticketsProviders } from './tickets.providers';
import { databaseProviders } from '../database/database.providers';

describe('TicketsResolver', () => {
  let resolver: TicketsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [...databaseProviders, ...ticketsProviders, TicketsResolver, TicketsService],
    }).compile();

    resolver = module.get<TicketsResolver>(TicketsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});

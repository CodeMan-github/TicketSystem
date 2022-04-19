import { Test, TestingModule } from '@nestjs/testing';

import { TicketsService } from './tickets.service';
import { ticketsProviders } from './tickets.providers';
import { databaseProviders } from '../database/database.providers';

describe('TicketsService', () => {
  let service: TicketsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [...databaseProviders, ...ticketsProviders, TicketsService],
    }).compile();

    service = module.get<TicketsService>(TicketsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

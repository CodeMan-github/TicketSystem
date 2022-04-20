import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

import { AppModule } from '../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  const gql = '/graphql';

  describe('Ticket', () => {
    let user;
    it('should create a new ticket', () => {
      return request(app.getHttpServer())
        .post(gql)
        .send({
          query:
          'mutation {createUser(createUserInput: { firstName: "John", lastName: "Doe" }) {id firstName lastName}}',
        })
        .expect(200)
        .expect((res) => {
          user = res.body.data.createUser;
        })
        .then(() => {
          request(app.getHttpServer())
          .post(gql)
          .send({
            query:
            `mutation {createTicket(createTicketInput: { user: { connect: ${user.id} } }) {id user{firstName lastName}}}`,
          })
          .expect(200)
          .expect((res1) => {
            expect(res1.body.data.createTicket).toEqual({
              user: {
                firstName: 'John',
                lastName: 'Doe',
              }
            })
          })
        });
    });
  });
});

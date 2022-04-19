import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { getConnection } from 'typeorm';

import { AppModule } from '../src/app.module';
import { User } from '../src/users/entities/user.entity';

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

  describe('User', () => {
    it('should create a new user', () => {
      return request(app.getHttpServer())
        .post(gql)
        .send({
          query:
            'mutation {createUser(createUserInput: { firstName: "John", lastName: "Doe" }) {id firstName lastName}}',
        })
        .expect(200)
        .expect((res) => {
          expect(res.body.data.createUser.firstName).toEqual("John");
          expect(res.body.data.createUser.lastName).toEqual("Doe");
        });
    });

    it('should get a single user by id', () => {
      let user;
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
        .then(() =>
          request(app.getHttpServer())
            .post(gql)
            .send({
              query:
                `{user(id: ${user.id}) {id firstName lastName}}`,
            })
            .expect(200)
            .expect((res) => {
              expect(res.body.data.user).toEqual({
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
              });
            })
        );
    });

    it('should retrieve all user data', async () => {
      const data = [
        {
          firstName: 'John',
          lastName: 'Doe',
        },
        {
          firstName: 'Jane',
          lastName: 'Doe',
        }
      ];

      const connection = await getConnection();
      data.map(async (item) => {
        await connection.createQueryBuilder().insert().into(User).values(item).execute();
      });

      request(app.getHttpServer())
        .post(gql)
        .send({
          query:
            `{users() {id firstName lastName}}`,
        })
        .expect(200)
        .expect((res) => {
          expect(res.body.data.users.length).toEqual(data.length);
          expect(res.body.data.users[0]).toEqual(data[0]);
        });
    });

    it('should update a user by id', () => {
      let user;
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
        .then(() =>
          request(app.getHttpServer())
            .post(gql)
            .send({
              query:
                `mutation {updateUser(updateUserInput: { id: ${user.id}, firstName: "Jane", lastName: "Doe" }) {id firstName lastName}}`,
            })
            .expect(200)
            .then(() =>
              request(app.getHttpServer())
                .post(gql)
                .send({
                  query:
                    `{user(id: ${user.id}) {id firstName lastName}}`,
                })
                .expect(200)
                .expect((res) => {
                  expect(res.body.data.user).toEqual({
                    id: user.id,
                    firstName: 'Jane',
                    lastName: 'Doe',
                  });
                })
            )
        );
    });

    it('should remove a user by id', () => {
      let user;
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
        .then(() =>
          request(app.getHttpServer())
            .post(gql)
            .send({
              query:
                `mutation {removeUser(id: ${user.id}) {id firstName lastName}}`,
            })
            .expect(200)
            .then(() =>
              request(app.getHttpServer())
                .post(gql)
                .send({
                  query:
                    `{user(id: ${user.id}) {id firstName lastName}}`,
                })
                .expect(200)
                .expect((res) => {
                  expect(res.body.data).toEqual(null);
                })
            )
        );
    });
  });
});

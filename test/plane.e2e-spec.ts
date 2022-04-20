import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { getConnection } from 'typeorm';

import { AppModule } from '../src/app.module';
import { Plane } from '../src/planes/entities/plane.entity';

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
  const now = new Date().toString();

  describe('Plane', () => {
    it('should create a new plane', () => {
      return request(app.getHttpServer())
        .post(gql)
        .send({
          query:
            `mutation {createPlane(createPlaneInput: { departureAirport: "test1", arrivalAirport: "test2", departureTime: "${now}", arrivalTime: "${now}" }) {id departureAirport arrivalAirport departureTime arrivalTime}}`,
        })
        .expect(200)
        .expect((res) => {
          expect(res.body.data.createPlane.departureAirport).toEqual("test1");
          expect(res.body.data.createPlane.arrivalAirport).toEqual("test2");
        });
    });

    it('should get a single plane by id', () => {
      let plane;
      return request(app.getHttpServer())
        .post(gql)
        .send({
          query:
            `mutation {createPlane(createPlaneInput: { departureAirport: "test1", arrivalAirport: "test2", departureTime: "${now}", arrivalTime: "${now}" }) {id departureAirport arrivalAirport departureTime arrivalTime}}`,
        })
        .expect(200)
        .expect((res) => {
          plane = res.body.data.createPlane;
        })
        .then(() =>
          request(app.getHttpServer())
            .post(gql)
            .send({
              query:
                `{plane(id: ${plane.id}) {id departureAirport arrivalAirport departureTime arrivalTime}}`,
            })
            .expect(200)
            .expect((res) => {
              expect(res.body.data.plane).toEqual({
                id: plane.id,
                departureAirport: plane.departureAirport,
                arrivalAirport: plane.arrivalAirport,
                departureTime: plane.departureTime,
                arrivalTime: plane.arrivalTime,
              });
            })
        );
    });

    it('should retrieve all plane data', async () => {
      const data = [
        {
          departureAirport: 'test1',
          arrivalAirport: 'test2',
          departureTime: now,
          arrivalTime: now,
        },
        {
          departureAirport: 'test3',
          arrivalAirport: 'test4',
          departureTime: now,
          arrivalTime: now,
        }
      ];

      const connection = await getConnection();
      data.map(async (item) => {
        await connection.createQueryBuilder().insert().into(Plane).values(item).execute();
      });

      request(app.getHttpServer())
        .post(gql)
        .send({
          query:
            `{planes() {id departureAirport arrivalAirport departureTime arrivalTime}}`,
        })
        .expect(200)
        .expect((res) => {
          expect(res.body.data.planes.length).toEqual(data.length);
          expect(res.body.data.planes[0]).toEqual(data[0]);
        });
    });

    it('should update a plane by id', () => {
      let plane;
      return request(app.getHttpServer())
        .post(gql)
        .send({
          query:
            `mutation {createPlane(createPlaneInput: { departureAirport: "test1", arrivalAirport: "test2", departureTime: "${now}", arrivalTime: "${now}" }) {id departureAirport arrivalAirport departureTime arrivalTime}}`,
        })
        .expect(200)
        .expect((res) => {
          plane = res.body.data.createPlane;
        })
        .then(() =>
          request(app.getHttpServer())
            .post(gql)
            .send({
              query:
                `mutation {updatePlane(updatePlaneInput: { id: ${plane.id}, departureAirport: "test3", arrivalAirport: "test4" }) {id departureAirport arrivalAirport departureTime arrivalTime}}`,
            })
            .expect(200)
            .then(() =>
              request(app.getHttpServer())
                .post(gql)
                .send({
                  query:
                    `{plane(id: ${plane.id}) {id departureAirport arrivalAirport}}`,
                })
                .expect(200)
                .expect((res) => {
                  expect(res.body.data.plane).toEqual({
                    id: plane.id,
                    departureAirport: 'test3',
                    arrivalAirport: 'test4',
                  });
                })
            )
        );
    });

    it('should remove a plane by id', () => {
      let plane;
      return request(app.getHttpServer())
        .post(gql)
        .send({
          query:
            `mutation {createPlane(createPlaneInput: { departureAirport: "test1", arrivalAirport: "test2", departureTime: "${now}", arrivalTime: "${now}" }) {id departureAirport arrivalAirport departureTime arrivalTime}}`,
        })
        .expect(200)
        .expect((res) => {
          plane = res.body.data.createPlane;
        })
        .then(() =>
          request(app.getHttpServer())
            .post(gql)
            .send({
              query:
                `mutation {removePlane(id: ${plane.id}) {id departureAirport arrivalAirport departureTime arrivalTime}}`,
            })
            .expect(200)
            .then(() =>
              request(app.getHttpServer())
                .post(gql)
                .send({
                  query:
                    `{plane(id: ${plane.id}) {id departureAirport arrivalAirport departureTime arrivalTime}}`,
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

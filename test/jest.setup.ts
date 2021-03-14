import { App } from '@src/app';
import supertest from 'supertest';
import { createConnection } from 'typeorm';

beforeAll( async () => {
  const server = new App();
  await createConnection();
  global.testRequest = supertest(server.app);
});

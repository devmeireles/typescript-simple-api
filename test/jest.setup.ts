import { App } from '@src/app';
import supertest from 'supertest';
import { createConnection } from 'typeorm';
import fs from 'fs';

beforeAll( async () => {
  const server = new App();
  await createConnection({
    "type": "sqlite",
    "database": "./test/database.sqlite",
    "synchronize": true,
    "logging": false,
    "entities": [
      "src/entities/**/*.ts"
    ],
  });
  global.testRequest = supertest(server.app);
});

afterAll(async () => {
  await fs.unlinkSync('./test/database.sqlite');
})

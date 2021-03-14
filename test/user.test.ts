import app from '@src/app';
import request from 'supertest';

describe('Testing the register endpoints', () => {
    it('It should find an user and return the data', async () => {
        const { body, status } = await global.testRequest.get('/user/51458c1f-ce6b-483c-aa39-f13d8c3011ff');
        expect(status).toBe(200);
    })
});
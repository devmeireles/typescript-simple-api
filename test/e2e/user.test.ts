import faker from 'faker';

const email = faker.internet.email();
const password = faker.internet.password();
const wrongUserID = faker.datatype.uuid();
let userID: string = null;
let token: string = null;

describe('Testing the user endpoints', () => {
    const userObj = {
        name: faker.name.findName(),
        email,
        password,
        language: 'en',
    }

    const loginObj = {
        email,
        password
    }

    describe('POST /', () => {
        it('It should POST an user', async () => {
            const { body, status } = await global.testRequest.post('/user').send(userObj);
            expect(status).toBe(201);
            expect(body.success).toEqual(true);
            expect(body.data).toHaveProperty('name');
            expect(body.data).toHaveProperty('email');

            userID = body.data.id;
        });

        it("It shouldn't POST an user because the user already exists", async () => {
            const { body, status } = await global.testRequest.post('/user').send(userObj);
            expect(status).toBe(400);
            expect(body.success).toEqual(false);
            expect(body).not.toHaveProperty('data');
        });

        it("It shouldn't POST an user because the body is empty", async () => {
            const userObj = {};
            const { body, status } = await global.testRequest.post('/user').send(userObj);
            expect(status).toBe(400);
            expect(body.success).toEqual(false);
            expect(body).not.toHaveProperty('data');
            expect(body).toHaveProperty('message');
        });

        it('It should do the login action and return a jwt', async () => {
            const { body, status } = await global.testRequest.post('/auth/login').send(loginObj);
            expect(status).toBe(200);
            expect(body.success).toEqual(true);
            expect(body.data).toHaveProperty('name');
            expect(body.data).toHaveProperty('email');
            expect(body.data).toHaveProperty('token');

            token = body.data.token;
        });
    });

    describe('GET /', () => {
        it('It should GET an user by ID', async () => {
            const { body, status } = await global.testRequest.get(`/user/${userID}`);
            expect(status).toBe(200);
            expect(body.success).toEqual(true);
            expect(body.data).toHaveProperty('name');
            expect(body.data).toHaveProperty('email');
        });

        it("It shouldn't GET an user because he doesn't exist", async () => {
            const { body, status } = await global.testRequest.get(`/user/${wrongUserID}`);
            expect(status).toBe(400);
            expect(body.success).toEqual(false);
            expect(body).not.toHaveProperty('data');
            expect(body).toHaveProperty('message');
        });

        it("It shouldn't GET an user because the id parameter is empty", async () => {
            const { body, status } = await global.testRequest.get(`/user`);
            expect(status).toBe(404);
            expect(body).not.toHaveProperty('data');
            expect(body).not.toHaveProperty('message');
        });
    });

    describe('PUT /', () => {
        it('It should PUT an user by ID', async () => {
            userObj.password = 'aNewStrongPassw0rd!';
            const { body, status } = await global.testRequest.put(`/user/${userID}`).send(userObj).set({ 'authorization': token });
            expect(status).toBe(204);
            expect(body).not.toHaveProperty('data');
            expect(body).not.toHaveProperty('message');
        });

        it("It shouldn't PUT an user by ID because the body is empty", async () => {
            const { body, status } = await global.testRequest.put(`/user/${userID}`).set({ 'authorization': token });
            expect(status).toBe(400);
            expect(body).not.toHaveProperty('data');
            expect(body).toHaveProperty('message');
        });

        it("It shouldn't PUT an user by ID because he doesn't exist", async () => {
            const { body, status } = await global.testRequest.put(`/user/${wrongUserID}`).set({ 'authorization': token });
            expect(status).toBe(400);
            expect(body).not.toHaveProperty('data');
            expect(body).toHaveProperty('message');
        });

        it("It shouldn't PUT an user because the body is empty", async () => {
            const { body, status } = await global.testRequest.put(`/user/${userID}`).send({}).set({ 'authorization': token });
            expect(status).toBe(400);
            expect(body).toHaveProperty('message');
            expect(body).not.toHaveProperty('data');
        });
    });
});
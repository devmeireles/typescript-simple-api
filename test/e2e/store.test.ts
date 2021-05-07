import faker from 'faker';

const wrongUserID = faker.datatype.uuid();
const wrongToken = faker.datatype.uuid();
const email = faker.internet.email();
const password = faker.internet.password();
let storeID: string = null;
let userID: string = null;
let token: string = null;

describe('Testing the store endpoints', () => {
    const userObj = {
        name: faker.name.findName(),
        email,
        password,
    };

    const loginObj = {
        email,
        password,
    }

    const storeObj = {
        owner_id: userID,
        name: faker.company.companyName(),
        description: faker.lorem.paragraph(),
    }

    const wrongStoreObj = {
        owner_id: wrongUserID,
        description: faker.lorem.paragraph(),
    }

    const wrongStoreUserObj = {
        owner_id: wrongUserID,
        name: faker.company.companyName(),
        description: faker.lorem.paragraph(),
    }

    describe('POST /', () => {
        it('It should POST an user', async () => {
            const { body, status } = await global.testRequest.post('/user').send(userObj);
            expect(status).toBe(201);
            expect(body.success).toEqual(true);
            expect(body.data).toHaveProperty('name');
            expect(body.data).toHaveProperty('email');

            userID = body.data.id;
            storeObj.owner_id = userID;
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

        it('It should POST a store', async () => {
            const { body, status } = await global.testRequest.post('/store').send(storeObj).set({ 'authorization': token });
            expect(status).toBe(201);
            expect(body.success).toEqual(true);
            expect(body.data).toHaveProperty('name');
            expect(body.data).toHaveProperty('id');
            expect(body.data).toHaveProperty('description');

            storeID = body.data.id;
        });


        it("It shouldn't POST a store because the body is empty", async () => {
            const { body, status } = await global.testRequest.post('/store').send({}).set({ 'authorization': token });
            expect(status).toBe(422);
            expect(body.success).toEqual(false);
            expect(body).not.toHaveProperty('data');
        });

        it("It shouldn't POST a store because the user doesn't exist", async () => {
            const { body, status } = await global.testRequest.post('/store').send(wrongStoreUserObj).set({ 'authorization': token });
            expect(status).toBe(400);
            expect(body.success).toEqual(false);
            expect(body).not.toHaveProperty('data');
        });

        it("It shouldn't POST a store because the authorization header is missing", async () => {
            const { body, status } = await global.testRequest.post('/store').send(storeObj);
            expect(status).toBe(401);
            expect(body.success).toEqual(false);
            expect(body).not.toHaveProperty('data');
        });

        it("It shouldn't POST a store because the authorization header is wrong", async () => {
            const { body, status } = await global.testRequest.post('/store').send(storeObj).set({ 'authorization': wrongToken });
            expect(status).toBe(401);
            expect(body.success).toEqual(false);
            expect(body).not.toHaveProperty('data');
        });
    });

    describe('PUT /', () => {
        it('It should PUT a store', async () => {
            const { body, status } = await global.testRequest.put(`/store/${storeID}`).send(storeObj).set({ 'authorization': token });
            expect(status).toBe(204);
            expect(body).not.toHaveProperty('data');
            expect(body).not.toHaveProperty('message');
        });
    });
});
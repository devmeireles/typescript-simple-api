import faker from 'faker';

const wrongUserID = faker.datatype.uuid();
const wrongToken = faker.datatype.uuid();
const email = faker.internet.email();
const password = faker.internet.password();
let userID: string = null;
const storeID: string = null;
let token: string = null;

describe('Testing the product endpoints', () => {
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

    const productObj = {
        owner_id: userID,
        store_id: storeID,
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: faker.commerce.price()
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
            productObj.owner_id = userID;
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

            productObj.store_id = body.data.id;
        });

        it('It should POST a product', async () => {
            const { body, status } = await global.testRequest.post('/product').send(productObj).set({ 'authorization': token });
            expect(status).toBe(201);
            expect(body.success).toEqual(true);
            expect(body.data).toHaveProperty('name');
            expect(body.data).toHaveProperty('id');
            expect(body.data).toHaveProperty('description');
        });

        it("It shouldn't POST a product because the authorization header is wrong", async () => {
            const { body, status } = await global.testRequest.post('/product').send(productObj).set({ 'authorization': wrongToken });
            expect(status).toBe(401);
            expect(body.success).toEqual(false);
            expect(body).not.toHaveProperty('data');
        });
    });
});
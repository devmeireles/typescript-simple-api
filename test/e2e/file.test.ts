import faker from 'faker';

const email = faker.internet.email();
const password = faker.internet.password();
let userID: string = null;
let token: string = null;
const wrongUserID = faker.datatype.uuid();

describe('Testing the file endpoints', () => {
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

    const filePath = `${__dirname}/../assets/test-image.jpg`;

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

    it('It should POST a file', async () => {
        const { body, status } = await global.testRequest.post('/file/upload')
            .set('content-type', 'multipart/form-data')
            .set({ 'authorization': token })
            .field('owner', userID)
            .attach('file', filePath);

        expect(status).toBe(201);
        expect(body.success).toEqual(true);
        expect(body.data).toHaveProperty('name');
        expect(body.data).toHaveProperty('owner_id');
        expect(body.data).toHaveProperty('id');
    });

    it("It shouldn't POST a file because the file is missing", async () => {
        const { body, status } = await global.testRequest.post('/file/upload')
            .set('content-type', 'multipart/form-data')
            .set({ 'authorization': token })
            .field('owner', userID)

        expect(status).toBe(401);
        expect(body.success).toEqual(false);
        expect(body).not.toHaveProperty('data');
    });

    it("It shouldn't POST a file because the owner is wrong", async () => {
        const { body, status } = await global.testRequest.post('/file/upload')
            .set('content-type', 'multipart/form-data')
            .set({ 'authorization': token })
            .field('owner', wrongUserID)
            .attach('file', filePath);

        expect(status).toBe(400);
        expect(body.success).toEqual(false);
        expect(body).not.toHaveProperty('data');
    });
});

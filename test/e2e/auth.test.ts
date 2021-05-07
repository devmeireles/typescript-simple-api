import faker from 'faker';

const wrongActivationCode = faker.datatype.uuid();
const email = faker.internet.email();
const password = faker.internet.password();
let userID: string = null;
let activation: string = null;

describe('Testing the auth endpoints', () => {
    const userObj = {
        name: faker.name.findName(),
        email,
        password,
    };

    const loginObj = {
        email,
        password,
    };

    const wrongLoginMailObj = {
        email: faker.internet.email(),
        password: faker.internet.password()
    };

    const wrongPasswordObj = {
        email: faker.internet.email(),
        password: faker.internet.password()
    };

    const askPasswordObj = {
        email
    }

    const resetPassword = {
        email,
        password: faker.internet.password(),
        activation: faker.datatype.uuid()
    }

    const wrongResetPasswordByEmail = {
        email: faker.internet.email(),
        password,
        activation: wrongActivationCode
    }

    const wrongResetPasswordMissingCode = {
        email,
        password,
        activation: wrongActivationCode
    }

    describe('POST /login', () => {
        it('It should POST an user', async () => {
            const { body, status } = await global.testRequest.post('/user').send(userObj);
            expect(status).toBe(201);
            expect(body.success).toEqual(true);
            expect(body.data).toHaveProperty('name');
            expect(body.data).toHaveProperty('email');

            userID = body.data.id;
            activation = body.data.activation;
        });

        it('It should POST an user activation', async () => {
            const userActivationObj = {
                email: loginObj.email,
                activation
            }

            const { body, status } = await global.testRequest.post('/auth/activate').send(userActivationObj);
            expect(status).toBe(200);
            expect(body.success).toEqual(true);
            expect(body.data).toHaveProperty('name');
            expect(body.data).toHaveProperty('email');
        });

        it("It shouldn't POST an user activation because the user doesn't exist", async () => {
            const wrongUserActivationObj = {
                email: wrongPasswordObj.email,
                activation: wrongActivationCode
            }

            const { body, status } = await global.testRequest.post('/auth/activate').send(wrongUserActivationObj);
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
        });

        it("It shouldn't login because the body is empty", async () => {
            const loginObj = {};
            const { body, status } = await global.testRequest.post('/auth/login').send(loginObj);
            expect(status).toBe(400);
            expect(body.success).toEqual(false);
            expect(body).not.toHaveProperty('data');
            expect(body).toHaveProperty('message');
        });

        it("It shouldn't login because the email is wrong", async () => {
            const { body, status } = await global.testRequest.post('/auth/login').send(wrongLoginMailObj);
            expect(status).toBe(400);
            expect(body.success).toEqual(false);
            expect(body).not.toHaveProperty('data');
            expect(body).toHaveProperty('message');
        });

        it("It shouldn't login because the password is wrong", async () => {
            const { body, status } = await global.testRequest.post('/auth/login').send(wrongPasswordObj);
            expect(status).toBe(400);
            expect(body.success).toEqual(false);
            expect(body).not.toHaveProperty('data');
            expect(body).toHaveProperty('message');
        });

        it("It should ask for a new password", async () => {
            const { body, status } = await global.testRequest.post('/auth/ask-password').send(askPasswordObj);
            expect(status).toBe(200);
            expect(body.success).toEqual(true);
        });

        it("It shouldn't reset the password because the user doesn't exist", async () => {
            const { body, status } = await global.testRequest.post('/auth/reset-password').send(wrongResetPasswordByEmail);

            expect(status).toBe(400);
            expect(body.success).toEqual(false);
            expect(body).not.toHaveProperty('data');
            expect(body).toHaveProperty('message');
        });

        it("It shouldn't reset the password because the activation code is wrong", async () => {
            const { body, status } = await global.testRequest.post('/auth/reset-password').send(wrongResetPasswordMissingCode);

            expect(status).toBe(400);
            expect(body.success).toEqual(false);
            expect(body).not.toHaveProperty('data');
            expect(body).toHaveProperty('message');
        });

        // it("It should reset the password", async () => {
        //     const { body, status } = await global.testRequest.post('/auth/reset-password').send(resetPassword);

        //     expect(status).toBe(200);
        //     expect(body.success).toEqual(true);
        // });
    });
});
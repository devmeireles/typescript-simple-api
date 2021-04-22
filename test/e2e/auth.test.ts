describe('Testing the auth endpoints', () => {
    let userID: string = null;
    let activation: string = null;
    const wrongUUID = '51458c1f-ce6b-483c-aa39-f13d8c3011ff';

    const userObj = {
        name: "Gabriel",
        email: "costumer@flextore.com",
        password: "strongPassw0rd!"
    };

    const loginObj = {
        email: "costumer@flextore.com",
        password: "strongPassw0rd!"
    };

    const wrongLoginMailObj = {
        email: "gabrielx@flextore.com",
        password: "strongPassw0rd!"
    };

    const wrongPasswordObj = {
        email: "costumer@flextore.com",
        password: "12strongPassw0rd!x"
    };

    const askPasswordObj = {
        email: "costumer@flextore.com",
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
                activation: wrongUUID
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

        // it("It should reset the password", async () => {
        //     const { body, status } = await global.testRequest.post('/auth/reset-password').send({
        //         "activation": "950ec0d8-6214-4e1f-9c75-b50f1c0e91fe",
        //         "email": "elgabo@gmail.com",
        //         "password": "aReallyStrongPasssw0rxad!"
        //     });
        //     expect(status).toBe(200);
        //     expect(body.success).toEqual(true);
        // });
    });
});
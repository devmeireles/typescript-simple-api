describe('Testing the auth endpoints', () => {
    let userID: string = null;
    const wrongUserID = '51458c1f-ce6b-483c-aa39-f13d8c3011ff';

    const userObj = {
        name: "Gabriel dos Santos Meireles",
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

    describe('POST /login', () => {
        it('It should POST an user', async () => {
            const { body, status } = await global.testRequest.post('/user').send(userObj);
            expect(status).toBe(201);
            expect(body.success).toEqual(true);
            expect(body.data).toHaveProperty('name');
            expect(body.data).toHaveProperty('email');

            userID = body.data.id;
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
    });
});
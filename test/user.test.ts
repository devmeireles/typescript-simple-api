describe('Testing the user endpoints', () => {
    let userID: string = null;
    const wrongUserID = '51458c1f-ce6b-483c-aa39-f13d8c3011ff';

    const userObj = {
        name: "Gabriel dos Santos Meireles",
        email: "gabriel@flextore.com",
        password: "strongPassw0rd!"
    }

    describe('POST /', () => {
        it('It should POST an user', async () => {
            const { body, status } = await global.testRequest.post('/user').send(userObj);
            expect(status).toBe(201);
            expect(body.success).toEqual(true);
            expect(body.data).toMatchObject(userObj);

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
    });

    describe('GET /', () => {
        it('It should GET an user by ID', async () => {
            const { body, status } = await global.testRequest.get(`/user/${userID}`);
            expect(status).toBe(200);
            expect(body.success).toEqual(true);
            expect(body.data).toMatchObject(userObj);
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
            const { body, status } = await global.testRequest.put(`/user/${userID}`).send(userObj);
            expect(status).toBe(204);
            expect(body).not.toHaveProperty('data');
            expect(body).not.toHaveProperty('message');
        });

        it("It shouldn't PUT an user by ID because the body is empty", async () => {
            const { body, status } = await global.testRequest.put(`/user/${userID}`);
            expect(status).toBe(400);
            expect(body).not.toHaveProperty('data');
            expect(body).toHaveProperty('message');
        });

        it("It shouldn't PUT an user by ID because he doesn't exist", async () => {
            const { body, status } = await global.testRequest.put(`/user/${wrongUserID}`);
            expect(status).toBe(400);
            expect(body).not.toHaveProperty('data');
            expect(body).toHaveProperty('message');
        });
    });
});
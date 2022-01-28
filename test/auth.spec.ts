import { connection } from "../src/repository/connection";


import request from 'supertest'
import { server } from "../server";

describe('Example', () => {

    beforeEach(async () => {
        await connection.query('START TRANSACTION')
    })

    afterEach(async () => {
        await connection.query('ROLLBACK')

    })

    it("returns a 201 on successful signup with base64 files and successful login", async () => {
        await request(server)
            .post('/api/user/register')
            .send({
                email: "test@test.com",
                password: "password",
                role: "Candidat",
                file: ["exemple.png", "exemple.png"],
                pdf: "file.pdf"
            })
            .expect(201);
        const loginResponse = await request(server)
            .post('/api/user/login')
            .send({
                email: 'test@test.com',
                password: 'password'
            }).expect(200);
        const token = loginResponse.body.token;
        expect(token).toBeDefined();

        await request(server)
            .get('/api/user/account')
            .set('authorization', 'bearer ' + token)
            .expect(200);


    });


    /* it('Register user, login and access protected route', async () => {
        await request(server)
            .post('/api/user/register')
            .send({

                email: 'improbableemail@mail.com',
                password: '1234'
            }).expect(201);


        const loginResponse = await request(server)
            .post('/api/user/login')
            .send({
                email: 'improbableemail@mail.com',
                password: '1234'
            }).expect(200);
        const token = loginResponse.body.token;
        expect(token).toBeDefined();

        await request(server)
            .get('/api/user/account')
            .set('authorization', 'bearer ' + token)
            .expect(200);
    }) */
})

import { connection } from "../src/repository/connection";
import { server } from '../server';

import request from 'supertest'

describe('Login', () => {

    beforeEach(async () => {
        await connection.query('START TRANSACTION')
    })

    afterEach(async () => {
        await connection.query('ROLLBACK')

    })

    it('Register user, login and access protected route', async () => {
        await request(server)
            .post('/api/user')
            .send({
                email: 'NewRecruiter3',
                password: 'NewRecruiter3'
            }).expect(201);


        const loginResponse = await request(server)
            .post('/api/user/login')
            .send({
                email: 'NewRecruiter3',
                password: 'NewRecruiter3'
            }).expect(200);
        const token = loginResponse.body.token;
        expect(token).toBeDefined();

        await request(server)
            .get('/api/user/account')
            .set('authorization', 'bearer ' + token)
            .expect(200);
    })
})

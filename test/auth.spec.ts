import { connection } from "../src/repository/connection";
import { server } from '../server';

import request from 'supertest'
import { setUpTestDatabase } from "./setUp";

describe('Users ', () => {

    setUpTestDatabase();
    it('should return all users', async () => {
        const response = await request(server)
            .get('/api/user/allCompanies')
            .expect(200);
        console.log("respooonse", response);

        expect(response.body).toContainEqual({
            user_id: expect.any(Number),
            role: expect.any(String)
        });
    })

    it('Register user, login and access protected route', async () => {


        await request(server)
            .post('/api/user/register')
            .send({
                demo: 0,
                projectId: 53,
                email: 'NewRecruiter8',
                password: 'NewRecruiter8'
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

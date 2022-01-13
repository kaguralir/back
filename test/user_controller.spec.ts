import request from 'supertest';
import { User } from '../src/entity/user_entity';
import { server } from '../server'
import { setUpTestDatabase } from './setUp';
import axios from 'axios';

describe('User controller', () => {

    const results = axios.get(
        `https://my-json-server.typicode.com/kaguralir/demo/user`
    );
    beforeEach(() => {
        results
    });




    it('should add create a user', async () => {
        const response = await request(server)
            .post('/api/user/adduser')
            .send({
                name: 'New User',
                role: 'candidat',
                email: 'new email',
                password: "jfdjfj"
            })
            .expect(201);

        expect(response.body).toEqual({
            user_id: expect.any(Number),
            name: expect.any(String),
            role: expect.any(String),
            email: expect.any(String),
            password: expect.any(String)

        });

    })


})

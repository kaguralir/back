import request from 'supertest';
import { User } from '../src/entity/user_entity';
import { server } from '../server'
import { setUpTestDatabase } from './setUp';

describe('User controller', () => {

    setUpTestDatabase();



    it('should add create a user', async () => {
        const response = await request(server)
        .post('/api/dog')
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

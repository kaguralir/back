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

    it("returns a 201 on successful signup with base64 files and successful login and post job", async () => {
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
        const user = loginResponse.body['user_id']
        expect(token).toBeDefined();
        await request(server)
            .post('/api/jobOffers/addJob')
            .send({
                recruiter_id: user,
                Remote: "yes",
                "orgName": "New Organization",
                "jobRole": "writer",
                "jobDescription": "We need a new recruit with 5 years of experience",
                "Country": "France",
                "City": "Lyon",

            })
            .set('authorization', 'bearer ' + token)
            .expect(201);

        await request(server)
            .get('/api/jobOffers/allJobs')
            .set('authorization', 'bearer ' + token)
            .expect(200);

        await request(server)
            .get('/api/user/account')
            .set('authorization', 'bearer ' + token)
            .expect(200);


    });

})
